import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      providerName,
      patientName,
      patientGoals,
      workingOn,
      numberOfServices,
      contactEmail,
      contactPhone
    } = data;

    // Validate required fields
    if (!providerName || !patientName || !patientGoals || !workingOn || !numberOfServices) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Create the prompt for Gemini
    const prompt = `
    You are a professional healthcare documentation assistant. Generate a comprehensive progress report for a patient in substance abuse treatment based on the following information:

    Provider Name: ${providerName}
    Patient Name: ${patientName}
    Treatment Goals: ${patientGoals}
    Services/Activities Worked On: ${workingOn}
    Number of Services Provided: ${numberOfServices}
    
    Please create a professional progress report that includes:
    1. A header with the report date and patient/provider information
    2. An executive summary of the patient's progress
    3. Detailed progress on each treatment goal
    4. Services provided and frequency
    5. Clinical observations and patient response to treatment
    6. Recommendations for continued care
    7. Next steps and future treatment considerations
    
    The report should be:
    - Professional and clinical in tone
    - Specific and detailed
    - Focused on measurable progress
    - HIPAA-compliant (use only the information provided)
    - Formatted for easy reading with clear sections
    
    Format the report in a standard clinical documentation style.
    `;

    // Generate the report
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const report = response.text();

    // Add footer with contact information
    const fullReport = `${report}

---
Provider Contact Information:
${providerName}
Email: ${contactEmail}
Phone: ${contactPhone}

Report Generated: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST`;

    return NextResponse.json({ 
      success: true, 
      report: fullReport 
    });

  } catch (error) {
    console.error('Error generating progress report:', error);
    
    // Check if it's a Gemini API error
    if (error instanceof Error && error.message.includes('API_KEY')) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Gemini API key not configured. Please add GEMINI_API_KEY to your environment variables.' 
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to generate progress report. Please try again.' 
      },
      { status: 500 }
    );
  }
}