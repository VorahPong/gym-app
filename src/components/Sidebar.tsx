'use client';

import Link from 'next/link';

export default function Sidebar({ closeSidebar }: { closeSidebar: () => void }) {
  return (
    <div className="fixed top-0 right-0 h-full w-64 bg-[#FEC52E] text-black p-5 z-50 shadow-xl">
      <button onClick={closeSidebar} className="text-right w-full text-xl mb-4">
        × Close
      </button>
      <ul className="space-y-4">
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/profile">Profile</Link></li>
        <li><Link href="/settings">Settings</Link></li>
        <li><Link href="/logout">Logout</Link></li>
      </ul>
    </div>
  );
}
