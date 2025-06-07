// components/dashboards/FacultyDashboard.tsx
'use client';
import QRScanner from "./QRScanner"; // Assume you're using html5-qrcode or similar

export default function FacultyDashboard() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="flex">

        {/* features */}
        <QRScanner />
      </div>
    </div>
  );
}
