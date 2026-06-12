import { useState, useEffect } from 'react';
import PageHeader from "../components/PageHeader";
import { 
    MdOutlineAutoAwesome, 
    MdOutlinePhone, 
    MdOutlineMail, 
    MdFilterList, 
    MdSearch, 
    MdFileDownload,
    MdMoreVert,
    MdEdit,
    MdDeleteOutline,
    MdTrendingUp,
    MdPeopleAlt
} from "react-icons/md";
// Import data JSON
import customersData from "../data/customers.json";

export default function Customers() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --- STATE UNTUK PENCARIAN, FILTER & PAGINATION ---
    const [searchTerm, setSearchTerm] = useState('');
    const [skinFilter, setSkinFilter] = useState('All');
    const [loyaltyFilter, setLoyaltyFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    
    // State baru khusus Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Menampilkan 10 data per halaman

    // --- LOGIKA PENCARIAN & FILTER DATA BERLAPIS ---
    const filteredCustomers = customersData.filter((cust) => {
        const matchesSearch = cust.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              cust.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchSkin = skinFilter === 'All' || cust.skinType === skinFilter;
        const matchLoyalty = loyaltyFilter === 'All' || cust.loyalty === loyaltyFilter;
        const matchStatus = statusFilter === 'All' || cust.status === statusFilter;
        
        return matchesSearch && matchSkin && matchLoyalty && matchStatus;
    });

    // Reset ke halaman 1 setiap kali user mengetik pencarian atau mengubah filter
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, skinFilter, loyaltyFilter, statusFilter]);

    // --- LOGIKA PEMOTONGAN DATA (PAGINATION) ---
    // Mencari index awal dan akhir untuk memotong array
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // Data yang benar-benar di-render ke tabel saat ini
    const currentCustomers = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);
    
    // Menghitung total halaman bulat ke atas (Contoh: 25 data / 10 = 3 halaman)
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

    // Membuat deret array nomor halaman [1, 2, 3, ...]
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // --- KALKULASI STATISTIK CRM ---
    const totalActive = customersData.filter(c => c.status === 'Active').length;
    const totalRevenueMock = "Rp 124.500.000"; 

    // Fungsi Helper untuk warna status LOYALTY
    const getLoyaltyStyles = (loyalty) => {
        switch (loyalty) {
            case 'Gold': return "bg-yellow-100 text-yellow-700 border-yellow-200 ring-1 ring-yellow-400/30";
            case 'Silver': return "bg-gray-100 text-gray-700 border-gray-200 ring-1 ring-gray-400/30";
            case 'Bronze': return "bg-orange-50 text-orange-700 border-orange-200 ring-1 ring-orange-400/30";
            default: return "bg-gray-100 text-gray-500";
        }
    };

    // Fungsi Helper untuk STATUS
    const getStatusStyles = (status) => {
        return status === 'Active' 
            ? "bg-green-50 text-green-600 ring-1 ring-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.2)]" 
            : "bg-gray-50 text-gray-400 ring-1 ring-gray-300";
    };

    return (
        <div id="dashboard-container" className="flex flex-col gap-6 font-nunito bg-[#F4F7FE] min-h-screen pb-10">
            
            <PageHeader title="Customer Management" breadcrumb={["Dashboard", "Customers"]}>
                <div className="flex gap-3">
                    {/* <button className="bg-white text-gray-600 border border-gray-200 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all font-bold text-sm flex items-center gap-2 shadow-sm active:scale-95">
                        <MdFileDownload className="text-lg" /> Export
                    </button> */}
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-gradient-to-r from-[#B01030] to-[#8e0d27] text-white px-5 py-2.5 rounded-xl hover:shadow-[0_8px_20px_-6px_rgba(176,16,48,0.6)] transition-all font-bold text-sm flex items-center gap-2 active:scale-95"
                    >
                        <MdOutlineAutoAwesome className="text-lg" /> New Customer
                    </button>
                </div>
            </PageHeader>

            {/* --- ANALYTICS SUMMARY CARDS --- */}
            <div className="mx-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* ... (Bagian Card tetap sama persis) ... */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center text-2xl">
                        <MdPeopleAlt />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Customers</p>
                        <h3 className="text-3xl font-black text-gray-800 leading-none">{customersData.length}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center text-2xl">
                        <MdOutlineAutoAwesome />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Active Members</p>
                        <h3 className="text-3xl font-black text-gray-800 leading-none">{totalActive}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#B01030] flex items-center justify-center text-2xl">
                        <MdTrendingUp />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Lifetime Value</p>
                        <h3 className="text-2xl font-black text-[#B01030] leading-none">{totalRevenueMock}</h3>
                    </div>
                </div>
            </div>

            {/* --- MAIN DATA CONTAINER --- */}
            <div className="mx-8 bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                
                {/* TOOLBAR: Search & Filters */}
                <div className="p-6 border-b border-gray-50 flex flex-col lg:flex-row justify-between items-center gap-4 bg-white/50 backdrop-blur-md">
                    
                    {/* Search Bar */}
                    <div className="relative w-full lg:w-80 group">
                        <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-[#B01030] transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search name or email..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-[#B01030]/10 focus:border-[#B01030] transition-all font-bold text-sm text-gray-700 placeholder-gray-400"
                        />
                    </div>

                    {/* Filter Dropdowns */}
                    <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
                        <div className="flex items-center gap-2 text-gray-400 font-bold mr-2 hidden md:flex">
                            <MdFilterList size={20} /> <span className="text-sm">Filters:</span>
                        </div>
                        
                        <select value={skinFilter} onChange={(e) => setSkinFilter(e.target.value)} className="bg-white border border-gray-200 text-gray-600 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] cursor-pointer shadow-sm transition-all">
                            <option value="All">Skin Type: All</option>
                            <option value="Normal">Normal</option>
                            <option value="Oily">Oily</option>
                            <option value="Dry">Dry</option>
                            <option value="Combination">Combination</option>
                            <option value="Sensitive">Sensitive</option>
                        </select>

                        <select value={loyaltyFilter} onChange={(e) => setLoyaltyFilter(e.target.value)} className="bg-white border border-gray-200 text-gray-600 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] cursor-pointer shadow-sm transition-all">
                            <option value="All">Tier: All</option>
                            <option value="Gold">Gold</option>
                            <option value="Silver">Silver</option>
                            <option value="Bronze">Bronze</option>
                        </select>

                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-white border border-gray-200 text-gray-600 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] cursor-pointer shadow-sm transition-all">
                            <option value="All">Status: All</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                {/* TABEL DATA */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="p-5 pl-8 text-[12px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Customer Profile</th>
                                <th className="p-5 text-[12px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Contact Info</th>
                                <th className="p-5 text-[12px] font-black text-gray-400 uppercase tracking-widest text-center border-b border-gray-100">Skin Type</th>
                                <th className="p-5 text-[12px] font-black text-gray-400 uppercase tracking-widest text-center border-b border-gray-100">Loyalty & Spend</th>
                                <th className="p-5 text-[12px] font-black text-gray-400 uppercase tracking-widest text-center border-b border-gray-100">Status</th>
                                <th className="p-5 pr-8 text-[12px] font-black text-gray-400 uppercase tracking-widest text-right border-b border-gray-100">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {/* PERUBAHAN: Gunakan currentCustomers, BUKAN filteredCustomers */}
                            {currentCustomers.length > 0 ? (
                                currentCustomers.map((cust) => (
                                    <tr key={cust.customerId} className="hover:bg-red-50/20 transition-colors group">
                                        <td className="p-5 pl-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center font-black text-gray-500 shadow-inner">
                                                    {cust.customerName.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="text-[15px] font-black text-gray-900 group-hover:text-[#B01030] transition-colors">{cust.customerName}</div>
                                                    <div className="text-[12px] font-bold text-gray-400 mt-0.5 tracking-wide">{cust.customerId}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className="text-[13px] font-bold text-gray-600 flex items-center gap-2 mb-1.5 hover:text-[#B01030] cursor-pointer transition-colors">
                                                <MdOutlineMail className="text-gray-400 text-lg" /> {cust.email}
                                            </div>
                                            <div className="text-[13px] font-bold text-gray-500 flex items-center gap-2">
                                                <MdOutlinePhone className="text-gray-400 text-lg" /> {cust.phone}
                                            </div>
                                        </td>
                                        <td className="p-5 text-center">
                                            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-[12px] font-black uppercase tracking-wider">
                                                {cust.skinType}
                                            </span>
                                        </td>
                                        <td className="p-5 text-center flex flex-col items-center justify-center gap-1.5">
                                            <span className={`inline-block px-4 py-1 rounded-full text-[11px] font-black uppercase tracking-widest min-w-[80px] text-center ${getLoyaltyStyles(cust.loyalty)}`}>
                                                {cust.loyalty}
                                            </span>
                                            <span className="text-[14px] font-black text-gray-800">
                                                {cust.totalSpend}
                                            </span>
                                        </td>
                                        <td className="p-5 text-center">
                                            <span className={`inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-black uppercase tracking-wider ${getStatusStyles(cust.status)}`}>
                                                {cust.status === 'Active' ? <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> : <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>}
                                                {cust.status}
                                            </span>
                                        </td>
                                        <td className="p-5 pr-8 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Edit">
                                                    <MdEdit size={18} />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all" title="Delete">
                                                    <MdDeleteOutline size={18} />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all" title="More Options">
                                                    <MdMoreVert size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="p-16 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <MdSearch className="text-6xl mb-4 text-gray-200" />
                                            <p className="font-black text-lg text-gray-500">Data Tidak Ditemukan</p>
                                            <p className="font-semibold text-sm mt-1">Coba sesuaikan kata kunci pencarian atau filter Anda.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* --- FOOTER TABEL: ACTIVE PAGINATION BUTTONS --- */}
                <div className="p-5 border-t border-gray-50 bg-gray-50/30 flex flex-col md:flex-row gap-4 justify-between items-center px-8">
                    <p className="text-sm font-bold text-gray-400">
                        Menampilkan <span className="text-gray-700">{filteredCustomers.length > 0 ? indexOfFirstItem + 1 : 0} - {Math.min(indexOfLastItem, filteredCustomers.length)}</span> dari <span className="text-gray-700">{filteredCustomers.length}</span> member
                    </p>
                    
                    {/* Tombol Navigasi Dinamis */}
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

            {/* MODAL FORM ADD CUSTOMER (Tetap dipertahankan) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
                    <div className="bg-white p-8 rounded-[2rem] w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-[24px] font-black text-gray-900 tracking-tight">Add New Customer</h2>
                            <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-[#B01030] hover:bg-red-50 font-bold text-xl transition-colors">×</button>
                        </div>
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black text-gray-500 ml-1 uppercase tracking-widest">Full Name</label>
                                <input type="text" placeholder="e.g. Nabila Putri" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] transition-all font-bold text-sm text-gray-800 placeholder-gray-400" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black text-gray-500 ml-1 uppercase tracking-widest">Email Address</label>
                                <input type="email" placeholder="e.g. nabila@mail.com" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] transition-all font-bold text-sm text-gray-800 placeholder-gray-400" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-black text-gray-500 ml-1 uppercase tracking-widest">Phone</label>
                                    <input type="text" placeholder="0812..." className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] transition-all font-bold text-sm text-gray-800 placeholder-gray-400" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-black text-gray-500 ml-1 uppercase tracking-widest">Skin Type</label>
                                    <select className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] transition-all font-bold text-sm text-gray-700 appearance-none cursor-pointer">
                                        <option value="Normal">Normal</option>
                                        <option value="Oily">Oily</option>
                                        <option value="Dry">Dry</option>
                                        <option value="Combination">Combination</option>
                                        <option value="Sensitive">Sensitive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-3 pt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 p-3.5 bg-gray-50 border border-gray-200 text-gray-600 rounded-xl font-black hover:bg-gray-100 transition-all text-sm">Cancel</button>
                                <button type="submit" className="flex-1 p-3.5 bg-gradient-to-r from-[#B01030] to-[#8e0d27] text-white rounded-xl font-black hover:shadow-[0_8px_20px_-6px_rgba(176,16,48,0.6)] transition-all active:scale-95 text-sm">Save Customer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}