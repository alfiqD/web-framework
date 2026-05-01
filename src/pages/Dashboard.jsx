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
        <div id="dashboard-container" className="flex flex-col gap-6">
            
            {/* --- PAGE HEADER --- */}
            <PageHeader title="Dashboard" breadcrumb={["Dashboard"]}>
                <button className="bg-[#E17887] text-white px-5 py-2.5 rounded-xl hover:bg-[#d06172] transition-colors font-semibold shadow-md shadow-pink-200 text-sm">
                    + New Patient
                </button>
            </PageHeader>

            {/* --- TOP ROW: KARTU STATISTIK BESAR & TIMBUL --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-1">
                
                {/* Card 1: Earnings (Pink) */}
                <div className="relative overflow-hidden flex items-center space-x-4 bg-[#FFE4E6] rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-pink-200/50 cursor-pointer border border-white/50">
                    <div className="bg-white text-gray-700 rounded-full p-4 shadow-sm z-10">
                        <MdOutlineAttachMoney className="text-2xl" />
                    </div>
                    <div className="flex flex-col z-10">
                        <span className="text-[13px] text-gray-500 font-semibold mb-0.5">Earnings</span>
                        <span className="text-3xl font-extrabold text-gray-800">$125,000</span>
                    </div>
                    <MdOutlineAutoAwesome className="absolute -right-4 -bottom-4 text-white opacity-40 text-7xl transform rotate-12" />
                </div>

                {/* Card 2: Total Patients (Mint) */}
                <div className="relative overflow-hidden flex items-center space-x-4 bg-[#D4F3E6] rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-green-200/50 cursor-pointer border border-white/50">
                    <div className="bg-white text-gray-700 rounded-full p-4 shadow-sm z-10">
                        <MdOutlinePersonOutline className="text-2xl" />
                    </div>
                    <div className="flex flex-col z-10">
                        <span className="text-[13px] text-gray-500 font-semibold mb-0.5">Total Patients</span>
                        <span className="text-3xl font-extrabold text-gray-800">315</span>
                    </div>
                    <MdOutlineAutoAwesome className="absolute -right-4 -bottom-4 text-white opacity-50 text-7xl transform rotate-12" />
                </div>

                {/* Card 3: Appointments (Mint) */}
                <div className="relative overflow-hidden flex items-center space-x-4 bg-[#D4F3E6] rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-green-200/50 cursor-pointer border border-white/50">
                    <div className="bg-white text-gray-700 rounded-full p-4 shadow-sm z-10">
                        <MdOutlineEventAvailable className="text-2xl" />
                    </div>
                    <div className="flex flex-col z-10">
                        <span className="text-[13px] text-gray-500 font-semibold mb-0.5">Appointments</span>
                        <span className="text-3xl font-extrabold text-gray-800">250</span>
                    </div>
                    <MdOutlineAutoAwesome className="absolute -right-4 -bottom-4 text-white opacity-50 text-7xl transform rotate-12" />
                </div>

                {/* Card 4: Surgeries (Pink) */}
                <div className="relative overflow-hidden flex items-center space-x-4 bg-[#FFE4E6] rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-pink-200/50 cursor-pointer border border-white/50">
                    <div className="bg-white text-gray-700 rounded-full p-4 shadow-sm z-10">
                        <MdOutlineMedicalServices className="text-2xl" />
                    </div>
                    <div className="flex flex-col z-10">
                        <span className="text-[13px] text-gray-500 font-semibold mb-0.5">Surgeries</span>
                        <span className="text-3xl font-extrabold text-gray-800">65</span>
                    </div>
                    <MdOutlineAutoAwesome className="absolute -right-4 -bottom-4 text-white opacity-40 text-7xl transform rotate-12" />
                </div>

            </div>

            {/* --- MAIN DASHBOARD AREA (Responsive Grid 3 Kolom) --- */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 px-1 mt-2">
                
                {/* --- KOLOM KIRI & TENGAH (Makan 2 kolom) --- */}
                <div className="xl:col-span-2 flex flex-col gap-6">
                    
                    {/* KARTU 1: REVENUE (Line Chart Dummy Pakai SVG) */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-gray-200/50 cursor-pointer">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">Revenue</h2>
                                <div className="flex gap-4 text-xs font-medium text-gray-400 mt-1">
                                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#7BBEA5]"></div> Income</span>
                                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#E17887]"></div> Expenses</span>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 flex items-center gap-2 cursor-pointer">
                                2027 <MdOutlineKeyboardArrowDown />
                            </div>
                        </div>
                        {/* Dummy SVG Chart */}
                        <div className="w-full h-48 relative flex items-end">
                            <svg className="w-full h-full absolute bottom-0" preserveAspectRatio="none" viewBox="0 0 100 40">
                                <path d="M 0 35 C 15 20, 30 40, 50 15 C 70 5, 85 25, 100 10" fill="none" stroke="#7BBEA5" strokeWidth="1.5" />
                                <path d="M 0 30 C 20 35, 40 15, 60 30 C 80 40, 90 20, 100 25" fill="none" stroke="#E17887" strokeWidth="1.5" strokeDasharray="3 2" />
                            </svg>
                            {/* Garis bantu horizontal */}
                            <div className="w-full h-full flex flex-col justify-between border-b border-gray-100 pb-2">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="border-t border-gray-100 w-full h-0"></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* KARTU 2 & 3: GRID DI DALAM GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* KARTU BAR CHART (Patients by Gender) */}
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-gray-200/50 cursor-pointer">
                            <h2 className="text-lg font-bold text-gray-800 mb-6">Patients by Gender</h2>
                            <div className="flex items-end justify-between h-40 mt-4 px-2">
                                {/* Dummy CSS Bars */}
                                {[40, 60, 30, 70, 50, 40].map((h, i) => (
                                    <div key={i} className="flex gap-1.5 items-end h-full">
                                        <div className="w-3 md:w-4 bg-[#FFE4E6] rounded-t-md transition-all hover:bg-[#E17887]" style={{ height: `${h}%` }}></div>
                                        <div className="w-3 md:w-4 bg-[#D4F3E6] rounded-t-md transition-all hover:bg-[#7BBEA5]" style={{ height: `${h + 20}%` }}></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* KARTU DONUT CHART (Patient by Treatment) */}
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-gray-200/50 cursor-pointer">
                            <h2 className="text-lg font-bold text-gray-800 w-full text-left mb-4">Patient by Treatment</h2>
                            {/* CSS Donut Chart */}
                            <div className="relative w-40 h-40 rounded-full bg-[conic-gradient(#7BBEA5_0%_45%,_#E17887_45%_75%,_#f3f4f6_75%_100%)] flex items-center justify-center shadow-inner">
                                <div className="w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-sm">
                                    <span className="text-xs text-gray-400 font-medium">Total Patient</span>
                                    <span className="font-bold text-gray-800 text-2xl">315</span>
                                </div>
                            </div>
                            <div className="flex w-full justify-between mt-6 text-sm">
                                <span className="flex items-center gap-2 font-medium text-gray-600"><div className="w-3 h-3 rounded-full bg-[#7BBEA5]"></div> Rhinoplasty</span>
                                <span className="font-bold text-gray-800">45%</span>
                            </div>
                        </div>
                    </div>

                    {/* KARTU 4: TABEL STATUS */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-gray-200/50 cursor-pointer">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-gray-800">Patient Status</h2>
                            <button className="text-sm font-semibold text-[#7BBEA5] hover:underline">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="text-xs text-gray-400 uppercase font-medium border-b border-gray-50">
                                    <tr>
                                        <th className="py-3 font-medium">Patient</th>
                                        <th className="py-3 font-medium">Treatment</th>
                                        <th className="py-3 font-medium">Date & Time</th>
                                        <th className="py-3 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-50 hover:bg-gray-50">
                                        <td className="py-4 font-bold text-gray-800">Sarah Miller<br/><span className="text-xs font-normal text-gray-400">PB-001</span></td>
                                        <td className="py-4 text-gray-600 font-medium">Facial Rejuvenation<br/><span className="text-xs text-gray-400">Dr. Olivia Grant</span></td>
                                        <td className="py-4 text-gray-600 font-medium">2026-05-12<br/><span className="text-xs text-gray-400">09:00 AM</span></td>
                                        <td className="py-4"><span className="bg-[#D4F3E6] text-[#5fa389] px-3 py-1 rounded-full text-xs font-bold">Completed</span></td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="py-4 font-bold text-gray-800">Maurice Galley<br/><span className="text-xs font-normal text-gray-400">PB-002</span></td>
                                        <td className="py-4 text-gray-600 font-medium">Laser Hair Removal<br/><span className="text-xs text-gray-400">Dr. David Carter</span></td>
                                        <td className="py-4 text-gray-600 font-medium">2026-05-12<br/><span className="text-xs text-gray-400">12:00 PM</span></td>
                                        <td className="py-4"><span className="bg-[#FFE4E6] text-[#E17887] px-3 py-1 rounded-full text-xs font-bold">In Progress</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* --- KOLOM KANAN (Makan 1 kolom) --- */}
                <div className="flex flex-col gap-6">
                    
                    {/* KARTU 5: SURGERY SCHEDULES */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-gray-200/50 cursor-pointer">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">Surgery Schedules</h2>
                                <p className="text-xs text-gray-400 font-medium mt-1">Tuesday, 5 Sep 2028</p>
                            </div>
                            <button className="text-xl text-gray-400 hover:text-[#7BBEA5]">+</button>
                        </div>
                        
                        <div className="space-y-4">
                            {/* Jadwal 1 (Selesai) */}
                            <div className="flex gap-4">
                                <MdCheckCircle className="text-[#7BBEA5] text-xl shrink-0 mt-1" />
                                <div className="w-full">
                                    <div className="flex justify-between w-full">
                                        <span className="font-bold text-gray-800 text-[15px]">Dr. Olivia Grant</span>
                                        <span className="bg-[#FFE4E6] text-[#E17887] text-[10px] font-bold px-2 py-0.5 rounded-md">Room OR 1</span>
                                    </div>
                                    <div className="flex justify-between w-full mt-1">
                                        <span className="text-xs text-gray-400 font-medium">Sarah Miller</span>
                                        <span className="text-xs text-gray-400 font-medium">9:00 AM - 11:30 AM</span>
                                    </div>
                                </div>
                            </div>
                            <hr className="border-gray-50" />
                            {/* Jadwal 2 (Belum) */}
                            <div className="flex gap-4">
                                <MdOutlineRadioButtonUnchecked className="text-gray-300 text-xl shrink-0 mt-1" />
                                <div className="w-full">
                                    <div className="flex justify-between w-full">
                                        <span className="font-bold text-gray-800 text-[15px]">Dr. David Carter</span>
                                        <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-md">Room OR 2</span>
                                    </div>
                                    <div className="flex justify-between w-full mt-1">
                                        <span className="text-xs text-gray-400 font-medium">Michael Brown</span>
                                        <span className="text-xs text-gray-400 font-medium">12:00 PM - 2:00 PM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="w-full mt-6 bg-[#D4F3E6] text-[#5fa389] font-bold py-3 rounded-xl text-sm hover:bg-[#c3ecd9] transition-colors">
                            View All Schedule
                        </button>
                    </div>

                    {/* KARTU 6: MOST POPULAR TREATMENTS */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex-1 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-gray-200/50 cursor-pointer">
                        <h2 className="text-lg font-bold text-gray-800 mb-6">Most Popular Treatments</h2>
                        <div className="space-y-5">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#FFE4E6] text-[#E17887] font-bold flex items-center justify-center">#1</div>
                                <div>
                                    <p className="font-bold text-gray-800 text-sm">Facial Rejuvenation</p>
                                    <p className="text-xs text-gray-400 font-medium flex items-center gap-1 mt-1"><span className="text-yellow-400">★</span> (4.9) • 2,150 reviews</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#FFE4E6] text-[#E17887] font-bold flex items-center justify-center">#2</div>
                                <div>
                                    <p className="font-bold text-gray-800 text-sm">Laser Hair Removal</p>
                                    <p className="text-xs text-gray-400 font-medium flex items-center gap-1 mt-1"><span className="text-yellow-400">★</span> (4.8) • 1,980 reviews</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            
        </div>
    );
}