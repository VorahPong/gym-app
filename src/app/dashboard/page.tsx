import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import ScanID from "@/components/ScanID";


export default async function DashboardPage() {
    const cookieStore = cookies();
    const userEmail = (await cookieStore).get('userEmail');

    if (!userEmail) {
        redirect('/login');
    }

    // fetch student id
    const user = await prisma.user.findUnique({
        where: { email: userEmail.value},
        include: { student: true },
    });

    if (!user || user.role !== "STUDENT" || !user.student) {
        redirect("/login");
    }

    const studentId = user.student.schoolId;

    return (
        <div className="min-h-screen bg-white text-black">
            <div className="flex">

                {/* features */}
                <ScanID studentId={user.student.schoolId} />


            </div>
        </div>
    );
}