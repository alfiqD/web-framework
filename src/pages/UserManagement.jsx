import { useState, useEffect } from 'react';
import PageHeader from "../components/PageHeader";
import { 
    MdSearch, 
    MdFilterList, 
    MdAdd,
    MdOutlineAdminPanelSettings,
    MdSecurity,
    MdOutlineEdit,
    MdDeleteOutline,
    MdLockOutline,
    MdClose,
    MdWarningAmber
} from "react-icons/md";
import { supabase } from "../config/supabaseClient"; 

export default function UserManagement() {
    // --- STATE MANAGEMENT ---
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    // --- STATE UNTUK MODAL CREATE/EDIT ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("create"); 
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "Kasir" // Default role yang baru
    });

    // --- STATE UNTUK MODAL DELETE ---
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    // --- 1. READ: FETCH DATA FROM SUPABASE ---
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .order('id', { ascending: true });

            if (error) throw error;
            setUsers(data || []);
        } catch (error) {
            console.error("Error fetching users:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // --- 2. CREATE & UPDATE: SUBMIT FORM ---
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (modalType === "create") {
                const { error } = await supabase
                    .from('users')
                    .insert([{ 
                        email: formData.email, 
                        password: formData.password, 
                        role: formData.role 
                    }]);
                if (error) throw error;
            } else {
                const updateData = { 
                    email: formData.email, 
                    role: formData.role 
                };
                if (formData.password.trim() !== "") {
                    updateData.password = formData.password;
                }

                const { error } = await supabase
                    .from('users')
                    .update(updateData)
                    .eq('id', selectedUserId);
                if (error) throw error;
            }

            setIsModalOpen(false);
            resetForm();
            fetchUsers(); 
        } catch (error) {
            alert("Gagal menyimpan data: " + error.message);
        }
    };

    // --- 3. DELETE: PERSIAPAN DAN EKSEKUSI ---
    // Fungsi memanggil modal konfirmasi hapus
    const confirmDelete = (user) => {
        setUserToDelete(user);
        setIsDeleteModalOpen(true);
    };

    // Fungsi eksekusi hapus setelah dikonfirmasi di modal
    const executeDelete = async () => {
        if (!userToDelete) return;
        try {
            const { error } = await supabase
                .from('users')
                .delete()
                .eq('id', userToDelete.id);
            
            if (error) throw error;
            
            setIsDeleteModalOpen(false);
            setUserToDelete(null);
            fetchUsers(); 
        } catch (error) {
            alert("Gagal menghapus data: " + error.message);
        }
    };

    // --- OPEN EDIT MODAL ---
    const openEditModal = (user) => {
        setModalType("edit");
        setSelectedUserId(user.id);
        setFormData({
            email: user.email,
            password: "", 
            role: user.role
        });
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setFormData({ email: "", password: "", role: "Kasir" });
        setSelectedUserId(null);
    };

    // --- FILTER DATA ---
    const filteredUsers = users.filter((user) => {
        const matchesSearch = (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase());
        const matchRole = roleFilter === 'All' || user.role === roleFilter;
        return matchesSearch && matchRole;
    });

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, roleFilter]);

    // --- PAGINATION ---
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    // --- ANALYTICS ---
    const totalUsers = users.length;
    const adminCount = users.filter(u => u.role === 'Admin' || u.role === 'Owner').length;

    // --- HELPERS: Warna Role yang Baru ---
    const getRoleBadge = (role) => {
        switch (role) {
            case 'Owner': return <span className="bg-[#B01030] text-white px-2.5 py-1 rounded-lg text-[10px] font-black shadow-md shadow-red-900/20">{role}</span>;
            case 'Admin': return <span className="bg-purple-50 text-purple-600 px-2.5 py-1 rounded-lg text-[10px] font-black border border-purple-100">{role}</span>;
            case 'Manager': return <span className="bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg text-[10px] font-black border border-indigo-100">{role}</span>;
            case 'Logistik': return <span className="bg-orange-50 text-orange-600 px-2.5 py-1 rounded-lg text-[10px] font-black border border-orange-100">{role}</span>;
            case 'Kasir': return <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-lg text-[10px] font-black border border-blue-100">{role}</span>;
            default: return <span className="bg-gray-50 text-gray-600 px-2.5 py-1 rounded-lg text-[10px] font-black border border-gray-200">{role || 'Unknown'}</span>;
        }
    };

    const renderHashedPassword = () => {
        return (
            <div className="flex items-center gap-1.5 text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg w-fit text-[10px] tracking-widest font-black border border-gray-100">
                <MdLockOutline size={14} className="text-gray-400" /> ••••••••
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-6 font-nunito bg-[#F4F7FE] min-h-screen pb-10">
            <PageHeader title="User Access & Auth" breadcrumb={["Dashboard", "Settings", "Users"]} />

            {/* --- ANALYTICS CARDS --- */}
            <div className="mx-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center text-2xl"><MdSecurity /></div>
                    <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Total Accounts</p>
                        <h3 className="text-3xl font-black text-gray-800 leading-none">{loading ? "..." : totalUsers}</h3>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-[#B01030] to-[#8e0d27] p-6 rounded-3xl shadow-lg shadow-red-900/10 flex items-center gap-5 text-white">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl text-white border border-white/20"><MdOutlineAdminPanelSettings /></div>
                    <div>
                        <p className="text-[11px] font-black text-red-200 uppercase tracking-widest mb-1">High Privileges</p>
                        <h3 className="text-3xl font-black leading-none">{loading ? "..." : adminCount} <span className="text-sm text-red-200 font-bold">Admin/Owner</span></h3>
                    </div>
                </div>
            </div>

            {/* --- MAIN DATA CONTAINER --- */}
            <div className="mx-8 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                {/* TOOLBAR */}
                <div className="p-6 border-b border-gray-50 flex flex-col lg:flex-row justify-between items-center gap-4 bg-white/50 backdrop-blur-md">
                    <div className="relative w-full lg:w-96 group">
                        <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-[#B01030] transition-colors" />
                        <input type="text" placeholder="Cari email user..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-[#B01030]/10 focus:border-[#B01030] transition-all font-bold text-sm text-gray-700 placeholder-gray-400" />
                    </div>
                    <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
                        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="bg-white border border-gray-200 text-gray-600 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] cursor-pointer shadow-sm">
                            <option value="All">Semua Role</option>
                            <option value="Owner">Owner</option>
                            <option value="Admin">Admin</option>
                            <option value="Manager">Manager</option>
                            <option value="Logistik">Logistik</option>
                            <option value="Kasir">Kasir</option>
                        </select>
                        <button onClick={() => { setModalType("create"); resetForm(); setIsModalOpen(true); }} className="bg-[#B01030] text-white px-5 py-3 rounded-xl hover:bg-[#8e0d27] transition-all font-bold text-sm flex items-center gap-2 shadow-md shadow-red-900/10 active:scale-95">
                            <MdAdd size={20} /> Create User
                        </button>
                    </div>
                </div>

                {/* TABEL DATA */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="p-5 pl-8 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">User Account</th>
                                <th className="p-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">System Role</th>
                                <th className="p-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Password</th>
                                <th className="p-5 pr-8 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right border-b border-gray-100">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan="4" className="p-10 text-center font-bold text-gray-400 animate-pulse">Menghubungkan ke Supabase...</td></tr>
                            ) : currentUsers.length > 0 ? currentUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-red-50/10 transition-colors group">
                                    <td className="p-5 pl-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 flex items-center justify-center font-black text-gray-600 text-sm shrink-0 uppercase">
                                                {user.email ? user.email.substring(0, 2) : "U"}
                                            </div>
                                            <div>
                                                <div className="text-[14px] font-black text-gray-900 capitalize">
                                                    {user.email ? user.email.split('@')[0] : "User"}
                                                </div>
                                                <div className="text-[12px] font-bold text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-5">{getRoleBadge(user.role)}</td>
                                    <td className="p-5">
                                        {renderHashedPassword()}
                                    </td>
                                    <td className="p-5 pr-8 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => openEditModal(user)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl" title="Edit"><MdOutlineEdit size={18} /></button>
                                            <button onClick={() => confirmDelete(user)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl" title="Delete"><MdDeleteOutline size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan="4" className="p-16 text-center font-bold text-gray-400">User Tidak Ditemukan.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION FOOTER */}
                <div className="p-5 border-t border-gray-50 bg-gray-50/30 flex justify-between items-center px-8">
                    <p className="text-sm font-bold text-gray-400">Showing <span className="text-gray-700">{indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredUsers.length)}</span> of {filteredUsers.length}</p>
                    <div className="flex gap-1.5">
                        {pageNumbers.map(n => (
                            <button key={n} onClick={() => setCurrentPage(n)} className={`px-4 py-2 rounded-xl text-sm font-bold ${currentPage === n ? 'bg-[#B01030] text-white' : 'border border-gray-200 text-gray-600 hover:bg-white'}`}>{n}</button>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- MODAL FORM DIALOG (CREATE & EDIT) --- */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
                    <div className="bg-white rounded-[2rem] w-full max-w-md p-8 shadow-2xl border border-gray-100 flex flex-col gap-6 transform transition-all scale-100">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-black text-gray-900">{modalType === 'create' ? "Create New User Account" : "Edit User Account"}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700 bg-gray-50 p-2 rounded-full"><MdClose size={20}/></button>
                        </div>
                        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 font-bold text-sm text-gray-600">
                            <div className="flex flex-col gap-1.5">
                                <label>Email Address</label>
                                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#B01030] transition-all" placeholder="name@byutie.com" />
                            </div>
                            
                            <div className="flex flex-col gap-1.5">
                                <label>{modalType === 'create' ? 'Password' : 'New Password (opsional)'}</label>
                                <input 
                                    type="password" 
                                    required={modalType === 'create'} 
                                    value={formData.password} 
                                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#B01030] transition-all" 
                                    placeholder={modalType === 'create' ? "Minimal 6 karakter..." : "Kosongkan jika tidak ingin mengubah password"} 
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label>Assign Role</label>
                                <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none cursor-pointer">
                                    <option value="Admin">Admin</option>
                                    <option value="Kasir">Kasir</option>
                                    <option value="Owner">Owner</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Logistik">Logistik</option>
                                </select>
                            </div>
                            
                            <button type="submit" className="bg-[#B01030] text-white py-3.5 rounded-xl font-black mt-4 hover:bg-[#8e0d27] transition-all active:scale-95 shadow-lg shadow-red-900/10">
                                {modalType === 'create' ? "Save & Create Account" : "Update Account"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* --- MODAL CONFIRM DELETE (MAHAKARYA) --- */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-fadeIn">
                    <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl flex flex-col items-center text-center transform transition-all scale-100">
                        <div className="w-16 h-16 rounded-full bg-red-100 text-[#B01030] flex items-center justify-center text-3xl mb-4 shadow-inner">
                            <MdWarningAmber />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 mb-2">Hapus Akun?</h3>
                        <p className="text-sm font-semibold text-gray-500 mb-6 px-2">
                            Apakah kamu yakin ingin menghapus akses login untuk email <span className="text-gray-800 font-black">{userToDelete?.email}</span>? Tindakan ini tidak dapat dibatalkan.
                        </p>
                        <div className="flex gap-3 w-full">
                            <button 
                                onClick={() => setIsDeleteModalOpen(false)} 
                                className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all active:scale-95"
                            >
                                Batal
                            </button>
                            <button 
                                onClick={executeDelete} 
                                className="flex-1 py-3 bg-[#B01030] text-white rounded-xl font-bold hover:bg-[#8e0d27] transition-all shadow-md shadow-red-900/20 active:scale-95"
                            >
                                Ya, Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}