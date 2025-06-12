import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';
import sgMail from '@sendgrid/mail';
import { cookies } from 'next/headers';

// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { phone, email } = await request.json();

    if (!phone && !email) {
      return NextResponse.json(
        { success: false, message: 'Either phone or email is required' },
        { status: 400 }
      );
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP in cookies (you might want to use a more secure method in production)
    const cookieStore = cookies();
    cookieStore.set('otp', otp, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 600, // 10 minutes
    });
    
    // Store contact method in cookie for verification
    if (phone) {
      cookieStore.set('phone', phone, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 600,
      });
    }
    if (email) {
      cookieStore.set('email', email, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 600,
      });
    }

    // Format phone number if provided
    const formattedPhone = phone ? `+1${phone.replace(/\D/g, '')}` : null;

    try {
      // Send SMS if phone number is provided
      if (formattedPhone) {
        await twilioClient.messages.create({
          body: `Your verification code is ${otp} from Empower Treatment`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: formattedPhone,
        });
      }

      // Send email if email is provided
      if (email) {
        const emailContent = {
          to: email,
          from: process.env.FROM_EMAIL!,
          subject: 'EMPOWER TREATMENT OTP VERIFICATION',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
                .container { max-width: 600px; margin: 20px auto; background: white; padding: 20px; border-radius: 10px; }
                .header { text-align: center; padding: 20px 0; }
                .otp-box { background: #f0f0f0; padding: 20px; margin: 20px 0; text-align: center; font-size: 24px; font-weight: bold; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Your OTP Verification Code</h1>
                </div>
                <div class="otp-box">
                  Your verification code is ${otp} from Empower Treatment
                </div>
                <p>This code will expire in 10 minutes.</p>
              </div>
            </body>
            </html>
          `,
        };

        await sgMail.send(emailContent);
      }

      return NextResponse.json({ success: true });
    } catch (error: any) {
      console.error('SMS/Email error:', error);
      return NextResponse.json(
        { success: false, message: error.message || 'Failed to send verification code' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Server error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}