// @ts-nocheck
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  const organization = await prisma.organization.upsert({
    where: { slug: 'demo-org' },
    update: { name: 'Demo Organization' },
    create: {
      name: 'Demo Organization',
      slug: 'demo-org',
    },
  });

  const building = await prisma.building.upsert({
    where: {
      organizationId_code: {
        organizationId: organization.id,
        code: 'HQ',
      },
    },
    update: { name: 'Headquarters' },
    create: {
      name: 'Headquarters',
      code: 'HQ',
      address: '123 Main Street',
      organizationId: organization.id,
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'admin@npbos.com' },
    update: {},
    create: {
      email: 'admin@npbos.com',
      name: 'System Admin',
      password: hashedPassword,
      role: 'SUPERADMIN'
    }
  });

  await prisma.membership.upsert({
    where: {
      userId_organizationId_buildingId: {
        userId: user.id,
        organizationId: organization.id,
        buildingId: building.id,
      },
    },
    update: { role: 'SUPERADMIN' },
    create: {
      userId: user.id,
      organizationId: organization.id,
      buildingId: building.id,
      role: 'SUPERADMIN',
    },
  });

  console.log('Admin user ensured:', user.email);
  console.log('Default organization:', organization.slug);
  console.log('Default building:', building.code);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
