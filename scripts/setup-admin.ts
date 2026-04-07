// @ts-ignore
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import Database from 'better-sqlite3'; // Wait, wait. Does PrismaBetterSqlite3 accept string url? Yes according to our previous change! Let's follow what works!
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL || 'file:./prisma/dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);
  
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

  console.log('Admin user ensured:', user.email);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
