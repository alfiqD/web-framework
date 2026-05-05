import { useState } from "react";
import { FaBell, FaSearch, FaHistory, FaChevronDown, FaBars } from "react-icons/fa";

export default function Header() {
    // State untuk mengontrol buka/tutup modal search
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <div id="header-container" className="flex justify-between items-center px-8 bg-white border-b border-gray-100 h-[80px] font-nunito">
            
            {/* --- BAGIAN SEARCH BAR --- */}
            <div className="flex items-center space-x-6 flex-1">
                {/* Icon Hamburger Menu sesuai gambar referensi */}
                <FaBars className="text-[#202224] text-lg cursor-pointer" />

                <div id="search-bar" className="relative w-full max-w-[400px]">
                    <div className="relative">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                        <input
                            id="search-input"
                            type="text"
                            placeholder="Search"
                            // Background abu-abu muda sesuai gambar referensi
                            className="bg-[#F5F6FA] text-[#202224] p-2.5 pl-12 w-full rounded-full outline-none border border-transparent focus:bg-white focus:border-[#B01030] focus:ring-1 focus:ring-[#B01030] transition-all text-[14px]"
                            onFocus={() => setIsSearchOpen(true)}
                            onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
                        />
                    </div>
                    
                    {/* Kotak Modal Popup */}
                    {isSearchOpen && (
                        <div className="absolute top-14 left-0 w-full bg-white border border-gray-100 rounded-2xl shadow-xl p-4 z-50">
                            <span className="text-[11px] text-gray-400 font-bold uppercase mb-3 block tracking-wider">Recent Searches</span>
                            <ul className="space-y-1 text-[14px] text-[#202224]">
                                <li className="flex items-center space-x-3 hover:bg-gray-50 p-2.5 rounded-xl cursor-pointer transition-colors">
                                    <FaHistory className="text-gray-300" /> <span>Facial Treatment</span>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* --- BAGIAN ICONS & PROFIL --- */}
            <div id="icons-container" className="flex items-center space-x-6">
                
                {/* Ikon Bell dengan Notifikasi Merah #B01030 */}
                <div className="relative cursor-pointer group">
                    <FaBell className="text-xl text-[#202224] group-hover:text-[#B01030] transition-colors" />
                    <span className="absolute -top-1.5 -right-1.5 bg-[#B01030] border-2 border-white rounded-full h-5 w-5 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                        6
                    </span>
                </div>

                {/* Pemilih Bahasa (Sesuai gambar referensi) */}
                <div className="flex items-center space-x-2 cursor-pointer border-r border-gray-100 pr-4">
                    <img 
                        src="https://flagcdn.com/w40/gb.png" 
                        alt="English" 
                        className="w-7 h-4.5 object-cover rounded-sm shadow-sm"
                    />
                    <span className="text-[14px] font-semibold text-[#202224]">English</span>
                    <FaChevronDown className="text-[10px] text-gray-400" />
                </div>
                
                {/* Bagian Profil */}
                <div className="flex items-center space-x-3 pl-2 cursor-pointer group">
                    <img 
                        src="/img/logoprofil.png" 
                        className="w-11 h-11 rounded-full object-cover border-2 border-gray-50 shadow-sm" 
                        alt="Profile" 
                    />
                    <div className="hidden lg:flex flex-col">
                        <span className="text-[14px] font-bold text-[#202224] leading-tight">Moni Roy</span>
                        <span className="text-[12px] font-semibold text-gray-500">Admin</span>
                    </div>
                    {/* Icon Chevron di dalam lingkaran kecil sesuai gambar */}
                    <div className="w-6 h-6 border border-gray-200 rounded-full flex items-center justify-center group-hover:border-[#B01030] transition-colors">
                         <FaChevronDown className="text-[9px] text-gray-400 group-hover:text-[#B01030]" />
                    </div>
                </div>

            </div>
        </div>
    );
}