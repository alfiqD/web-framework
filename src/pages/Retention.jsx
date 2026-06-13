import { useState, useEffect } from 'react';
import PageHeader from "../components/PageHeader";
import { 
    MdCake, 
    MdErrorOutline, 
    MdSend, 
    MdTimer, 
    MdSearch, 
    MdFilterList,
    MdOutlineCardGiftcard,
    MdWarningAmber,
    MdMarkEmailRead,
    MdMoreVert,
    MdCheckCircle,
    MdOutlineMail
} from "react-icons/md";
import retentionData from "../data/retention.json";

export default function Retention() {
    // --- STATE MANAGEMENT ---
    const [data] = useState(retentionData);
    const [activeTab, setActiveTab] = useState("birthday");
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Reset page dan filter setiap kali pindah tab
    useEffect(() => {
        setCurrentPage(1);
        setFilterStatus("All");
        setSearchTerm("");
    }, [activeTab]);

    // --- LOGIKA FILTER DATA ---
    const filteredData = data.filter(item => {
        const matchesSearch = item.customer.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Filter berdasarkan Tab Aktif
        const matchesTab = activeTab === 'birthday' ? true : (item.risk === 'High' || item.risk === 'At Risk');

        // Filter Dropdown (Dinamis tergantung Tab)
        let matchesDropdown = true;
        if (filterStatus !== 'All') {
            if (activeTab === 'birthday') {
                matchesDropdown = item.voucher === filterStatus;
            } else {
                matchesDropdown = item.risk === filterStatus;
            }
        }

        return matchesSearch && matchesTab && matchesDropdown;
    });

    // --- LOGIKA PAGINATION ---
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    // --- KALKULASI STATISTIK OTOMATIS ---
    const pendingBirthdays = data.filter(d => d.voucher === 'Not Sent' || d.voucher === 'Pending').length;
    const highRiskCustomers = data.filter(d => d.risk === 'High' || d.risk === 'At Risk').length;
    const successfulCampaigns = data.filter(d => d.voucher === 'Sent').length;

    // Fungsi Helper Badge Risk
    const getRiskBadge = (risk) => {
        switch (risk) {
            case 'High': return <span className="flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1 rounded-full text-[11px] font-black w-fit animate-pulse"><MdWarningAmber /> High Risk</span>;
            case 'At Risk': return <span className="flex items-center gap-1 bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-[11px] font-black w-fit border border-orange-100"><MdTimer /> At Risk</span>;
            case 'Low': return <span className="flex items-center gap-1 bg-green-50 text-green-600 px-3 py-1 rounded-full text-[11px] font-black w-fit"><MdCheckCircle /> Low Risk</span>;
            default: return <span>{risk}</span>;
        }
    };

    // Fungsi Helper Badge Voucher
    const getVoucherBadge = (status) => {
        switch (status) {
            case 'Sent': return <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[11px] font-black border border-green-100">Sent</span>;
            case 'Pending': return <span className="bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full text-[11px] font-black border border-yellow-100">Pending</span>;
            case 'Not Sent': return <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-[11px] font-black">Not Sent</span>;
            default: return <span>{status}</span>;
        }
    };

    return (
        <div className="flex flex-col gap-6 font-nunito bg-[#F4F7FE] min-h-screen pb-10">
            
            <PageHeader title="Customer Retention" breadcrumb={["Dashboard", "Retention"]} />

            {/* --- ANALYTICS CARDS --- */}
            <div className="mx-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center text-2xl">
                        <MdOutlineCardGiftcard />
                    </div>
                    <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Upcoming Birthdays</p>
                        <h3 className="text-3xl font-black text-gray-800 leading-none">{pendingBirthdays} <span className="text-sm font-bold text-gray-400">Action Needed</span></h3>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#B01030] flex items-center justify-center text-2xl relative z-10">
                        <MdErrorOutline />
                    </div>
                    <div className="relative z-10">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Churn Alerts</p>
                        <h3 className="text-3xl font-black text-[#B01030] leading-none">{highRiskCustomers} <span className="text-sm font-bold text-gray-400">Customers</span></h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center text-2xl">
                        <MdMarkEmailRead />
                    </div>
                    <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Campaign Success</p>
                        <h3 className="text-3xl font-black text-gray-800 leading-none">{successfulCampaigns} <span className="text-sm font-bold text-green-500">Sent</span></h3>
                    </div>
                </div>
            </div>

            {/* --- TAB SWITCHER & MAIN DATA CONTAINER --- */}
            <div className="mx-8 flex flex-col gap-4">
                
                {/* Segemented Control Tabs */}
                <div className="flex gap-2 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm w-fit">
                    <button 
                        onClick={() => setActiveTab("birthday")} 
                        className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${activeTab === 'birthday' ? 'bg-[#B01030] text-white shadow-md shadow-red-900/20' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}
                    >
                        <MdCake className="text-lg" /> Birthday Events
                    </button>
                    <button 
                        onClick={() => setActiveTab("churn")} 
                        className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${activeTab === 'churn' ? 'bg-[#B01030] text-white shadow-md shadow-red-900/20' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}
                    >
                        <MdErrorOutline className="text-lg" /> At-Risk Customers
                    </button>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                    
                    {/* Header Text & Description */}
                    <div className="p-8 border-b border-gray-50 bg-white/50 backdrop-blur-md">
                        <h2 className="text-2xl font-black text-gray-900">
                            {activeTab === 'birthday' ? "Birthday Rewards Automation" : "Churn Prevention System"}
                        </h2>
                        <p className="text-sm font-bold text-gray-400 mt-1">
                            {activeTab === 'birthday' 
                                ? "Kirimkan ucapan dan voucher spesial secara otomatis untuk merayakan hari lahir pelanggan." 
                                : "Deteksi pelanggan yang sudah lama tidak berbelanja dan kirimkan Win-Back promo agar mereka kembali."}
                        </p>
                    </div>

                    {/* TOOLBAR */}
                    <div className="p-6 border-b border-gray-50 flex flex-col lg:flex-row justify-between items-center gap-4 bg-gray-50/30">
                        <div className="relative w-full lg:w-96 group">
                            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-[#B01030] transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Search customer name..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-4 focus:ring-[#B01030]/10 focus:border-[#B01030] transition-all font-bold text-sm text-gray-700 placeholder-gray-400 shadow-sm"
                            />
                        </div>
                        
                        <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
                            <div className="flex items-center gap-2 text-gray-400 font-bold mr-2 hidden sm:flex">
                                <MdFilterList size={20} /> <span className="text-sm">Filter:</span>
                            </div>
                            
                            {/* Dropdown Dinamis Berdasarkan Tab */}
                            {activeTab === 'birthday' ? (
                                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full sm:w-auto bg-white border border-gray-200 text-gray-600 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] cursor-pointer shadow-sm transition-all">
                                    <option value="All">All Voucher Status</option>
                                    <option value="Sent">Sent</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Not Sent">Not Sent</option>
                                </select>
                            ) : (
                                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full sm:w-auto bg-white border border-gray-200 text-gray-600 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] cursor-pointer shadow-sm transition-all">
                                    <option value="All">All Risk Levels</option>
                                    <option value="High">High Risk</option>
                                    <option value="At Risk">At Risk</option>
                                </select>
                            )}
                        </div>
                    </div>

                    {/* TABEL DATA */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                                <tr className="bg-white">
                                    <th className="p-5 pl-8 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Customer Details</th>
                                    <th className="p-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                                        {activeTab === 'birthday' ? "Birth Date" : "Last Transaction"}
                                    </th>
                                    <th className="p-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                                        {activeTab === 'birthday' ? "Voucher Status" : "Risk Level"}
                                    </th>
                                    <th className="p-5 pr-8 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right border-b border-gray-100">Quick Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {currentData.length > 0 ? currentData.map(item => (
                                    <tr key={item.id} className="hover:bg-red-50/10 transition-colors group">
                                        
                                        {/* Kolom 1: Profil */}
                                        <td className="p-5 pl-8">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center font-black text-gray-500 text-xs shrink-0">
                                                    {item.customer.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                                </div>
                                                <div>
                                                    <div className="text-[14px] font-black text-gray-900">{item.customer}</div>
                                                    <div className="text-[10px] font-bold text-gray-400">ID: CUS-{item.id.toString().padStart(4, '0')}</div>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        {/* Kolom 2: Tanggal dinamis */}
                                        <td className="p-5">
                                            {activeTab === 'birthday' ? (
                                                <div className="flex items-center gap-2 text-[13px] font-bold text-[#B01030] bg-red-50 px-3 py-1.5 rounded-lg w-fit">
                                                    <MdCake className="text-lg" /> {item.birthday}
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-[13px] font-bold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg w-fit">
                                                    <MdTimer className="text-gray-400 text-lg" /> {item.lastOrder}
                                                </div>
                                            )}
                                        </td>

                                        {/* Kolom 3: Status Badge */}
                                        <td className="p-5">
                                            {activeTab === 'birthday' ? getVoucherBadge(item.voucher) : getRiskBadge(item.risk)}
                                        </td>

                                        {/* Kolom 4: Aksi */}
                                        <td className="p-5 pr-8 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100 opacity-0 group-hover:opacity-100" title="More Options">
                                                    <MdMoreVert size={18} />
                                                </button>
                                                <button className="bg-[#B01030] text-white px-4 py-2.5 rounded-xl hover:bg-[#8e0d27] transition-all shadow-md shadow-red-900/10 active:scale-95 flex items-center gap-2 text-[13px] font-bold">
                                                    {activeTab === 'birthday' ? <><MdOutlineMail size={16}/> Send Gift</> : <><MdSend size={16}/> Win Back</>}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="p-16 text-center">
                                            <div className="flex flex-col items-center justify-center text-gray-400">
                                                {activeTab === 'birthday' ? <MdCake className="text-6xl mb-4 text-gray-200" /> : <MdTimer className="text-6xl mb-4 text-gray-200" />}
                                                <p className="font-black text-lg text-gray-500">Data Tidak Ditemukan</p>
                                                <p className="font-semibold text-sm mt-1">Belum ada pelanggan di daftar ini atau sesuaikan filter Anda.</p>
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
                            Showing <span className="text-gray-700">{filteredData.length > 0 ? indexOfFirstItem + 1 : 0} - {Math.min(indexOfLastItem, filteredData.length)}</span> of <span className="text-gray-700">{filteredData.length}</span> records
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
        </div>
    );
}