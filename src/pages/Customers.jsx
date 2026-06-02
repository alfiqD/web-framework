import { useState } from 'react';
import PageHeader from "../components/PageHeader";
import { MdOutlineAutoAwesome, MdOutlinePhone, MdOutlineMail, MdFilterList } from "react-icons/md";
// Import data JSON
import customersData from "../data/customers.json";

export default function Customers() {
    // State untuk mengontrol buka/tutup Modal Form
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --- STATE UNTUK FILTER ---
    const [skinFilter, setSkinFilter] = useState('All');
    const [loyaltyFilter, setLoyaltyFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');

    // --- LOGIKA FILTER DATA ---
    const filteredCustomers = customersData.filter((cust) => {
        const matchSkin = skinFilter === 'All' || cust.skinType === skinFilter;
        const matchLoyalty = loyaltyFilter === 'All' || cust.loyalty === loyaltyFilter;
        const matchStatus = statusFilter === 'All' || cust.status === statusFilter;
        return matchSkin && matchLoyalty && matchStatus;
    });

    // Fungsi Helper untuk warna status LOYALTY
    const getLoyaltyStyles = (loyalty) => {
        switch (loyalty) {
            case 'Gold': return "bg-[#ccf1eb] text-[#00B69B]"; // Hijau Mint
            case 'Silver': return "bg-[#e1d5fd] text-[#6226EF]"; // Ungu
            case 'Bronze': return "bg-[#ffe9d5] text-[#FFA756]"; // Oranye
            default: return "bg-gray-100 text-gray-500";
        }
    };

    // Fungsi Helper untuk STATUS (Active / Inactive)
    const getStatusStyles = (status) => {
        return status === 'Active' 
            ? "border border-green-200 bg-green-50 text-green-600" 
            : "border border-gray-200 bg-gray-50 text-gray-400";
    };

    return (
        <div id="dashboard-container" className="flex flex-col gap-6 font-nunito bg-[#F5F6FA] min-h-screen pb-10">
            
            <PageHeader title="Customers" breadcrumb={["Dashboard", "Customers"]}>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#B01030] text-white px-5 py-2.5 rounded-xl hover:bg-[#8e0d27] transition-all font-bold shadow-lg shadow-red-900/10 text-sm flex items-center gap-2 active:scale-95"
                >
                    <MdOutlineAutoAwesome /> + Add Customers
                </button>
            </PageHeader>

            <div className="mx-8 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Judul Tabel */}
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                    <h2 className="text-[18px] font-extrabold text-[#B01030]">Customer Database</h2>
                    <span className="text-sm font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-lg">
                        Showing {filteredCustomers.length} of {customersData.length} Users
                    </span>
                </div>

                {/* --- BAGIAN FILTER BAR --- */}
                <div className="bg-gray-50/50 p-4 border-b border-gray-50 flex flex-wrap gap-4 items-center px-6">
                    <div className="flex items-center gap-2 text-gray-400 font-bold mr-2">
                        <MdFilterList size={20} /> <span className="text-sm">Filters:</span>
                    </div>
                    
                    {/* Filter Skin Type */}
                    <select 
                        value={skinFilter}
                        onChange={(e) => setSkinFilter(e.target.value)}
                        className="bg-white border border-gray-200 text-gray-600 text-[13px] font-bold rounded-xl px-4 py-2 outline-none focus:ring-2 ring-[#B01030]/30 cursor-pointer"
                    >
                        <option value="All">All Skin Types</option>
                        <option value="Normal">Normal</option>
                        <option value="Oily">Oily</option>
                        <option value="Dry">Dry</option>
                        <option value="Combination">Combination</option>
                        <option value="Sensitive">Sensitive</option>
                    </select>

                    {/* Filter Loyalty */}
                    <select 
                        value={loyaltyFilter}
                        onChange={(e) => setLoyaltyFilter(e.target.value)}
                        className="bg-white border border-gray-200 text-gray-600 text-[13px] font-bold rounded-xl px-4 py-2 outline-none focus:ring-2 ring-[#B01030]/30 cursor-pointer"
                    >
                        <option value="All">All Loyalty</option>
                        <option value="Gold">Gold</option>
                        <option value="Silver">Silver</option>
                        <option value="Bronze">Bronze</option>
                    </select>

                    {/* Filter Status */}
                    <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-white border border-gray-200 text-gray-600 text-[13px] font-bold rounded-xl px-4 py-2 outline-none focus:ring-2 ring-[#B01030]/30 cursor-pointer"
                    >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>

                {/* TABEL DATA */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead className="bg-white">
                            <tr>
                                <th className="p-5 text-[13px] font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-50">Customer</th>
                                <th className="p-5 text-[13px] font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-50">Contact Info</th>
                                <th className="p-5 text-[13px] font-extrabold text-gray-400 uppercase tracking-wider text-center border-b border-gray-50">Skin Type</th>
                                <th className="p-5 text-[13px] font-extrabold text-gray-400 uppercase tracking-wider text-center border-b border-gray-50">Loyalty & Spend</th>
                                <th className="p-5 text-[13px] font-extrabold text-gray-400 uppercase tracking-wider text-right border-b border-gray-50">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredCustomers.length > 0 ? (
                                filteredCustomers.map((cust) => (
                                    <tr key={cust.customerId} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="p-5">
                                            <div className="text-[15px] font-bold text-[#202224]">{cust.customerName}</div>
                                            <div className="text-[12px] font-bold text-gray-400 mt-0.5">{cust.customerId}</div>
                                        </td>
                                        <td className="p-5">
                                            <div className="text-[13px] font-semibold text-gray-600 flex items-center gap-1.5 mb-1">
                                                <MdOutlineMail className="text-gray-400 text-lg" /> {cust.email}
                                            </div>
                                            <div className="text-[13px] font-semibold text-gray-500 flex items-center gap-1.5">
                                                <MdOutlinePhone className="text-gray-400 text-lg" /> {cust.phone}
                                            </div>
                                        </td>
                                        <td className="p-5 text-center">
                                            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-[12px] font-bold">
                                                {cust.skinType}
                                            </span>
                                        </td>
                                        <td className="p-5 text-center flex flex-col items-center justify-center gap-1.5">
                                            <span className={`inline-block px-4 py-1.5 rounded-xl text-[12px] font-bold min-w-[80px] text-center ${getLoyaltyStyles(cust.loyalty)}`}>
                                                {cust.loyalty}
                                            </span>
                                            <span className="text-[13px] font-extrabold text-[#202224]">
                                                {cust.totalSpend}
                                            </span>
                                        </td>
                                        <td className="p-5 text-right">
                                            <span className={`inline-block px-3 py-1 rounded-full text-[12px] font-bold text-center ${getStatusStyles(cust.status)}`}>
                                                {cust.status === 'Active' ? '● Active' : '○ Inactive'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-10 text-center text-gray-400 font-bold text-sm">
                                        No customers found matching the selected filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL FORM ADD CUSTOMER */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white p-8 rounded-[32px] w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-[24px] font-extrabold text-[#202224]">Add New Customer</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-[#B01030] font-bold text-2xl transition-colors">×</button>
                        </div>
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-gray-400 ml-1 uppercase tracking-wide">Full Name</label>
                                <input type="text" placeholder="e.g. Nabila Putri" className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ring-[#B01030]/30 focus:border-[#B01030] transition-all font-semibold text-sm" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-gray-400 ml-1 uppercase tracking-wide">Email Address</label>
                                <input type="email" placeholder="e.g. nabila@mail.com" className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ring-[#B01030]/30 focus:border-[#B01030] transition-all font-semibold text-sm" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-400 ml-1 uppercase tracking-wide">Phone</label>
                                    <input type="text" placeholder="0812..." className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ring-[#B01030]/30 focus:border-[#B01030] transition-all font-semibold text-sm" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-400 ml-1 uppercase tracking-wide">Skin Type</label>
                                    <select className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ring-[#B01030]/30 focus:border-[#B01030] transition-all font-semibold text-sm text-gray-600 appearance-none cursor-pointer">
                                        <option value="Normal">Normal</option>
                                        <option value="Oily">Oily</option>
                                        <option value="Dry">Dry</option>
                                        <option value="Combination">Combination</option>
                                        <option value="Sensitive">Sensitive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex space-x-3 pt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 p-4 bg-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-200 transition-all text-sm">Cancel</button>
                                <button type="submit" className="flex-1 p-4 bg-[#B01030] text-white rounded-2xl font-bold hover:bg-[#8e0d27] shadow-lg shadow-red-900/10 transition-all active:scale-95 text-sm">Save Customer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}