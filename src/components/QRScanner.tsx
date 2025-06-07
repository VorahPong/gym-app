'use client';

import { Html5Qrcode, Html5QrcodeCameraScanConfig, Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useRef, useState } from 'react';

export default function QRScanner() {
  const [showModal, setShowModal] = useState(false);
  const [cameras, setCameras] = useState<any[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string>('');
  const [scanResult, setScanResult] = useState('');
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const qrRegionId = 'qr-reader';

  const openModal = async () => {
    setShowModal(true);
    const devices = await Html5Qrcode.getCameras();
    setCameras(devices);
  };

  const closeModal = () => {
    setShowModal(false);
    if (scannerRef.current) {
      scannerRef.current.stop().catch(() => {});
    }
  };

  const startScan = async () => {
    if (!selectedCameraId || !showModal) return;

    scannerRef.current = new Html5Qrcode(qrRegionId);
    await scannerRef.current.start(
      selectedCameraId,
      { fps: 10, qrbox: 250 } as Html5QrcodeCameraScanConfig,
      (decodedText) => {
        setScanResult(decodedText);
        closeModal();
      },
      (error) => {
        // optional: console.log(error);
      }
    );
  };

  useEffect(() => {
    if (selectedCameraId) {
      startScan();
    }
  }, [selectedCameraId]);

  return (
    <div className="text-center">
      <button
        onClick={openModal}
        className="flex flex-col items-center p-5 hover:opacity-80"
      >
        <img src="/qr-scanner.png" alt="QR Scanner Icon" width={70} height={70} />
        <span>QR Scanner</span>
      </button>

      {/* QR Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-40">
          <div className="bg-white w-96 rounded-lg shadow-lg p-5 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-2xl font-bold text-gray-700"
            >
              ×
            </button>

            <h2 className="text-lg font-semibold mb-4">Select Camera</h2>

            <select
              onChange={(e) => setSelectedCameraId(e.target.value)}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              defaultValue=""
            >
              <option value="" disabled>Select a camera</option>
              {cameras.map((cam) => (
                <option key={cam.id} value={cam.id}>{cam.label}</option>
              ))}
            </select>

            <div id={qrRegionId} className="w-full h-64" />
          </div>
        </div>
      )}

      {scanResult && (
        <p className="mt-4 text-green-600 font-semibold">
          ✅ Scanned: {scanResult}
        </p>
      )}
    </div>
  );
}
