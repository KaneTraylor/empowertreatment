import jsPDF from 'jspdf';
import { logoBase64 } from './logoData';

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
}

export function generateProgressReportPDF(data: ProgressReportData): jsPDF {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const lineHeight = 7;
  let yPosition = margin;

  // Helper function to add text with word wrap
  const addWrappedText = (text: string, fontSize: number = 10, maxWidth: number = pageWidth - 2 * margin) => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, maxWidth);
    lines.forEach((line: string) => {
      if (yPosition + lineHeight > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
        addHeader();
      }
      doc.text(line, margin, yPosition);
      yPosition += lineHeight;
    });
  };

  // Helper function to add header on each page
  const addHeader = () => {
    // Add logo
    try {
      doc.addImage(logoBase64, 'PNG', margin, margin - 5, 40, 20);
    } catch (e) {
      console.log('Logo could not be added:', e);
    }
    
    // Add header text
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(239, 61, 61); // Primary color
    doc.text('EMPOWER TREATMENT', pageWidth - margin, margin + 5, { align: 'right' });
    doc.setTextColor(0, 0, 0); // Back to black
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.text('Clinical Progress Report', pageWidth - margin, margin + 14, { align: 'right' });
    
    // Add decorative line below header
    doc.setDrawColor(239, 61, 61); // Primary color
    doc.setLineWidth(1);
    doc.line(margin, margin + 22, pageWidth - margin, margin + 22);
    doc.setLineWidth(0.3);
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, margin + 24, pageWidth - margin, margin + 24);
    doc.setDrawColor(0, 0, 0); // Back to black
    doc.setLineWidth(0.2);
    yPosition = margin + 35;
  };

  // Add first page header
  addHeader();

  // Add report date
  doc.setFontSize(10);
  doc.text(`Report Date: ${new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}`, pageWidth - margin, yPosition, { align: 'right' });
  yPosition += lineHeight * 2;

  // Patient and Provider Information Box
  doc.setFillColor(248, 248, 252);
  doc.roundedRect(margin, yPosition - 5, pageWidth - 2 * margin, 40, 3, 3, 'F');
  doc.setDrawColor(239, 61, 61);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, yPosition - 5, pageWidth - 2 * margin, 40, 3, 3, 'S');
  
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
  doc.text(providerLines[0], pageWidth / 2 + 25, yPosition + 5);
  
  yPosition += lineHeight + 2;
  
  doc.setFont('helvetica', 'bold');
  doc.text('Report Date:', margin + 5, yPosition + 5);
  doc.setFont('helvetica', 'normal');
  doc.text(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), margin + 35, yPosition + 5);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Services:', pageWidth / 2 + 5, yPosition + 5);
  doc.setFont('helvetica', 'normal');
  const servicesText = doc.splitTextToSize(data.numberOfServices, 70);
  doc.text(servicesText[0], pageWidth / 2 + 25, yPosition + 5);
  
  yPosition += lineHeight + 12;

  // Parse and format the report content
  const reportSections = data.reportContent.split('\n\n');
  
  reportSections.forEach((section) => {
    // Skip the provider contact section at the end (we handle it in footer)
    if (section.includes('Provider Contact Information:')) {
      return;
    }
    
    // Check if this is a header (usually in caps or starts with specific keywords)
    const isHeader = section.match(/^[A-Z\s]+:/) || 
                    section.includes('SUMMARY') || 
                    section.includes('GOALS') || 
                    section.includes('SERVICES') ||
                    section.includes('OBSERVATIONS') ||
                    section.includes('RECOMMENDATIONS') ||
                    section.includes('NEXT STEPS') ||
                    section.includes('PROGRESS') ||
                    section.includes('TREATMENT');
    
    // Check if this is a signature line
    const isSignature = section.includes('Prepared by:') || 
                       section.includes('Submitted by:') ||
                       section.includes('Signed:');
    
    if (isHeader) {
      // Add extra space before headers
      yPosition += lineHeight;
      
      // Check if we need a new page
      if (yPosition + lineHeight * 3 > pageHeight - margin * 3) {
        doc.addPage();
        yPosition = margin;
        addHeader();
      }
      
      // Add styled section headers
      doc.setFillColor(254, 242, 242); // Light red background
      doc.roundedRect(margin - 2, yPosition - 5, pageWidth - 2 * margin + 4, lineHeight + 4, 2, 2, 'F');
      doc.setDrawColor(239, 61, 61);
      doc.setLineWidth(0.3);
      doc.roundedRect(margin - 2, yPosition - 5, pageWidth - 2 * margin + 4, lineHeight + 4, 2, 2, 'S');
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(185, 28, 28); // Dark red
      const headerText = section.split('\n')[0].toUpperCase();
      doc.text(headerText, margin + 2, yPosition);
      doc.setTextColor(0, 0, 0);
      yPosition += lineHeight + 4;
      
      // Process the rest of the section content
      const content = section.split('\n').slice(1).join('\n');
      if (content.trim()) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        addWrappedText(content.trim());
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
  const footerY = pageHeight - margin * 2.8;
  
  // Footer background gradient effect
  doc.setFillColor(252, 252, 252);
  doc.rect(0, footerY - 5, pageWidth, margin * 2.8 + 5, 'F');
  
  // Footer decorative lines
  doc.setDrawColor(239, 61, 61);
  doc.setLineWidth(1);
  doc.line(margin, footerY, margin + 30, footerY);
  doc.setLineWidth(0.3);
  doc.setDrawColor(220, 220, 220);
  doc.line(margin + 35, footerY, pageWidth - margin, footerY);
  
  yPosition = footerY + lineHeight + 2;
  
  // Provider contact section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(239, 61, 61);
  doc.text('PROVIDER CONTACT', margin, yPosition);
  doc.setTextColor(0, 0, 0);
  yPosition += lineHeight;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const footerProviderText = data.providerCredentials ? `${data.providerName}, ${data.providerCredentials}` : data.providerName;
  doc.text(footerProviderText, margin, yPosition);
  yPosition += lineHeight - 1;
  doc.text(`${data.contactEmail} | ${data.contactPhone}`, margin, yPosition);
  
  // Confidentiality notice
  doc.setFillColor(254, 252, 232);
  doc.setDrawColor(251, 191, 36);
  doc.setLineWidth(0.3);
  doc.roundedRect(pageWidth / 2 - 50, footerY + 8, 100, 22, 2, 2, 'FD');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(146, 64, 14);
  doc.text('CONFIDENTIAL', pageWidth / 2, footerY + 16, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text('For Clinical Use Only', pageWidth / 2, footerY + 23, { align: 'center' });
  
  // System credit
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text('Generated by Empower Treatment Progress Report System', pageWidth - margin, footerY + 25, { align: 'right' });
  
  // Page number (if needed in future)
  doc.setTextColor(100, 100, 100);

  return doc;
}

