import { useState } from 'react';
import PageHeader from "../components/PageHeader";
import { MdOutlineAutoAwesome } from "react-icons/md";
// Import data dummy JSON 
import ordersData from "../data/orders.json";

export default function Orders() {
    // State untuk kontrol Modal Form
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fungsi Helper untuk warna status sesuai permintaan (Konsisten dengan Customers)
    const getStatusStyles = (status) => {
        switch (status) {
            case 'Completed': 
                return "bg-[#ccf1eb] text-[#00B69B]"; // Hijau
            case 'Processing': 
            case 'Pending':
                return "bg-[#e1d5fd] text-[#6226EF]"; // Ungu
            case 'Cancelled': 
                return "bg-[#fde1e1] text-[#EF3826]"; // Merah
            case 'On Hold': 
            default:
                return "bg-[#ffe9d5] text-[#FFA756]"; // Oranye
        }
    };

    return (
        <div id="orders-container" className="flex flex-col gap-6 font-nunito bg-[#F5F6FA] min-h-screen pb-10">
            
            {/* PageHeader dengan tombol warna merah #B01030 */}
            <PageHeader 
                title="Orders" 
                breadcrumb={["Dashboard", "Orders"]}
            >
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#B01030] text-white px-5 py-2.5 rounded-xl hover:bg-[#8e0d27] transition-all font-bold shadow-lg shadow-red-900/10 text-sm flex items-center gap-2 active:scale-95"
                >
                    <MdOutlineAutoAwesome /> + Add Orders
                </button>
            </PageHeader>

            {/* TABEL DATA ORDERS */}
            <div className="mx-8 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Judul Tabel dengan warna #B01030 */}
                <div className="p-6 border-b border-gray-50">
                    <h2 className="text-[18px] font-extrabold text-[#B01030]">Data Order</h2>
                </div>

                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50/50">
                        <tr>
                            {/* Judul Kolom: 14px Extra Bold, Warna #202224 */}
                            <th className="p-5 text-[14px] font-extrabold text-[#202224] uppercase tracking-wider">Order ID</th>
                            <th className="p-5 text-[14px] font-extrabold text-[#202224] uppercase tracking-wider">Customer Name</th>
                            <th className="p-5 text-[14px] font-extrabold text-[#202224] uppercase tracking-wider">Order Date</th>
                            <th className="p-5 text-[14px] font-extrabold text-[#202224] uppercase tracking-wider">Amount</th>
                            <th className="p-5 text-[14px] font-extrabold text-[#202224] uppercase tracking-wider text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {ordersData.map((order) => (
                            <tr key={order.orderId} className="hover:bg-gray-50/50 transition-colors">
                                {/* Isi Data: 14px Semi Bold, Warna #202224 */}
                                <td className="p-5 text-[14px] font-semibold text-[#202224]">{order.orderId}</td>
                                <td className="p-5 text-[14px] font-semibold text-[#202224]">{order.customerName}</td>
                                <td className="p-5 text-[14px] font-semibold text-[#202224]">{order.orderDate}</td>
                                <td className="p-5 text-[14px] font-semibold text-[#202224]">
                                    Rp {order.totalPrice.toLocaleString('id-ID')}
                                </td>
                                {/* Status ditaruh di ujung (kanan) */}
                                <td className="p-5 text-right">
                                    <span className={`inline-block px-5 py-2 rounded-xl text-[13px] font-bold min-w-[110px] text-center ${getStatusStyles(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL FORM ADD ORDERS */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white p-8 rounded-[32px] w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-[24px] font-extrabold text-[#202224]">Add New Order</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 font-bold text-2xl">×</button>
                        </div>

                        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Customer Name</label>
                                <input type="text" placeholder="Name" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ring-[#B01030] transition-all font-semibold" />
                            </div>
                            
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Total Price (Rp)</label>
                                <input type="number" placeholder="Amount" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ring-[#B01030] transition-all font-semibold" />
                            </div>

                            <div className="flex space-x-3 pt-6">
                                <button 
                                    type="button" 
                                    onClick={() => setIsModalOpen(false)} 
                                    className="flex-1 p-4 bg-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="flex-1 p-4 bg-[#B01030] text-white rounded-2xl font-bold hover:bg-[#8e0d27] shadow-lg shadow-red-900/10 transition-all active:scale-95"
                                >
                                    Submit Order
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}