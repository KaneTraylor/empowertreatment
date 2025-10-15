import jsPDF from 'jspdf';
import { logoBase64 } from './logoData';

const HEADER_REWRITES: Record<string, string> = {
  'CLINICAL OBSERVATIONS AND PATIENT RESPONSE TO TREATMENT': 'CLINICAL OBSERVATIONS & RESPONSE',
};

interface ProgressReportData {
  providerName: string;
  providerCredentials: string;
  patientName: string;
  patientGoals: string;
  workingOn: string;
  numberOfServices: string;
  contactEmail: string;
  contactPhone: string;
  reportContent: string;
  reportDate?: string;
}

export function generateProgressReportPDF(data: ProgressReportData): jsPDF {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 25;
  const lineHeight = 8;
  const FOOTER_HEIGHT = 54;
  const FOOTER_GAP = 10;
  const getSafeBottom = () => pageHeight - FOOTER_HEIGHT - 4;
  let yPosition = margin;

  // Helper function to add text with word wrap
  const addWrappedText = (text: string, fontSize: number = 10, maxWidth: number = pageWidth - 2 * margin) => {
    doc.setFontSize(fontSize);
    const segments = text.split(/\n{2,}/);
    segments.forEach((segment, index) => {
      const trimmedSegment = segment.trim();

      if (!trimmedSegment) {
        yPosition += lineHeight;
        return;
      }

      const lines = doc.splitTextToSize(trimmedSegment, maxWidth);
      const blockHeight = lines.length * lineHeight;
      const safeBottom = getSafeBottom();

      if (yPosition + blockHeight > safeBottom) {
        doc.addPage();
        addHeader();
      }

      lines.forEach((line: string) => {
        if (yPosition + lineHeight > safeBottom) {
          doc.addPage();
          addHeader();
        }
        doc.text(line, margin, yPosition);
        yPosition += lineHeight;
      });

      if (index !== segments.length - 1) {
        yPosition += lineHeight;
      }
    });
  };

  // Helper function to add header on each page
  const addHeader = () => {
    try {
      const logoWidth = 36;
      const logoHeight = 18;
      const logoX = margin;
      const logoY = margin - 6;
      doc.addImage(logoBase64, 'PNG', logoX, logoY, logoWidth, logoHeight);
    } catch (e) {
      console.log('Logo could not be added:', e);
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(30, 41, 59);
    doc.text('Empower Treatment', pageWidth - margin, margin + 4, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(100, 116, 139);
    doc.text('Clinical Progress Report', pageWidth - margin, margin + 12, { align: 'right' });

    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.6);
    doc.line(margin, margin + 18, pageWidth - margin, margin + 18);
    doc.setDrawColor(239, 68, 68);
    doc.setLineWidth(1.2);
    doc.line(margin, margin + 20, pageWidth - margin, margin + 20);
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.4);
    doc.line(margin, margin + 24, pageWidth - margin, margin + 24);

    doc.setDrawColor(0, 0, 0);
    doc.setTextColor(0, 0, 0);
    doc.setLineWidth(0.2);
    yPosition = margin + 32;
  };

  // Add first page header
  addHeader();

  // Patient and Provider Information Box
  doc.setFillColor(247, 249, 252);
  doc.roundedRect(margin, yPosition - 5, pageWidth - 2 * margin, 40, 4, 4, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.6);
  doc.roundedRect(margin, yPosition - 5, pageWidth - 2 * margin, 40, 4, 4, 'S');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(239, 61, 61);
  doc.text('PATIENT INFORMATION', margin + 5, yPosition + 5);
  doc.setTextColor(0, 0, 0);
  yPosition += lineHeight + 3;
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Patient Name:', margin + 5, yPosition + 5);
  doc.setFont('helvetica', 'normal');
  doc.text(data.patientName, margin + 35, yPosition + 5);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Provider:', pageWidth / 2 + 5, yPosition + 5);
  doc.setFont('helvetica', 'normal');
  const providerText = data.providerCredentials ? `${data.providerName}, ${data.providerCredentials}` : data.providerName;
  const providerLines = doc.splitTextToSize(providerText, 70);
  if (providerLines.length > 1) {
    providerLines.forEach((providerLine: string, index: number) => {
      doc.text(providerLine, pageWidth / 2 + 25, yPosition + 5 + index * lineHeight);
    });
  } else {
    doc.text(providerLines[0] ?? '', pageWidth / 2 + 25, yPosition + 5);
  }
  
  yPosition += lineHeight + 2;
  
  doc.setFont('helvetica', 'bold');
  doc.text('Services:', margin + 5, yPosition + 5);
  doc.setFont('helvetica', 'normal');
  const servicesText = doc.splitTextToSize(data.numberOfServices, 70);
  doc.text(servicesText[0], margin + 35, yPosition + 5);
  
  yPosition += lineHeight + 12;

  // Parse and format the report content
  const reportSections = data.reportContent.split(/\n{2,}/);
  
  reportSections.forEach((rawSection) => {
    const section = rawSection.trim();

    if (!section) {
      return;
    }
    
    if (/^---/.test(section) || /Provider Contact Information:/i.test(section)) {
      return;
    }

    const lines = section.split('\n');
    const headerLine = lines[0]?.trim() ?? '';
    const remainingLines = lines.slice(1).join('\n').trim();

    const signaturePattern = /^(Prepared by|Submitted by|Signed)/i;
    const isSignature = signaturePattern.test(headerLine);

    let headerTitle: string | null = null;
    let bodyContent = remainingLines;

    if (headerLine.includes(':')) {
      const [titlePart, ...restParts] = headerLine.split(':');
      const candidateTitle = titlePart.trim();
      const trailing = restParts.join(':').trim();

      if (candidateTitle.length > 0 && candidateTitle.length <= 70) {
        headerTitle = candidateTitle;
        if (trailing) {
          bodyContent = trailing + (bodyContent ? `\n${bodyContent}` : '');
        }
      }
    } else if (/^[A-Za-z][A-Za-z\s]+$/.test(headerLine) && headerLine.length <= 70) {
      headerTitle = headerLine.trim();
    }
    
    if (headerTitle) {
      yPosition += lineHeight / 2;

      if (yPosition + lineHeight * 2 > getSafeBottom()) {
        doc.addPage();
        addHeader();
        yPosition += lineHeight;
      }

      const normalizedHeader = headerTitle.trim().toUpperCase();
      const displayHeader = HEADER_REWRITES[normalizedHeader] ?? normalizedHeader;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(15);
      doc.setTextColor(30, 41, 59);
      doc.text(displayHeader, margin, yPosition);
      doc.setTextColor(0, 0, 0);
      yPosition += lineHeight + 2;
      
      if (bodyContent) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        addWrappedText(bodyContent);
      }
    } else if (isSignature) {
      // Special formatting for signature section
      yPosition += lineHeight * 2;
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(10);
      addWrappedText(section);
    } else {
      // Regular content
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      addWrappedText(section);
    }
    
    yPosition += lineHeight / 2;
  });

  // Add professional footer
  const footerTop = pageHeight - FOOTER_HEIGHT;

  doc.setFillColor(252, 252, 252);
  doc.rect(0, footerTop, pageWidth, FOOTER_HEIGHT, 'F');

  doc.setDrawColor(239, 61, 61);
  doc.setLineWidth(1);
  doc.line(margin, footerTop + 6, margin + 32, footerTop + 6);
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.line(margin + 36, footerTop + 6, pageWidth - margin, footerTop + 6);

  const confidentialityWidth = 84;
  const confidentialityHeight = 20;
  const confidentialityX = pageWidth - margin - confidentialityWidth;
  const confidentialityY = footerTop + 10;

  doc.setFillColor(254, 252, 232);
  doc.setDrawColor(251, 191, 36);
  doc.setLineWidth(0.3);
  doc.roundedRect(confidentialityX, confidentialityY, confidentialityWidth, confidentialityHeight, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(146, 64, 14);
  doc.text('CONFIDENTIAL', confidentialityX + confidentialityWidth / 2, confidentialityY + 9, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('For Clinical Use Only', confidentialityX + confidentialityWidth / 2, confidentialityY + 16, { align: 'center' });

  let footerY = footerTop + 20;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(239, 61, 61);
  doc.text('PROVIDER CONTACT', margin, footerY);
  doc.setTextColor(0, 0, 0);
  footerY += 12;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const footerProviderText = data.providerCredentials ? `${data.providerName}, ${data.providerCredentials}` : data.providerName;
  doc.text(footerProviderText, margin, footerY);
  footerY += 10;
  doc.text(`${data.contactEmail} | ${data.contactPhone}`, margin, footerY);
  
  // Page number (if needed in future)
  doc.setTextColor(100, 100, 100);

  return doc;
}
