// components/dashboards/FacultyDashboard.tsx
'use client';
import QRScanner from '../QRScanner'; // Assume you're using html5-qrcode or similar

export default function FacultyDashboard() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Scan Student ID</h2>
      <QRScanner />
    </div>
  );
}
