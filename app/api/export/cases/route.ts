import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const cases = await prisma.case.findMany({
    include: { resident: true },
    orderBy: { createdAt: 'desc' },
  });

  // Create CSV Header
  const headers = ['ID', 'Title', 'Description', 'Status', 'Priority', 'Resident Name', 'Resident Unit', 'Created At'];
  
  // Format Data Rows
  const rows: Array<Array<string | number>> = cases.map((c: any) => [
    c.id,
    `"${c.title.replace(/"/g, '""')}"`,
    `"${c.description.replace(/"/g, '""')}"`,
    c.status,
    c.priority,
    `"${c.resident?.name || ''}"`,
    `"${c.resident?.unit || ''}"`,
    new Date(c.createdAt).toISOString()
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(','))
  ].join('\n');

  return new NextResponse(csvContent, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="cases_export.csv"',
    },
  });
}
