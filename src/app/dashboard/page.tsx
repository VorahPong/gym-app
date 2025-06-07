import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminDashboard from "@/components/AdminDashboard";
import StudentDashboard from "@/components/StudentDashboard";
import FacultyDashboard from "@/components/FacultyDashboard";


export default async function DashboardPage() {
    const cookieStore = cookies();
    const userEmail = (await cookieStore).get('userEmail');

    if (!userEmail) {
        redirect('/login');
    }

    // fetch user role
    const user = await prisma.user.findUnique({
        where: { email: userEmail.value},
        include: { 
            student: true, 
            faculty: true, 
        },
    });

    if (!user) {
        redirect("/login");
    }

    switch (user.role) {
        case 'STUDENT':
        //   return <StudentDashboard studentId={user.student?.schoolId ?? ''} />;
        case 'FACULTY':
        //   return <FacultyDashboard />;
        case 'ADMIN':
        //   return <AdminDashboard />;
        default:
          return <p>Unknown role</p>;
      }
}