import { NextRequest, NextResponse } from 'next/server';
import { getSubmissions, exportToCSV } from '@/lib/fileStorage';

// GET submissions as JSON or CSV
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const format = searchParams.get('format') || 'json';

    if (format === 'csv') {
      const csv = await exportToCSV();
      
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="submissions_${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    }

    // Return JSON by default
    const submissions = await getSubmissions();
    
    return NextResponse.json({
      success: true,
      count: submissions.length,
      data: submissions
    });

  } catch (error) {
    console.error('Error exporting submissions:', error);
    return NextResponse.json(
      { error: 'Failed to export submissions' },
      { status: 500 }
    );
  }
}