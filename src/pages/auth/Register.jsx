import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../config/supabaseClient'; 
import { rolesData } from '../../config/rolesConfig'; // Import data role bersama
import { FiMail, FiLock, FiShield, FiEye, FiEyeOff, FiChevronDown } from 'react-icons/fi';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(rolesData[0].value); // Default ke role pertama (Admin)
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
    const navigate = useNavigate();
    const dropdownRef = useRef(null); // Ref untuk menutup dropdown saat klik di luar

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        setSuccessMsg('');

        const { error } = await supabase
            .from('users')
            .insert([{ email: email, password: password, role: role }]);

        if (error) {
            setErrorMsg(error.message);
        } else {
            setSuccessMsg('Pendaftaran berhasil! Silakan masuk.');
            setEmail('');
            setPassword('');
            setRole(rolesData[0].value); // Reset ke role pertama
        }
        setLoading(false);
    };

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
        setIsDropdownOpen(false);
    };

    // Fungsi untuk menutup dropdown saat klik di luar elemen dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Mencari data role yang sedang dipilih untuk ditampilkan di form
    const currentRoleData = rolesData.find(r => r.value === role);

    return (
        <div className="w-full">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-1">Buat Akun Baru</h2>
                <p className="text-gray-500 text-sm font-medium">Lengkapi data untuk mengakses sistem Byutie</p>
            </div>

            {errorMsg && <div className="bg-red-50/80 border border-red-200 text-red-600 p-4 rounded-2xl text-sm mb-6 font-bold flex items-center gap-2 shadow-sm"><FiShield className="text-lg"/>{errorMsg}</div>}
            {successMsg && <div className="bg-green-50/80 border border-green-200 text-green-600 p-4 rounded-2xl text-sm mb-6 font-bold flex items-center gap-2 shadow-sm"><FiShield className="text-lg"/>{successMsg}</div>}

            <form onSubmit={handleRegister} className="space-y-5">
                {/* Email Input */}
                <div>
                    <label className="block text-xs font-black text-gray-700 mb-1.5 uppercase tracking-wider ml-1">Email Address</label>
                    <div className="relative flex items-center">
                        <FiMail className="absolute left-4 text-gray-400 text-lg" />
                        <input 
                            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-[#B01030]/10 focus:border-[#B01030] transition-all font-semibold text-sm text-gray-800 placeholder-gray-400 shadow-sm"
                            placeholder="nama@byutie.com"
                        />
                    </div>
                </div>

                {/* Password Input */}
                <div>
                    <label className="block text-xs font-black text-gray-700 mb-1.5 uppercase tracking-wider ml-1">Password</label>
                    <div className="relative flex items-center">
                        <FiLock className="absolute left-4 text-gray-400 text-lg" />
                        <input 
                            type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-12 pr-12 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-[#B01030]/10 focus:border-[#B01030] transition-all font-semibold text-sm text-gray-800 placeholder-gray-400 shadow-sm"
                            placeholder="Minimal 6 karakter"
                        />
                        <button 
                            type="button" onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 text-gray-400 hover:text-[#B01030] transition-colors focus:outline-none"
                        >
                            {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                        </button>
                    </div>
                </div>

                {/* Premium Custom Role Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <label className="block text-xs font-black text-gray-700 mb-1.5 uppercase tracking-wider ml-1">Pilih Jabatan (Role)</label>
                    <div 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border ${isDropdownOpen ? 'border-[#B01030] ring-4 ring-[#B01030]/10 bg-white' : 'border-gray-200'} rounded-2xl cursor-pointer transition-all flex items-center justify-between font-bold text-[#B01030] text-sm relative shadow-sm`}
                    >
                        <FiShield className="absolute left-4 text-[#B01030] text-lg" />
                        <span>{currentRoleData.label}</span>
                        <FiChevronDown className={`text-gray-500 text-lg transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-[#B01030]' : ''}`} />
                    </div>

                    {/* Dropdown Menu Items - Premium Card Layout */}
                    {isDropdownOpen && (
                        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-y-auto max-h-72 animate-in fade-in slide-in-from-top-2 duration-200">
                            {rolesData.map((roleItem, index) => (
                                <div key={roleItem.value}>
                                    <div 
                                        onClick={() => handleRoleSelect(roleItem.value)}
                                        className={`flex items-center gap-3 p-4 cursor-pointer transition-colors ${role === roleItem.value ? 'bg-red-50 text-[#B01030]' : 'hover:bg-gray-50 text-gray-700'}`}
                                    >
                                        <div className={`p-2.5 rounded-xl ${role === roleItem.value ? 'bg-[#B01030] text-white' : 'bg-gray-100 text-gray-500'}`}>
                                            {roleItem.icon}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-extrabold text-sm tracking-tight">{roleItem.label}</p>
                                            <p className="text-xs text-gray-500 font-medium">{roleItem.description}</p>
                                        </div>
                                        {role === roleItem.value && <div className="w-2 h-2 rounded-full bg-[#B01030]"></div>}
                                    </div>
                                    {index < rolesData.length - 1 && <div className="h-[1px] w-full bg-gray-50"></div>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                {/* Submit Button */}
                <button type="submit" disabled={loading} className="w-full relative group overflow-hidden bg-gradient-to-r from-[#B01030] to-[#E53935] text-white py-4 rounded-2xl font-extrabold transition-all hover:shadow-[0_10px_25px_-8px_rgba(176,16,48,0.6)] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 disabled:opacity-70 mt-6 text-sm shadow-md">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {loading ? (
                            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Memproses...</>
                        ) : 'Daftar Sekarang'}
                    </span>
                </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-500 font-medium">
                    Sudah memiliki akun staf? <Link to="/login" className="text-[#B01030] font-extrabold hover:text-[#8e0d27] hover:underline transition-colors ml-1">Masuk di sini</Link>
                </p>
            </div>
        </div>
    );
}