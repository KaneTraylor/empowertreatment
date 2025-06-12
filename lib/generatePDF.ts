import jsPDF from 'jspdf';

interface ProgressReportData {
  providerName: string;
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
    // Add header text (logo will be added via image URL)
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(239, 61, 61); // Primary color
    doc.text('EMPOWER TREATMENT', pageWidth / 2, margin + 8, { align: 'center' });
    doc.setTextColor(0, 0, 0); // Back to black
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text('Clinical Progress Report', pageWidth / 2, margin + 16, { align: 'center' });
    
    // Add line below header
    doc.setDrawColor(239, 61, 61); // Primary color
    doc.setLineWidth(0.5);
    doc.line(margin, margin + 22, pageWidth - margin, margin + 22);
    doc.setDrawColor(0, 0, 0); // Back to black
    doc.setLineWidth(0.2);
    yPosition = margin + 32;
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
  doc.setFillColor(245, 245, 245);
  doc.rect(margin, yPosition - 5, pageWidth - 2 * margin, 35, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('PATIENT INFORMATION', margin + 5, yPosition + 5);
  yPosition += lineHeight + 2;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Patient Name: ${data.patientName}`, margin + 5, yPosition + 5);
  doc.text(`Provider: ${data.providerName}`, pageWidth / 2 + 10, yPosition + 5);
  yPosition += lineHeight + 2;
  doc.text(`Date of Report: ${new Date().toLocaleDateString('en-US')}`, margin + 5, yPosition + 5);
  doc.text(`Services Provided: ${data.numberOfServices}`, pageWidth / 2 + 10, yPosition + 5);
  yPosition += lineHeight + 10;

  // Parse and format the report content
  const reportSections = data.reportContent.split('\n\n');
  
  reportSections.forEach((section) => {
    // Check if this is a header (usually in caps or starts with specific keywords)
    const isHeader = section.match(/^[A-Z\s]+:/) || 
                    section.includes('SUMMARY') || 
                    section.includes('GOALS') || 
                    section.includes('SERVICES') ||
                    section.includes('OBSERVATIONS') ||
                    section.includes('RECOMMENDATIONS') ||
                    section.includes('NEXT STEPS');
    
    if (isHeader) {
      // Add extra space before headers
      yPosition += lineHeight;
      
      // Check if we need a new page
      if (yPosition + lineHeight * 3 > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
        addHeader();
      }
      
      // Add colored bar for section headers
      doc.setFillColor(239, 61, 61, 30); // Primary color with transparency
      doc.rect(margin - 5, yPosition - 5, pageWidth - 2 * margin + 10, lineHeight + 2, 'F');
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      const headerText = section.split('\n')[0];
      doc.text(headerText, margin, yPosition);
      yPosition += lineHeight + 2;
      
      // Process the rest of the section content
      const content = section.split('\n').slice(1).join('\n');
      if (content.trim()) {
        doc.setFont('helvetica', 'normal');
        addWrappedText(content.trim());
      }
    } else {
      // Regular content
      doc.setFont('helvetica', 'normal');
      addWrappedText(section);
    }
    
    yPosition += lineHeight / 2;
  });

  // Add professional footer
  const footerY = pageHeight - margin * 2.5;
  
  // Footer background
  doc.setFillColor(248, 248, 248);
  doc.rect(0, footerY - 5, pageWidth, margin * 2.5 + 5, 'F');
  
  // Footer line
  doc.setDrawColor(239, 61, 61);
  doc.setLineWidth(0.5);
  doc.line(margin, footerY, pageWidth - margin, footerY);
  
  yPosition = footerY + lineHeight;
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Provider Contact Information', margin, yPosition);
  yPosition += lineHeight - 1;
  
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.providerName}`, margin, yPosition);
  doc.text(`Email: ${data.contactEmail}`, pageWidth / 2, yPosition);
  yPosition += lineHeight - 1;
  doc.text(`Phone: ${data.contactPhone}`, margin, yPosition);
  yPosition += lineHeight;
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 100, 100);
  doc.text('This report was generated using Empower Treatment Progress Report System', pageWidth / 2, yPosition + 2, { align: 'center' });
  doc.text('Confidential - For Clinical Use Only', pageWidth / 2, yPosition + lineHeight, { align: 'center' });

  return doc;
}

