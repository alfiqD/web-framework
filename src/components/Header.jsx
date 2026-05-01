import { useState } from "react";
import { FaBell, FaSearch, FaHistory } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
    // State untuk mengontrol buka/tutup modal search
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <div id="header-container" className="flex justify-between items-center p-4 px-8 bg-white border-b border-gray-50 h-[80px]">
            
            {/* --- BAGIAN SEARCH BAR --- */}
            <div id="search-bar" className="relative w-full max-w-md z-50">
                <input
                    id="search-input"
                    type="text"
                    placeholder="Search patients, treatments..."
                    // Dibuat rounded-full dan hover ring pink pastel
                    className="bg-gray-50 text-gray-600 p-2.5 px-6 pr-10 w-full rounded-full outline-none focus:bg-white focus:ring-2 focus:ring-[#FCA5A5] focus:shadow-sm transition-all text-sm"
                    onFocus={() => setIsSearchOpen(true)}
                    onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
                />
                <FaSearch className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                
                {/* Kotak Modal Popup */}
                {isSearchOpen && (
                    <div className="absolute top-12 left-0 w-full bg-white border border-gray-100 rounded-2xl shadow-xl p-4 transition-all">
                        <span className="text-[10px] text-gray-400 font-bold uppercase mb-3 block tracking-wider">Recent Searches</span>
                        <ul className="space-y-1 text-sm text-gray-600">
                            {/* Dummy text disesuaikan ke tema beauty/klinik */}
                            <li className="flex items-center space-x-3 hover:bg-[#FFE4E6] hover:text-[#E17887] p-2.5 rounded-xl cursor-pointer transition-colors">
                                <FaHistory className="text-gray-300" /> <span>Facial Rejuvenation</span>
                            </li>
                            <li className="flex items-center space-x-3 hover:bg-[#D4F3E6] hover:text-[#7BBEA5] p-2.5 rounded-xl cursor-pointer transition-colors">
                                <FaHistory className="text-gray-300" /> <span>Sarah Miller Details</span>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            {/* --- BATAS SEARCH BAR --- */}

            <div id="icons-container" className="flex items-center space-x-4">
                
                {/* Ikon dengan background pastel bundar */}
                <div className="relative p-2.5 bg-[#D4F3E6] rounded-full text-[#7BBEA5] cursor-pointer hover:bg-[#c2ead9] transition-colors">
                    <FaBell className="text-lg" />
                    {/* Badge notifikasi disesuaikan jadi pink pastel mungil */}
                    <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-[#FCA5A5] border-2 border-white rounded-full px-1.5 py-0.5 text-[9px] font-bold text-white">
                        6
                    </span>
                </div>
                
                <div className="p-2.5 bg-gray-50 rounded-full cursor-pointer hover:bg-gray-100 transition-colors">
                    <FcAreaChart className="text-lg" />
                </div>
                
                <div className="p-2.5 bg-[#FFE4E6] rounded-full text-[#E17887] cursor-pointer hover:bg-[#ffd3d7] transition-colors">
                    <SlSettings className="text-lg" />
                </div>
                
                {/* Bagian Profil disesuaikan dengan gambar referensi */}
                <div className="flex items-center space-x-3 ml-2 pl-6 border-l border-gray-100 cursor-pointer">
                    <img src="/img/logoprofil.png" className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm" alt="Profile" />
                    <div className="flex flex-col hidden md:block">
                        <span className="text-sm font-bold text-gray-800 block leading-tight">Alfiq Debriliant</span>
                        <span className="text-[11px] font-medium text-gray-400 block">Admin</span>
                    </div>
                </div>

            </div>
        </div>
    );
}