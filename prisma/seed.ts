import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Add a sample resident
  const resident = await prisma.resident.create({
    data: {
      name: 'John Doe',
      unit: '101',
      email: 'john.doe@example.com',
      phone: '555-0100',
    },
  });

  // Add a sample case
  await prisma.case.create({
    data: {
      title: 'Leaky Faucet',
      description: 'The kitchen sink is leaking.',
      status: 'OPEN',
      priority: 'MEDIUM',
      residentId: resident.id,
    },
  });

  // Add a sample shift log
  await prisma.shiftLog.create({
    data: {
      author: 'Jane Smith',
      content: 'Started shift. Everything is quiet.',
      shiftType: 'DAY',
    },
  });

  // Add a sample message
  await prisma.message.create({
    data: {
      subject: 'Welcome to the Building!',
      body: 'Dear John, welcome to your new home.',
      residentId: resident.id,
    },
  });

  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
