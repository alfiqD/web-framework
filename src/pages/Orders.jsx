import { useState } from 'react';
import PageHeader from "../components/PageHeader";
import { MdOutlineAutoAwesome, MdFilterList, MdOutlineLocalShipping, MdOutlinePayment } from "react-icons/md";
// Import data JSON
import ordersData from "../data/orders.json";

export default function Orders() {
    // State Modal Form
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --- STATE UNTUK FILTER ---
    const [statusFilter, setStatusFilter] = useState('All');
    const [paymentFilter, setPaymentFilter] = useState('All');

    // --- LOGIKA FILTER DATA ---
    const filteredOrders = ordersData.filter((order) => {
        const matchStatus = statusFilter === 'All' || order.status === statusFilter;
        const matchPayment = paymentFilter === 'All' || order.paymentMethod === paymentFilter;
        return matchStatus && matchPayment;
    });

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
            case 'Completed': return "bg-[#ccf1eb] text-[#00B69B]"; // Hijau Mint
            case 'Pending': return "bg-[#e1d5fd] text-[#6226EF]"; // Ungu Terang
            case 'Cancelled': return "bg-[#fde1e1] text-[#EF3826]"; // Merah Terang
            default: return "bg-gray-100 text-gray-500";
        }
    };

    return (
        <div id="dashboard-container" className="flex flex-col gap-6 font-nunito bg-[#F5F6FA] min-h-screen pb-10">
            
            <PageHeader title="Orders" breadcrumb={["Dashboard", "Orders"]}>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#B01030] text-white px-5 py-2.5 rounded-xl hover:bg-[#8e0d27] transition-all font-bold shadow-lg shadow-red-900/10 text-sm flex items-center gap-2 active:scale-95"
                >
                    <MdOutlineAutoAwesome /> + Add Orders
                </button>
            </PageHeader>

            <div className="mx-8 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Judul Tabel */}
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                    <h2 className="text-[18px] font-extrabold text-[#B01030]">Order Transactions</h2>
                    <span className="text-sm font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-lg">
                        Showing {filteredOrders.length} Orders
                    </span>
                </div>

                {/* --- BAGIAN FILTER BAR --- */}
                <div className="bg-gray-50/50 p-4 border-b border-gray-50 flex flex-wrap gap-4 items-center px-6">
                    <div className="flex items-center gap-2 text-gray-400 font-bold mr-2">
                        <MdFilterList size={20} /> <span className="text-sm">Filters:</span>
                    </div>
                    
                    {/* Filter Status */}
                    <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-white border border-gray-200 text-gray-600 text-[13px] font-bold rounded-xl px-4 py-2 outline-none focus:ring-2 ring-[#B01030]/30 cursor-pointer"
                    >
                        <option value="All">All Status</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>

                    {/* Filter Metode Pembayaran */}
                    <select 
                        value={paymentFilter}
                        onChange={(e) => setPaymentFilter(e.target.value)}
                        className="bg-white border border-gray-200 text-gray-600 text-[13px] font-bold rounded-xl px-4 py-2 outline-none focus:ring-2 ring-[#B01030]/30 cursor-pointer"
                    >
                        <option value="All">All Payments</option>
                        <option value="ShopeePay">ShopeePay</option>
                        <option value="GoPay">GoPay</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="COD">COD</option>
                    </select>
                </div>

                {/* TABEL DATA */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead className="bg-white">
                            <tr>
                                <th className="p-5 text-[13px] font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-50">Order ID & Date</th>
                                <th className="p-5 text-[13px] font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-50">Customer & Shipping</th>
                                <th className="p-5 text-[13px] font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-50">Products</th>
                                <th className="p-5 text-[13px] font-extrabold text-gray-400 uppercase tracking-wider text-right border-b border-gray-50">Total & Payment</th>
                                <th className="p-5 text-[13px] font-extrabold text-gray-400 uppercase tracking-wider text-right border-b border-gray-50">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <tr key={order.orderId} className="hover:bg-gray-50/50 transition-colors group">
                                        
                                        {/* Kolom 1: Order ID & Date */}
                                        <td className="p-5">
                                            <div className="text-[14px] font-extrabold text-[#202224]">{order.orderId}</div>
                                            <div className="text-[12px] font-bold text-gray-400 mt-1">{order.orderDate}</div>
                                        </td>
                                        
                                        {/* Kolom 2: Customer & Shipping */}
                                        <td className="p-5">
                                            <div className="text-[14px] font-bold text-[#202224]">{order.customerName}</div>
                                            <div className="text-[12px] font-bold text-gray-500 mt-1 flex items-center gap-1">
                                                <MdOutlineLocalShipping className="text-gray-400 text-sm" /> {order.shipping}
                                            </div>
                                        </td>

                                        {/* Kolom 3: Product Name */}
                                        <td className="p-5">
                                            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-[13px] font-bold">
                                                {order.product}
                                            </span>
                                        </td>

                                        {/* Kolom 4: Amount & Payment */}
                                        <td className="p-5 text-right">
                                            <div className="text-[14px] font-extrabold text-[#202224]">
                                                {formatRupiah(order.totalPrice)}
                                            </div>
                                            <div className="text-[12px] font-bold text-gray-500 mt-1 flex items-center justify-end gap-1">
                                                {order.paymentMethod} <MdOutlinePayment className="text-gray-400 text-sm" />
                                            </div>
                                        </td>

                                        {/* Kolom 5: Status */}
                                        <td className="p-5 text-right">
                                            <span className={`inline-block px-4 py-1.5 rounded-xl text-[12px] font-bold min-w-[90px] text-center ${getStatusStyles(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-10 text-center text-gray-400 font-bold text-sm">
                                        No orders found matching the selected filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL FORM ADD ORDER */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white p-8 rounded-[32px] w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-[24px] font-extrabold text-[#202224]">Add New Order</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-[#B01030] font-bold text-2xl transition-colors">×</button>
                        </div>
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-gray-400 ml-1 uppercase tracking-wide">Customer Name</label>
                                <input type="text" placeholder="e.g. Alfiq Debriliant" className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ring-[#B01030]/30 focus:border-[#B01030] transition-all font-semibold text-sm" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-gray-400 ml-1 uppercase tracking-wide">Product Items</label>
                                <input type="text" placeholder="e.g. Serum Vitamin C" className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ring-[#B01030]/30 focus:border-[#B01030] transition-all font-semibold text-sm" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-400 ml-1 uppercase tracking-wide">Total Price</label>
                                    <input type="number" placeholder="Rp..." className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ring-[#B01030]/30 focus:border-[#B01030] transition-all font-semibold text-sm" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-400 ml-1 uppercase tracking-wide">Payment</label>
                                    <select className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ring-[#B01030]/30 focus:border-[#B01030] transition-all font-semibold text-sm text-gray-600 appearance-none cursor-pointer">
                                        <option>ShopeePay</option>
                                        <option>GoPay</option>
                                        <option>Bank Transfer</option>
                                        <option>COD</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex space-x-3 pt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 p-4 bg-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-200 transition-all text-sm">Cancel</button>
                                <button type="submit" className="flex-1 p-4 bg-[#B01030] text-white rounded-2xl font-bold hover:bg-[#8e0d27] shadow-lg shadow-red-900/10 transition-all active:scale-95 text-sm">Save Order</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}