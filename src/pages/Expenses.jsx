import { useState, useEffect } from 'react';
import PageHeader from "../components/PageHeader";
import { 
    MdSearch, 
    MdAdd, 
    MdMoreVert, 
    MdTrendingDown, 
    MdOutlineInventory2, 
    MdCampaign, 
    MdReceiptLong, 
    MdFileDownload,
    MdFilterList,
    MdOutlineAccountBalanceWallet,
    MdPendingActions,
    MdFlashOn,
    MdBuild,
    MdOutlineEdit,
    MdDeleteOutline
} from "react-icons/md";
import expensesData from "../data/expenses.json";

export default function Expenses() {
    // --- STATE MANAGEMENT ---
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // --- LOGIKA FILTER DATA ---
    const filteredExpenses = expensesData.filter((exp) => {
        const matchesSearch = exp.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              exp.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = statusFilter === 'All' || exp.status === statusFilter;
        return matchesSearch && matchStatus;
    });

    // Reset pagination ketika filter berubah
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter]);

    // --- LOGIKA PEMOTONGAN DATA (PAGINATION) ---
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentExpenses = filteredExpenses.slice(indexOfFirstItem, indexOfLastItem);
    
    const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    // --- KALKULASI STATISTIK OTOMATIS ---
    const formatIDR = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
    
    const totalExpense = expensesData.reduce((acc, curr) => acc + curr.amount, 0);
    const pendingExpense = expensesData.filter(exp => exp.status === 'Pending').reduce((acc, curr) => acc + curr.amount, 0);

    // Fungsi Helper Warna & Ikon Kategori
    const getCategoryBadge = (category) => {
        switch (category) {
            case 'Inventory': 
                return <span className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-[11px] font-black border border-blue-100 w-fit"><MdOutlineInventory2 /> {category}</span>;
            case 'Marketing': 
                return <span className="flex items-center gap-1.5 bg-pink-50 text-pink-600 px-3 py-1.5 rounded-lg text-[11px] font-black border border-pink-100 w-fit"><MdCampaign /> {category}</span>;
            case 'Salary': 
                return <span className="flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1.5 rounded-lg text-[11px] font-black border border-green-100 w-fit"><MdOutlineAccountBalanceWallet /> {category}</span>;
            case 'Utilities': 
                return <span className="flex items-center gap-1.5 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg text-[11px] font-black border border-orange-100 w-fit"><MdFlashOn /> {category}</span>;
            case 'Operational': 
                return <span className="flex items-center gap-1.5 bg-purple-50 text-purple-600 px-3 py-1.5 rounded-lg text-[11px] font-black border border-purple-100 w-fit"><MdBuild /> {category}</span>;
            default: 
                return <span className="flex items-center gap-1.5 bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg text-[11px] font-black border border-gray-200 w-fit">{category}</span>;
        }
    };

    return (
        <div className="flex flex-col gap-6 font-nunito bg-[#F4F7FE] min-h-screen pb-10">
            
            <PageHeader title="Business Expenses" breadcrumb={["Dashboard", "Expenses"]}>
                {/* <button className="bg-white text-gray-600 border border-gray-200 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all font-bold text-sm flex items-center gap-2 shadow-sm active:scale-95">
                    <MdFileDownload className="text-lg" /> Export Report
                </button> */}
            </PageHeader>

            {/* --- ANALYTICS CARDS (3 Grid Layout) --- */}
            <div className="mx-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#B01030] flex items-center justify-center text-2xl relative z-10">
                        <MdTrendingDown />
                    </div>
                    <div className="relative z-10">
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Expenses</p>
                        <h3 className="text-2xl font-black text-gray-800 leading-none">{formatIDR(totalExpense)}</h3>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-yellow-50 text-yellow-600 flex items-center justify-center text-2xl">
                        <MdPendingActions />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Pending Payments</p>
                        <h3 className="text-2xl font-black text-gray-800 leading-none">{formatIDR(pendingExpense)}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center text-2xl">
                        <MdReceiptLong />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Records</p>
                        <h3 className="text-3xl font-black text-gray-800 leading-none">{expensesData.length} <span className="text-sm text-gray-400 font-bold">Trx</span></h3>
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
                            placeholder="Search description or category..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-[#B01030]/10 focus:border-[#B01030] transition-all font-bold text-sm text-gray-700 placeholder-gray-400"
                        />
                    </div>
                    
                    <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
                        <div className="flex items-center gap-2 text-gray-400 font-bold mr-2 hidden sm:flex">
                            <MdFilterList size={20} /> <span className="text-sm">Status:</span>
                        </div>
                        <select 
                            value={statusFilter} 
                            onChange={(e) => setStatusFilter(e.target.value)} 
                            className="w-full sm:w-auto bg-white border border-gray-200 text-gray-600 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] cursor-pointer shadow-sm transition-all"
                        >
                            <option value="All">All Status</option>
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>
                        </select>
                        <button className="bg-[#B01030] text-white px-5 py-3 rounded-xl hover:bg-[#8e0d27] transition-all font-bold text-sm flex items-center gap-2 shrink-0 shadow-md shadow-red-900/10 active:scale-95">
                            <MdAdd size={20} /> Record Expense
                        </button>
                    </div>
                </div>

                {/* TABEL DATA */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="p-5 pl-8 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Date & ID</th>
                                <th className="p-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Category</th>
                                <th className="p-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Description</th>
                                <th className="p-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Amount</th>
                                <th className="p-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Status</th>
                                <th className="p-5 pr-8 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right border-b border-gray-100">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {currentExpenses.length > 0 ? currentExpenses.map((item) => (
                                <tr key={item.id} className="hover:bg-red-50/10 transition-colors group">
                                    {/* Kolom 1: Tanggal & ID */}
                                    <td className="p-5 pl-8">
                                        <div className="text-[14px] font-black text-gray-900">{item.date}</div>
                                        <div className="text-[11px] font-bold text-gray-400 mt-0.5">EXP-{item.id.toString().padStart(4, '0')}</div>
                                    </td>
                                    
                                    {/* Kolom 2: Kategori */}
                                    <td className="p-5">
                                        {getCategoryBadge(item.category)}
                                    </td>

                                    {/* Kolom 3: Deskripsi */}
                                    <td className="p-5">
                                        <div className="text-[14px] font-bold text-gray-600 max-w-xs truncate" title={item.description}>
                                            {item.description}
                                        </div>
                                    </td>

                                    {/* Kolom 4: Jumlah Uang */}
                                    <td className="p-5">
                                        <div className="text-[15px] font-black text-[#B01030]">
                                            {formatIDR(item.amount)}
                                        </div>
                                    </td>

                                    {/* Kolom 5: Status */}
                                    <td className="p-5">
                                        <span className={`px-3 py-1.5 rounded-lg text-[11px] font-black shadow-sm ${item.status === 'Paid' ? 'bg-green-50 text-green-600 ring-1 ring-green-500/30' : 'bg-yellow-50 text-yellow-600 ring-1 ring-yellow-500/30'}`}>
                                            {item.status}
                                        </span>
                                    </td>

                                    {/* Kolom 6: Aksi Hover */}
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
                                            <MdTrendingDown className="text-6xl mb-4 text-gray-200" />
                                            <p className="font-black text-lg text-gray-500">Data Tidak Ditemukan</p>
                                            <p className="font-semibold text-sm mt-1">Coba sesuaikan kata kunci atau filter pencarian Anda.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* --- FOOTER PAGINATION --- */}
                <div className="p-5 border-t border-gray-50 bg-gray-50/30 flex flex-col md:flex-row gap-4 justify-between items-center px-8">
                    <p className="text-sm font-bold text-gray-400">
                        Showing <span className="text-gray-700">{filteredExpenses.length > 0 ? indexOfFirstItem + 1 : 0} - {Math.min(indexOfLastItem, filteredExpenses.length)}</span> of <span className="text-gray-700">{filteredExpenses.length}</span> records
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