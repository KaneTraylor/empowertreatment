import { POST } from '@/app/api/send-sms/route';
import { NextRequest } from 'next/server';
import twilio from 'twilio';
import sgMail from '@sendgrid/mail';

// Mock dependencies
jest.mock('twilio');
jest.mock('@sendgrid/mail');
jest.mock('next/headers', () => ({
  cookies: () => ({
    set: jest.fn(),
  }),
}));

const mockTwilioClient = {
  messages: {
    create: jest.fn(),
  },
};

(twilio as jest.Mock).mockReturnValue(mockTwilioClient);

describe('POST /api/send-sms', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.TWILIO_ACCOUNT_SID = 'test-sid';
    process.env.TWILIO_AUTH_TOKEN = 'test-token';
    process.env.TWILIO_PHONE_NUMBER = '+1234567890';
    process.env.SENDGRID_API_KEY = 'test-sendgrid-key';
    process.env.FROM_EMAIL = 'test@example.com';
  });

  it('should send SMS and email successfully', async () => {
    const mockRequest = {
      json: async () => ({
        phone: '5551234567',
        email: 'user@example.com',
      }),
    } as NextRequest;

    mockTwilioClient.messages.create.mockResolvedValueOnce({});
    (sgMail.send as jest.Mock).mockResolvedValueOnce({});

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ success: true });
    expect(mockTwilioClient.messages.create).toHaveBeenCalledWith({
      body: expect.stringContaining('Your verification code is'),
      from: '+1234567890',
      to: '+15551234567',
    });
    expect(sgMail.send).toHaveBeenCalled();
  });

  it('should return error if phone or email is missing', async () => {
    const mockRequest = {
      json: async () => ({
        phone: '5551234567',
        // email is missing
      }),
    } as NextRequest;

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      success: false,
      message: 'Phone and email are required',
    });
  });

  it('should handle SMS sending failure', async () => {
    const mockRequest = {
      json: async () => ({
        phone: '5551234567',
        email: 'user@example.com',
      }),
    } as NextRequest;

    mockTwilioClient.messages.create.mockRejectedValueOnce(new Error('SMS failed'));

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({
      success: false,
      message: 'SMS failed',
    });
  });

  it('should handle request parsing error', async () => {
    const mockRequest = {
      json: async () => {
        throw new Error('Invalid JSON');
      },
    } as NextRequest;

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({
      success: false,
      message: 'Server error',
    });
  });

  it('should generate 6-digit OTP', async () => {
    const mockRequest = {
      json: async () => ({
        phone: '5551234567',
        email: 'user@example.com',
      }),
    } as NextRequest;

    mockTwilioClient.messages.create.mockImplementation((params) => {
      const otpMatch = params.body.match(/(\d{6})/);
      expect(otpMatch).toBeTruthy();
      expect(otpMatch[1]).toHaveLength(6);
      return Promise.resolve({});
    });

    (sgMail.send as jest.Mock).mockResolvedValueOnce({});

    await POST(mockRequest);

    expect(mockTwilioClient.messages.create).toHaveBeenCalled();
  });
});