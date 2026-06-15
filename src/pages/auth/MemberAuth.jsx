import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    MdEmail, 
    MdLockOutline, 
    MdOutlineAutoAwesome,
    MdVisibility,
    MdVisibilityOff,
    MdArrowForward,
    MdPersonOutline
} from "react-icons/md";

export default function MemberAuth() {
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Simulasi Login/Register
    const handleSubmit = (e) => {
        e.preventDefault();
        // Arahkan ke halaman dashboard member setelah berhasil
        navigate('/member/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F4F7FE] p-4 font-nunito selection:bg-[#B01030] selection:text-white">
            
            {/* CONTAINER UTAMA - Overflow Hidden penting agar animasi tidak tembus */}
            <div className="relative w-full max-w-5xl h-[650px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden flex md:block">

                {/* --- FORM 1: SIGN IN (Posisi Kiri) --- */}
                <div className={`absolute top-0 left-0 h-full w-full md:w-1/2 transition-all duration-1000 ease-in-out flex flex-col justify-center px-10 lg:px-16 bg-white ${isSignUp ? 'translate-x-full md:opacity-0 z-10 pointer-events-none' : 'translate-x-0 opacity-100 z-20'}`}>
                    
                    <div className="flex items-center gap-2 mb-10">
                        <div className="w-10 h-10 bg-[#B01030] rounded-xl flex items-center justify-center text-white shadow-md shadow-red-900/20">
                            <MdOutlineAutoAwesome className="text-xl" />
                        </div>
                        <span className="text-xl font-extrabold tracking-tight text-[#202224]">byutie<span className="text-[#B01030]">.</span></span>
                    </div>

                    <h2 className="text-3xl font-black text-[#202224] mb-2">Welcome Back</h2>
                    <p className="text-gray-500 font-bold text-sm mb-8">Masuk untuk mengelola akun Member Byutie.</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Email Address</label>
                            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 focus-within:bg-white focus-within:border-[#B01030] focus-within:ring-4 focus-within:ring-red-900/5 transition-all">
                                <MdEmail className="text-gray-400 text-lg shrink-0" />
                                <input type="email" required placeholder="member@byutie.com" className="w-full bg-transparent border-none outline-none text-sm font-bold text-gray-700 ml-3" />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Password</label>
                                <a href="#" className="text-[10px] font-black text-[#B01030] hover:underline">Lupa Sandi?</a>
                            </div>
                            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 focus-within:bg-white focus-within:border-[#B01030] focus-within:ring-4 focus-within:ring-red-900/5 transition-all">
                                <MdLockOutline className="text-gray-400 text-lg shrink-0" />
                                <input type={showPassword ? "text" : "password"} required placeholder="••••••••" className="w-full bg-transparent border-none outline-none text-sm font-bold text-gray-700 ml-3" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600">
                                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="mt-4 bg-[#B01030] text-white py-4 rounded-2xl font-black shadow-lg shadow-red-900/20 hover:bg-[#8e0d27] transition-all active:scale-95 flex items-center justify-center gap-2">
                            Sign In
                        </button>
                    </form>

                    {/* Tombol Mobile Toggle (Hanya tampil di HP) */}
                    <p className="md:hidden text-center mt-8 text-sm font-bold text-gray-500">
                        Belum punya akun? <button onClick={() => setIsSignUp(true)} className="text-[#B01030]">Daftar sekarang</button>
                    </p>
                </div>


                {/* --- FORM 2: SIGN UP (Posisi Kiri, tapi digeser ke Kanan saat aktif) --- */}
                <div className={`absolute top-0 left-0 h-full w-full md:w-1/2 transition-all duration-1000 ease-in-out flex flex-col justify-center px-10 lg:px-16 bg-white ${isSignUp ? 'translate-x-0 md:translate-x-full opacity-100 z-20' : '-translate-x-full md:translate-x-0 md:opacity-0 z-10 pointer-events-none'}`}>
                    
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-10 h-10 bg-[#B01030] rounded-xl flex items-center justify-center text-white shadow-md shadow-red-900/20">
                            <MdOutlineAutoAwesome className="text-xl" />
                        </div>
                        <span className="text-xl font-extrabold tracking-tight text-[#202224]">byutie<span className="text-[#B01030]">.</span></span>
                    </div>

                    <h2 className="text-3xl font-black text-[#202224] mb-2">Create Account</h2>
                    <p className="text-gray-500 font-bold text-sm mb-6">Bergabung dan nikmati keuntungan Byutie Loves.</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1.5">Nama Lengkap</label>
                            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus-within:bg-white focus-within:border-[#B01030] transition-all">
                                <MdPersonOutline className="text-gray-400 text-lg" />
                                <input type="text" required placeholder="Nama Anda" className="w-full bg-transparent outline-none text-sm font-bold text-gray-700 ml-3" />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1.5">Email Address</label>
                            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus-within:bg-white focus-within:border-[#B01030] transition-all">
                                <MdEmail className="text-gray-400 text-lg" />
                                <input type="email" required placeholder="member@byutie.com" className="w-full bg-transparent outline-none text-sm font-bold text-gray-700 ml-3" />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1.5">Password</label>
                            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus-within:bg-white focus-within:border-[#B01030] transition-all">
                                <MdLockOutline className="text-gray-400 text-lg" />
                                <input type="password" required placeholder="••••••••" className="w-full bg-transparent outline-none text-sm font-bold text-gray-700 ml-3" />
                            </div>
                        </div>

                        <button type="submit" className="mt-2 bg-[#202224] text-white py-4 rounded-2xl font-black shadow-lg hover:bg-[#B01030] transition-all active:scale-95">
                            Sign Up
                        </button>
                    </form>

                    {/* Tombol Mobile Toggle */}
                    <p className="md:hidden text-center mt-6 text-sm font-bold text-gray-500">
                        Sudah punya akun? <button onClick={() => setIsSignUp(false)} className="text-[#B01030]">Sign In</button>
                    </p>
                </div>


                {/* --- OVERLAY PANEL MERAH (Hanya tampil di Desktop) --- */}
                <div className={`hidden md:block absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-1000 ease-in-out z-50 ${isSignUp ? '-translate-x-full' : 'translate-x-0'}`}>
                    
                    {/* Background Panel Merah yang ukurannya 2x lipat (200%) */}
                    <div className={`absolute top-0 -left-full w-[200%] h-full bg-gradient-to-br from-[#B01030] via-[#8e0d27] to-[#4a0513] transition-transform duration-1000 ease-in-out ${isSignUp ? 'translate-x-1/2' : 'translate-x-0'}`}>
                        
                        {/* Motif Hiasan Overlay */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                        {/* KONTEN OVERLAY KIRI (Muncul saat panel geser ke kanan / Mode Register) */}
                        <div className={`absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center items-center px-16 text-center transition-transform duration-1000 ease-in-out ${isSignUp ? 'translate-x-0' : '-translate-x-[20%]'}`}>
                            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white text-3xl mb-6 shadow-xl">
                                <MdOutlineAutoAwesome />
                            </div>
                            <h2 className="text-4xl font-black text-white mb-4 leading-tight">Welcome Back, <br/>Byutie Loves!</h2>
                            <p className="text-white/80 font-medium mb-10 text-sm leading-relaxed">
                                Masuk sekarang untuk mengecek sisa poin, mengklaim voucher eksklusif bulanan, dan melacak pesananmu.
                            </p>
                            <button onClick={() => setIsSignUp(false)} className="border-2 border-white/50 text-white px-12 py-3.5 rounded-full font-black hover:bg-white hover:text-[#B01030] transition-all active:scale-95">
                                Sign In
                            </button>
                        </div>

                        {/* KONTEN OVERLAY KANAN (Muncul saat panel ada di kanan / Mode Login) */}
                        <div className={`absolute top-0 right-0 w-1/2 h-full flex flex-col justify-center items-center px-16 text-center transition-transform duration-1000 ease-in-out ${isSignUp ? 'translate-x-[20%]' : 'translate-x-0'}`}>
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black px-4 py-1.5 rounded-full text-[10px] tracking-widest uppercase mb-6 shadow-xl">
                                💎 Byutie Privilege
                            </div>
                            <h2 className="text-4xl font-black text-white mb-4 leading-tight">Join The <br/>Community</h2>
                            <p className="text-white/80 font-medium mb-10 text-sm leading-relaxed">
                                Daftarkan dirimu sekarang dan nikmati diskon khusus member baru, poin berlipat, dan hadiah ulang tahun!
                            </p>
                            <button onClick={() => setIsSignUp(true)} className="border-2 border-white text-white px-12 py-3.5 rounded-full font-black hover:bg-white hover:text-[#B01030] transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95">
                                Register
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}