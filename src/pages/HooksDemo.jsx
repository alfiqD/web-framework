import React, { useState, useEffect, useRef } from 'react';
import PageHeader from "../components/PageHeader";
import { MdSearch, MdClear, MdInfoOutline, MdOutlineInventory2 } from "react-icons/md";

// Import data JSON asli Byutie App
import makeupData from "../data/jenismakeup.json"; 

export default function HooksDemo() {
    // =================================================================
    // 1. IMPLEMENTASI useState (Manajemen State Dinamis)
    // -----------------------------------------------------------------
    // • FUNGSI : Menyimpan kata kunci pencarian dan status loading.
    // • ALASAN : Aplikasi perlu mengingat apa yang diketik user saat ini.
    // • EFEK   : Setiap kali `setSearchTerm` dipanggil, React akan 
    //            langsung me-render ulang bagian UI (Live Output) 
    //            untuk menampilkan data terbaru tanpa refresh browser.
    // =================================================================
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    // =================================================================
    // 2. IMPLEMENTASI useRef (Akses Referensi DOM Fisik)
    // -----------------------------------------------------------------
    // • FUNGSI : Menyimpan 'koneksi' langsung ke elemen <input> HTML.
    // • ALASAN : Digunakan untuk memindahkan kursor ketik (Auto-Focus).
    // • EFEK   : Berbeda dengan useState, memanggil `useRef` tidak 
    //            akan memicu proses re-render pada komponen, sehingga
    //            sangat menghemat memori untuk aksi sederhana.
    // =================================================================
    const searchInputRef = useRef(null);

    // =================================================================
    // 3. IMPLEMENTASI useEffect (Manajemen Side-Effect)
    // -----------------------------------------------------------------
    // • FUNGSI : Mengubah Document Title & memicu Auto-Focus.
    // • ALASAN : Manipulasi di luar sistem React (seperti judul tab) 
    //            harus diisolasi agar tidak menyebabkan error/loop.
    // • EFEK   : Dengan array kosong `[]`, sistem dipaksa hanya
    //            menjalankan perintah ini TEPAT SATU KALI pada saat 
    //            halaman selesai dimuat (Mounting Phase).
    // =================================================================
    useEffect(() => {
        document.title = "Hooks Demo - Byutie App";
        
        // Memaksa kursor langsung aktif di dalam kotak pencarian
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    // Handler saat user mengetik di keyboard
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setIsSearching(true);
        setTimeout(() => setIsSearching(false), 300); // Simulasi delay
    };

    // Handler untuk membersihkan teks dan mengembalikan fokus (useRef)
    const handleClear = () => {
        setSearchTerm('');
        if (searchInputRef.current) {
            searchInputRef.current.focus(); 
        }
    };

    // LOGIKA FILTER: Mencari produk yang cocok dengan ketikan user
    const filteredProducts = makeupData.filter((item) => {
        const titleMatch = (item.title || item.tittle).toLowerCase().includes(searchTerm.toLowerCase());
        const codeMatch = item.code.toLowerCase().includes(searchTerm.toLowerCase());
        return titleMatch || codeMatch;
    });

    return (
        <div id="dashboard-container" className="flex flex-col gap-6 font-nunito bg-[#F5F6FA] min-h-screen pb-10">
            <PageHeader title="React Hooks Demo" breadcrumb={["Dashboard", "Hooks Demo"]} />
            
            <div className="mx-8 bg-white rounded-[32px] shadow-sm border border-gray-100 p-8">
                
                {/* Header Konten */}
                <div className="flex items-center gap-3 mb-2">
                    <MdInfoOutline className="text-[#B01030] text-3xl" />
                    <h2 className="text-2xl font-extrabold text-[#B01030]">Quick Product Search</h2>
                </div>
                <p className="text-gray-500 mb-8 ml-10">
                    Halaman ini mendemonstrasikan implementasi <b>useState, useEffect, dan useRef</b> terintegrasi dengan modul inventaris Byutie App.
                </p>

                {/* Area Input */}
                <div className="flex gap-4 items-center ml-10">
                    <div className="relative flex-1 max-w-lg">
                        <MdSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-2xl" />
                        
                        <input 
                            type="text"
                            ref={searchInputRef} // <--- Ikatan useRef
                            value={searchTerm}   // <--- Ikatan useState
                            onChange={handleSearchChange}
                            placeholder="Ketik nama produk atau kode (cth: Lipstick / MK001)..."
                            className="w-full pl-14 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ring-[#B01030]/30 transition-all font-semibold text-[#202224] shadow-inner"
                        />

                        {searchTerm && (
                            <button onClick={handleClear} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#B01030] transition-colors">
                                <MdClear className="text-2xl" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Area Output Dinamis */}
                <div className="mt-8 ml-10 p-6 bg-gray-50/50 rounded-2xl border border-gray-100 min-h-[150px]">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Live State Output:</h3>
                    
                    {isSearching ? (
                        <p className="text-gray-500 font-semibold animate-pulse">Mencari kecocokan data...</p>
                    ) : searchTerm ? (
                        <div>
                            <p className="text-[#202224] font-bold text-[14px] mb-4">
                                Ditemukan <span className="text-[#B01030] bg-[#fde1e1] px-2 py-0.5 rounded-md">{filteredProducts.length}</span> produk untuk kata kunci: <span className="underline decoration-wavy underline-offset-4">{searchTerm}</span>
                            </p>
                            
                            {/* Pemetaan Data Filter */}
                            {filteredProducts.length > 0 ? (
                                <ul className="space-y-2">
                                    {filteredProducts.slice(0, 5).map((product) => (
                                        <li key={product.productId || product.id} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                                            <MdOutlineInventory2 className="text-gray-400" />
                                            <div>
                                                <p className="text-[13px] font-extrabold text-[#202224]">{product.title || product.tittle}</p>
                                                <p className="text-[11px] font-bold text-gray-400">Kode: {product.code} | Stok: {product.stock}</p>
                                            </div>
                                        </li>
                                    ))}
                                    {filteredProducts.length > 5 && (
                                        <p className="text-[11px] font-bold text-gray-400 italic mt-2">+ {filteredProducts.length - 5} produk lainnya...</p>
                                    )}
                                </ul>
                            ) : (
                                <p className="text-red-500 font-bold text-sm">Oops, produk tidak ditemukan di inventaris.</p>
                            )}
                        </div>
                    ) : (
                        <p className="text-gray-400 font-semibold">Ketik sesuatu di kotak pencarian, data akan disaring secara seketika (real-time).</p>
                    )}
                </div>

            </div>
        </div>
    );
}