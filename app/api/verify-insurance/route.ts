import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

interface InsuranceVerificationData {
  insuranceProvider: string;
  memberID: string;
  dateOfBirth: string;
  groupNumber?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: InsuranceVerificationData = await request.json();

    // In production, this would:
    // 1. Call a real insurance verification API (like Availity, Change Healthcare, etc.)
    // 2. Store the verification request in a database
    // 3. Return actual coverage details

    // For now, we'll send an email to the admissions team with the verification request
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f5; padding: 20px 0;">
          <tr>
            <td align="center">
              <table cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 30px 40px; border-radius: 12px 12px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Insurance Verification Request</h1>
                    <p style="margin: 8px 0 0 0; color: #dbeafe; font-size: 16px;">New verification request submitted</p>
                  </td>
                </tr>
                
                <!-- Patient Information -->
                <tr>
                  <td style="padding: 30px 40px 0 40px;">
                    <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 20px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                      Patient Information
                    </h2>
                    <table cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding: 8px 0;">
                          <table cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td width="40%" style="color: #6b7280; font-size: 14px;">Name:</td>
                              <td style="color: #1f2937; font-size: 14px; font-weight: 500;">${data.firstName} ${data.lastName}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <table cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td width="40%" style="color: #6b7280; font-size: 14px;">Date of Birth:</td>
                              <td style="color: #1f2937; font-size: 14px; font-weight: 500;">${data.dateOfBirth}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <table cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td width="40%" style="color: #6b7280; font-size: 14px;">Phone:</td>
                              <td style="color: #1f2937; font-size: 14px; font-weight: 500;">${data.phone}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <table cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td width="40%" style="color: #6b7280; font-size: 14px;">Email:</td>
                              <td style="color: #1f2937; font-size: 14px; font-weight: 500;">${data.email}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Insurance Information -->
                <tr>
                  <td style="padding: 30px 40px 0 40px;">
                    <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 20px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                      Insurance Information
                    </h2>
                    <table cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding: 8px 0;">
                          <table cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td width="40%" style="color: #6b7280; font-size: 14px;">Provider:</td>
                              <td style="color: #1f2937; font-size: 14px; font-weight: 500;">${data.insuranceProvider}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <table cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td width="40%" style="color: #6b7280; font-size: 14px;">Member ID:</td>
                              <td style="color: #1f2937; font-size: 14px; font-weight: 500;">${data.memberID}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      ${data.groupNumber ? `
                      <tr>
                        <td style="padding: 8px 0;">
                          <table cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td width="40%" style="color: #6b7280; font-size: 14px;">Group Number:</td>
                              <td style="color: #1f2937; font-size: 14px; font-weight: 500;">${data.groupNumber}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
                
                <!-- Action Required -->
                <tr>
                  <td style="padding: 30px 40px;">
                    <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #fef3c7; border: 1px solid #fde68a; border-radius: 8px; padding: 20px;">
                      <tr>
                        <td>
                          <h3 style="margin: 0 0 12px 0; color: #92400e; font-size: 16px; font-weight: 600;">
                            Action Required
                          </h3>
                          <ul style="margin: 0; padding-left: 20px; color: #78350f; font-size: 14px; line-height: 1.6;">
                            <li>Verify insurance benefits with provider</li>
                            <li>Check in-network/out-of-network status</li>
                            <li>Confirm deductible and out-of-pocket amounts</li>
                            <li>Contact patient with verification results</li>
                          </ul>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f9fafb; padding: 20px 40px; border-radius: 0 0 12px 12px; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0; color: #6b7280; font-size: 12px; text-align: center;">
                      Insurance Verification Request | Generated on ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Send email to admissions team
    try {
      await sgMail.send({
        to: ['admissions@empowertreatment.com', 'insurance@empowertreatment.com'],
        from: process.env.SENDGRID_FROM_EMAIL || 'noreply@empowertreatment.com',
        subject: `Insurance Verification Request - ${data.firstName} ${data.lastName}`,
        html: htmlContent,
      });
    } catch (emailError) {
      console.error('Failed to send admin email:', emailError);
      // Don't fail the verification if email fails
    }

    // Send confirmation email to patient
    const patientEmailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f5; padding: 20px 0;">
          <tr>
            <td align="center">
              <table cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #ef3d3d 0%, #dc2626 100%); padding: 30px 40px; border-radius: 12px 12px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Insurance Verification Received</h1>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 30px 40px;">
                    <p style="margin: 0 0 20px 0; color: #1f2937; font-size: 16px; line-height: 1.5;">
                      Dear ${data.firstName},
                    </p>
                    <p style="margin: 0 0 20px 0; color: #1f2937; font-size: 16px; line-height: 1.5;">
                      Thank you for submitting your insurance information. Our admissions team has received your verification request and will review your benefits.
                    </p>
                    
                    <div style="background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin: 20px 0;">
                      <h3 style="margin: 0 0 12px 0; color: #1f2937; font-size: 18px; font-weight: 600;">What Happens Next?</h3>
                      <ul style="margin: 0; padding-left: 20px; color: #4b5563; font-size: 14px; line-height: 1.6;">
                        <li>We'll verify your benefits with your insurance provider</li>
                        <li>This typically takes 24-48 business hours</li>
                        <li>We'll contact you with your coverage details</li>
                        <li>Our team will explain your treatment options and costs</li>
                      </ul>
                    </div>
                    
                    <p style="margin: 20px 0; color: #1f2937; font-size: 16px; line-height: 1.5;">
                      If you have any questions or need immediate assistance, please don't hesitate to call us at <strong>(740) 200-0016</strong>.
                    </p>
                    
                    <p style="margin: 20px 0 0 0; color: #1f2937; font-size: 16px; line-height: 1.5;">
                      Sincerely,<br>
                      The Empower Treatment Admissions Team
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f9fafb; padding: 20px 40px; border-radius: 0 0 12px 12px; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0; color: #6b7280; font-size: 12px; text-align: center;">
                      Empower Treatment | (740) 200-0016 | empowertreatment.com
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    try {
      await sgMail.send({
        to: data.email,
        from: process.env.SENDGRID_FROM_EMAIL || 'noreply@empowertreatment.com',
        subject: 'Insurance Verification Request Received - Empower Treatment',
        html: patientEmailContent,
      });
    } catch (emailError) {
      console.error('Failed to send patient email:', emailError);
      // Don't fail the verification if email fails
    }

    // All providers listed in the form are in-network
    const inNetworkProviders = ['aetna', 'anthem-bcbs', 'bcbs', 'cigna', 'humana', 'kaiser', 'medicaid', 'medicare', 'united', 'wellcare'];
    const isAccepted = inNetworkProviders.includes(data.insuranceProvider) || data.insuranceProvider === 'other';
    
    console.log('Insurance verification:', {
      provider: data.insuranceProvider,
      isAccepted,
      inNetworkProviders
    });

    return NextResponse.json({
      success: true,
      message: 'Insurance verification request submitted successfully',
      mockResult: {
        isAccepted,
        coverageDetails: isAccepted ? {
          inNetwork: true, // All listed providers are in-network
          estimatedCoverage: data.insuranceProvider === 'medicaid' || data.insuranceProvider === 'medicare' ? '100%' : '80-90%',
          deductible: data.insuranceProvider === 'medicaid' || data.insuranceProvider === 'medicare' ? '$0' : '$500-$1,500',
          outOfPocket: data.insuranceProvider === 'medicaid' || data.insuranceProvider === 'medicare' ? '$0' : '$2,000-$5,000',
          preAuthRequired: data.insuranceProvider !== 'medicaid' && data.insuranceProvider !== 'medicare'
        } : null
      }
    });

  } catch (error) {
    console.error('Error processing insurance verification:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to process insurance verification. Please try again or call us directly.' 
      },
      { status: 500 }
    );
  }
}