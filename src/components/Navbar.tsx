'use client';

import Link from 'next/link';
import Image from 'next/image';
import Sidebar from './Sidebar';
import { useState } from 'react';

export default function Navbar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <nav className="bg-[#FEC52E] text-white p-4 flex justify-between items-center">
      <Image src="/cameronLogo.png" alt="Cameron Logo" width={50} height={50} />
      <div className="space-x-4 cursor-pointer" onClick={() => setSidebarOpen(!isSidebarOpen)}>
        <Image src="/menu-icon.png" alt="Cameron Logo" width={40} height={40} />
      </div>

      {isSidebarOpen && <Sidebar closeSidebar={() => setSidebarOpen(false)} />}
    </nav>
  );
}
