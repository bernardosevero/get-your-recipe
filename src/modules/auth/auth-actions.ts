
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import AuthService from './auth-service';

const prisma = new PrismaClient();

async function createAccount(formData: FormData) {
  'use server';

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const hashPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashPassword,
    },
  });

  redirect('/login');
}

async function login(formData: FormData) {
  'use server'

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const user = await prisma.user.findFirst({
    where: {
      email
    }
  })

  if (!user) {
    console.error('usuário inválido')
    redirect('/login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if(!isMatch) {
    console.error('usuário inválido')
    redirect('/login')
  }

  await AuthService.createSessionToken({
    email: user.email,
    password: user.password
  })

  redirect('/crie-receita')
}

const AuthActions = {
  createAccount,
  login
};

export default AuthActions;
