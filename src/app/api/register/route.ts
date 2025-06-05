import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { email, password, role, schoolId } = await request.json()
  
  // validate role
  if (!["STUDENT", "FACULTY", "ADMIN"].includes(role)) {
    return Response.json({ message: "Invalid role" }, { status: 400 });
  }

  // check if email already in used
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return Response.json({ message: "Email already in use" }, { status: 409 });
  }


  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
    },
  });

  // if student, create Student record
  if (role === "STUDENT") {
    if (!schoolId) {
      return Response.json({ message: "Missing school ID for student" }, { status: 400 });
    }
    await prisma.student.create({
      data: {
        userId: user.id,
        schoolId,
      },
    });
  }
  

// if faculty, create Faculty record
if (role === "FACULTY") {
  await prisma.faculty.create({
    data: {
      userId: user.id,
    },
  });
}

return Response.json({ message: "User registered" }, { status: 201 });
}
