import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const { email, password } = await request.json();


    const user = await prisma.user.findUnique({
    where: {email},
    });

    if (!user) {
        return Response.json({ message: 'Account does not exist or incorrect password'}, { status: 404});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return Response.json({ message: 'Account does not exist or incorrect password'}, { status: 401});
    }

    return Response.json({ message: 'Successfully login', user}, {status: 200 });
}
