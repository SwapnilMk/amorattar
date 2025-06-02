import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { signJWT } from '@/lib/auth';

const emailSchema = z.object({
  email: z.string().email('Invalid email format')
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = emailSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'No account found with this email' },
        { status: 404 }
      );
    }

    // Generate a reset token that expires in 1 hour
    const resetToken = await signJWT({ userId: user.id });

    // TODO: Send email with reset token
    // For now, we'll just return the token
    return NextResponse.json({
      message: 'Password reset instructions sent to your email',
      resetToken
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    console.error('Password reset request error:', error);
    return NextResponse.json(
      { error: 'Failed to process password reset request' },
      { status: 500 }
    );
  }
}
