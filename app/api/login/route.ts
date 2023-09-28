import { randomBytes } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const username = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
const password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (body.username !== username || body.password !== password) {
    return NextResponse.json({
      status: 401,
      message: 'Unauthorized',
    });
  }
  //   Make a Token and save it in a cookie
  const auth_token = randomBytes(16).toString('hex');
  cookies().set('auth_token', auth_token);

  return NextResponse.json({
    status: 200,
    message: 'User Logged In',
  });
}
