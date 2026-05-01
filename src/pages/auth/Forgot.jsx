import { Link } from "react-router-dom";
import { MdOutlineMailOutline, MdArrowBack } from "react-icons/md";

export default function Forgot() {
    return (
        <div className="px-2 md:px-6">
            
            {/* Header Form dengan Badge */}
            <div className="text-left mb-10">
                <span className="bg-[#FFE4E6] text-[#E17887] px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase mb-4 inline-block shadow-sm">
                    ✨ Password Recovery
                </span>
                <h2 className="text-3xl font-extrabold text-gray-800 font-poppins mb-2 tracking-tight">
                    Forgot Password?
                </h2>
                <p className="text-sm text-gray-400 font-medium leading-relaxed">
                    No worries! Enter your email address and we'll send you a secure link to reset it.
                </p>
            </div>

            <form className="space-y-6">
                
                {/* Input Email dengan Icon */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-[12px] font-extrabold text-gray-500 mb-2 tracking-widest uppercase pl-1"
                    >
                        Email Address
                    </label>
                    <div className="relative flex items-center">
                        <MdOutlineMailOutline className="absolute left-5 text-gray-400 text-xl" />
                        <input
                            type="email"
                            id="email"
                            className="w-full pl-14 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl shadow-sm text-sm text-gray-800 placeholder-gray-300 outline-none transition-all duration-300 focus:bg-white focus:border-[#FCA5A5] focus:ring-2 focus:ring-[#FFE4E6]"
                            placeholder="Enter your registered email"
                            required
                        />
                    </div>
                </div>

                {/* Tombol Kirim */}
                <button
                    type="submit"
                    className="w-full mt-2 bg-[#E17887] hover:bg-[#d06172] text-white font-bold py-4 px-4 rounded-2xl transition-all duration-300 shadow-lg shadow-pink-200/60 hover:-translate-y-1 flex items-center justify-center space-x-2"
                >
                    <span>Send Reset Link</span>
                </button>
            </form>

            {/* Tombol Kembali ke Login (Penting untuk UX) */}
            <div className="mt-8 text-center">
                <Link 
                    to="/login" 
                    className="inline-flex items-center space-x-2 text-sm font-bold text-gray-400 hover:text-[#E17887] transition-colors"
                >
                    <MdArrowBack className="text-lg" />
                    <span>Back to Sign In</span>
                </Link>
            </div>

        </div>
    );
}