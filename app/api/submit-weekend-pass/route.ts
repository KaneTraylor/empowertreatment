import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';
import sgMail from '@sendgrid/mail';
import { createClient } from '@supabase/supabase-js';
import { saveWeekendPass } from '@/lib/weekendPassStorage';

// Validate environment variables
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Initialize services only if credentials exist
const twilioClient = TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN ? twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN) : null;
const supabase = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY) : null;

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export async function POST(request: NextRequest) {
  try {
    // Log warning if some services are not configured
    if (!twilioClient || !supabase || !SENDGRID_API_KEY) {
      console.warn('Some services not configured:', {
        twilio: !!twilioClient,
        supabase: !!supabase,
        sendgrid: !!SENDGRID_API_KEY
      });
    }

    const data = await request.json();

    // Generate unique pass ID
    const passId = `WP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Format dates for display
    const departureDateTime = new Date(`${data.departureDate} ${data.departureTime}`);
    const returnDateTime = new Date(`${data.returnDate} ${data.returnTime}`);
    
    // Prepare pass data
    const passData = {
      pass_id: passId,
      resident_name: data.residentName,
      room_number: data.roomNumber,
      phone: data.phone,
      departure_date: data.departureDate,
      departure_time: data.departureTime,
      return_date: data.returnDate,
      return_time: data.returnTime,
      destination: data.destination,
      destination_address: data.destinationAddress,
      purpose: data.purposeOfVisit,
      emergency_contact_name: data.emergencyContactName,
      emergency_contact_phone: data.emergencyContactPhone,
      emergency_contact_relationship: data.emergencyContactRelationship,
      transportation_method: data.transportationMethod,
      driver_name: data.driverName || null,
      vehicle_info: data.vehicleInfo || null,
      agreements: data.agreements,
      signature: data.signature,
      signature_date: data.signatureDate,
      status: 'pending' as const
      // Don't include created_at - let the database handle it with its default
    };

    // Store in Supabase if available
    let saved = false;
    if (supabase) {
      console.log('Attempting to save weekend pass to Supabase...');
      console.log('Pass data:', JSON.stringify(passData, null, 2));
      const { error: dbError } = await supabase
        .from('weekend_passes')
        .insert(passData);

      if (dbError) {
        console.error('Database error:', dbError);
        console.error('Database error details:', {
          code: dbError.code,
          message: dbError.message,
          details: dbError.details,
          hint: dbError.hint
        });
        // If table doesn't exist, we'll use local storage
        if (dbError.code === '42P01') { // 42P01 is "undefined table" error
          console.warn('Weekend passes table does not exist. Using local storage.');
        }
      } else {
        saved = true;
        console.log('Weekend pass saved to Supabase successfully');
      }
    }
    
    // If not saved to Supabase, save locally
    if (!saved) {
      try {
        // Add created_at for local storage
        const passDataWithTimestamp = {
          ...passData,
          created_at: new Date().toISOString()
        };
        await saveWeekendPass(passDataWithTimestamp);
        console.log('Weekend pass saved to local storage');
      } catch (localError) {
        console.error('Failed to save to local storage:', localError);
      }
    }

    // Create approval link
    const approvalLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://empowertreatment.com'}/api/approve-pass?id=${passId}`;

    // Send SMS to Kelsey, Kalee, and Kane
    const kelseyPhone = process.env.KELSEY_PHONE || '513-400-3475';
    const kaleePhone = process.env.KALEE_PHONE || '740-200-0076';
    const kanePhone = process.env.KANE_PHONE || '740-200-0277';
    
    const smsMessage = `Weekend Pass Request from ${data.residentName} (Room ${data.roomNumber})

Departure: ${departureDateTime.toLocaleDateString()} at ${departureDateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
Return: ${returnDateTime.toLocaleDateString()} at ${returnDateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
Destination: ${data.destination}

Review and approve: ${approvalLink}`;

    // Send to both staff members if Twilio is configured
    if (twilioClient && process.env.TWILIO_PHONE_NUMBER) {
      const smsPromises = [kelseyPhone, kaleePhone, kanePhone].map(phone => 
        twilioClient.messages.create({
          body: smsMessage,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: `+1${phone.replace(/\D/g, '')}`
        }).catch(err => {
          console.error(`Failed to send SMS to ${phone}:`, err);
          return null;
        })
      );

      const smsResults = await Promise.all(smsPromises);
      console.log('SMS send results:', smsResults.map((r, i) => ({
        phone: [kelseyPhone, kaleePhone, kanePhone][i],
        success: r !== null
      })));
    } else {
      console.warn('Twilio not configured - SMS notifications will not be sent');
    }

    // Send detailed email if SendGrid is configured
    if (SENDGRID_API_KEY && process.env.SENDGRID_FROM_EMAIL) {
      const emailContent = {
      to: ['kelsey@empowertreatment.com', 'kalee@empowertreatment.com', 'kane@empowertreatment.com'],
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: `Weekend Pass Request - ${data.residentName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #005c65; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; margin-top: 20px; }
            .section { margin-bottom: 20px; }
            .label { font-weight: bold; color: #005c65; }
            .approval-btn { 
              display: inline-block; 
              padding: 12px 30px; 
              background-color: #28a745; 
              color: white; 
              text-decoration: none; 
              border-radius: 5px; 
              margin: 10px 5px;
            }
            .deny-btn { 
              display: inline-block; 
              padding: 12px 30px; 
              background-color: #dc3545; 
              color: white; 
              text-decoration: none; 
              border-radius: 5px; 
              margin: 10px 5px;
            }
            .details-grid { 
              display: grid; 
              grid-template-columns: 1fr 1fr; 
              gap: 10px; 
              margin-top: 10px; 
            }
            .detail-item { 
              background: white; 
              padding: 10px; 
              border-radius: 5px; 
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Weekend Pass Request</h1>
              <p>Pass ID: ${passId}</p>
            </div>
            
            <div class="content">
              <div class="section">
                <h2>Resident Information</h2>
                <p><span class="label">Name:</span> ${data.residentName}</p>
                <p><span class="label">Room:</span> ${data.roomNumber}</p>
                <p><span class="label">Phone:</span> ${data.phone}</p>
              </div>

              <div class="section">
                <h2>Pass Details</h2>
                <div class="details-grid">
                  <div class="detail-item">
                    <p><span class="label">Departure:</span><br>
                    ${departureDateTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}<br>
                    ${departureDateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
                  </div>
                  <div class="detail-item">
                    <p><span class="label">Return:</span><br>
                    ${returnDateTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}<br>
                    ${returnDateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
                  </div>
                </div>
                <p><span class="label">Duration:</span> ${Math.ceil((returnDateTime.getTime() - departureDateTime.getTime()) / (1000 * 60 * 60))} hours</p>
              </div>

              <div class="section">
                <h2>Destination</h2>
                <p><span class="label">Location:</span> ${data.destination}</p>
                <p><span class="label">Address:</span> ${data.destinationAddress}</p>
                <p><span class="label">Purpose:</span> ${data.purposeOfVisit}</p>
              </div>

              <div class="section">
                <h2>Emergency Contact</h2>
                <p><span class="label">Name:</span> ${data.emergencyContactName}</p>
                <p><span class="label">Phone:</span> ${data.emergencyContactPhone}</p>
                <p><span class="label">Relationship:</span> ${data.emergencyContactRelationship}</p>
              </div>

              <div class="section">
                <h2>Transportation</h2>
                <p><span class="label">Method:</span> ${data.transportationMethod}</p>
                ${data.driverName ? `<p><span class="label">Driver:</span> ${data.driverName}</p>` : ''}
                ${data.vehicleInfo ? `<p><span class="label">Vehicle:</span> ${data.vehicleInfo}</p>` : ''}
              </div>

              <div class="section">
                <h2>Agreements</h2>
                <p>The resident has agreed to all terms and conditions.</p>
                <p><span class="label">Digital Signature:</span> ${data.signature}</p>
                <p><span class="label">Date:</span> ${new Date(data.signatureDate).toLocaleDateString()}</p>
              </div>

              <div class="section" style="text-align: center; margin-top: 30px;">
                <h2>Action Required</h2>
                <a href="${approvalLink}&action=approve" class="approval-btn">Approve Pass</a>
                <a href="${approvalLink}&action=deny" class="deny-btn">Deny Pass</a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    };

      try {
        await sgMail.sendMultiple(emailContent);
        console.log('Email sent successfully to:', emailContent.to);
      } catch (emailError: any) {
        console.error('Email error:', emailError);
        console.error('Email error details:', {
          message: emailError?.message || 'Unknown error',
          code: emailError?.code || 'Unknown code',
          response: emailError?.response?.body || 'No response body'
        });
      }
    } else {
      console.warn('SendGrid not configured - email notifications will not be sent');
    }

    // Send confirmation SMS to resident if Twilio is configured
    if (twilioClient && process.env.TWILIO_PHONE_NUMBER) {
      try {
        await twilioClient.messages.create({
          body: `Your weekend pass request has been submitted and is pending approval. You'll receive a text when it's been reviewed. Pass ID: ${passId}`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: `+1${data.phone.replace(/\D/g, '')}`
        });
      } catch (residentSmsError) {
        console.error('Failed to send confirmation SMS to resident:', residentSmsError);
      }
    }

    return NextResponse.json({ 
      success: true, 
      passId,
      message: 'Pass request submitted successfully' 
    });

  } catch (error: any) {
    console.error('Error processing weekend pass:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to submit pass request' },
      { status: 500 }
    );
  }
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';