'use client';

import { useState } from 'react';
import QRCode from 'react-qr-code';

export default function ScanID({ studentId }: { studentId: string }) {
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="text-center">
      <button onClick={() => setShowQR(!showQR)} className="flex flex-col items-center p-5 hover:opacity-80">
        <img src="/qr-icon.png" alt="QR Icon" width={70} height={70} />
        <span>Scan ID</span>
      </button>

      {showQR && (
        <div className="mt-4">
          <QRCode value={studentId} size={128} />
          <p className="text-sm mt-2">{studentId}</p>
        </div>
      )}
    </div>
  );
}
