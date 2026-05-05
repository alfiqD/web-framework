import axios from "axios";
import { useState } from "react";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { MdOutlinePersonOutline, MdLockOutline, MdArrowForward } from "react-icons/md";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dataForm, setDataForm] = useState({
        email: "", 
        password: "",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(""); 

        axios
            .post("https://dummyjson.com/user/login", {
                username: dataForm.email,
                password: dataForm.password,
            })
            .then((response) => {
                if (response.status !== 200) {
                    setError(response.data.message);
                    return;
                }
                navigate("/");
            })
            .catch((err) => {
                setError(err.response?.data?.message || "Invalid username or password");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Alert Error (Nuansa Merah Status Reject #EF3826)
    const errorInfo = error ? (
        <div className="bg-[#FFF4F2] mb-6 p-4 text-[13px] font-bold text-[#EF3826] rounded-2xl border border-[#EF3826]/20 flex items-center shadow-sm animate-shake">
            <BsFillExclamationDiamondFill className="me-3 text-lg shrink-0" />
            <span>{error}</span>
        </div>
    ) : null;

    // Alert Loading (Nuansa Biru/Mint Profesional)
    const loadingInfo = loading ? (
        <div className="bg-[#F5F6FA] mb-6 p-4 text-[13px] font-bold text-[#202224] rounded-2xl border border-gray-100 flex items-center shadow-sm">
            <ImSpinner2 className="me-3 animate-spin text-lg shrink-0 text-[#B01030]" />
            <span>Authenticating credentials...</span>
        </div>
    ) : null;

    return (
        <div className="px-4 md:px-8">
            
            {/* Header Form dengan Badge Brand */}
            <div className="text-left mb-10">
                <span className="bg-[#B01030]/10 text-[#B01030] px-3 py-1.5 rounded-lg text-[11px] font-extrabold tracking-wider uppercase mb-4 inline-block">
                    ✨ JagoanData Admin
                </span>
                <h2 className="text-[32px] font-extrabold text-[#202224] leading-tight mb-2 tracking-tight">
                    Welcome Back.
                </h2>
                <p className="text-[14px] text-gray-400 font-semibold">
                    Please log in to manage your medical records and schedules.
                </p>
            </div>

            {errorInfo}
            {loadingInfo}

            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Input Username */}
                <div>
                    <label className="block text-[12px] font-extrabold text-[#202224] mb-2 tracking-widest uppercase opacity-60">
                        Username
                    </label>
                    <div className="relative flex items-center group">
                        <MdOutlinePersonOutline className="absolute left-5 text-gray-400 text-xl group-focus-within:text-[#B01030] transition-colors" />
                        <input
                            type="text"
                            className="w-full pl-14 pr-4 py-4 bg-[#F5F6FA] border border-gray-100 rounded-2xl text-[14px] font-semibold text-[#202224] placeholder-gray-300 outline-none transition-all duration-300 focus:bg-white focus:border-[#B01030] focus:ring-4 focus:ring-[#B01030]/5"
                            placeholder="e.g. emilys"
                            name="email"
                            value={dataForm.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                
                {/* Input Password */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-[12px] font-extrabold text-[#202224] tracking-widest uppercase opacity-60">
                            Password
                        </label>
                        <a href="#" className="text-[12px] font-bold text-[#B01030] hover:underline transition-colors">
                            Forgot?
                        </a>
                    </div>
                    <div className="relative flex items-center group">
                        <MdLockOutline className="absolute left-5 text-gray-400 text-xl group-focus-within:text-[#B01030] transition-colors" />
                        <input
                            type="password"
                            className="w-full pl-14 pr-4 py-4 bg-[#F5F6FA] border border-gray-100 rounded-2xl text-[14px] font-semibold text-[#202224] placeholder-gray-300 outline-none transition-all duration-300 focus:bg-white focus:border-[#B01030] focus:ring-4 focus:ring-[#B01030]/5"
                            placeholder="••••••••"
                            name="password"
                            value={dataForm.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Tombol Login - Warna Brand #B01030 */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-4 bg-[#B01030] hover:bg-[#8e0d27] text-white font-extrabold py-4 px-4 rounded-2xl transition-all duration-300 shadow-lg shadow-red-900/10 hover:-translate-y-1 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    <span className="text-[14px] uppercase tracking-wider">
                        {loading ? "Authenticating..." : "Sign In to Dashboard"}
                    </span>
                    {!loading && <MdArrowForward className="text-xl" />}
                </button>
            </form>
        </div>
    );
}