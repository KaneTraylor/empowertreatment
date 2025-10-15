import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const formatReport = (raw: string) => {
  if (!raw) return "";

  const normalizedLineEndings = raw.replace(/\r\n/g, "\n");
  const withoutMarkdown = normalizedLineEndings
    .replace(/\*\*\*(.+?)\*\*\*/g, "$1")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/^#+\s*/gm, "")
    .replace(/`/g, "");

  const normalizedBullets = withoutMarkdown.replace(/^\s*[-•]\s+/gm, "• ");
  const trimmedSpacing = normalizedBullets
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .trim();

  return trimmedSpacing;
};

export async function POST(request: NextRequest) {
  try {
    // Check for API key first
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not configured");
      return NextResponse.json(
        {
          success: false,
          message:
            "Gemini API key not configured. Please add GEMINI_API_KEY to your environment variables.",
        },
        { status: 500 }
      );
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Parse request body with error handling
    let data;
    try {
      data = await request.json();
    } catch (parseError) {
      console.error("Error parsing request body:", parseError);
      return NextResponse.json(
        { success: false, message: "Invalid request body" },
        { status: 400 }
      );
    }
    const {
      providerName,
      providerCredentials,
      patientName,
      patientGoals,
      workingOn,
      numberOfServices,
      contactEmail,
      contactPhone,
      reportDate,
    } = data;

    // Validate required fields
    if (
      !providerName ||
      !patientName ||
      !patientGoals ||
      !workingOn ||
      !numberOfServices
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Get the generative model (using the latest stable model)
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Create the prompt for Gemini
    const prompt = `
You are a professional healthcare documentation assistant. Generate a comprehensive progress report for a patient in substance abuse treatment based on the following information.

Provider Name: ${providerName}
Provider Credentials: ${providerCredentials || "Not specified"}
Patient Name: ${patientName}
Report Date: ${
      reportDate
        ? new Date(reportDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
    }
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

Formatting requirements:
- Use plain text with section headers ending in a colon (e.g., Executive Summary:)
- Do not use Markdown (no *, -, #, or underscores for emphasis or bullets)
- Separate sections with a single blank line
- Keep the tone clinical, specific, and HIPAA compliant
`;

    // Generate the report with error handling
    let report;
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      report = response.text();

      if (!report) {
        throw new Error("Empty response from Gemini API");
      }
    } catch (geminiError) {
      console.error("Gemini API error:", geminiError);
      throw new Error(
        `Failed to generate content: ${
          geminiError instanceof Error ? geminiError.message : "Unknown error"
        }`
      );
    }

    // Add footer with contact information
    const cleanedReport = formatReport(report);
    const footerSection = [
      "---",
      "Provider Contact Information:",
      `${providerName}${providerCredentials ? `, ${providerCredentials}` : ""}`,
      `Email: ${contactEmail}`,
      `Phone: ${contactPhone}`,
      "",
      `Report Date: ${
        reportDate
          ? new Date(reportDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
      }`,
    ].join("\n");

    const fullReport = cleanedReport
      ? `${cleanedReport}\n\n${footerSection}`
      : footerSection;

    return NextResponse.json({
      success: true,
      report: fullReport,
    });
  } catch (error) {
    console.error("Error generating progress report:", error);

    // Determine specific error type and message
    let errorMessage = "Failed to generate progress report. Please try again.";
    let statusCode = 500;

    if (error instanceof Error) {
      // Check for specific error types
      if (
        error.message.includes("API_KEY") ||
        error.message.includes("API key")
      ) {
        errorMessage = "Gemini API key is invalid or not configured properly.";
      } else if (error.message.includes("model")) {
        errorMessage =
          "Invalid Gemini model specified. Please check the model name.";
      } else if (
        error.message.includes("quota") ||
        error.message.includes("limit")
      ) {
        errorMessage = "API quota exceeded. Please try again later.";
        statusCode = 429;
      } else if (
        error.message.includes("network") ||
        error.message.includes("fetch")
      ) {
        errorMessage =
          "Network error connecting to Gemini API. Please check your internet connection.";
        statusCode = 503;
      } else {
        // Include the actual error message for debugging
        errorMessage = `Error: ${error.message}`;
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: statusCode }
    );
  }
}
