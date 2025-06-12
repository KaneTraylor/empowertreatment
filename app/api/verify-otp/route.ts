import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { otp } = await request.json();

    if (!otp) {
      return NextResponse.json(
        { success: false, message: 'OTP is required' },
        { status: 400 }
      );
    }

    const cookieStore = cookies();
    const storedOtp = cookieStore.get('otp')?.value;

    if (!storedOtp) {
      return NextResponse.json(
        { success: false, message: 'OTP expired or not found' },
        { status: 400 }
      );
    }

    if (otp === storedOtp) {
      // Clear OTP after successful verification
      cookieStore.delete('otp');
      
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid OTP' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}