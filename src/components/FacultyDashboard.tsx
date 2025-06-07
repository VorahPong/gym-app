'use client';
import QRScanner from "./QRScanner";

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
