import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { FormData } from '@/types/form';
import { supabaseAdmin, FormSubmission } from '@/lib/supabase';
import { saveSubmission } from '@/lib/fileStorage';

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

// Helper function to format form data into readable email content
function formatFormData(data: FormData): string {
  const sections = [
    '=== CONTACT INFORMATION ===',
    `Name: ${data.fname || 'Not provided'} ${data.lname || 'Not provided'}`,
    `Email: ${data.email || 'Not provided'}`,
    `Phone: ${data.mobileNumber || 'Not provided'}`,
    `State: ${data.stateselect || 'Not provided'}`,
    '',
    '=== REFERRAL INFORMATION ===',
    `Healthcare provider referral: ${data.offer === 'yes' ? 'Yes' : data.offer === 'no' ? 'No' : 'Not answered'}`,
    data.offer === 'yes' ? `Provider name: ${data.providerName || 'Not provided'}` : '',
    '',
    '=== OPIOID USE ASSESSMENT ===',
    `Opioid use status: ${formatOpioidUse(data.opioiduse)}`,
  ];

  // Add Suboxone details if applicable
  if (data.opioiduse !== 'never-used' && data.opioiduse !== '') {
    sections.push(
      `Suboxone history: ${formatSuboxoneHistory(data.relationshipwithSuboxone)}`,
    );

    if (data.relationshipwithSuboxone === 'currently-taking' || data.relationshipwithSuboxone === 'taken-past') {
      sections.push(
        `Taken in last week: ${data.Suboxonelastweek === 'yes' ? 'Yes' : data.Suboxonelastweek === 'no' ? 'No' : 'Not answered'}`,
        `Prescribed by medical professional: ${data.prescribedbymedical === 'yes' ? 'Yes' : data.prescribedbymedical === 'no' ? 'No' : 'Not answered'}`,
        `Days of medication remaining: ${data.days || 'Not provided'}`,
        `Taking daily dose for 30+ days: ${formatDailyDose(data.takingdailySuboxone)}`,
        `Feels stable on dose: ${data.feelstable === 'yes' ? 'Yes' : data.feelstable === 'no' ? 'No' : 'Not answered'}`,
      );
    }

    sections.push(
      '',
      '=== OPIOID USE DETAILS ===',
      `Duration of opioid use: ${formatDuration(data.notincludingSuboxone)}`,
      `Frequency of opioid use: ${formatFrequency(data.frequentlyusingopioids)}`,
      `Regular heroin/fentanyl use: ${data.usingheroin === 'yes' ? 'Yes' : data.usingheroin === 'no' ? 'No' : 'Not answered'}`,
    );
  }

  sections.push(
    '',
    '=== LIFE DIFFICULTIES ===',
    `Difficulties experienced: ${data.difficultyfollowing?.length ? data.difficultyfollowing.join(', ') : 'None selected'}`,
    '',
    '=== INSURANCE ===',
    `Has insurance: ${data.youinsured === 'yes' ? 'Yes' : data.youinsured === 'no' ? 'No' : 'Not answered'}`,
    data.youinsured === 'yes' ? `Insurance provider: ${data.insuranceselect || 'Not provided'}` : '',
    '',
    '=== TREATMENT READINESS ===',
    `Reason for joining Empower: ${data.reasonJoiningEmpower || 'Not provided'}`,
    `Timeline to start treatment: ${data.interestedintreatment === 'asap' ? 'As soon as possible' : data.interestedintreatment === 'few-weeks' ? 'In the next few weeks' : 'Not specified'}`,
  );

  // Add appointment details if available
  if (data.appointmentDateTime) {
    sections.push(
      '',
      '=== APPOINTMENT SCHEDULED ===',
      `Appointment: ${data.appointmentDateTime}`,
    );
  }

  return sections.filter(line => line !== '').join('\n');
}

// Helper functions for formatting
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

