import { useState } from 'react';
import PageHeader from "../components/PageHeader";
// Import data dummy JSON yang 30 tadi
import ordersData from "../data/orders.json";

export default function Orders() {
    // State untuk kontrol Modal Form
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div id="orders-container" className="p-6">
            
            {/* PageHeader dengan tombol Add Orders */}
            <PageHeader 
                title="Orders" 
                breadcrumb={["Dashboard", "Orders"]}
            >
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-all font-bold shadow-md active:scale-95"
                >
                    + Add Orders
                </button>
            </PageHeader>

            {/* TABEL DATA ORDERS (30 Data) */}
            <div className="mt-8 bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-5 font-bold text-gray-600 uppercase text-xs tracking-wider">Order ID</th>
                            <th className="p-5 font-bold text-gray-600 uppercase text-xs tracking-wider">Customer Name</th>
                            <th className="p-5 font-bold text-gray-600 uppercase text-xs tracking-wider">Status</th>
                            <th className="p-5 font-bold text-gray-600 uppercase text-xs tracking-wider">Total Price</th>
                            <th className="p-5 font-bold text-gray-600 uppercase text-xs tracking-wider">Order Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {ordersData.map((order) => (
                            <tr key={order.orderId} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-5 text-blue-600 font-bold text-sm">{order.orderId}</td>
                                <td className="p-5 font-medium text-gray-800">{order.customerName}</td>
                                <td className="p-5">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                                        order.status === 'Completed' ? 'bg-green-100 text-green-600 border border-green-200' :
                                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-600 border border-yellow-200' : 
                                        'bg-red-100 text-red-600 border border-red-200'
                                    }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-5 font-bold text-gray-900">
                                    Rp {order.totalPrice.toLocaleString('id-ID')}
                                </td>
                                <td className="p-5 text-gray-500 text-sm font-medium">{order.orderDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL FORM ADD ORDERS (Muncul sesuai Atribut Tugas) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white p-8 rounded-[32px] w-full max-w-md shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black text-gray-900 uppercase italic tracking-tighter">Add New Order</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 font-bold text-2xl">×</button>
                        </div>

                        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                            {/* Input Customer Name */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Customer Name</label>
                                <input type="text" placeholder="Who is ordering?" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ring-green-500 transition-all font-medium" />
                            </div>
                            
                            {/* Input Status */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Order Status</label>
                                <select className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-medium">
                                    <option>Pending</option>
                                    <option>Completed</option>
                                    <option>Cancelled</option>
                                </select>
                            </div>

                            {/* Input Total Price */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Total Price (Rp)</label>
                                <input type="number" placeholder="Enter amount..." className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ring-green-500 transition-all font-medium" />
                            </div>

                            {/* Input Order Date */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Order Date</label>
                                <input type="date" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ring-green-500 transition-all font-medium" />
                            </div>

                            <div className="flex space-x-3 pt-6">
                                <button 
                                    type="button" 
                                    onClick={() => setIsModalOpen(false)} 
                                    className="flex-1 p-4 bg-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-200 transition-all active:scale-95"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="flex-1 p-4 bg-green-500 text-white rounded-2xl font-bold hover:bg-green-600 shadow-lg shadow-green-200 transition-all active:scale-95 uppercase tracking-wider"
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