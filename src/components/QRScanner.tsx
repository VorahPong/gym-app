'use client';

import { Html5Qrcode } from 'html5-qrcode';
import { useEffect, useRef, useState } from 'react';

export default function QRScanner() {
  const scannerRef = useRef(null);
  const [result, setResult] = useState('');

  useEffect(() => {
    const scannerId = 'qr-reader';
    if (!scannerRef.current) return;

    const html5QrCode = new Html5Qrcode(scannerId);

    html5QrCode.start(
      { facingMode: 'environment' }, // or use a specific camera ID
      {
        fps: 10,
        qrbox: 250,
      },
      (decodedText) => {
        setResult(decodedText);
        html5QrCode.stop().then(() => {
          console.log('QR scanning stopped.');
        });
      },
      (error) => {
        // optional: console.log('QR scan error', error);
      }
    );

    return () => {
      html5QrCode.stop().catch(console.error);
    };
  }, []);

  return (
    <div className="text-center">
      <div id="qr-reader" ref={scannerRef} className="w-full max-w-md mx-auto" />
      {result && (
        <p className="mt-4 text-green-600 font-semibold">
          ✅ Scanned: {result}
        </p>
      )}
    </div>
  );
}
