import { Link } from "react-router-dom";
import { MdOutlineMailOutline, MdLockOutline, MdArrowForward } from "react-icons/md";

export default function Register() {
    return (
        <div className="px-2 md:px-6">
            
            {/* Header Form dengan Badge */}
            <div className="text-left mb-10">
                <span className="bg-[#FFE4E6] text-[#E17887] px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase mb-4 inline-block shadow-sm">
                    ✨ Join Byutie
                </span>
                <h2 className="text-3xl font-extrabold text-gray-800 font-poppins mb-2 tracking-tight">
                    Create Account.
                </h2>
                <p className="text-sm text-gray-400 font-medium">
                    Set up your new admin profile to get started.
                </p>
            </div>

            <form className="space-y-5">
                
                {/* Input Email Address dengan Icon */}
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
                            placeholder="e.g. emilys@byutie.com"
                            required
                        />
                    </div>
                </div>

                {/* Input Password dengan Icon */}
                <div>
                    <label
                        htmlFor="password"
                        className="block text-[12px] font-extrabold text-gray-500 mb-2 tracking-widest uppercase pl-1"
                    >
                        Password
                    </label>
                    <div className="relative flex items-center">
                        <MdLockOutline className="absolute left-5 text-gray-400 text-xl" />
                        <input
                            type="password"
                            id="password"
                            className="w-full pl-14 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl shadow-sm text-sm text-gray-800 placeholder-gray-300 outline-none transition-all duration-300 focus:bg-white focus:border-[#FCA5A5] focus:ring-2 focus:ring-[#FFE4E6]"
                            placeholder="Create a strong password"
                            required
                        />
                    </div>
                </div>

                {/* Input Confirm Password dengan Icon */}
                <div>
                    <label
                        htmlFor="confirmPassword"
                        className="block text-[12px] font-extrabold text-gray-500 mb-2 tracking-widest uppercase pl-1"
                    >
                        Confirm Password
                    </label>
                    <div className="relative flex items-center">
                        <MdLockOutline className="absolute left-5 text-gray-400 text-xl" />
                        <input
                            type="password"
                            id="confirmPassword"
                            className="w-full pl-14 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl shadow-sm text-sm text-gray-800 placeholder-gray-300 outline-none transition-all duration-300 focus:bg-white focus:border-[#FCA5A5] focus:ring-2 focus:ring-[#FFE4E6]"
                            placeholder="Repeat your password"
                            required
                        />
                    </div>
                </div>

                {/* Tombol Register */}
                <button
                    type="submit"
                    className="w-full mt-6 bg-[#E17887] hover:bg-[#d06172] text-white font-bold py-4 px-4 rounded-2xl transition-all duration-300 shadow-lg shadow-pink-200/60 hover:-translate-y-1 flex items-center justify-center space-x-2"
                >
                    <span>Create Account</span>
                    <MdArrowForward className="text-xl" />
                </button>
            </form>

            {/* Tautan ke halaman Login */}
            <div className="mt-8 text-center">
                <p className="text-sm font-medium text-gray-500">
                    Already have an account?{" "}
                    <Link 
                        to="/login" 
                        className="font-bold text-[#E17887] hover:text-[#d06172] transition-colors hover:underline"
                    >
                        Sign In here
                    </Link>
                </p>
            </div>

        </div>
    );
}