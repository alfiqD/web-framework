import React from "react";
import PageHeader from "../components/PageHeader";
import { 
    MdOutlineAttachMoney, 
    MdOutlinePersonOutline, 
    MdOutlineEventAvailable, 
    MdOutlineMedicalServices, 
    MdOutlineKeyboardArrowDown,
    MdCheckCircle,
    MdOutlineRadioButtonUnchecked,
    MdOutlineAutoAwesome
} from "react-icons/md";

export default function Dashboard() {
    return (
        <div id="dashboard-container" className="flex flex-col gap-6 font-nunito bg-[#F5F6FA] min-h-screen pb-10">
            
            {/* --- PAGE HEADER --- */}
            <PageHeader title="Dashboard" breadcrumb={["Dashboard"]}>
                {/* <button className="bg-[#B01030] text-white px-5 py-2.5 rounded-xl hover:bg-[#8e0d27] transition-all font-bold shadow-lg shadow-red-900/10 text-sm flex items-center gap-2">
                    <MdOutlineAutoAwesome /> + Add Order
                </button> */}
            </PageHeader>

            {/* --- TOP ROW: 4 STATISTIC CARDS --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-8">
                {[
                    { title: "Earnings", value: "$125,000", icon: <MdOutlineAttachMoney /> },
                    { title: "Total Customers", value: "315", icon: <MdOutlinePersonOutline /> },
                    { title: "Orders", value: "250", icon: <MdOutlineEventAvailable /> },
                    { title: "Transactions", value: "65", icon: <MdOutlineMedicalServices /> }
                ].map((item, idx) => (
                    <div key={idx} className="bg-white relative overflow-hidden flex items-center justify-between rounded-3xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer group">
                        <div className="flex flex-col z-10">
                            {/* Judul Menu Atas: 16px */}
                            <span className="text-[16px] text-gray-500 font-bold mb-1">{item.title}</span>
                            {/* Angka Utama: Diubah ke 28px */}
                            <span className="text-[28px] font-extrabold text-[#202224] leading-tight">{item.value}</span>
                        </div>
                        <div className="bg-[#F5F6FA] text-[#B01030] rounded-2xl p-4 group-hover:bg-[#B01030] group-hover:text-white transition-colors duration-300">
                            <div className="text-3xl">{item.icon}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 px-8 mt-2">
                
                <div className="xl:col-span-2 flex flex-col gap-6">
                    
                    {/* REVENUE CHART */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex flex-col items-center mb-10 relative">
                            {/* Judul Card Lain: 24px & Center */}
                            <h2 className="text-[24px] font-extrabold text-[#202224] text-center w-full">Revenue</h2>
                            <div className="absolute right-0 top-1 bg-[#F5F6FA] px-4 py-2 rounded-xl text-sm font-bold text-[#202224] flex items-center gap-2 cursor-pointer border border-gray-100">
                                2026 <MdOutlineKeyboardArrowDown />
                            </div>
                        </div>
                        <div className="w-full h-56 relative flex items-end">
                            <svg className="w-full h-full absolute bottom-0" preserveAspectRatio="none" viewBox="0 0 100 40">
                                <path d="M 0 35 C 15 20, 30 40, 50 15 C 70 5, 85 25, 100 10" fill="none" stroke="#B01030" strokeWidth="2" />
                                <path d="M 0 30 C 20 35, 40 15, 60 30 C 80 40, 90 20, 100 25" fill="none" stroke="#202224" strokeWidth="1" strokeDasharray="2 2" opacity="0.1" />
                            </svg>
                            <div className="w-full h-full flex flex-col justify-between border-b border-gray-100 pb-2">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="border-t border-gray-50 w-full h-0"></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RECENT TRANSACTIONS TABLE */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex flex-col items-center mb-6 relative">
                            {/* Judul Card Lain: 24px & Center */}
                            <h2 className="text-[24px] font-extrabold text-[#202224] text-center w-full">Recent Transactions</h2>
                            <button className="absolute right-0 top-2 text-sm font-bold text-[#B01030] hover:underline">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="text-gray-400 font-bold border-b border-gray-50 text-[14px]">
                                    <tr>
                                        <th className="py-4 px-2">Customer Name</th>
                                        <th className="py-4">Product</th>
                                        <th className="py-4">Date</th>
                                        <th className="py-4 text-center">Order Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[14px]">
                                    <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                        <td className="py-5 px-2 font-bold text-[#202224]">Nabila Putri</td>
                                        <td className="py-5 text-gray-600 font-medium">Sheet Mask Bundle</td>
                                        <td className="py-5 text-gray-600">12.09.2024</td>
                                        <td className="py-5 text-center">
                                            <span className="bg-[#00B69B] text-white px-6 py-2 rounded-full text-[14px] font-bold inline-block min-w-[130px]">
                                                Delivered
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                        <td className="py-5 px-2 font-bold text-[#202224]">Citra Kirana</td>
                                        <td className="py-5 text-gray-600 font-medium">Cushion & Lip Tint</td>
                                        <td className="py-5 text-gray-600">13.09.2024</td>
                                        <td className="py-5 text-center">
                                            <span className="bg-[#6226EF] text-white px-6 py-2 rounded-full text-[14px] font-bold inline-block min-w-[130px]">
                                                Shipped
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="py-5 px-2 font-bold text-[#202224]">Budi Santoso</td>
                                        <td className="py-5 text-gray-600 font-medium">Acne Spot Treatment</td>
                                        <td className="py-5 text-gray-600">14.09.2024</td>
                                        <td className="py-5 text-center">
                                            <span className="bg-[#FFF4F2] text-[#B01030] px-6 py-2 rounded-full text-[14px] font-bold inline-block min-w-[130px]">
                                                Pending
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT COLUMN --- */}
                <div className="flex flex-col gap-6">
                    
                    {/* JADWAL PENGIRIMAN */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-[24px] font-extrabold text-[#202224] mb-6 text-center">Jadwal Pengiriman</h2>
                        <div className="space-y-6">
                            {[
                                { dr: "#BS-001", patient: "Nabila Putri", time: "09:00 AM", room: "REG", done: true },
                                { dr: "#BS-002", patient: "Andika Pratama", time: "12:00 PM", room: "EXP", done: false }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className={`mt-1 ${item.done ? "text-[#00B69B]" : "text-gray-300"}`}>
                                        {item.done ? <MdCheckCircle size={24} /> : <MdOutlineRadioButtonUnchecked size={24} />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <p className="font-bold text-[#202224]">{item.dr}</p>
                                            <span className="text-[10px] font-extrabold px-2 py-1 bg-[#F5F6FA] rounded-md text-gray-500 uppercase">{item.room}</span>
                                        </div>
                                        <p className="text-sm text-gray-400 font-medium">{item.patient} • {item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-8 bg-[#B01030] text-white font-bold py-3.5 rounded-2xl text-[14px] hover:bg-[#8e0d27] transition-all shadow-lg shadow-red-900/10">
                            View All Orders
                        </button>
                    </div>

                    {/* POPULAR PRODUCTS */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-[24px] font-extrabold text-[#202224] mb-6 text-center">Most Popular</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-[#F5F6FA] rounded-2xl border border-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#B01030] text-white flex items-center justify-center font-bold">1</div>
                                    <div>
                                        <p className="font-bold text-[#202224] text-[14px]">Serum Vitamin C</p>
                                        <p className="text-[11px] text-gray-400 font-bold">45% Popularity</p>
                                    </div>
                                </div>
                                <MdOutlineAutoAwesome className="text-[#B01030]" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            
        </div>
    );
}