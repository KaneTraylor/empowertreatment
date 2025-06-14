import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';
import sgMail from '@sendgrid/mail';
import { cookies } from 'next/headers';

// Initialize Twilio client only if credentials exist
let twilioClient: any = null;
try {
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }
} catch (error) {
  console.error('Failed to initialize Twilio:', error);
}

// Initialize SendGrid only if API key exists
try {
  if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }
} catch (error) {
  console.error('Failed to initialize SendGrid:', error);
}

// Rate limiting: Track OTP attempts
const otpAttempts = new Map<string, { count: number; firstAttempt: number }>();

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now();
  otpAttempts.forEach((data, key) => {
    if (now - data.firstAttempt > 3600000) { // 1 hour
      otpAttempts.delete(key);
    }
  });
}, 3600000);

export async function POST(request: NextRequest) {
  try {
    const { phone, email } = await request.json();
    
    // Get client IP for rate limiting
    const clientIp = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    // Create rate limit key based on phone/email and IP
    const rateLimitKey = `${phone || email}_${clientIp}`;
    
    // Check rate limit
    const now = Date.now();
    const attempts = otpAttempts.get(rateLimitKey);
    
    if (attempts) {
      // Reset if more than 1 hour has passed
      if (now - attempts.firstAttempt > 3600000) {
        otpAttempts.set(rateLimitKey, { count: 1, firstAttempt: now });
      } else if (attempts.count >= 5) {
        // Max 5 attempts per hour
        const timeRemaining = Math.ceil((3600000 - (now - attempts.firstAttempt)) / 60000);
        return NextResponse.json(
          { 
            success: false, 
            message: `Too many verification attempts. Please try again in ${timeRemaining} minutes.` 
          },
          { status: 429 }
        );
      } else {
        // Increment attempt count
        attempts.count++;
      }
    } else {
      // First attempt
      otpAttempts.set(rateLimitKey, { count: 1, firstAttempt: now });
    }

    if (!phone && !email) {
      return NextResponse.json(
        { success: false, message: 'Either phone or email is required' },
        { status: 400 }
      );
    }
    
    // Validate phone number format
    if (phone) {
      // Remove all non-digits
      const phoneDigits = phone.replace(/\D/g, '');
      
      // Check if it's a valid US phone number (10 digits)
      if (phoneDigits.length !== 10) {
        return NextResponse.json(
          { success: false, message: 'Please enter a valid 10-digit US phone number' },
          { status: 400 }
        );
      }
      
      // Check if it starts with a valid US area code (not 0 or 1)
      if (phoneDigits[0] === '0' || phoneDigits[0] === '1') {
        return NextResponse.json(
          { success: false, message: 'Please enter a valid US phone number' },
          { status: 400 }
        );
      }
    }
    
    // Validate email format
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { success: false, message: 'Please enter a valid email address' },
          { status: 400 }
        );
      }
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
      // Send SMS if phone number is provided and Twilio is configured
      if (formattedPhone && twilioClient && process.env.TWILIO_PHONE_NUMBER) {
        try {
          await twilioClient.messages.create({
            body: `Your Empower Treatment verification code is: ${otp}\n\nThis code expires in 10 minutes. If you didn't request this, please ignore.`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: formattedPhone,
          });
        } catch (twilioError: any) {
          console.error('Twilio error:', twilioError);
          // Don't fail the whole request if SMS fails
          if (twilioError.code === 20003) {
            console.error('Twilio authentication failed');
          }
        }
      } else if (formattedPhone && !twilioClient) {
        console.warn('Twilio not configured - SMS not sent');
      }

      // Send email if email is provided and SendGrid is configured
      if (email && process.env.SENDGRID_API_KEY && process.env.SENDGRID_FROM_EMAIL) {
        console.log('Attempting to send OTP email to:', email);
        const emailContent = {
          to: email,
          from: process.env.SENDGRID_FROM_EMAIL,
          subject: 'Your Empower Treatment Verification Code',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Empower Treatment - Verification Code</title>
              <style>
                body {
                  margin: 0;
                  padding: 0;
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                  background-color: #f5f5f5;
                  line-height: 1.6;
                }
                .wrapper {
                  width: 100%;
                  background-color: #f5f5f5;
                  padding: 40px 20px;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background: white;
                  border-radius: 16px;
                  overflow: hidden;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
                }
                .header {
                  background: linear-gradient(135deg, #005c65 0%, #004a52 100%);
                  color: white;
                  padding: 40px 40px 30px;
                  text-align: center;
                }
                .logo {
                  width: 150px;
                  height: auto;
                  margin-bottom: 20px;
                }
                .header h1 {
                  margin: 0;
                  font-size: 28px;
                  font-weight: 600;
                  letter-spacing: -0.5px;
                }
                .content {
                  padding: 40px;
                }
                .greeting {
                  font-size: 18px;
                  color: #333;
                  margin-bottom: 20px;
                }
                .message {
                  font-size: 16px;
                  color: #666;
                  margin-bottom: 30px;
                }
                .otp-container {
                  background: linear-gradient(135deg, #faf8f5 0%, #f5f3f0 100%);
                  border-radius: 12px;
                  padding: 30px;
                  text-align: center;
                  margin: 30px 0;
                  border: 2px solid #005c65;
                }
                .otp-label {
                  font-size: 14px;
                  color: #666;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                  margin-bottom: 10px;
                }
                .otp-code {
                  font-size: 36px;
                  font-weight: 700;
                  color: #005c65;
                  letter-spacing: 8px;
                  margin: 10px 0;
                }
                .expiry {
                  font-size: 14px;
                  color: #999;
                  margin-top: 10px;
                }
                .help-section {
                  background-color: #f8f9fa;
                  border-radius: 8px;
                  padding: 20px;
                  margin: 30px 0;
                }
                .help-title {
                  font-size: 16px;
                  font-weight: 600;
                  color: #333;
                  margin-bottom: 10px;
                }
                .help-text {
                  font-size: 14px;
                  color: #666;
                  margin: 5px 0;
                }
                .footer {
                  background-color: #faf8f5;
                  padding: 30px 40px;
                  text-align: center;
                  border-top: 1px solid #e0e0e0;
                }
                .contact-info {
                  margin-bottom: 20px;
                }
                .contact-item {
                  display: inline-block;
                  margin: 0 15px;
                  color: #666;
                  font-size: 14px;
                }
                .contact-item a {
                  color: #005c65;
                  text-decoration: none;
                  font-weight: 500;
                }
                .social-links {
                  margin: 20px 0;
                }
                .social-link {
                  display: inline-block;
                  width: 36px;
                  height: 36px;
                  background-color: #005c65;
                  border-radius: 50%;
                  margin: 0 5px;
                  line-height: 36px;
                  color: white;
                  text-decoration: none;
                  font-size: 18px;
                }
                .legal {
                  font-size: 12px;
                  color: #999;
                  margin-top: 20px;
                }
                .button {
                  display: inline-block;
                  background-color: #005c65;
                  color: white;
                  padding: 14px 32px;
                  text-decoration: none;
                  border-radius: 50px;
                  font-weight: 500;
                  margin: 20px 0;
                  font-size: 16px;
                }
                @media only screen and (max-width: 600px) {
                  .header {
                    padding: 30px 20px 20px;
                  }
                  .content {
                    padding: 30px 20px;
                  }
                  .otp-code {
                    font-size: 28px;
                    letter-spacing: 6px;
                  }
                  .contact-item {
                    display: block;
                    margin: 5px 0;
                  }
                }
              </style>
            </head>
            <body>
              <div class="wrapper">
                <div class="container">
                  <div class="header">
                    <img src="https://empowertreatment.com/logo.png" alt="Empower Treatment" style="width: 150px; height: auto; margin-bottom: 20px;" />
                    <h1>Empower Treatment</h1>
                    <p style="margin: 10px 0 0; font-size: 16px; opacity: 0.9;">Your Journey to Recovery Starts Here</p>
                  </div>
                  
                  <div class="content">
                    <p class="greeting">Hello,</p>
                    <p class="message">
                      Thank you for starting your assessment with Empower Treatment. 
                      We're here to support you every step of the way on your journey to recovery.
                    </p>
                    
                    <div class="otp-container">
                      <div class="otp-label">Your Verification Code</div>
                      <div class="otp-code">${otp}</div>
                      <div class="expiry">This code expires in 10 minutes</div>
                    </div>
                    
                    <p style="text-align: center; color: #666; font-size: 15px;">
                      Enter this code on the verification page to continue your assessment.
                    </p>
                    
                    <div class="help-section">
                      <div class="help-title">Need Help?</div>
                      <p class="help-text">
                        If you didn't request this code, please ignore this email.
                      </p>
                      <p class="help-text">
                        Having trouble? Our support team is available 24/7 at 
                        <a href="tel:740-200-0277" style="color: #005c65; text-decoration: none; font-weight: 500;">(740) 200-0277</a>
                      </p>
                    </div>
                  </div>
                  
                  <div class="footer">
                    <div class="contact-info">
                      <span class="contact-item">
                        📞 <a href="tel:740-200-0277">(740) 200-0277</a>
                      </span>
                      <span class="contact-item">
                        ✉️ <a href="mailto:support@empowertreatment.com">support@empowertreatment.com</a>
                      </span>
                    </div>
                    
                    <p class="legal">
                      © 2024 Empower Treatment. All rights reserved.<br>
                      This email contains confidential information intended only for the recipient.
                    </p>
                  </div>
                </div>
              </div>
            </body>
            </html>
          `,
        };

        try {
          await sgMail.send(emailContent);
          console.log('OTP email sent successfully to:', email);
        } catch (emailError: any) {
          console.error('SendGrid error:', emailError);
          console.error('SendGrid error details:', emailError.response?.body);
          // Don't fail the whole request if email fails
        }
      } else if (email && !process.env.SENDGRID_API_KEY) {
        console.warn('SendGrid not configured - Email not sent');
      } else if (email && !process.env.SENDGRID_FROM_EMAIL) {
        console.warn('SendGrid FROM_EMAIL not configured - Email not sent');
      }

      // Return success even if SMS/email sending failed
      // The OTP is still stored in cookies for verification
      return NextResponse.json({ success: true });
      
    } catch (error: any) {
      console.error('SMS/Email error:', error);
      // Still return success if OTP was generated and stored
      return NextResponse.json({ success: true });
    }
  } catch (error: any) {
    console.error('Server error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';