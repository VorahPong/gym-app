'use client'

import ScanID from "@/components/ScanID";


export default function StudentDashboard({ studentId }: { studentId: string }) {

    return (
        <div className="min-h-screen bg-white text-black">
            <div className="flex">

                {/* features */}
                <ScanID studentId={studentId} />
            </div>
        </div>
    );
}