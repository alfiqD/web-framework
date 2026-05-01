import { useState } from 'react';
import PageHeader from "../components/PageHeader";
// Import data JSON yang sudah kita buat tadi
import customersData from "../data/customers.json";

export default function Customers() {
    // State untuk mengontrol buka/tutup Modal Form
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div id="dashboard-container" className="p-6">
            
            {/* PageHeader dengan tombol Add Customer yang memicu Modal */}
            <PageHeader 
                title="Customers" 
                breadcrumb={["Dashboard", "Customers"]}
            >
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-all font-bold shadow-md active:scale-95"
                >
                    + Add Customers
                </button>
            </PageHeader>

            {/* TABEL DATA CUSTOMERS (30 Data) */}
            <div className="mt-8 bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-5 font-bold text-gray-600 uppercase text-xs tracking-wider">ID</th>
                            <th className="p-5 font-bold text-gray-600 uppercase text-xs tracking-wider">Customer Name</th>
                            <th className="p-5 font-bold text-gray-600 uppercase text-xs tracking-wider">Email & Phone</th>
                            <th className="p-5 font-bold text-gray-600 uppercase text-xs tracking-wider">Loyalty Level</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {customersData.map((cust) => (
                            <tr key={cust.customerId} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-5 text-gray-400 font-mono text-sm">{cust.customerId}</td>
                                <td className="p-5 font-bold text-gray-800">{cust.customerName}</td>
                                <td className="p-5">
                                    <div className="text-gray-700 font-medium">{cust.email}</div>
                                    <div className="text-xs text-gray-400 italic">{cust.phone}</div>
                                </td>
                                <td className="p-5">
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tighter shadow-sm ${
                                        cust.loyalty === 'Gold' ? 'bg-orange-100 text-orange-600 border border-orange-200' :
                                        cust.loyalty === 'Silver' ? 'bg-slate-100 text-slate-600 border border-slate-200' : 
                                        'bg-yellow-600 text-white'
                                    }`}>
                                        {cust.loyalty}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL FORM ADD CUSTOMER (Muncul kalau isModalOpen true) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white p-8 rounded-[32px] w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black text-gray-900 uppercase italic tracking-tighter">Add New Customer</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 font-bold text-2xl">×</button>
                        </div>

                        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Full Name</label>
                                <input type="text" placeholder="e.g. Alfiq Debriliant" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ring-green-500 transition-all font-medium" />
                            </div>
                            
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Email Address</label>
                                <input type="email" placeholder="email@example.com" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ring-green-500 transition-all font-medium" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Phone Number</label>
                                <input type="text" placeholder="0812345..." className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ring-green-500 transition-all font-medium" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Loyalty Level</label>
                                <select className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-medium appearance-none">
                                    <option>Bronze</option>
                                    <option>Silver</option>
                                    <option>Gold</option>
                                </select>
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
                                    Save Data
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}