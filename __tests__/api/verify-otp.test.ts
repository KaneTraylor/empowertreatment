import { POST } from '@/app/api/verify-otp/route';
import { NextRequest } from 'next/server';

// Mock cookies
const mockCookies = {
  get: jest.fn(),
  delete: jest.fn(),
};

jest.mock('next/headers', () => ({
  cookies: () => mockCookies,
}));

describe('POST /api/verify-otp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should verify OTP successfully', async () => {
    const mockRequest = {
      json: async () => ({ otp: '123456' }),
    } as NextRequest;

    mockCookies.get.mockReturnValueOnce({ value: '123456' });

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ success: true });
    expect(mockCookies.delete).toHaveBeenCalledWith('otp');
  });

  it('should return error if OTP is missing in request', async () => {
    const mockRequest = {
      json: async () => ({}),
    } as NextRequest;

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      success: false,
      message: 'OTP is required',
    });
  });

  it('should return error if stored OTP is not found', async () => {
    const mockRequest = {
      json: async () => ({ otp: '123456' }),
    } as NextRequest;

    mockCookies.get.mockReturnValueOnce(undefined);

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      success: false,
      message: 'OTP expired or not found',
    });
  });

  it('should return error if OTP does not match', async () => {
    const mockRequest = {
      json: async () => ({ otp: '123456' }),
    } as NextRequest;

    mockCookies.get.mockReturnValueOnce({ value: '654321' });

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      success: false,
      message: 'Invalid OTP',
    });
    expect(mockCookies.delete).not.toHaveBeenCalled();
  });

  it('should handle server errors', async () => {
    const mockRequest = {
      json: async () => {
        throw new Error('Server error');
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
});