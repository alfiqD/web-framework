export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-white">
            {/* Spinner dengan perpaduan warna pink pastel */}
            <div className="w-12 h-12 border-4 border-[#FFE4E6] border-t-[#E17887] rounded-full animate-spin mb-4 shadow-sm"></div>
            
            {/* Teks dengan efek pulse (berkedip lembut) dan spasi lebar */}
            <p className="text-[#E17887] text-sm font-semibold tracking-widest uppercase animate-pulse">
                Loading...
            </p>
        </div>
    );
}