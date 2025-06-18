import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { generateProgressReportPDF } from '@/lib/generatePDF';

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.error('WARNING: SendGrid API key not found');
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      recipientEmail,
      providerName,
      providerCredentials,
      patientName,
      patientGoals,
      workingOn,
      numberOfServices,
      contactEmail,
      contactPhone,
      reportDate,
      reportContent
    } = data;

    // Validate required fields
    if (!recipientEmail || !reportContent || !patientName) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate PDF
    const pdf = generateProgressReportPDF({
      providerName,
      providerCredentials,
      patientName,
      patientGoals,
      workingOn,
      numberOfServices,
      contactEmail,
      contactPhone,
      reportContent,
      reportDate
    });

    // Convert PDF to base64
    const pdfBase64 = pdf.output('datauristring').split(',')[1];

    // Format date for filename and email
    const date = reportDate || new Date().toISOString().split('T')[0];
    const filename = `progress-report-${patientName.replace(/\s+/g, '-').toLowerCase()}-${date}.pdf`;

    // Create email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #ef3d3d; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">EMPOWER TREATMENT</h1>
          <p style="color: white; margin: 10px 0 0 0;">Clinical Progress Report</p>
        </div>
        
        <div style="padding: 30px; background-color: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Progress Report for ${patientName}</h2>
          
          <p style="color: #666; line-height: 1.6;">
            Please find attached the clinical progress report for <strong>${patientName}</strong>, 
            dated <strong>${new Date(reportDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</strong>.
          </p>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #ef3d3d; margin-top: 0;">Report Details:</h3>
            <p style="margin: 10px 0;"><strong>Provider:</strong> ${providerName}${providerCredentials ? `, ${providerCredentials}` : ''}</p>
            <p style="margin: 10px 0;"><strong>Report Date:</strong> ${new Date(reportDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
            <p style="margin: 10px 0;"><strong>Services Provided:</strong> ${numberOfServices}</p>
          </div>
          
          <p style="color: #666; line-height: 1.6;">
            This report contains confidential patient information and should be handled in accordance 
            with HIPAA regulations and your organization's privacy policies.
          </p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          
          <p style="color: #999; font-size: 14px; text-align: center;">
            This email was sent from Empower Treatment's Progress Report System.<br>
            For questions, please contact: ${contactEmail} | ${contactPhone}
          </p>
        </div>
      </div>
    `;

    // Prepare email
    const msg = {
      to: recipientEmail,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@empowertreatment.com',
      subject: `Progress Report - ${patientName} - ${new Date(reportDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}`,
      html: emailHtml,
      attachments: [
        {
          content: pdfBase64,
          filename: filename,
          type: 'application/pdf',
          disposition: 'attachment'
        }
      ]
    };
    
    // Add logging before sending
    console.log('Attempting to send email:', {
      to: msg.to,
      from: msg.from,
      subject: msg.subject,
      attachmentSize: pdfBase64.length,
      hasSendGridKey: !!process.env.SENDGRID_API_KEY
    });

    // Check if SendGrid is configured
    if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_FROM_EMAIL) {
      console.log('Email configuration missing:', {
        hasSendGridKey: !!process.env.SENDGRID_API_KEY,
        hasSendGridFromEmail: !!process.env.SENDGRID_FROM_EMAIL,
        wouldSendTo: msg.to,
        subject: msg.subject,
        attachmentSize: pdfBase64.length
      });
      return NextResponse.json({
        success: false,
        message: 'Email service not configured. Please add SENDGRID_API_KEY and SENDGRID_FROM_EMAIL to environment variables.'
      }, { status: 503 });
    }

    // Send email
    await sgMail.send(msg);

    return NextResponse.json({
      success: true,
      message: `Progress report sent successfully to ${recipientEmail}`
    });

  } catch (error) {
    console.error('Error sending progress report email:', error);
    
    // More detailed error logging for SendGrid errors
    if (error && typeof error === 'object' && 'response' in error) {
      const sgError = error as any;
      console.error('SendGrid Error Response:', {
        statusCode: sgError.code,
        message: sgError.message,
        response: sgError.response?.body,
        headers: sgError.response?.headers
      });
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send progress report email',
        error: error instanceof Error ? error.message : 'Unknown error',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}