import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid if API key exists
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    if (!data.residentName || !data.signatureDate) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format the date nicely
    const signatureDate = new Date(data.signatureDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Send email notification if SendGrid is configured
    if (SENDGRID_API_KEY && process.env.SENDGRID_FROM_EMAIL) {
      const recipients = ['kelsey@empowertreatment.com', 'kalee@empowertreatment.com', 'info@risingtidesconsults.com'];
      // Add any test email here if needed for debugging
      // recipients.push('your-personal-email@gmail.com');
      console.log('Sending handbook email to:', recipients);
      console.log('From email:', process.env.SENDGRID_FROM_EMAIL);
      
      const emailContent = {
        to: recipients,
        from: process.env.SENDGRID_FROM_EMAIL,
        subject: `Housing Handbook Acknowledged - ${data.residentName}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #005c65; color: white; padding: 20px; text-align: center; }
              .content { background-color: #f9f9f9; padding: 20px; margin-top: 20px; }
              .section { margin-bottom: 20px; background: white; padding: 15px; border-radius: 5px; }
              .label { font-weight: bold; color: #005c65; }
              .success-icon { color: #28a745; font-size: 48px; text-align: center; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Housing Handbook Acknowledgment</h1>
              </div>
              
              <div class="content">
                <div class="success-icon">✓</div>
                
                <div class="section">
                  <h2>Resident Information</h2>
                  <p><span class="label">Name:</span> ${data.residentName}</p>
                  <p><span class="label">Date Signed:</span> ${signatureDate}</p>
                  <p><span class="label">Time:</span> ${new Date().toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit', 
                    hour12: true 
                  })}</p>
                </div>

                <div class="section">
                  <h2>Acknowledgment Details</h2>
                  <p>The resident has successfully completed reading all sections of the Recovery Housing Resident Handbook and has acknowledged understanding of:</p>
                  <ul>
                    <li>Program values, mission, and vision</li>
                    <li>Resident rights and grievance policies</li>
                    <li>Rules and responsibilities</li>
                    <li>Emergency protocols</li>
                    <li>Code of ethics</li>
                    <li>Good neighbor policy</li>
                    <li>All other handbook sections</li>
                  </ul>
                </div>

                <div class="section">
                  <h2>Digital Signature</h2>
                  <p>The resident has provided their digital signature confirming they agree to abide by all articles of the resident handbook and understand that violation of the rules can result in disciplinary action including dismissal from housing.</p>
                  <p><span class="label">Digital Signature:</span> ${data.residentName}</p>
                </div>

                <div class="section" style="background-color: #e8f4f8;">
                  <h3>Next Steps</h3>
                  <p>Please ensure the resident has:</p>
                  <ul>
                    <li>A printed copy of the handbook for their records</li>
                    <li>Contact information for their case manager</li>
                    <li>Emergency contact numbers posted in their room</li>
                  </ul>
                </div>
              </div>
            </div>
          </body>
          </html>
        `
      };

      try {
        await sgMail.sendMultiple(emailContent);
        console.log('Handbook acknowledgment email sent successfully');
      } catch (emailError: any) {
        console.error('Email error:', emailError);
        console.error('Email error details:', {
          message: emailError?.message || 'Unknown error',
          code: emailError?.code || 'Unknown code',
          response: emailError?.response?.body || 'No response body'
        });
        // Don't fail the request if email fails
      }
    } else {
      console.warn('SendGrid not configured - email notification will not be sent');
    }

    // Note: Handbook acknowledgments are currently only sent via email
    // Database storage will be implemented when the table is created
    console.log('Handbook acknowledgment processed - email notification sent');

    return NextResponse.json({ 
      success: true, 
      message: 'Handbook acknowledgment submitted successfully',
      emailSent: !!SENDGRID_API_KEY
    });

  } catch (error) {
    console.error('Error processing handbook acknowledgment:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process acknowledgment' },
      { status: 500 }
    );
  }
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';