import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import twilio from 'twilio';

// Check for required environment variables
const requiredEnvVars = {
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SENDGRID_FROM_EMAIL: process.env.SENDGRID_FROM_EMAIL,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
};

// Initialize SendGrid only if API key exists
if (requiredEnvVars.SENDGRID_API_KEY) {
  sgMail.setApiKey(requiredEnvVars.SENDGRID_API_KEY);
}

// Initialize Twilio only if credentials exist
const twilioClient = requiredEnvVars.TWILIO_ACCOUNT_SID && requiredEnvVars.TWILIO_AUTH_TOKEN
  ? twilio(requiredEnvVars.TWILIO_ACCOUNT_SID, requiredEnvVars.TWILIO_AUTH_TOKEN)
  : null;

interface YouthFormData {
  formType: 'group-home' | 'parent';
  // Contact Information
  contactName: string;
  organizationName?: string; // For group homes
  email: string;
  phone: string;
  state: string;
  
  // Referral Type (for group homes)
  referralType?: 'individual' | 'multiple' | 'entire-house';
  
  // Youth Information
  youthName?: string; // Optional for group homes with multiple/entire-house
  youthAge?: string; // Optional for group homes with multiple/entire-house
  numberOfYouth?: string; // For multiple or entire-house referrals
  ageRange?: string; // For entire-house referrals
  groupDescription?: string; // For multiple youth referrals
  
  // Assessment Information
  primaryConcerns: string[];
  currentMedications?: string;
  insuranceProvider?: string;
  previousTreatment?: string;
  
  // Additional Information
  urgencyLevel: 'immediate' | 'soon' | 'planning';
  additionalNotes?: string;
  
  // Consent
  consent: boolean;
}

