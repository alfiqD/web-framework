import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../config/supabaseClient'; // Pastikan path ini benar!
import { 
    MdEmail, 
    MdLockOutline, 
    MdOutlineAutoAwesome,
    MdVisibility,
    MdVisibilityOff,
    MdPersonOutline,
    MdErrorOutline,
    MdCheckCircleOutline
} from "react-icons/md";

export default function MemberAuth() {
    const navigate = useNavigate();
    
    // UI States
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    // Form States
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Status States
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    // Fungsi untuk mereset form saat panel bergeser
    const togglePanel = (isSignUpMode) => {
        setIsSignUp(isSignUpMode);
        setErrorMsg('');
        setSuccessMsg('');
        setEmail('');
        setPassword('');
        setName('');
    };

    // --- LOGIKA LOGIN MEMBER ---
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        setSuccessMsg('');

        try {
            // Mencocokkan data di tabel 'users' khusus untuk role 'member'
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('email', email)
                .eq('password', password)
                .single();

            if (error || !data) {
                setErrorMsg('Email atau password salah, atau akun tidak ditemukan.');
            } else if (data.role !== 'member') {
                setErrorMsg('Akun ini bukan akun member Byutie.');
            } else {
                // Berhasil login
                navigate('/member/dashboard');
            }
        } catch (err) {
            setErrorMsg('Terjadi kesalahan pada server.');
        } finally {
            setLoading(false);
        }
    };

    // --- LOGIKA REGISTER MEMBER ---
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        setSuccessMsg('');

        try {
            // Cek apakah email sudah terdaftar
            const { data: existingUser } = await supabase
                .from('users')
                .select('email')
                .eq('email', email)
                .single();

            if (existingUser) {
                setErrorMsg('Email ini sudah terdaftar. Silakan Sign In.');
                setLoading(false);
                return;
            }

            // Memasukkan data ke tabel users dengan role 'member' otomatis
            const { error } = await supabase
                .from('users')
                .insert([{ 
                    email: email, 
                    password: password, 
                    role: 'member'
                    // Jika tabelmu punya kolom 'name', tambahkan: name: name 
                }]);

            if (error) {
                setErrorMsg(error.message);
            } else {
                setSuccessMsg('Pendaftaran berhasil! Silakan masuk.');
                // Otomatis geser ke panel Sign In setelah 2 detik
                setTimeout(() => {
                    togglePanel(false);
                }, 2000);
            }
        } catch (err) {
            setErrorMsg('Gagal mendaftar, periksa koneksi server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F4F7FE] p-4 font-nunito selection:bg-[#B01030] selection:text-white">
            <div className="relative w-full max-w-5xl h-[650px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden flex md:block">

                {/* --- FORM 1: SIGN IN --- */}
                <div className={`absolute top-0 left-0 h-full w-full md:w-1/2 transition-all duration-1000 ease-in-out flex flex-col justify-center px-10 lg:px-16 bg-white ${isSignUp ? 'translate-x-full md:opacity-0 z-10 pointer-events-none' : 'translate-x-0 opacity-100 z-20'}`}>
                    
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-10 h-10 bg-[#B01030] rounded-xl flex items-center justify-center text-white shadow-md shadow-red-900/20">
                            <MdOutlineAutoAwesome className="text-xl" />
                        </div>
                        <span className="text-xl font-extrabold tracking-tight text-[#202224]">byutie<span className="text-[#B01030]">.</span></span>
                    </div>

                    <h2 className="text-3xl font-black text-[#202224] mb-2">Welcome Back</h2>
                    <p className="text-gray-500 font-bold text-sm mb-6">Masuk untuk mengelola akun Member Byutie.</p>

                    {/* Pesan Error/Sukses Login */}
                    {!isSignUp && errorMsg && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold flex items-center gap-2 mb-4 border border-red-100"><MdErrorOutline className="text-lg"/>{errorMsg}</div>}
                    {!isSignUp && successMsg && <div className="bg-green-50 text-green-600 p-3 rounded-xl text-xs font-bold flex items-center gap-2 mb-4 border border-green-100"><MdCheckCircleOutline className="text-lg"/>{successMsg}</div>}

                    <form onSubmit={handleLogin} className="flex flex-col gap-5">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Email Address</label>
                            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 focus-within:bg-white focus-within:border-[#B01030] focus-within:ring-4 focus-within:ring-red-900/5 transition-all">
                                <MdEmail className="text-gray-400 text-lg shrink-0" />
                                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="member@byutie.com" className="w-full bg-transparent border-none outline-none text-sm font-bold text-gray-700 ml-3" />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Password</label>
                                <a href="#" className="text-[10px] font-black text-[#B01030] hover:underline">Lupa Sandi?</a>
                            </div>
                            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 focus-within:bg-white focus-within:border-[#B01030] focus-within:ring-4 focus-within:ring-red-900/5 transition-all">
                                <MdLockOutline className="text-gray-400 text-lg shrink-0" />
                                <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-transparent border-none outline-none text-sm font-bold text-gray-700 ml-3" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600 focus:outline-none">
                                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="mt-4 bg-[#B01030] text-white py-4 rounded-2xl font-black shadow-lg shadow-red-900/20 hover:bg-[#8e0d27] transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                            {loading ? <span className="animate-pulse">Memproses...</span> : 'Sign In'}
                        </button>
                    </form>

                    <p className="md:hidden text-center mt-8 text-sm font-bold text-gray-500">
                        Belum punya akun? <button onClick={() => togglePanel(true)} className="text-[#B01030]">Daftar sekarang</button>
                    </p>
                </div>


                {/* --- FORM 2: SIGN UP --- */}
                <div className={`absolute top-0 left-0 h-full w-full md:w-1/2 transition-all duration-1000 ease-in-out flex flex-col justify-center px-10 lg:px-16 bg-white ${isSignUp ? 'translate-x-0 md:translate-x-full opacity-100 z-20' : '-translate-x-full md:translate-x-0 md:opacity-0 z-10 pointer-events-none'}`}>
                    
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-10 h-10 bg-[#B01030] rounded-xl flex items-center justify-center text-white shadow-md shadow-red-900/20">
                            <MdOutlineAutoAwesome className="text-xl" />
                        </div>
                        <span className="text-xl font-extrabold tracking-tight text-[#202224]">byutie<span className="text-[#B01030]">.</span></span>
                    </div>

                    <h2 className="text-3xl font-black text-[#202224] mb-2">Create Account</h2>
                    <p className="text-gray-500 font-bold text-sm mb-4">Bergabung dan nikmati keuntungan Byutie Loves.</p>

                    {/* Pesan Error/Sukses Register */}
                    {isSignUp && errorMsg && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold flex items-center gap-2 mb-4 border border-red-100"><MdErrorOutline className="text-lg"/>{errorMsg}</div>}
                    {isSignUp && successMsg && <div className="bg-green-50 text-green-600 p-3 rounded-xl text-xs font-bold flex items-center gap-2 mb-4 border border-green-100"><MdCheckCircleOutline className="text-lg"/>{successMsg}</div>}

                    <form onSubmit={handleRegister} className="flex flex-col gap-4">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1.5">Nama Lengkap</label>
                            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus-within:bg-white focus-within:border-[#B01030] transition-all">
                                <MdPersonOutline className="text-gray-400 text-lg" />
                                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama Anda" className="w-full bg-transparent outline-none text-sm font-bold text-gray-700 ml-3" />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1.5">Email Address</label>
                            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus-within:bg-white focus-within:border-[#B01030] transition-all">
                                <MdEmail className="text-gray-400 text-lg" />
                                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="member@byutie.com" className="w-full bg-transparent outline-none text-sm font-bold text-gray-700 ml-3" />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1.5">Password</label>
                            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus-within:bg-white focus-within:border-[#B01030] transition-all">
                                <MdLockOutline className="text-gray-400 text-lg" />
                                <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimal 6 Karakter" className="w-full bg-transparent outline-none text-sm font-bold text-gray-700 ml-3" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600 focus:outline-none">
                                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="mt-2 bg-[#202224] text-white py-4 rounded-2xl font-black shadow-lg hover:bg-[#B01030] transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed">
                            {loading ? <span className="animate-pulse">Memproses...</span> : 'Sign Up'}
                        </button>
                    </form>

                    <p className="md:hidden text-center mt-6 text-sm font-bold text-gray-500">
                        Sudah punya akun? <button onClick={() => togglePanel(false)} className="text-[#B01030]">Sign In</button>
                    </p>
                </div>


                {/* --- OVERLAY PANEL MERAH --- */}
                <div className={`hidden md:block absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-1000 ease-in-out z-50 ${isSignUp ? '-translate-x-full' : 'translate-x-0'}`}>
                    <div className={`absolute top-0 -left-full w-[200%] h-full bg-gradient-to-br from-[#B01030] via-[#8e0d27] to-[#4a0513] transition-transform duration-1000 ease-in-out ${isSignUp ? 'translate-x-1/2' : 'translate-x-0'}`}>
                        
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                        {/* KONTEN KIRI (Muncul saat mode Register) */}
                        <div className={`absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center items-center px-16 text-center transition-transform duration-1000 ease-in-out ${isSignUp ? 'translate-x-0' : '-translate-x-[20%]'}`}>
                            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white text-3xl mb-6 shadow-xl"><MdOutlineAutoAwesome /></div>
                            <h2 className="text-4xl font-black text-white mb-4 leading-tight">Welcome Back, <br/>Byutie Loves!</h2>
                            <p className="text-white/80 font-medium mb-10 text-sm leading-relaxed">Masuk sekarang untuk mengecek sisa poin, mengklaim voucher eksklusif, dan melacak pesananmu.</p>
                            <button onClick={() => togglePanel(false)} className="border-2 border-white/50 text-white px-12 py-3.5 rounded-full font-black hover:bg-white hover:text-[#B01030] transition-all active:scale-95">Sign In</button>
                        </div>

                        {/* KONTEN KANAN (Muncul saat mode Login) */}
                        <div className={`absolute top-0 right-0 w-1/2 h-full flex flex-col justify-center items-center px-16 text-center transition-transform duration-1000 ease-in-out ${isSignUp ? 'translate-x-[20%]' : 'translate-x-0'}`}>
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black px-4 py-1.5 rounded-full text-[10px] tracking-widest uppercase mb-6 shadow-xl">💎 Byutie Privilege</div>
                            <h2 className="text-4xl font-black text-white mb-4 leading-tight">Join The <br/>Community</h2>
                            <p className="text-white/80 font-medium mb-10 text-sm leading-relaxed">Daftarkan dirimu sekarang dan nikmati diskon khusus member baru, poin berlipat, dan hadiah ulang tahun!</p>
                            <button onClick={() => togglePanel(true)} className="border-2 border-white text-white px-12 py-3.5 rounded-full font-black hover:bg-white hover:text-[#B01030] transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95">Register</button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}