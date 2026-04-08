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
  const cookieStore = await cookies();
  const token = cookieStore.get('npbos_session')?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    return payload as SessionClaims;
  } catch {
    return null;
  }
}

export async function requireTenantContext() {
  const session = await getSessionClaims();

  if (!session?.sub) {
    throw new Error('Not authenticated');
  }

  return {
    userId: session.sub,
    orgId: session.orgId ?? null,
    buildingId: session.buildingId ?? null,
  };
}
