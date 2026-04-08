import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionClaims } from '@/lib/auth';

export async function POST() {
  const session = await getSessionClaims();

  if (!session?.sub) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (session.role !== 'SUPERADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const slug = 'demo-org';
  const buildingCode = 'HQ';

  const organization = await prisma.organization.upsert({
    where: { slug },
    update: { name: 'Demo Organization' },
    create: { slug, name: 'Demo Organization' },
  });

  const building = await prisma.building.upsert({
    where: {
      organizationId_code: {
        organizationId: organization.id,
        code: buildingCode,
      },
    },
    update: { name: 'Headquarters' },
    create: {
      name: 'Headquarters',
      code: buildingCode,
      address: '123 Main Street',
      organizationId: organization.id,
    },
  });

  const membership = await prisma.membership.upsert({
    where: {
      userId_organizationId_buildingId: {
        userId: session.sub,
        organizationId: organization.id,
        buildingId: building.id,
      },
    },
    update: { role: 'SUPERADMIN' },
    create: {
      userId: session.sub,
      organizationId: organization.id,
      buildingId: building.id,
      role: 'SUPERADMIN',
    },
  });

  return NextResponse.json({
    status: 'ok',
    organization,
    building,
    membership,
  });
}
