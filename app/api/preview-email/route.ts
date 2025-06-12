import { NextRequest, NextResponse } from 'next/server';
import { FormData } from '@/types/form';

// Helper functions (copied from submit-form route for preview)
function formatOpioidUse(value: string): string {
  switch (value) {
    case 'no-control': return "Don't have opioid use under control";
    case 'under-control': return 'Have opioid use under control';
    case 'never-used': return 'Never used opioids';
    default: return 'Not answered';
  }
}

function formatSuboxoneHistory(value: string | undefined): string {
  switch (value) {
    case 'currently-taking': return 'Currently taking Suboxone';
    case 'taken-past': return 'Taken in the past, not currently';
    case 'never-taken': return 'Never taken Suboxone';
    default: return 'Not answered';
  }
}

function formatDuration(value: string | undefined): string {
  switch (value) {
    case 'none': return 'None';
    case 'less-week': return 'Less than a week';
    case 'week-month': return '1 week to 1 month';
    case 'month-more': return 'More than 1 month';
    default: return 'Not answered';
  }
}

function formatFrequency(value: string | undefined): string {
  switch (value) {
    case 'none': return 'Not at all';
    case 'less-week': return 'Less than once a week';
    case 'week-month': return '1-3 times per week';
    case 'month-more': return '4 or more times per week';
    default: return 'Not answered';
  }
}

