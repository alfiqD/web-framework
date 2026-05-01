import { Outlet } from "react-router-dom";
import { MdOutlineAutoAwesome } from "react-icons/md";

export default function AuthLayout() {
    return (
        // Menggunakan background abu-abu sangat muda/putih tulang agar card putihnya lebih menonjol
        <div className="min-h-screen flex items-center justify-center bg-[#fafaf9] p-4">
            
            {/* Card form dengan sudut membulat dan shadow pink lembut */}
            <div className="bg-white p-10 rounded-[2rem] shadow-xl shadow-pink-100/40 w-full max-w-md border border-pink-50/50">
                
                {/* Logo Section */}
                <div className="flex items-center justify-center gap-2 mb-10">
                    <MdOutlineAutoAwesome className="text-[#FCA5A5] text-3xl" />
                    <h1 className="text-3xl font-poppins font-bold text-gray-800 tracking-wide">
                        byutie
                    </h1>
                </div>

                {/* Konten Form (Login/Register) masuk di sini */}
                <Outlet/>

                {/* Footer Copyright */}
                <p className="text-center text-xs font-medium text-gray-400 mt-8">
                    © 2026 Beauty Store Admin Dashboard. <br/> All rights reserved.
                </p>
            </div>
            
        </div>
    );
}