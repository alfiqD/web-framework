import { useState, useEffect } from 'react';
import PageHeader from "../components/PageHeader";
import { 
    MdSearch, 
    MdFilterList, 
    MdAdd,
    MdMoreVert,
    MdOutlineSpa,
    MdFaceRetouchingNatural,
    MdAccessTime,
    MdTrendingUp,
    MdOutlineEdit,
    MdDeleteOutline
} from "react-icons/md";
// Import data JSON
import treatmentsData from "../data/treatments.json";

export default function Treatments() {
    // --- STATE UNTUK PENCARIAN, FILTER & PAGINATION ---
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // --- LOGIKA FILTER DATA ---
    const filteredTreatments = treatmentsData.filter((trt) => {
        const matchesSearch = trt.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCategory = categoryFilter === 'All' || trt.category === categoryFilter;
        return matchesSearch && matchCategory;
    });

    // Reset pagination ketika filter berubah
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, categoryFilter]);

    // --- LOGIKA PEMOTONGAN DATA (PAGINATION) ---
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTreatments = filteredTreatments.slice(indexOfFirstItem, indexOfLastItem);
    
    const totalPages = Math.ceil(filteredTreatments.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    // --- KALKULASI STATISTIK OTOMATIS ---
    const activeTreatments = treatmentsData.filter(t => t.status === 'Available').length;
    
    // Mencari treatment paling populer (booking terbanyak)
    const popularTreatment = treatmentsData.reduce((prev, current) => 
        (prev.bookingsThisMonth > current.bookingsThisMonth) ? prev : current
    );

    // Menghitung jumlah kategori unik
    const uniqueCategories = [...new Set(treatmentsData.map(item => item.category))].length;

    // Fungsi Helper Format Rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency', currency: 'IDR', minimumFractionDigits: 0
        }).format(number);
    };

    // Fungsi Helper Warna Badge Kategori
    const getCategoryBadge = (category) => {
        switch (category) {
            case 'Facial Care': 
                return <span className="bg-pink-50 text-pink-600 px-3 py-1.5 rounded-lg text-[12px] font-black border border-pink-100">{category}</span>;
            case 'Body Care': 
                return <span className="bg-green-50 text-green-600 px-3 py-1.5 rounded-lg text-[12px] font-black border border-green-100">{category}</span>;
            case 'Hair Care': 
                return <span className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-[12px] font-black border border-blue-100">{category}</span>;
            case 'Nail Care': 
                return <span className="bg-purple-50 text-purple-600 px-3 py-1.5 rounded-lg text-[12px] font-black border border-purple-100">{category}</span>;
            case 'Eye Care': 
                return <span className="bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg text-[12px] font-black border border-orange-100">{category}</span>;
            default: 
                return <span className="bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg text-[12px] font-black border border-gray-200">{category}</span>;
        }
    };

    return (
        <div id="dashboard-container" className="flex flex-col gap-6 font-nunito bg-[#F4F7FE] min-h-screen pb-10">
            
            <PageHeader title="Services & Treatments" breadcrumb={["Dashboard", "Catalog", "Treatments"]}>
                <button className="bg-[#B01030] text-white px-5 py-2.5 rounded-xl hover:bg-[#8e0d27] transition-all font-bold text-sm flex items-center gap-2 shadow-lg shadow-red-900/20 active:scale-95">
                    <MdAdd className="text-xl" /> Add Treatment
                </button>
            </PageHeader>

            {/* --- ANALYTICS SUMMARY CARDS --- */}
            <div className="mx-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-500 flex items-center justify-center text-2xl relative z-10">
                        <MdOutlineSpa />
                    </div>
                    <div className="relative z-10">
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Active Treatments</p>
                        <h3 className="text-3xl font-black text-gray-800 leading-none">{activeTreatments} <span className="text-lg text-gray-400">/ {treatmentsData.length}</span></h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center text-2xl">
                        <MdFaceRetouchingNatural />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Service Categories</p>
                        <h3 className="text-3xl font-black text-gray-800 leading-none">{uniqueCategories} <span className="text-[13px] text-gray-400 font-bold ml-1">Types</span></h3>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-[#B01030] to-[#8e0d27] p-6 rounded-3xl shadow-lg shadow-red-900/10 flex items-center gap-5 hover:shadow-xl transition-shadow text-white relative overflow-hidden">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl relative z-10 text-white border border-white/20">
                        <MdTrendingUp />
                    </div>
                    <div className="relative z-10 overflow-hidden">
                        <p className="text-[11px] font-black text-red-200 uppercase tracking-widest mb-1">Top This Month</p>
                        <h3 className="text-[15px] font-black leading-tight truncate w-40" title={popularTreatment.name}>{popularTreatment.name}</h3>
                        <p className="text-sm font-semibold text-red-100 mt-0.5">{popularTreatment.bookingsThisMonth} Bookings</p>
                    </div>
                    <div className="absolute right-0 top-0 opacity-10 text-9xl pointer-events-none transform translate-x-4 -translate-y-4">
                        <MdTrendingUp />
                    </div>
                </div>
            </div>

            {/* --- MAIN DATA CONTAINER --- */}
            <div className="mx-8 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                
                {/* TOOLBAR */}
                <div className="p-6 border-b border-gray-50 flex flex-col lg:flex-row justify-between items-center gap-4 bg-white/50 backdrop-blur-md">
                    <div className="relative w-full lg:w-96 group">
                        <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-[#B01030] transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search treatment name..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-[#B01030]/10 focus:border-[#B01030] transition-all font-bold text-sm text-gray-700 placeholder-gray-400"
                        />
                    </div>
                    
                    <div className="flex items-center gap-3 w-full lg:w-auto">
                        <div className="flex items-center gap-2 text-gray-400 font-bold mr-2">
                            <MdFilterList size={20} /> <span className="text-sm hidden sm:inline">Category:</span>
                        </div>
                        <select 
                            value={categoryFilter} 
                            onChange={(e) => setCategoryFilter(e.target.value)} 
                            className="w-full sm:w-auto bg-white border border-gray-200 text-gray-600 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] cursor-pointer shadow-sm transition-all"
                        >
                            <option value="All">All Categories</option>
                            <option value="Facial Care">Facial Care</option>
                            <option value="Body Care">Body Care</option>
                            <option value="Hair Care">Hair Care</option>
                            <option value="Nail Care">Nail Care</option>
                            <option value="Eye Care">Eye Care</option>
                        </select>
                    </div>
                </div>

                {/* TABEL DATA */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="p-5 pl-8 text-[12px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Treatment Name</th>
                                <th className="p-5 text-[12px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Category</th>
                                <th className="p-5 text-[12px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Duration</th>
                                <th className="p-5 text-[12px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Price</th>
                                <th className="p-5 text-[12px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Status</th>
                                <th className="p-5 pr-8 text-[12px] font-black text-gray-400 uppercase tracking-widest text-right border-b border-gray-100">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {currentTreatments.length > 0 ? currentTreatments.map((trt) => (
                                <tr key={trt.id} className="hover:bg-gray-50/50 transition-colors group">
                                    
                                    {/* Kolom 1: Name */}
                                    <td className="p-5 pl-8">
                                        <div className="text-[15px] font-black text-gray-900 mb-0.5">{trt.name}</div>
                                        <div className="text-[11px] font-bold text-gray-400">{trt.bookingsThisMonth} Bookings this month</div>
                                    </td>
                                    
                                    {/* Kolom 2: Category */}
                                    <td className="p-5">
                                        {getCategoryBadge(trt.category)}
                                    </td>

                                    {/* Kolom 3: Duration */}
                                    <td className="p-5">
                                        <div className="flex items-center gap-1.5 text-[13px] font-bold text-gray-600 bg-gray-100/50 px-3 py-1.5 rounded-lg w-fit">
                                            <MdAccessTime className="text-gray-400" /> {trt.duration}
                                        </div>
                                    </td>

                                    {/* Kolom 4: Price */}
                                    <td className="p-5">
                                        <div className="text-[14px] font-black text-[#B01030]">
                                            {formatRupiah(trt.price)}
                                        </div>
                                    </td>

                                    {/* Kolom 5: Status */}
                                    <td className="p-5">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${trt.status === 'Available' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-gray-300'}`}></div>
                                            <span className={`text-[13px] font-bold ${trt.status === 'Available' ? 'text-gray-700' : 'text-gray-400 line-through'}`}>
                                                {trt.status}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Kolom 6: Action */}
                                    <td className="p-5 pr-8 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100" title="Edit">
                                                <MdOutlineEdit size={18} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100" title="Delete">
                                                <MdDeleteOutline size={18} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all" title="More">
                                                <MdMoreVert size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="p-16 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <MdOutlineSpa className="text-6xl mb-4 text-gray-200" />
                                            <p className="font-black text-lg text-gray-500">Treatment Tidak Ditemukan</p>
                                            <p className="font-semibold text-sm mt-1">Coba sesuaikan kata kunci atau kategori pencarian.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* --- FOOTER TABEL: PAGINATION --- */}
                <div className="p-5 border-t border-gray-50 bg-gray-50/30 flex flex-col md:flex-row gap-4 justify-between items-center px-8">
                    <p className="text-sm font-bold text-gray-400">
                        Showing <span className="text-gray-700">{filteredTreatments.length > 0 ? indexOfFirstItem + 1 : 0} - {Math.min(indexOfLastItem, filteredTreatments.length)}</span> of <span className="text-gray-700">{filteredTreatments.length}</span> services
                    </p>
                    
                    <div className="flex gap-1.5">
                        <button 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 border rounded-xl text-sm font-bold transition-all ${currentPage === 1 ? 'border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50' : 'border-gray-200 text-gray-600 hover:bg-white shadow-sm'}`}
                        >
                            Prev
                        </button>
                        
                        {pageNumbers.map(number => (
                            <button 
                                key={number}
                                onClick={() => setCurrentPage(number)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all ${currentPage === number ? 'bg-[#B01030] text-white shadow-md' : 'border border-gray-200 text-gray-600 hover:bg-white bg-transparent'}`}
                            >
                                {number}
                            </button>
                        ))}

                        <button 
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className={`px-4 py-2 border rounded-xl text-sm font-bold transition-all ${currentPage === totalPages || totalPages === 0 ? 'border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50' : 'border-gray-200 text-gray-600 hover:bg-white shadow-sm'}`}
                        >
                            Next
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}