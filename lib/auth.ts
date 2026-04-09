import { cookies } from 'next/headers';
import { jwtVerify, type JWTPayload } from 'jose';

export type SessionClaims = JWTPayload & {
  sub: string;
  name?: string;
  role?: string;
  orgId?: string;
  buildingId?: string;
};

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set');
  }
  return new TextEncoder().encode(secret);
}

export async function getSessionClaims(): Promise<SessionClaims | null> {
  // BYPASS AUTHENTICATION FOR NOW
  return {
    sub: 'mock-user-id',
    name: 'Admin User',
    role: 'MANAGER',
    orgId: undefined,
    buildingId: undefined,
  };
}

export async function requireTenantContext() {
  const session = await getSessionClaims();

  return {
    userId: session?.sub ?? 'mock-user-id',
    orgId: session?.orgId ?? null,
    buildingId: session?.buildingId ?? null,
  };
}
