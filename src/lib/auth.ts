import { signJWT, verifyJWT } from './jwt';
import { cookies } from 'next/headers';
import { prisma } from './prisma';
import { compare, hash } from 'bcryptjs';



export async function getSession() {
  const token = (await cookies()).get('token')?.value;
  if (!token) return null;

  const payload = await verifyJWT(token);
  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.id as string },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true
    }
  });

  return user as {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    role: string;
  } | null;
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user || !user.password) {
    throw new Error('Invalid credentials');
  }

  const isValid = await compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  const token = await signJWT({ id: user.id });
  (await cookies()).set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  });

  const role =
    user.email === 'saamiyahkazi1000@gmail.com' ||
    user.email === 'mswapnil218@gmail.com'
      ? 'admin'
      : user.role;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    role: role
  };
}

export async function register(data: {
  name: string;
  email: string;
  password: string;
}) {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email }
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await hash(data.password, 12);
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role:
        data.email === 'saamiyahkazi1000@gmail.com' ||
        data.email === 'mswapnil218@gmail.com'
          ? 'admin'
          : 'user'
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true
    }
  });

  return user as {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    role: string;
  };
}

export async function logout() {
  (await cookies()).delete('token');
}