function formatDailyDose(value: string | undefined): string {
  switch (value) {
    case 'yes': return 'Yes';
    case 'no': return 'No';
    case 'not-sure': return 'Not sure';
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

export async function POST(request: NextRequest) {
  try {
    const data: FormData = await request.json();

    // First, save to Supabase
    let submissionId: string | undefined;
    
    if (supabaseAdmin) {
      // Transform FormData to match database schema
      const dbData: Omit<FormSubmission, 'id' | 'created_at'> = {
        // Contact Information
        fname: data.fname || '',
        lname: data.lname || '',
        email: data.email || '',
        mobile_number: data.mobileNumber || '',
        state: data.stateselect || '',
        
        // Referral Information
        healthcare_referral: data.offer || '',
        provider_name: data.providerName,
        
        // Opioid Use Assessment
        opioid_use: data.opioiduse || '',
        suboxone_history: data.relationshipwithSuboxone || '',
        suboxone_last_week: data.Suboxonelastweek || '',
        prescribed_by_medical: data.prescribedbymedical || '',
        days_remaining: data.days,
        taking_daily_dose: data.takingdailySuboxone || '',
        feels_stable: data.feelstable || '',
        opioid_duration: data.notincludingSuboxone || '',
        opioid_frequency: data.frequentlyusingopioids || '',
        heroin_use: data.usingheroin || '',
        
        // Life Difficulties
        difficulties: data.difficultyfollowing || [],
        
        // Insurance
        has_insurance: data.youinsured || '',
        insurance_provider: data.insuranceselect,
        
        // Treatment Readiness
        reason_joining: data.reasonJoiningEmpower || '',
        treatment_timeline: data.interestedintreatment || '',
        
        // Appointment
        appointment_scheduled: !!data.appointmentDateTime,
        appointment_date_time: data.appointmentDateTime,
        
        // Status
        status: 'pending'
      };

      const { data: submission, error } = await supabaseAdmin
        .from('form_submissions')
        .insert(dbData)
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        // Try file storage as fallback
        try {
          const fileSubmission = await saveSubmission(data);
          submissionId = fileSubmission.id;
          console.log('Form saved to file storage with ID:', submissionId);
        } catch (fileError) {
          console.error('File storage error:', fileError);
        }
      } else {
        submissionId = submission?.id;
        console.log('Form saved to database with ID:', submissionId);
      }
    } else {
      // No Supabase configured, use file storage
      try {
        const fileSubmission = await saveSubmission(data);
        submissionId = fileSubmission.id;
        console.log('Form saved to file storage with ID:', submissionId);
      } catch (fileError) {
        console.error('File storage error:', fileError);
      }
    }

    // Format the email content
    const emailContent = formatFormData(data);
    
    // Create a modern, professional HTML email template
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
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">New Patient Application</h1>
                    <p style="margin: 8px 0 0 0; color: #fee2e2; font-size: 16px;">Pre-Assessment Information Review</p>
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
                                <p style="margin: 0; color: #991b1b; font-size: 14px; font-weight: 600;">PATIENT NAME</p>
                                <p style="margin: 4px 0 0 0; color: #1f2937; font-size: 18px; font-weight: 500;">${data.fname || 'Not provided'} ${data.lname || 'Not provided'}</p>
                              </td>
                              <td width="50%" align="right">
                                <p style="margin: 0; color: #991b1b; font-size: 14px; font-weight: 600;">SUBMISSION ID</p>
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
                ${data.appointmentDateTime ? `
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
                                <p style="margin: 4px 0 0 0; color: #15803d; font-size: 14px;">${data.appointmentDateTime}</p>
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
                              <td style="color: #1f2937; font-size: 14px; font-weight: 500;">${data.email || 'Not provided'}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <table cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td width="30%" style="color: #6b7280; font-size: 14px;">Phone:</td>
                              <td style="color: #1f2937; font-size: 14px; font-weight: 500;">${data.mobileNumber || 'Not provided'}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <table cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td width="30%" style="color: #6b7280; font-size: 14px;">State:</td>
                              <td style="color: #1f2937; font-size: 14px; font-weight: 500;">${data.stateselect || 'Not provided'}</td>
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
                      <span style="color: #ef3d3d;">🏥</span> Clinical Assessment
                    </h2>
                    
                    <!-- Opioid Use Status -->
                    <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
                      <p style="margin: 0 0 8px 0; color: #4b5563; font-size: 13px; font-weight: 600; text-transform: uppercase;">Opioid Use Status</p>
                      <p style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 500;">${formatOpioidUse(data.opioiduse)}</p>
                    </div>
                    
                    ${data.opioiduse !== 'never-used' && data.opioiduse !== '' ? `
                    <!-- Suboxone Details -->
                    <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
                      <p style="margin: 0 0 8px 0; color: #4b5563; font-size: 13px; font-weight: 600; text-transform: uppercase;">Suboxone Information</p>
                      <table cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td style="padding: 4px 0;">
                            <span style="color: #6b7280; font-size: 14px;">History:</span>
                            <span style="color: #1f2937; font-size: 14px; font-weight: 500; margin-left: 8px;">${formatSuboxoneHistory(data.relationshipwithSuboxone)}</span>
                          </td>
                        </tr>
                        ${(data.relationshipwithSuboxone === 'currently-taking' || data.relationshipwithSuboxone === 'taken-past') ? `
                        <tr>
                          <td style="padding: 4px 0;">
                            <span style="color: #6b7280; font-size: 14px;">Prescribed:</span>
                            <span style="color: #1f2937; font-size: 14px; font-weight: 500; margin-left: 8px;">${data.prescribedbymedical === 'yes' ? 'Yes' : data.prescribedbymedical === 'no' ? 'No' : 'Not answered'}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 4px 0;">
                            <span style="color: #6b7280; font-size: 14px;">Stable on dose:</span>
                            <span style="color: #1f2937; font-size: 14px; font-weight: 500; margin-left: 8px;">${data.feelstable === 'yes' ? 'Yes' : data.feelstable === 'no' ? 'No' : 'Not answered'}</span>
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
                            <span style="color: #1f2937; font-size: 14px; font-weight: 500; margin-left: 8px;">${formatDuration(data.notincludingSuboxone)}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 4px 0;">
                            <span style="color: #6b7280; font-size: 14px;">Frequency:</span>
                            <span style="color: #1f2937; font-size: 14px; font-weight: 500; margin-left: 8px;">${formatFrequency(data.frequentlyusingopioids)}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 4px 0;">
                            <span style="color: #6b7280; font-size: 14px;">Heroin/Fentanyl use:</span>
                            <span style="color: #1f2937; font-size: 14px; font-weight: 500; margin-left: 8px;">${data.usingheroin === 'yes' ? 'Yes' : data.usingheroin === 'no' ? 'No' : 'Not answered'}</span>
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
                      <span style="color: #ef3d3d;">📝</span> Additional Information
                    </h2>
                    
                    <!-- Life Difficulties -->
                    ${data.difficultyfollowing?.length ? `
                    <div style="background-color: #fef3c7; border: 1px solid #fde68a; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
                      <p style="margin: 0 0 8px 0; color: #92400e; font-size: 13px; font-weight: 600; text-transform: uppercase;">Life Difficulties Reported</p>
                      <p style="margin: 0; color: #78350f; font-size: 14px;">${data.difficultyfollowing.join(', ')}</p>
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
                                ${data.youinsured === 'yes' ? `Yes - ${data.insuranceselect || 'Provider not specified'}` : data.youinsured === 'no' ? 'No insurance' : 'Not answered'}
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
                                ${data.offer === 'yes' ? `Yes - ${data.providerName || 'Provider not specified'}` : data.offer === 'no' ? 'No referral' : 'Not answered'}
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
                                ${data.interestedintreatment === 'asap' ? 'As soon as possible' : data.interestedintreatment === 'few-weeks' ? 'In the next few weeks' : 'Not specified'}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Reason for Joining -->
                    ${data.reasonJoiningEmpower ? `
                    <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px; margin-top: 16px;">
                      <p style="margin: 0 0 8px 0; color: #4b5563; font-size: 13px; font-weight: 600; text-transform: uppercase;">Reason for Joining Empower</p>
                      <p style="margin: 0; color: #1f2937; font-size: 14px; line-height: 1.5;">${data.reasonJoiningEmpower}</p>
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
                          ${data.appointmentDateTime ? `
                          <ul style="margin: 0; padding-left: 20px; color: #1f2937; font-size: 14px; line-height: 1.6;">
                            <li>Patient has scheduled appointment for <strong>${data.appointmentDateTime}</strong></li>
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

    // Determine recipients
    const notificationEmails = process.env.NOTIFICATION_EMAILS || '';
    const recipients = notificationEmails.split(',').map(email => email.trim()).filter(Boolean);
    
    // Fallback to from email if no recipients configured
    if (recipients.length === 0) {
      recipients.push(process.env.SENDGRID_FROM_EMAIL || 'noreply@empowertreatment.com');
    }

    // Send email to internal team
    const msg = {
      to: recipients,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@empowertreatment.com',
      subject: `New Patient Application - ${data.fname} ${data.lname}`,
      text: emailContent,
      html: htmlContent,
    };

    // Log HTML for testing (remove this in production)
    if (process.env.NODE_ENV === 'development') {
      console.log('Email HTML Preview:', htmlContent);
    }
    
    await sgMail.send(msg);

    // Send confirmation email to patient if they provided an email
    if (data.email) {
      const patientMsg = {
        to: data.email,
        from: process.env.SENDGRID_FROM_EMAIL || 'noreply@empowertreatment.com',
        subject: 'Empower Treatment - Application Received',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Thank You for Your Application</h2>
            <p>Dear ${data.fname},</p>
            <p>We've received your application for Empower Treatment. Thank you for taking this important step in your recovery journey.</p>
            ${data.appointmentDateTime 
              ? `<div style="background: #10b981; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <strong>Your appointment is confirmed for:</strong><br>
                  ${data.appointmentDateTime}
                </div>`
              : `<p>Our team will contact you within the next 24-48 hours to schedule your welcome call.</p>`
            }
            <p><strong>What to expect during your welcome call:</strong></p>
            <ul>
              <li>A brief 15-minute conversation with our care team</li>
              <li>Discussion of your treatment goals</li>
              <li>Overview of our program and next steps</li>
              <li>Answers to any questions you may have</li>
            </ul>
            <p>If you need to reach us before your scheduled call, please email support@empowertreatment.com</p>
            <p>Best regards,<br>The Empower Treatment Team</p>
          </div>
        `,
      };

      await sgMail.send(patientMsg);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Application submitted successfully' 
    });

  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to submit application. Please try again.' 
      },
      { status: 500 }
    );
  }
}