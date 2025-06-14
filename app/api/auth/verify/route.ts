import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'empower-treatment-admin-secret-2024';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-token')?.value;

    if (!token) {
      return NextResponse.json({
        authenticated: false,
        message: 'No token found'
      }, { status: 401 });
    }

    const decoded = jwt.verify(token, jwtSecret) as any;

    // Check if token is expired
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      return NextResponse.json({
        authenticated: false,
        message: 'Token expired'
      }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: { email: decoded.email, role: decoded.role }
    });

  } catch (error) {
    return NextResponse.json({
      authenticated: false,
      message: 'Invalid token'
    }, { status: 401 });
  }
}