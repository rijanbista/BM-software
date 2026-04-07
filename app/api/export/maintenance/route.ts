import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const schedules = await prisma.maintenanceSchedule.findMany({
    orderBy: { scheduledDate: 'asc' },
  });

  // Create CSV Header
  const headers = ['ID', 'Title', 'Description', 'Assigned To', 'Status', 'Scheduled Date', 'Created At'];
  
  // Format Data Rows
  const rows: Array<Array<string | number>> = schedules.map((item: any) => [
    item.id,
    `"${item.title.replace(/"/g, '""')}"`,
    `"${item.description.replace(/"/g, '""')}"`,
    `"${item.assignedTo || ''}"`,
    item.status,
    new Date(item.scheduledDate).toISOString(),
    new Date(item.createdAt).toISOString()
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(','))
  ].join('\n');

  return new NextResponse(csvContent, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="maintenance_export.csv"',
    },
  });
}
