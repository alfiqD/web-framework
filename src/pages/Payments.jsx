import { useState, useEffect } from 'react';
import PageHeader from "../components/PageHeader";
import { 
    MdSearch, 
    MdFilterList, 
    MdFileDownload,
    MdMoreVert,
    MdOutlinePayment,
    MdCheckCircle,
    MdPendingActions,
    MdCancel,
    MdAccountBalanceWallet,
    MdReceiptLong
} from "react-icons/md";
// Import data JSON
import paymentsData from "../data/payments.json";

export default function Payments() {
    // --- STATE UNTUK PENCARIAN, FILTER & PAGINATION ---
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [methodFilter, setMethodFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // --- LOGIKA FILTER DATA ---
    const filteredPayments = paymentsData.filter((trx) => {
        const matchesSearch = trx.trxId.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              trx.customerName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = statusFilter === 'All' || trx.status === statusFilter;
        
        // Filter Method Grouping (Opsional untuk mempermudah)
        const isEwallet = ["GoPay", "ShopeePay", "OVO"].includes(trx.method);
        const isBank = trx.method.includes("VA") || trx.method === "Credit Card";
        
        let matchMethod = true;
        if (methodFilter === 'E-Wallet') matchMethod = isEwallet;
        else if (methodFilter === 'Bank Transfer') matchMethod = isBank;
        else if (methodFilter === 'COD') matchMethod = trx.method === "COD";

        return matchesSearch && matchStatus && matchMethod;
    });

    // Reset pagination
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter, methodFilter]);

    // --- LOGIKA PEMOTONGAN DATA (PAGINATION) ---
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPayments = filteredPayments.slice(indexOfFirstItem, indexOfLastItem);
    
    const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    // --- KALKULASI STATISTIK KEUANGAN ---
    const completedTrx = paymentsData.filter(p => p.status === 'Completed');
    const totalRevenue = completedTrx.reduce((acc, curr) => acc + curr.amount, 0);
    const pendingTrxCount = paymentsData.filter(p => p.status === 'Pending').length;

    // Fungsi Helper Format Rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency', currency: 'IDR', minimumFractionDigits: 0
        }).format(number);
    };

    // Fungsi Helper Warna Badge Status
    const getStatusBadge = (status) => {
        switch (status) {
            case 'Completed': 
                return <span className="flex items-center gap-1.5 bg-green-50 text-green-600 ring-1 ring-green-500/30 px-3 py-1.5 rounded-xl text-[12px] font-black shadow-sm tracking-wide w-fit"><MdCheckCircle /> Success</span>;
            case 'Pending': 
                return <span className="flex items-center gap-1.5 bg-yellow-50 text-yellow-600 ring-1 ring-yellow-500/30 px-3 py-1.5 rounded-xl text-[12px] font-black shadow-sm tracking-wide w-fit"><MdPendingActions /> Pending</span>;
            case 'Failed': 
                return <span className="flex items-center gap-1.5 bg-red-50 text-red-600 ring-1 ring-red-500/30 px-3 py-1.5 rounded-xl text-[12px] font-black shadow-sm tracking-wide w-fit"><MdCancel /> Failed</span>;
            default: 
                return <span>{status}</span>;
        }
    };

    return (
        <div id="dashboard-container" className="flex flex-col gap-6 font-nunito bg-[#F4F7FE] min-h-screen pb-10">
            
            <PageHeader title="Payment Records" breadcrumb={["Dashboard", "Payments"]}>
                {/* <button className="bg-white text-gray-600 border border-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-all font-bold text-sm flex items-center gap-2 shadow-sm active:scale-95">
                    <MdFileDownload className="text-lg" /> Download Report
                </button> */}
            </PageHeader>

            {/* --- ANALYTICS SUMMARY CARDS --- */}
            <div className="mx-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center text-2xl relative z-10">
                        <MdAccountBalanceWallet />
                    </div>
                    <div className="relative z-10">
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Revenue</p>
                        <h3 className="text-3xl font-black text-gray-800 leading-none">{formatRupiah(totalRevenue)}</h3>
                    </div>
                    <div className="absolute -right-4 -bottom-4 opacity-5 text-green-500 text-9xl pointer-events-none"><MdAccountBalanceWallet /></div>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center text-2xl">
                        <MdCheckCircle />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Successful Trx</p>
                        <h3 className="text-3xl font-black text-gray-800 leading-none">{completedTrx.length} <span className="text-lg text-gray-400 font-bold">/ {paymentsData.length}</span></h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-yellow-50 text-yellow-500 flex items-center justify-center text-2xl">
                        <MdPendingActions />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Pending Clearance</p>
                        <h3 className="text-3xl font-black text-gray-800 leading-none">{pendingTrxCount}</h3>
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
                            placeholder="Search Trx ID or Customer..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-[#B01030]/10 focus:border-[#B01030] transition-all font-bold text-sm text-gray-700 placeholder-gray-400"
                        />
                    </div>
                    
                    <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
                        <div className="flex items-center gap-2 text-gray-400 font-bold mr-2 hidden md:flex">
                            <MdFilterList size={20} /> <span className="text-sm">Filters:</span>
                        </div>
                        
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-white border border-gray-200 text-gray-600 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] cursor-pointer shadow-sm transition-all">
                            <option value="All">All Status</option>
                            <option value="Completed">Success</option>
                            <option value="Pending">Pending</option>
                            <option value="Failed">Failed</option>
                        </select>

                        <select value={methodFilter} onChange={(e) => setMethodFilter(e.target.value)} className="bg-white border border-gray-200 text-gray-600 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] cursor-pointer shadow-sm transition-all">
                            <option value="All">All Methods</option>
                            <option value="Bank Transfer">Bank Transfer / CC</option>
                            <option value="E-Wallet">E-Wallet</option>
                            <option value="COD">COD</option>
                        </select>
                    </div>
                </div>

                {/* TABEL DATA */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="p-5 pl-8 text-[12px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Transaction Info</th>
                                <th className="p-5 text-[12px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Customer</th>
                                <th className="p-5 text-[12px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Payment Method</th>
                                <th className="p-5 text-[12px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Amount</th>
                                <th className="p-5 text-[12px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Status</th>
                                <th className="p-5 pr-8 text-[12px] font-black text-gray-400 uppercase tracking-widest text-right border-b border-gray-100">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {currentPayments.length > 0 ? currentPayments.map((trx) => (
                                <tr key={trx.id} className="hover:bg-red-50/20 transition-colors group">
                                    {/* Kolom 1: Trx ID & Date */}
                                    <td className="p-5 pl-8">
                                        <div className="text-[14px] font-black text-[#B01030] bg-red-50 px-2.5 py-1 rounded-lg w-fit mb-1 border border-red-100">
                                            {trx.trxId}
                                        </div>
                                        <div className="text-[12px] font-bold text-gray-400 tracking-wide">{trx.date}</div>
                                    </td>
                                    
                                    {/* Kolom 2: Customer */}
                                    <td className="p-5">
                                        <div className="text-[14px] font-extrabold text-gray-900">{trx.customerName}</div>
                                    </td>

                                    {/* Kolom 3: Payment Method */}
                                    <td className="p-5">
                                        <div className="text-[13px] font-bold text-gray-600 flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                                                <MdOutlinePayment size={18} />
                                            </div>
                                            {trx.method}
                                        </div>
                                    </td>

                                    {/* Kolom 4: Amount */}
                                    <td className="p-5">
                                        <div className="text-[15px] font-black text-gray-900 tracking-tight">
                                            {formatRupiah(trx.amount)}
                                        </div>
                                    </td>

                                    {/* Kolom 5: Status */}
                                    <td className="p-5">
                                        {getStatusBadge(trx.status)}
                                    </td>

                                    {/* Kolom 6: Action */}
                                    <td className="p-5 pr-8 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="View Receipt">
                                                <MdReceiptLong size={20} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all" title="Options">
                                                <MdMoreVert size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
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

                {/* --- FOOTER TABEL: PAGINATION --- */}
                <div className="p-5 border-t border-gray-50 bg-gray-50/30 flex flex-col md:flex-row gap-4 justify-between items-center px-8">
                    <p className="text-sm font-bold text-gray-400">
                        Showing <span className="text-gray-700">{filteredPayments.length > 0 ? indexOfFirstItem + 1 : 0} - {Math.min(indexOfLastItem, filteredPayments.length)}</span> of <span className="text-gray-700">{filteredPayments.length}</span> transactions
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