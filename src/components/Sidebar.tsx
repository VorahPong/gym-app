'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Sidebar({ closeSidebar }: { closeSidebar: () => void }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
    });

    router.push('/login');
  };

  return (
    <div className="fixed top-0 right-0 h-full w-64 bg-[#FEC52E] text-black p-5 z-50 shadow-xl">
      <button onClick={closeSidebar} className="w-full mb-10">
        <Image src="/close-icon.png" alt="Logout" width={25} height={25} />
      </button>
        <ul className="space-y-4">
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/profile">Profile</Link></li>
          <li><Link href="/settings">Settings</Link></li>
          <li className='justify-end'>
            <button onClick={handleLogout} className="flex justify-between items-center w-full text-left">
              <span>Logout</span>
              <Image src="/logout-icon.png" alt="Logout" width={25} height={25} />
            </button>
          </li>
        </ul>

    </div>
  );
}