export async function GET(request: NextRequest) {
  // Sample data for preview
  const sampleData: FormData = {
    fname: 'John',
    lname: 'Doe',
    email: 'john.doe@example.com',
    mobileNumber: '+1 (555) 123-4567',
    stateselect: 'California',
    offer: 'yes',
    providerName: 'Dr. Smith',
    opioiduse: 'no-control',
    relationshipwithSuboxone: 'currently-taking',
    Suboxonelastweek: 'yes',
    prescribedbymedical: 'yes',
    days: '15',
    takingdailySuboxone: 'yes',
    feelstable: 'no',
    notincludingSuboxone: 'month-more',
    frequentlyusingopioids: 'week-month',
    usingheroin: 'no',
    difficultyfollowing: ['Family relationships', 'Employment', 'Housing'],
    youinsured: 'yes',
    insuranceselect: 'Blue Cross Blue Shield',
    reasonJoiningEmpower: 'I want to get my life back on track and provide a better future for my family.',
    interestedintreatment: 'asap',
    appointmentDateTime: 'Monday, January 15, 2025 at 2:00 PM EST',
    currentStep: 0,
    steps: []
  };

  const submissionId = '12345678-90ab-cdef-1234-567890abcdef';

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
                <td style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 30px 40px; border-radius: 12px 12px 0 0;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">New Patient Application</h1>
                  <p style="margin: 8px 0 0 0; color: #e0e7ff; font-size: 16px;">Empower Treatment Assessment Form</p>
                </td>
              </tr>
              
              <!-- Quick Info Banner -->
              <tr>
                <td style="padding: 0;">
                  <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #eff6ff; border-bottom: 1px solid #dbeafe;">
                    <tr>
                      <td style="padding: 20px 40px;">
                        <table cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td width="50%">
                              <p style="margin: 0; color: #1e40af; font-size: 14px; font-weight: 600;">PATIENT NAME</p>
                              <p style="margin: 4px 0 0 0; color: #1f2937; font-size: 18px; font-weight: 500;">${sampleData.fname || 'Not provided'} ${sampleData.lname || 'Not provided'}</p>
                            </td>
                            <td width="50%" align="right">
                              <p style="margin: 0; color: #1e40af; font-size: 14px; font-weight: 600;">SUBMISSION ID</p>
                              <p style="margin: 4px 0 0 0; color: #1f2937; font-size: 18px; font-weight: 500;">#${submissionId ? submissionId.slice(-8) : 'PENDING'}</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Priority Alert (if appointment scheduled) -->
              ${sampleData.appointmentDateTime ? `
              <tr>
                <td style="padding: 20px 40px 0 40px;">
                  <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #dcfce7; border: 1px solid #bbf7d0; border-radius: 8px;">
                    <tr>
                      <td style="padding: 16px 20px;">
                        <table cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="vertical-align: middle; padding-right: 12px;">
                              <div style="width: 40px; height: 40px; background-color: #22c55e; border-radius: 50%; text-align: center; line-height: 40px;">
                                <span style="color: white; font-size: 20px;">✓</span>
                              </div>
                            </td>
                            <td>
                              <p style="margin: 0; color: #166534; font-size: 16px; font-weight: 600;">Appointment Scheduled</p>
                              <p style="margin: 4px 0 0 0; color: #15803d; font-size: 14px;">${sampleData.appointmentDateTime}</p>
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
                    <span style="color: #2563eb;">📋</span> Contact Information
                  </h2>
                  <table cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td style="padding: 8px 0;">
                        <table cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td width="30%" style="color: #6b7280; font-size: 14px;">Email:</td>
                            <td style="color: #1f2937; font-size: 14px; font-weight: 500;">${sampleData.email || 'Not provided'}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0;">
                        <table cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td width="30%" style="color: #6b7280; font-size: 14px;">Phone:</td>
                            <td style="color: #1f2937; font-size: 14px; font-weight: 500;">${sampleData.mobileNumber || 'Not provided'}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0;">
                        <table cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td width="30%" style="color: #6b7280; font-size: 14px;">State:</td>
                            <td style="color: #1f2937; font-size: 14px; font-weight: 500;">${sampleData.stateselect || 'Not provided'}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Clinical Assessment Section -->
              <tr>
                <td style="padding: 30px 40px 0 40px;">
                  <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 20px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                    <span style="color: #2563eb;">🏥</span> Clinical Assessment
                  </h2>
                  
                  <!-- Opioid Use Status -->
                  <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
                    <p style="margin: 0 0 8px 0; color: #4b5563; font-size: 13px; font-weight: 600; text-transform: uppercase;">Opioid Use Status</p>
                    <p style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 500;">${formatOpioidUse(sampleData.opioiduse)}</p>
                  </div>
                  
                  ${sampleData.opioiduse !== 'never-used' && sampleData.opioiduse !== '' ? `
                  <!-- Suboxone Details -->
                  <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
                    <p style="margin: 0 0 8px 0; color: #4b5563; font-size: 13px; font-weight: 600; text-transform: uppercase;">Suboxone Information</p>
                    <table cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding: 4px 0;">
                          <span style="color: #6b7280; font-size: 14px;">History:</span>
                          <span style="color: #1f2937; font-size: 14px; font-weight: 500; margin-left: 8px;">${formatSuboxoneHistory(sampleData.relationshipwithSuboxone)}</span>
                        </td>
                      </tr>
                      ${(sampleData.relationshipwithSuboxone === 'currently-taking' || sampleData.relationshipwithSuboxone === 'taken-past') ? `
                      <tr>
                        <td style="padding: 4px 0;">
                          <span style="color: #6b7280; font-size: 14px;">Prescribed:</span>
                          <span style="color: #1f2937; font-size: 14px; font-weight: 500; margin-left: 8px;">${sampleData.prescribedbymedical === 'yes' ? 'Yes' : sampleData.prescribedbymedical === 'no' ? 'No' : 'Not answered'}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0;">
                          <span style="color: #6b7280; font-size: 14px;">Stable on dose:</span>
                          <span style="color: #1f2937; font-size: 14px; font-weight: 500; margin-left: 8px;">${sampleData.feelstable === 'yes' ? 'Yes' : sampleData.feelstable === 'no' ? 'No' : 'Not answered'}</span>
                        </td>
                      </tr>
                      ` : ''}
                    </table>
                  </div>
                  
                  <!-- Usage Patterns -->
                  <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
                    <p style="margin: 0 0 8px 0; color: #4b5563; font-size: 13px; font-weight: 600; text-transform: uppercase;">Usage Patterns</p>
                    <table cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding: 4px 0;">
                          <span style="color: #6b7280; font-size: 14px;">Duration:</span>
                          <span style="color: #1f2937; font-size: 14px; font-weight: 500; margin-left: 8px;">${formatDuration(sampleData.notincludingSuboxone)}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0;">
                          <span style="color: #6b7280; font-size: 14px;">Frequency:</span>
                          <span style="color: #1f2937; font-size: 14px; font-weight: 500; margin-left: 8px;">${formatFrequency(sampleData.frequentlyusingopioids)}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0;">
                          <span style="color: #6b7280; font-size: 14px;">Heroin/Fentanyl use:</span>
                          <span style="color: #1f2937; font-size: 14px; font-weight: 500; margin-left: 8px;">${sampleData.usingheroin === 'yes' ? 'Yes' : sampleData.usingheroin === 'no' ? 'No' : 'Not answered'}</span>
                        </td>
                      </tr>
                    </table>
                  </div>
                  ` : ''}
                </td>
              </tr>
              
              <!-- Additional Information Section -->
              <tr>
                <td style="padding: 30px 40px 0 40px;">
                  <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 20px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                    <span style="color: #2563eb;">📝</span> Additional Information
                  </h2>
                  
                  <!-- Life Difficulties -->
                  ${sampleData.difficultyfollowing?.length ? `
                  <div style="background-color: #fef3c7; border: 1px solid #fde68a; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
                    <p style="margin: 0 0 8px 0; color: #92400e; font-size: 13px; font-weight: 600; text-transform: uppercase;">Life Difficulties Reported</p>
                    <p style="margin: 0; color: #78350f; font-size: 14px;">${sampleData.difficultyfollowing.join(', ')}</p>
                  </div>
                  ` : ''}
                  
                  <!-- Insurance -->
                  <table cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td style="padding: 8px 0;">
                        <table cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td width="30%" style="color: #6b7280; font-size: 14px;">Insurance:</td>
                            <td style="color: #1f2937; font-size: 14px; font-weight: 500;">
                              ${sampleData.youinsured === 'yes' ? `Yes - ${sampleData.insuranceselect || 'Provider not specified'}` : sampleData.youinsured === 'no' ? 'No insurance' : 'Not answered'}
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0;">
                        <table cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td width="30%" style="color: #6b7280; font-size: 14px;">Referral:</td>
                            <td style="color: #1f2937; font-size: 14px; font-weight: 500;">
                              ${sampleData.offer === 'yes' ? `Yes - ${sampleData.providerName || 'Provider not specified'}` : sampleData.offer === 'no' ? 'No referral' : 'Not answered'}
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0;">
                        <table cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td width="30%" style="color: #6b7280; font-size: 14px;">Timeline:</td>
                            <td style="color: #1f2937; font-size: 14px; font-weight: 500;">
                              ${sampleData.interestedintreatment === 'asap' ? 'As soon as possible' : sampleData.interestedintreatment === 'few-weeks' ? 'In the next few weeks' : 'Not specified'}
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Reason for Joining -->
                  ${sampleData.reasonJoiningEmpower ? `
                  <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px; margin-top: 16px;">
                    <p style="margin: 0 0 8px 0; color: #4b5563; font-size: 13px; font-weight: 600; text-transform: uppercase;">Reason for Joining Empower</p>
                    <p style="margin: 0; color: #1f2937; font-size: 14px; line-height: 1.5;">${sampleData.reasonJoiningEmpower}</p>
                  </div>
                  ` : ''}
                </td>
              </tr>
              
              <!-- Action Items -->
              <tr>
                <td style="padding: 30px 40px;">
                  <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #eff6ff; border-radius: 8px; padding: 20px;">
                    <tr>
                      <td>
                        <h3 style="margin: 0 0 12px 0; color: #1e40af; font-size: 16px; font-weight: 600;">
                          <span style="color: #2563eb;">🎯</span> Next Steps
                        </h3>
                        ${sampleData.appointmentDateTime ? `
                        <ul style="margin: 0; padding-left: 20px; color: #1f2937; font-size: 14px; line-height: 1.6;">
                          <li>Patient has scheduled appointment for <strong>${sampleData.appointmentDateTime}</strong></li>
                          <li>Prepare welcome call materials and patient file</li>
                          <li>Review assessment details before appointment</li>
                        </ul>
                        ` : `
                        <ul style="margin: 0; padding-left: 20px; color: #1f2937; font-size: 14px; line-height: 1.6;">
                          <li>Contact patient within 24-48 hours</li>
                          <li>Schedule welcome call appointment</li>
                          <li>Review assessment details and prepare treatment plan</li>
                        </ul>
                        `}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f9fafb; padding: 20px 40px; border-radius: 0 0 12px 12px; border-top: 1px solid #e5e7eb;">
                  <p style="margin: 0; color: #6b7280; font-size: 12px; text-align: center;">
                    Submission ID: ${submissionId || 'PENDING'} | Generated on ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST
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