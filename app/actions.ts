'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SignJWT } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

async function getPrisma() {
  const { prisma } = await import('@/lib/prisma');
  return prisma;
}

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set');
  }
  return new TextEncoder().encode(secret);
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) return { error: 'Please provide email and password' };
  try {
    const jwtSecret = getJwtSecret();
    const prisma = await getPrisma();
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return { error: 'No user found for this email. Run db:setup-admin first.' };

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return { error: 'Invalid credentials' };

    const token = await new SignJWT({ sub: user.id, name: user.name, role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(jwtSecret);

    const cookieStore = await cookies();
    cookieStore.set('npbos_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    redirect('/');
  } catch (error) {
    console.error('Login failed:', error);
    return { error: 'Authentication service unavailable. Verify DATABASE_URL and run Prisma setup.' };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('npbos_session');
  redirect('/login');
}

export async function addMaintenance(formData: FormData) {
  const prisma = await getPrisma();
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const scheduledDateStr = formData.get('scheduledDate') as string;

  if (!title || !description || !scheduledDateStr) return;

  await prisma.maintenanceSchedule.create({
    data: {
      title,
      description,
      scheduledDate: new Date(scheduledDateStr),
    },
  });

  revalidatePath('/maintenance');
  revalidatePath('/');
}

export async function addResident(formData: FormData) {
  const prisma = await getPrisma();
  const name = formData.get('name') as string;
  const unit = formData.get('unit') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;

  if (!name || !unit || !email) return;

  await prisma.resident.create({
    data: {
      name,
      unit,
      email,
      phone,
    },
  });

  revalidatePath('/residents');
  revalidatePath('/');
}

export async function addCase(formData: FormData) {
  const prisma = await getPrisma();
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const priority = formData.get('priority') as string;
  const residentId = formData.get('residentId') as string;

  if (!title || !description) return;

  await prisma.case.create({
    data: {
      title,
      description,
      priority,
      status: 'OPEN',
      residentId: residentId ? residentId : null,
    },
  });

  revalidatePath('/cases');
  revalidatePath('/');
}

export async function addInspection(formData: FormData) {
  const prisma = await getPrisma();
  const area = formData.get('area') as string;
  const condition = formData.get('condition') as string;
  const notes = formData.get('notes') as string;

  if (!area || !condition) return;

  await prisma.inspection.create({
    data: {
      area,
      condition,
      notes,
      inspector: 'System Admin', // Using dummy user for now
    },
  });

  revalidatePath('/inspections');
  revalidatePath('/');
}
