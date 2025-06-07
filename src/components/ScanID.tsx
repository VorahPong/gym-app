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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-96 h-96 rounded-lg shadow-lg flex flex-col p-5">
                <button
                    onClick={() => setShowQR(false)}
                    className="text-black text-xl font-bold text-right"
                >
                    ×
                </button>
                <div className='flex flex-col justify-center items-center gap-5'>
                    <QRCode value={studentId} size={200}/>
                    <p className="text-sm mt-2">{studentId}</p>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
