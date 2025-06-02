'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
      <button onClick={closeSidebar} className="text-right w-full text-xl mb-4">
        × Close
      </button>
      <ul className="space-y-4">
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/profile">Profile</Link></li>
        <li><Link href="/settings">Settings</Link></li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
}
