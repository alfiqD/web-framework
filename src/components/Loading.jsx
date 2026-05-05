export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-white font-nunito">
            {/* Spinner dengan perpaduan warna abu-abu muda dan merah #B01030 */}
            <div className="w-12 h-12 border-4 border-gray-100 border-t-[#B01030] rounded-full animate-spin mb-4"></div>
            
            {/* Teks Loading dengan warna Merah #B01030 dan font Nunito Sans */}
            <p className="text-[#B01030] text-[14px] font-bold tracking-[0.2em] uppercase animate-pulse">
                Loading...
            </p>
        </div>
    );
}