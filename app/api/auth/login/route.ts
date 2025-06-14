import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const jwtSecret = process.env.JWT_SECRET || 'empower-treatment-admin-secret-2024';

const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

// Define allowed employee emails
const ALLOWED_EMAILS = [
  // Admin
  'admin@empowertreatment.com',
  
  // Leadership
  'kane@empowertreatment.com',
  'taylor@empowertreatment.com',
  
  // Clinical Staff
  'kelsey@empowertreatment.com',
  'alex@empowertreatment.com',
  'sara@empowertreatment.com',
  'carol@empowertreatment.com',
  'kalee@empowertreatment.com',
  'nycole@empowertreatment.com',
  
  // Add any other employee emails here
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: 'Email and password are required'
      }, { status: 400 });
    }

    // Check if email is in allowed list (case-insensitive)
    const isAllowed = ALLOWED_EMAILS.some(
      allowedEmail => allowedEmail.toLowerCase() === email.toLowerCase()
    );

    if (!isAllowed) {
      return NextResponse.json({
        success: false,
        message: 'Access denied. This email is not authorized.'
      }, { status: 403 });
    }

    // For now, we'll use a simple password check
    // In production, you'd want to implement proper password hashing
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'EmpowerAdmin2024!';
    
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({
        success: false,
        message: 'Invalid password'
      }, { status: 401 });
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        email: email.toLowerCase(),
        role: 'admin'
      },
      jwtSecret,
      {
        expiresIn: '24h'
      }
    );

    // Set HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: { email: email.toLowerCase() }
    });

    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({
      success: false,
      message: 'An error occurred during login',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}