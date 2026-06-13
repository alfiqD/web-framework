import { useState, useEffect } from 'react';
import PageHeader from "../components/PageHeader";
import { 
    MdSearch, 
    MdOutlinePeopleAlt, 
    MdAccessTime, 
    MdMoreVert,
    MdAdd,
    MdFilterList,
    MdFileDownload,
    MdOutlineEdit,
    MdDeleteOutline,
    MdCheckCircle,
    MdWbSunny,
    MdNightsStay,
    MdWorkOutline,
    MdAttachMoney
} from "react-icons/md";
import staffData from "../data/staff.json";

export default function Staff() {
    // --- STATE MANAGEMENT ---
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // --- LOGIKA FILTER DATA ---
    const filteredStaff = staffData.filter((member) => {
        const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Grouping role filter untuk mempermudah
        let matchRole = true;
        if (roleFilter === 'Medical & Therapist') {
            matchRole = member.role.includes('Dermatologist') || member.role.includes('Therapist');
        } else if (roleFilter === 'Operational') {
            matchRole = ['Admin', 'Cashier', 'Security', 'Consultant'].includes(member.role);
        } else if (roleFilter !== 'All') {
            matchRole = member.role === roleFilter;
        }

        return matchesSearch && matchRole;
    });

    // Reset pagination ketika filter berubah
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, roleFilter]);

    // --- LOGIKA PEMOTONGAN DATA (PAGINATION) ---
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentStaff = filteredStaff.slice(indexOfFirstItem, indexOfLastItem);
    
    const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    // --- KALKULASI STATISTIK OTOMATIS ---
    const formatIDR = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
    
    const totalStaff = staffData.length;
    const onDutyStaff = staffData.filter(s => s.status === 'On Duty').length;
    const totalCommission = staffData.reduce((acc, curr) => acc + (curr.commission || 0), 0);

    // Fungsi Helper Warna Badge Jabatan (Role)
    const getRoleBadge = (role) => {
        if (role.includes('Dermatologist')) return <span className="bg-purple-50 text-purple-600 px-2.5 py-1 rounded-lg text-[10px] font-black border border-purple-100">{role}</span>;
        if (role.includes('Therapist')) return <span className="bg-pink-50 text-pink-600 px-2.5 py-1 rounded-lg text-[10px] font-black border border-pink-100">{role}</span>;
        if (role.includes('Admin') || role.includes('Cashier')) return <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-lg text-[10px] font-black border border-blue-100">{role}</span>;
        if (role.includes('Security')) return <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg text-[10px] font-black border border-gray-200">{role}</span>;
        return <span className="bg-teal-50 text-teal-600 px-2.5 py-1 rounded-lg text-[10px] font-black border border-teal-100">{role}</span>;
    };

    // Fungsi Helper Icon Shift
    const getShiftIcon = (shift) => {
        switch (shift) {
            case 'Morning': return <span className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg text-[11px] font-bold"><MdWbSunny /> Morning</span>;
            case 'Afternoon': return <span className="flex items-center gap-1.5 text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg text-[11px] font-bold"><MdAccessTime /> Afternoon</span>;
            case 'Night': return <span className="flex items-center gap-1.5 text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg text-[11px] font-bold"><MdNightsStay /> Night</span>;
            case 'Full Time': return <span className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2.5 py-1 rounded-lg text-[11px] font-bold"><MdWorkOutline /> Full Time</span>;
            default: return <span className="flex items-center gap-1.5 text-gray-600 bg-gray-50 px-2.5 py-1 rounded-lg text-[11px] font-bold"><MdAccessTime /> {shift}</span>;
        }
    };

    return (
        <div className="flex flex-col gap-6 font-nunito bg-[#F4F7FE] min-h-screen pb-10">
            
            <PageHeader title="Staff & Scheduling" breadcrumb={["Dashboard", "Staff"]}>
                {/* <button className="bg-white text-gray-600 border border-gray-200 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all font-bold text-sm flex items-center gap-2 shadow-sm active:scale-95">
                    <MdFileDownload className="text-lg" /> Export Roster
                </button> */}
            </PageHeader>

            {/* --- ANALYTICS CARDS (3 Grid Layout) --- */}
            <div className="mx-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center text-2xl">
                        <MdOutlinePeopleAlt />
                    </div>
                    <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Total Employees</p>
                        <h3 className="text-3xl font-black text-gray-800 leading-none">{totalStaff} <span className="text-sm font-bold text-gray-400">Persons</span></h3>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center text-2xl">
                        <MdCheckCircle />
                    </div>
                    <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Currently On Duty</p>
                        <h3 className="text-3xl font-black text-gray-800 leading-none">{onDutyStaff} <span className="text-sm font-bold text-green-500">Active</span></h3>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-[#B01030] to-[#8e0d27] p-6 rounded-3xl shadow-lg shadow-red-900/10 flex items-center gap-5 hover:shadow-xl transition-shadow text-white relative overflow-hidden">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl relative z-10 text-white border border-white/20">
                        <MdAttachMoney />
                    </div>
                    <div className="relative z-10">
                        <p className="text-[11px] font-black text-red-200 uppercase tracking-widest mb-1">Est. Commission</p>
                        <h3 className="text-2xl font-black leading-none">{formatIDR(totalCommission)}</h3>
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
                            placeholder="Search staff name..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-[#B01030]/10 focus:border-[#B01030] transition-all font-bold text-sm text-gray-700 placeholder-gray-400"
                        />
                    </div>
                    
                    <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
                        <div className="flex items-center gap-2 text-gray-400 font-bold mr-2 hidden sm:flex">
                            <MdFilterList size={20} /> <span className="text-sm">Department:</span>
                        </div>
                        <select 
                            value={roleFilter} 
                            onChange={(e) => setRoleFilter(e.target.value)} 
                            className="w-full sm:w-auto bg-white border border-gray-200 text-gray-600 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] cursor-pointer shadow-sm transition-all"
                        >
                            <option value="All">All Departments</option>
                            <option value="Medical & Therapist">Medical & Therapist</option>
                            <option value="Operational">Operational Team</option>
                        </select>
                        <button className="bg-[#B01030] text-white px-5 py-3 rounded-xl hover:bg-[#8e0d27] transition-all font-bold text-sm flex items-center gap-2 shrink-0 shadow-md shadow-red-900/10 active:scale-95">
                            <MdAdd size={20} /> Add Staff
                        </button>
                    </div>
                </div>

                {/* TABEL DATA */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="p-5 pl-8 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Employee Name</th>
                                <th className="p-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Role / Position</th>
                                <th className="p-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Current Shift</th>
                                <th className="p-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Commission (MTD)</th>
                                <th className="p-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Status</th>
                                <th className="p-5 pr-8 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right border-b border-gray-100">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {currentStaff.length > 0 ? currentStaff.map((member) => (
                                <tr key={member.id} className="hover:bg-red-50/10 transition-colors group">
                                    
                                    {/* Kolom 1: Nama & Avatar Initials */}
                                    <td className="p-5 pl-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 flex items-center justify-center font-black text-gray-500 text-xs shrink-0">
                                                {member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                            </div>
                                            <div>
                                                <div className="text-[14px] font-black text-gray-900">{member.name}</div>
                                                <div className="text-[10px] font-bold text-gray-400">ID: STF-{member.id.toString().padStart(3, '0')}</div>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    {/* Kolom 2: Role */}
                                    <td className="p-5">
                                        {getRoleBadge(member.role)}
                                    </td>

                                    {/* Kolom 3: Shift */}
                                    <td className="p-5">
                                        {getShiftIcon(member.shift)}
                                    </td>

                                    {/* Kolom 4: Commission */}
                                    <td className="p-5">
                                        <div className="text-[14px] font-black text-gray-700">
                                            {member.commission > 0 ? formatIDR(member.commission) : <span className="text-gray-300">-</span>}
                                        </div>
                                    </td>

                                    {/* Kolom 5: Status */}
                                    <td className="p-5">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${member.status === 'On Duty' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-gray-300'}`}></div>
                                            <span className={`text-[12px] font-bold ${member.status === 'On Duty' ? 'text-gray-700' : 'text-gray-400'}`}>
                                                {member.status}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Kolom 6: Aksi Hover */}
                                    <td className="p-5 pr-8 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100" title="Edit Roster">
                                                <MdOutlineEdit size={18} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100" title="Remove Staff">
                                                <MdDeleteOutline size={18} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all" title="More Options">
                                                <MdMoreVert size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="p-16 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <MdOutlinePeopleAlt className="text-6xl mb-4 text-gray-200" />
                                            <p className="font-black text-lg text-gray-500">Staff Tidak Ditemukan</p>
                                            <p className="font-semibold text-sm mt-1">Silakan sesuaikan kata pencarian atau filter departemen.</p>
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
                        Showing <span className="text-gray-700">{filteredStaff.length > 0 ? indexOfFirstItem + 1 : 0} - {Math.min(indexOfLastItem, filteredStaff.length)}</span> of <span className="text-gray-700">{filteredStaff.length}</span> employees
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