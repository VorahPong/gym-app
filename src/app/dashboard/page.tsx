import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const cookieStore = cookies();
    const userEmail = (await cookieStore).get('userEmail');

    if (!userEmail) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-white text-black">
            hello
        </div>
    );
}