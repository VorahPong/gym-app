import ScanID from "@/components/ScanID";


export default async function StudentDashboard({ studentId }: { studentId: string }) {

    return (
        <div className="min-h-screen bg-white text-black">
            <div className="flex">

                {/* features */}
                <ScanID studentId={studentId} />
            </div>
        </div>
    );
}