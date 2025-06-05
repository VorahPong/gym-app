import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function DashboardPage() {
    const cookieStore = cookies();
    const userEmail = (await cookieStore).get('userEmail');

    if (!userEmail) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-white text-black">
            <div className="flex">

                <div className="w-fit text-center p-10">
                    <Image className="mb-2" src="/qr-icon.png" alt="QR" width={70} height={70} />
                    <label htmlFor="">Scan ID</label>
                </div>

                <div className="w-fit text-center p-10">
                    <Image className="mb-2" src="/qr-icon.png" alt="QR" width={70} height={70} />
                    <label htmlFor="">Scan ID</label>
                </div>

            </div>
        </div>
    );
}