import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const { email, password } = await request.json();


    const user = await prisma.user.findUnique({
    where: {email},
    });

    if (!user) {
        return NextResponse.json({ message: 'Account does not exist or incorrect password'}, { status: 404});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return NextResponse.json({ message: 'Account does not exist or incorrect password'}, { status: 401});
    }

    // set cookie
    const cookie = serialize('userEmail', user.email, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day session
    });

    const response = NextResponse.json(
        { message: 'Successfully login', user},
        { status: 200 }
    );
    response.headers.set('Set-Cookie', cookie);

    return response;
}
