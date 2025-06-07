import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  const faculty = await prisma.user.upsert({
    where: { email: 'faculty@example.com' },
    update: {},
    create: {
      email: 'faculty@example.com',
      password: hashedPassword,
      role: 'FACULTY',
      faculty: {
        create: {},
      },
    },
  });

  const student = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'student@example.com',
      password: hashedPassword,
      role: 'STUDENT',
      student: {
        create: {
          schoolId: 'STU123456',
        },
      },
    },
  });

  console.log({ admin, faculty, student });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
