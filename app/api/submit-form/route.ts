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
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Empower Treatment Application</h2>
        <p style="color: #666;">A new patient has completed the assessment form.</p>
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <pre style="white-space: pre-wrap; font-family: monospace; color: #333;">${emailContent}</pre>
        </div>
        <hr style="border: 1px solid #e5e7eb; margin: 30px 0;">
        <p style="color: #666; font-size: 14px;">
          <strong>Next Steps:</strong><br>
          ${data.appointmentDateTime 
            ? `• Patient has scheduled an appointment for ${data.appointmentDateTime}<br>• Prepare for welcome call`
            : '• Contact patient to schedule welcome call<br>• Review assessment details'
          }
        </p>
        ${submissionId ? `
        <p style="color: #666; font-size: 12px; margin-top: 10px;">
          <strong>Database ID:</strong> ${submissionId}
        </p>
        ` : ''}
      </div>
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