export async function POST(request: NextRequest) {
  try {
    // Check for missing required environment variables
    const missingVars = Object.entries(requiredEnvVars)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingVars.length > 0) {
      console.error('Missing required environment variables:', missingVars);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Server configuration error. Please contact support.',
          error: process.env.NODE_ENV === 'development' ? `Missing environment variables: ${missingVars.join(', ')}` : undefined
        },
        { status: 500 }
      );
    }

    const data: YouthFormData = await request.json();

    // Create HTML email content
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
                  <td style="background: linear-gradient(135deg, #ef3d3d 0%, #dc2626 100%); padding: 30px 40px; border-radius: 12px 12px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Youth Services Inquiry</h1>
                    <p style="margin: 8px 0 0 0; color: #fee2e2; font-size: 16px;">${data.formType === 'group-home' ? 'Group Home Referral' : 'Parent/Guardian Inquiry'}</p>
                  </td>
                </tr>
                
                <!-- Quick Info Banner -->
                <tr>
                  <td style="padding: 0;">
                    <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #fee2e2; border-bottom: 1px solid #fecaca;">
                      <tr>
                        <td style="padding: 20px 40px;">
                          <table cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td width="50%">
                                <p style="margin: 0; color: #991b1b; font-size: 14px; font-weight: 600;">CONTACT NAME</p>
                                <p style="margin: 4px 0 0 0; color: #1f2937; font-size: 18px; font-weight: 500;">${data.contactName}</p>
                                ${data.organizationName ? `<p style="margin: 2px 0 0 0; color: #6b7280; font-size: 14px;">${data.organizationName}</p>` : ''}
                              </td>
                              <td width="50%" align="right">
                                <p style="margin: 0; color: #991b1b; font-size: 14px; font-weight: 600;">REFERRAL FOR</p>
                                <p style="margin: 4px 0 0 0; color: #1f2937; font-size: 18px; font-weight: 500;">
                                  ${data.referralType === 'individual' ? data.youthName : 
                                    data.referralType === 'multiple' ? `${data.numberOfYouth} Youth` : 
                                    `Entire Facility (${data.numberOfYouth} Residents)`}
                                </p>
                                <p style="margin: 2px 0 0 0; color: #6b7280; font-size: 14px;">
                                  ${data.referralType === 'individual' ? `Age: ${data.youthAge}` : 
                                    data.referralType === 'entire-house' ? `Ages: ${data.ageRange}` : ''}
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Urgency Alert -->
                ${data.urgencyLevel === 'immediate' ? `
                <tr>
                  <td style="padding: 20px 40px 0 40px;">
                    <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #fee2e2; border: 1px solid #fecaca; border-radius: 8px;">
                      <tr>
                        <td style="padding: 16px 20px;">
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="vertical-align: middle; padding-right: 12px;">
                                <div style="width: 40px; height: 40px; background-color: #ef4444; border-radius: 50%; text-align: center; line-height: 40px;">
                                  <span style="color: white; font-size: 20px;">!</span>
                                </div>
                              </td>
                              <td>
                                <p style="margin: 0; color: #991b1b; font-size: 16px; font-weight: 600;">Immediate Assistance Needed</p>
                                <p style="margin: 4px 0 0 0; color: #dc2626; font-size: 14px;">Please prioritize this inquiry</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ''}
                
                <!-- Contact Information Section -->
                <tr>
                  <td style="padding: 30px 40px 0 40px;">
                    <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 20px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                      <span style="color: #ef3d3d;">📋</span> Contact Information
                    </h2>
                    <table cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding: 8px 0;">
                          <table cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td width="30%" style="color: #6b7280; font-size: 14px;">Email:</td>
                              <td style="color: #1f2937; font-size: 14px; font-weight: 500;">${data.email}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <table cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td width="30%" style="color: #6b7280; font-size: 14px;">Phone:</td>
                              <td style="color: #1f2937; font-size: 14px; font-weight: 500;">${data.phone}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <table cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td width="30%" style="color: #6b7280; font-size: 14px;">State:</td>
                              <td style="color: #1f2937; font-size: 14px; font-weight: 500;">${data.state}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Youth Assessment Section -->
                <tr>
                  <td style="padding: 30px 40px 0 40px;">
                    <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 20px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                      <span style="color: #ef3d3d;">🏥</span> Youth Assessment
                    </h2>
                    
                    ${data.referralType === 'multiple' && data.groupDescription ? `
                    <!-- Youth Details for Multiple Referral -->
                    <div style="background-color: #e0e7ff; border: 1px solid #c7d2fe; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
                      <p style="margin: 0 0 8px 0; color: #3730a3; font-size: 13px; font-weight: 600; text-transform: uppercase;">Youth Details</p>
                      <p style="margin: 0; color: #4c1d95; font-size: 14px; white-space: pre-wrap;">${data.groupDescription}</p>
                    </div>
                    ` : ''}
                    
                    <!-- Primary Concerns -->
                    <div style="background-color: #fef3c7; border: 1px solid #fde68a; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
                      <p style="margin: 0 0 8px 0; color: #92400e; font-size: 13px; font-weight: 600; text-transform: uppercase;">Primary Concerns</p>
                      <p style="margin: 0; color: #78350f; font-size: 14px;">${data.primaryConcerns.join(', ')}</p>
                    </div>
                    
                    <!-- Additional Details -->
                    <table cellpadding="0" cellspacing="0" width="100%">
                      ${data.currentMedications ? `
                      <tr>
                        <td style="padding: 8px 0;">
                          <table cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td width="30%" style="color: #6b7280; font-size: 14px;">Current Medications:</td>
                              <td style="color: #1f2937; font-size: 14px; font-weight: 500;">${data.currentMedications}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      ` : ''}
                      ${data.insuranceProvider ? `
                      <tr>
                        <td style="padding: 8px 0;">
                          <table cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td width="30%" style="color: #6b7280; font-size: 14px;">Insurance:</td>
                              <td style="color: #1f2937; font-size: 14px; font-weight: 500;">${data.insuranceProvider}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      ` : ''}
                      ${data.previousTreatment ? `
                      <tr>
                        <td style="padding: 8px 0;">
                          <table cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td width="30%" style="color: #6b7280; font-size: 14px;">Previous Treatment:</td>
                              <td style="color: #1f2937; font-size: 14px; font-weight: 500;">${data.previousTreatment}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td style="padding: 8px 0;">
                          <table cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td width="30%" style="color: #6b7280; font-size: 14px;">Urgency:</td>
                              <td style="color: #1f2937; font-size: 14px; font-weight: 500;">
                                ${data.urgencyLevel === 'immediate' ? 'Immediate assistance needed' : 
                                  data.urgencyLevel === 'soon' ? 'Within the next few days' : 
                                  'Planning for future care'}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Additional Notes -->
                    ${data.additionalNotes ? `
                    <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px; margin-top: 16px;">
                      <p style="margin: 0 0 8px 0; color: #4b5563; font-size: 13px; font-weight: 600; text-transform: uppercase;">Additional Notes</p>
                      <p style="margin: 0; color: #1f2937; font-size: 14px; line-height: 1.5;">${data.additionalNotes}</p>
                    </div>
                    ` : ''}
                  </td>
                </tr>
                
                <!-- Action Items -->
                <tr>
                  <td style="padding: 30px 40px;">
                    <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #fee2e2; border-radius: 8px; padding: 20px;">
                      <tr>
                        <td>
                          <h3 style="margin: 0 0 12px 0; color: #991b1b; font-size: 16px; font-weight: 600;">
                            <span style="color: #ef3d3d;">🎯</span> Next Steps
                          </h3>
                          <ul style="margin: 0; padding-left: 20px; color: #1f2937; font-size: 14px; line-height: 1.6;">
                            <li>Contact ${data.contactName} within ${data.urgencyLevel === 'immediate' ? '24 hours' : '24-48 hours'}</li>
                            <li>Review youth assessment and prepare treatment options</li>
                            <li>Verify insurance coverage if applicable</li>
                            ${data.formType === 'group-home' ? '<li>Coordinate with group home staff for care plan</li>' : '<li>Schedule family consultation if appropriate</li>'}
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
                      Youth Services Inquiry | ${data.formType === 'group-home' ? 'Group Home' : 'Parent/Guardian'} | Generated on ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST
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

    // Youth services team recipients
    const recipients = [
      'kane@empowertreatment.com',
      'taylor@empowertreatment.com',
      'carol@empowertreatment.com',
      'dottie@empowertreatment.com',
      'sara@empowertreatment.com'
    ];

    // Send email to internal team
    const subjectName = data.youthName || 
      (data.referralType === 'multiple' ? `${data.numberOfYouth} Youth` : 
       data.referralType === 'entire-house' ? `Entire Facility (${data.numberOfYouth} Residents)` : 
       'Youth Services Inquiry');
    
    const msg = {
      to: recipients,
      from: requiredEnvVars.SENDGRID_FROM_EMAIL as string,
      subject: `Youth Services Inquiry - ${subjectName} (${data.formType === 'group-home' ? 'Group Home' : 'Parent'})`,
      text: `New youth services inquiry received from ${data.contactName}`,
      html: htmlContent,
    };

    // Use sendMultiple when sending to multiple recipients
    if (recipients.length > 1) {
      await sgMail.sendMultiple(msg);
      console.log(`Youth services notification emails sent successfully to ${recipients.length} recipients`);
    } else {
      await sgMail.send(msg);
      console.log('Youth services notification email sent successfully');
    }

    // Send SMS notifications to clinicians
    const clinicianPhones = [
      process.env.KANE_PHONE,
      process.env.TAYLOR_PHONE,
      process.env.CAROL_PHONE,
      process.env.DOTTIE_PHONE,
      process.env.SARA_PHONE
    ].filter(phone => phone); // Filter out any undefined numbers

    // Send SMS to each clinician
    if (twilioClient) {
      for (const phone of clinicianPhones) {
        if (phone) {
          try {
            const youthInfo = data.youthName ? 
              `Youth: ${data.youthName}${data.youthAge ? `, Age ${data.youthAge}` : ''}` :
              data.referralType === 'multiple' ? `Multiple Youth (${data.numberOfYouth})` :
              data.referralType === 'entire-house' ? `Entire Facility (${data.numberOfYouth} Residents)` :
              'Youth Services Inquiry';
              
            await twilioClient.messages.create({
              body: `New Youth Services ${data.formType === 'group-home' ? 'Group Home' : 'Parent'} Inquiry\n\n${youthInfo}\nContact: ${data.contactName}\n${data.urgencyLevel === 'immediate' ? '🚨 URGENT - Crisis Situation' : 'Priority: ' + (data.urgencyLevel === 'soon' ? 'Soon' : 'Planning')}\n\nCheck email for full details.`,
              from: requiredEnvVars.TWILIO_PHONE_NUMBER!,
              to: phone
            });
          } catch (smsError) {
            console.error(`Failed to send SMS to ${phone}:`, smsError);
            // Don't fail the whole submission if SMS fails
          }
        }
      }
    } else {
      console.warn('Twilio client not initialized - skipping SMS notifications');
    }

    // Send SMS confirmation to submitter if they provided a phone number
    if (data.phone && twilioClient) {
      try {
        // Format the phone number (assuming US numbers)
        let formattedPhone = data.phone.replace(/\D/g, '');
        if (!formattedPhone.startsWith('+')) {
          if (formattedPhone.length === 10) {
            formattedPhone = '+1' + formattedPhone;
          } else if (formattedPhone.length === 11 && formattedPhone.startsWith('1')) {
            formattedPhone = '+' + formattedPhone;
          }
        }

        const youthReference = data.youthName || 
          (data.referralType === 'multiple' ? 'your youth referral' : 
           data.referralType === 'entire-house' ? 'your facility referral' : 
           'your inquiry');
           
        await twilioClient.messages.create({
          body: `Thank you for contacting Empower Treatment Youth Services.\n\nWe've received your inquiry for ${youthReference} and our team will contact you within ${data.urgencyLevel === 'immediate' ? '24 hours' : '24-48 hours'}.\n\nIf this is an emergency, please call us immediately at (740) 200-0277.`,
          from: requiredEnvVars.TWILIO_PHONE_NUMBER!,
          to: formattedPhone
        });
      } catch (smsError) {
        console.error('Failed to send confirmation SMS:', smsError);
        // Don't fail the whole submission if SMS fails
      }
    }

    // Send confirmation email to submitter
    if (data.email) {
      const confirmationMsg = {
        to: data.email,
        from: requiredEnvVars.SENDGRID_FROM_EMAIL as string,
        subject: 'Empower Treatment - Youth Services Inquiry Received',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #ef3d3d 0%, #dc2626 100%); padding: 30px; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Thank You for Your Inquiry</h1>
            </div>
            <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 12px 12px;">
              <p>Dear ${data.contactName},</p>
              <p>We've received your inquiry regarding youth services${data.youthName ? ` for <strong>${data.youthName}</strong>` : ''}. Our specialized team understands the unique challenges teens face, and we're here to help.</p>
              
              <div style="background: #fee2e2; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-weight: 600; color: #991b1b;">What happens next:</p>
                <ul style="margin: 10px 0 0 0; padding-left: 20px; color: #1f2937;">
                  <li>A member of our youth services team will contact you within ${data.urgencyLevel === 'immediate' ? '24 hours' : '24-48 hours'}</li>
                  <li>We'll discuss ${data.youthName ? `${data.youthName}'s` : 'the youth\'s'} specific needs and treatment options</li>
                  <li>We'll verify insurance coverage and explain our programs</li>
                  ${data.formType === 'parent' ? '<li>We can schedule a family consultation to address your concerns</li>' : '<li>We\'ll coordinate with your team to ensure continuity of care</li>'}
                </ul>
              </div>
              
              <p><strong>Our Youth Services Include:</strong></p>
              <ul>
                <li>Individual therapy tailored for teens</li>
                <li>Group therapy with peers facing similar challenges</li>
                <li>Family therapy sessions</li>
                <li>Crisis intervention support</li>
                <li>Flexible scheduling including evenings and weekends</li>
              </ul>
              
              ${data.urgencyLevel === 'immediate' ? 
                `<p style="color: #dc2626; font-weight: 600;">We understand this is an urgent situation. If you need immediate assistance, please call us at (740) 200-0277.</p>` : 
                ''}
              
              <p>If you have any immediate questions, please don't hesitate to reach out:</p>
              <ul>
                <li>Phone: (740) 200-0277</li>
                <li>Email: support@empowertreatment.com</li>
              </ul>
              
              <p>Thank you for trusting Empower Treatment with ${data.youthName ? `${data.youthName}'s` : 'your youth\'s'} care.</p>
              
              <p>Sincerely,<br>
              The Empower Treatment Youth Services Team</p>
            </div>
          </div>
        `,
      };

      await sgMail.send(confirmationMsg);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Youth services inquiry submitted successfully' 
    });

  } catch (error: any) {
    console.error('Error submitting youth form:', error);
    console.error('Error details:', {
      message: error?.message || 'Unknown error',
      code: error?.code || 'Unknown code',
      response: error?.response?.body || 'No response body'
    });
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to submit inquiry. Please try again or call us directly.' 
      },
      { status: 500 }
    );
  }
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';