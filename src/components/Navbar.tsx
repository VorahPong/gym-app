'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-[#FEC52E] text-white p-4 flex justify-between items-center">
      <Image src="/cameronLogo.png" alt="Cameron Logo" width={50} height={50} />
      <div className="space-x-4">
        <Image src="/menu-icon.png" alt="Cameron Logo" width={40} height={40} />
      </div>
    </nav>
  );
}
