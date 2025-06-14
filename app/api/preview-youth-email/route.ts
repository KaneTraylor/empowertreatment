import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') || 'parent';
  const urgency = searchParams.get('urgency') || 'soon';

  // Sample data for preview
  const data = {
    formType: type as 'group-home' | 'parent',
    contactName: type === 'group-home' ? 'Jane Smith' : 'John Doe',
    organizationName: type === 'group-home' ? 'Sunshine Youth Home' : undefined,
    email: 'contact@example.com',
    phone: '(555) 123-4567',
    state: 'Ohio',
    youthName: 'Sarah',
    youthAge: '16',
    primaryConcerns: ['Anxiety', 'Depression', 'Family Conflicts'],
    currentMedications: 'Lexapro 10mg daily',
    insuranceProvider: 'Blue Cross Blue Shield',
    previousTreatment: 'Individual therapy for 6 months',
    urgencyLevel: urgency as 'immediate' | 'soon' | 'planning',
    additionalNotes: 'Sarah has been struggling with school attendance and has expressed feelings of hopelessness. She is open to treatment but nervous about group settings.',
    consent: true
  };

  // Generate the HTML content
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
                              <p style="margin: 0; color: #991b1b; font-size: 14px; font-weight: 600;">YOUTH NAME</p>
                              <p style="margin: 4px 0 0 0; color: #1f2937; font-size: 18px; font-weight: 500;">${data.youthName}</p>
                              <p style="margin: 2px 0 0 0; color: #6b7280; font-size: 14px;">Age: ${data.youthAge}</p>
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

  return new NextResponse(htmlContent, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}