import { useState, useEffect } from 'react';
import PageHeader from "../components/PageHeader";
import { 
    MdOutlineAutoAwesome, 
    MdFilterList, 
    MdOutlineLocalShipping, 
    MdOutlinePayment,
    MdSearch,
    MdFileDownload,
    MdMoreVert,
    MdEdit,
    MdDeleteOutline,
    MdShoppingBag,
    MdPendingActions,
    MdCheckCircleOutline
} from "react-icons/md";
// Import data JSON
import ordersData from "../data/orders.json";

export default function Orders() {
    // State Modal Form
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --- STATE UNTUK PENCARIAN, FILTER & PAGINATION ---
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [paymentFilter, setPaymentFilter] = useState('All');

    // State baru khusus Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Menampilkan 10 data per halaman

    // --- LOGIKA PENCARIAN & FILTER DATA ---
    const filteredOrders = ordersData.filter((order) => {
        // Cari berdasarkan Order ID atau Nama Customer
        const matchesSearch = order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = statusFilter === 'All' || order.status === statusFilter;
        const matchPayment = paymentFilter === 'All' || order.paymentMethod === paymentFilter;
        
        return matchesSearch && matchStatus && matchPayment;
    });

    // Reset ke halaman 1 setiap kali ada pencarian atau filter yang berubah
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter, paymentFilter]);

    // --- LOGIKA PEMOTONGAN DATA (PAGINATION) ---
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
    
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // --- KALKULASI STATISTIK CARDS ---
    const totalCompleted = ordersData.filter(o => o.status === 'Completed').length;
    const totalPending = ordersData.filter(o => o.status === 'Pending').length;

    // Fungsi Helper format Rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    // Fungsi Helper Warna Status Pesanan
    const getStatusStyles = (status) => {
        switch (status) {
            case 'Completed': return "bg-green-50 text-green-600 ring-1 ring-green-500/30"; 
            case 'Pending': return "bg-yellow-50 text-yellow-600 ring-1 ring-yellow-500/30"; 
            case 'Cancelled': return "bg-red-50 text-red-600 ring-1 ring-red-500/30"; 
            default: return "bg-gray-50 text-gray-500 ring-1 ring-gray-300";
        }
    };

    return (
        <div id="dashboard-container" className="flex flex-col gap-6 font-nunito bg-[#F4F7FE] min-h-screen pb-10">
            
            <PageHeader title="Order Transactions" breadcrumb={["Dashboard", "Orders"]}>
                <div className="flex gap-3">
                    {/* <button className="bg-white text-gray-600 border border-gray-200 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all font-bold text-sm flex items-center gap-2 shadow-sm active:scale-95">
                        <MdFileDownload className="text-lg" /> Export Invoice
                    </button> */}
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-gradient-to-r from-[#B01030] to-[#8e0d27] text-white px-5 py-2.5 rounded-xl hover:shadow-[0_8px_20px_-6px_rgba(176,16,48,0.6)] transition-all font-bold shadow-sm text-sm flex items-center gap-2 active:scale-95"
                    >
                        <MdOutlineAutoAwesome className="text-lg" /> New Order
                    </button>
                </div>
            </PageHeader>

            {/* --- ANALYTICS SUMMARY CARDS --- */}
            <div className="mx-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center text-2xl">
                        <MdShoppingBag />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Orders</p>
                        <h3 className="text-3xl font-black text-gray-800 leading-none">{ordersData.length}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center text-2xl">
                        <MdCheckCircleOutline />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Completed</p>
                        <h3 className="text-3xl font-black text-gray-800 leading-none">{totalCompleted}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-yellow-50 text-yellow-600 flex items-center justify-center text-2xl">
                        <MdPendingActions />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Pending Processing</p>
                        <h3 className="text-3xl font-black text-gray-800 leading-none">{totalPending}</h3>
                    </div>
                </div>
            </div>

            <div className="mx-8 bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                
                {/* --- BAGIAN TOOLBAR (SEARCH & FILTER) --- */}
                <div className="p-6 border-b border-gray-50 flex flex-col lg:flex-row justify-between items-center gap-4 bg-white/50 backdrop-blur-md">
                    
                    {/* Search Bar */}
                    <div className="relative w-full lg:w-80 group">
                        <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-[#B01030] transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search Order ID or Customer..." 
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
                        
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-white border border-gray-200 text-gray-600 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] cursor-pointer shadow-sm transition-all">
                            <option value="All">Status: All</option>
                            <option value="Completed">Completed</option>
                            <option value="Pending">Pending</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>

                        <select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)} className="bg-white border border-gray-200 text-gray-600 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] cursor-pointer shadow-sm transition-all">
                            <option value="All">Payment: All</option>
                            <option value="ShopeePay">ShopeePay</option>
                            <option value="GoPay">GoPay</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="COD">COD</option>
                        </select>
                    </div>
                </div>

                {/* TABEL DATA */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="p-5 pl-8 text-[12px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Order ID & Date</th>
                                <th className="p-5 text-[12px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Customer & Shipping</th>
                                <th className="p-5 text-[12px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Product Item</th>
                                <th className="p-5 text-[12px] font-black text-gray-400 uppercase tracking-widest text-right border-b border-gray-100">Total & Payment</th>
                                <th className="p-5 text-[12px] font-black text-gray-400 uppercase tracking-widest text-center border-b border-gray-100">Status</th>
                                <th className="p-5 pr-8 text-[12px] font-black text-gray-400 uppercase tracking-widest text-right border-b border-gray-100">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {/* PERUBAHAN: Render data dari currentOrders (hasil potongan pagination) */}
                            {currentOrders.length > 0 ? (
                                currentOrders.map((order) => (
                                    <tr key={order.orderId} className="hover:bg-red-50/20 transition-colors group">
                                        
                                        {/* Kolom 1: Order ID & Date */}
                                        <td className="p-5 pl-8">
                                            <div className="text-[15px] font-black text-gray-900 group-hover:text-[#B01030] transition-colors">{order.orderId}</div>
                                            <div className="text-[12px] font-bold text-gray-400 mt-1 tracking-wide">{order.orderDate}</div>
                                        </td>
                                        
                                        {/* Kolom 2: Customer & Shipping */}
                                        <td className="p-5">
                                            <div className="text-[14px] font-bold text-[#202224]">{order.customerName}</div>
                                            <div className="text-[12px] font-bold text-gray-500 mt-1 flex items-center gap-1.5">
                                                <MdOutlineLocalShipping className="text-gray-400 text-sm" /> {order.shipping}
                                            </div>
                                        </td>

                                        {/* Kolom 3: Product Name */}
                                        <td className="p-5">
                                            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-[13px] font-bold border border-gray-200">
                                                {order.product}
                                            </span>
                                        </td>

                                        {/* Kolom 4: Amount & Payment */}
                                        <td className="p-5 text-right">
                                            <div className="text-[15px] font-black text-[#202224]">
                                                {formatRupiah(order.totalPrice)}
                                            </div>
                                            <div className="text-[12px] font-bold text-gray-500 mt-1 flex items-center justify-end gap-1.5">
                                                {order.paymentMethod} <MdOutlinePayment className="text-gray-400 text-sm" />
                                            </div>
                                        </td>

                                        {/* Kolom 5: Status */}
                                        <td className="p-5 text-center">
                                            <span className={`inline-block px-4 py-1.5 rounded-full text-[12px] font-black uppercase tracking-wider min-w-[100px] text-center ${getStatusStyles(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>

                                        {/* Kolom 6: Action Buttons (Hover) */}
                                        <td className="p-5 pr-8 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Edit Order">
                                                    <MdEdit size={18} />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all" title="Delete">
                                                    <MdDeleteOutline size={18} />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all" title="Options">
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
                                            <p className="font-black text-lg text-gray-500">Transaksi Tidak Ditemukan</p>
                                            <p className="font-semibold text-sm mt-1">Coba sesuaikan kata kunci atau filter status pesanan.</p>
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
                        Menampilkan <span className="text-gray-700">{filteredOrders.length > 0 ? indexOfFirstItem + 1 : 0} - {Math.min(indexOfLastItem, filteredOrders.length)}</span> dari <span className="text-gray-700">{filteredOrders.length}</span> pesanan
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

            {/* MODAL FORM ADD ORDER (Dipercantik) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
                    <div className="bg-white p-8 rounded-[2rem] w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-[24px] font-black text-gray-900 tracking-tight">Create Order</h2>
                            <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-[#B01030] hover:bg-red-50 font-bold text-xl transition-colors">×</button>
                        </div>
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black text-gray-500 ml-1 uppercase tracking-widest">Customer Name</label>
                                <input type="text" placeholder="e.g. Alfiq Debriliant" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] transition-all font-bold text-sm text-gray-800 placeholder-gray-400" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black text-gray-500 ml-1 uppercase tracking-widest">Product Items</label>
                                <input type="text" placeholder="e.g. Serum Vitamin C" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] transition-all font-bold text-sm text-gray-800 placeholder-gray-400" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-black text-gray-500 ml-1 uppercase tracking-widest">Total Price</label>
                                    <input type="number" placeholder="Rp..." className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] transition-all font-bold text-sm text-gray-800 placeholder-gray-400" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-black text-gray-500 ml-1 uppercase tracking-widest">Payment</label>
                                    <select className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] transition-all font-bold text-sm text-gray-700 appearance-none cursor-pointer">
                                        <option>ShopeePay</option>
                                        <option>GoPay</option>
                                        <option>Bank Transfer</option>
                                        <option>COD</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-3 pt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 p-3.5 bg-gray-50 border border-gray-200 text-gray-600 rounded-xl font-black hover:bg-gray-100 transition-all text-sm">Cancel</button>
                                <button type="submit" className="flex-1 p-3.5 bg-gradient-to-r from-[#B01030] to-[#8e0d27] text-white rounded-xl font-black hover:shadow-[0_8px_20px_-6px_rgba(176,16,48,0.6)] transition-all active:scale-95 text-sm">Save Order</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}