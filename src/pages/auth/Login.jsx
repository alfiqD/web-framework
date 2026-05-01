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
        email: "", // Berfungsi sebagai username untuk API dummyjson
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
                // Redirect ke dashboard jika login sukses
                navigate("/");
            })
            .catch((err) => {
                if (err.response) {
                    setError(err.response.data.message || "An error occurred");
                } else {
                    setError(err.message || "An unknown error occurred");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Alert Error (Tema Merah Muda Pastel)
    const errorInfo = error ? (
        <div className="bg-[#FFF0F2] mb-6 p-4 text-sm font-semibold text-[#d06172] rounded-2xl border-l-4 border-[#E17887] flex items-center shadow-sm">
            <BsFillExclamationDiamondFill className="me-3 text-lg shrink-0" />
            <span>{error}</span>
        </div>
    ) : null;

    // Alert Loading (Tema Mint Pastel)
    const loadingInfo = loading ? (
        <div className="bg-[#EAFaf1] mb-6 p-4 text-sm font-semibold text-[#5fa389] rounded-2xl border-l-4 border-[#7BBEA5] flex items-center shadow-sm">
            <ImSpinner2 className="me-3 animate-spin text-lg shrink-0" />
            <span>Memproses kredensial, mohon tunggu...</span>
        </div>
    ) : null;

    return (
        <div className="px-2 md:px-6">
            
            {/* Header Form dengan Badge */}
            <div className="text-left mb-10">
                <span className="bg-[#FFE4E6] text-[#E17887] px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase mb-4 inline-block shadow-sm">
                    ✨ Beauty Clinic Admin
                </span>
                <h2 className="text-3xl font-extrabold text-gray-800 font-poppins mb-2 tracking-tight">
                    Welcome Back.
                </h2>
                <p className="text-sm text-gray-400 font-medium">
                    Please log in to manage your patients and schedules.
                </p>
            </div>

            {errorInfo}
            {loadingInfo}

            <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Input Email/Username dengan Icon di dalam */}
                <div>
                    <label className="block text-[12px] font-extrabold text-gray-500 mb-2 tracking-widest uppercase pl-1">
                        Username
                    </label>
                    <div className="relative flex items-center">
                        <MdOutlinePersonOutline className="absolute left-5 text-gray-400 text-xl" />
                        <input
                            type="text"
                            id="email"
                            className="w-full pl-14 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl shadow-sm text-sm text-gray-800 placeholder-gray-300 outline-none transition-all duration-300 focus:bg-white focus:border-[#FCA5A5] focus:ring-2 focus:ring-[#FFE4E6]"
                            placeholder="e.g. emilys"
                            name="email"
                            value={dataForm.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                
                {/* Input Password dengan Icon di dalam */}
                <div>
                    <div className="flex justify-between items-center mb-2 pl-1 pr-1">
                        <label className="block text-[12px] font-extrabold text-gray-500 tracking-widest uppercase">
                            Password
                        </label>
                        <a href="#" className="text-[11px] font-bold text-[#7BBEA5] hover:text-[#5fa389] transition-colors">
                            Forgot?
                        </a>
                    </div>
                    <div className="relative flex items-center">
                        <MdLockOutline className="absolute left-5 text-gray-400 text-xl" />
                        <input
                            type="password"
                            id="password"
                            className="w-full pl-14 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl shadow-sm text-sm text-gray-800 placeholder-gray-300 outline-none transition-all duration-300 focus:bg-white focus:border-[#FCA5A5] focus:ring-2 focus:ring-[#FFE4E6]"
                            placeholder="Enter your password"
                            name="password"
                            value={dataForm.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Tombol Login */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 bg-[#E17887] hover:bg-[#d06172] text-white font-bold py-4 px-4 rounded-2xl transition-all duration-300 shadow-lg shadow-pink-200/60 hover:-translate-y-1 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                    <span>{loading ? "Authenticating..." : "Sign In to Dashboard"}</span>
                    {!loading && <MdArrowForward className="text-xl" />}
                </button>
            </form>
        </div>
    );
}