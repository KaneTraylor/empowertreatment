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
          body: `Your Empower Treatment verification code is: ${otp}\n\nThis code expires in 10 minutes. If you didn't request this, please ignore.`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: formattedPhone,
        });
      }

      // Send email if email is provided
      if (email) {
        const emailContent = {
          to: email,
          from: process.env.FROM_EMAIL!,
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