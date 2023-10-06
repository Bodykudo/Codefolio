import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request, secret, raw: true });
  return NextResponse.json({ token }, { status: 200 });
}
