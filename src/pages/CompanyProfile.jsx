// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//     MdOutlineAutoAwesome, 
//     MdStar, 
//     MdLocationOn, 
//     MdPhone, 
//     MdEmail, 
//     MdOutlineShoppingBag,
//     MdArrowForward,
//     MdChatBubbleOutline,
//     MdVerified,
//     MdOutlineSpa,
//     MdCrueltyFree,
//     MdLoyalty,
//     MdCardGiftcard,
//     MdStars,
//     MdClose,
//     MdMenu,
//     MdSearch,
//     MdShoppingCart,
//     MdFavoriteBorder,
//     MdKeyboardArrowUp,
//     MdAccessTime,
//     MdShield,
//     MdPeople,
//     MdTrendingUp,
//     MdRocket,
//     MdExpandMore,
//     MdExpandLess
// } from "react-icons/md";
// import { FaInstagram, FaTiktok, FaWhatsapp, FaYoutube, FaShopify } from "react-icons/fa";

// export default function CompanyProfile() {
//     const navigate = useNavigate();
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [showScrollTop, setShowScrollTop] = useState(false);
//     const [activeAccordion, setActiveAccordion] = useState(null);
//     const [cartCount, setCartCount] = useState(0);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [animateStats, setAnimateStats] = useState(false);

//     // Handle scroll for "Back to Top" button
//     useEffect(() => {
//         const handleScroll = () => {
//             setShowScrollTop(window.scrollY > 500);
            
//             // Animate stats when they come into view
//             const statsSection = document.getElementById('stats');
//             if (statsSection) {
//                 const rect = statsSection.getBoundingClientRect();
//                 if (rect.top <= window.innerHeight && rect.bottom >= 0) {
//                     setAnimateStats(true);
//                 }
//             }
//         };
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     // Scroll to top function
//     const scrollToTop = () => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     };

//     // Add to cart animation
//     const addToCart = () => {
//         setCartCount(prev => prev + 1);
//         // Add animation class
//         const cartIcon = document.getElementById('cart-icon');
//         if (cartIcon) {
//             cartIcon.classList.add('animate-bounce');
//             setTimeout(() => cartIcon.classList.remove('animate-bounce'), 1000);
//         }
//     };

//     // Toggle FAQ accordion
//     const toggleAccordion = (id) => {
//         setActiveAccordion(activeAccordion === id ? null : id);
//     };

//     // --- DATA PRODUK TERLARIS (Enhanced) ---
//     const topProducts = [
//         { 
//             id: 1, 
//             name: "Radiant Glow Serum", 
//             price: "Rp 145.000", 
//             sold: "2.5k+", 
//             image: "/img/bestseller_serum.png",
//             rating: 4.9,
//             badge: "Best Seller",
//             discount: null,
//             category: "Serum"
//         },
//         { 
//             id: 2, 
//             name: "Hydrating Toner 100ml", 
//             price: "Rp 98.000", 
//             sold: "1.8k+", 
//             image: "/img/bestseller_toner.png",
//             rating: 4.8,
//             badge: "New",
//             discount: "15%",
//             category: "Toner"
//         },
//         { 
//             id: 3, 
//             name: "Matte Lip Cream Velvet", 
//             price: "Rp 85.000", 
//             sold: "3.2k+", 
//             image: "/img/bestseller_lipcream.png",
//             rating: 4.7,
//             badge: "Hot",
//             discount: null,
//             category: "Lip Cream"
//         },
//         { 
//             id: 4, 
//             name: "Daily Sunscreen SPF 50", 
//             price: "Rp 115.000", 
//             sold: "4.1k+", 
//             image: "/img/bestseller_sunscreen.png",
//             rating: 4.9,
//             badge: "Best Value",
//             discount: "10%",
//             category: "Sunscreen"
//         },
//         { 
//             id: 5, 
//             name: "Acne Spot Treatment", 
//             price: "Rp 75.000", 
//             sold: "1.2k+", 
//             image: "/img/bestseller_acne.png",
//             rating: 4.6,
//             badge: "Limited",
//             discount: null,
//             category: "Treatment"
//         },
//     ];

//     // --- DATA TESTIMONI (Enhanced) ---
//     const testimonials = [
//         { 
//             id: 1, 
//             name: "Alya Maharani", 
//             role: "Mahasiswi", 
//             text: "Serumnya benar-benar bikin wajah glowing alami! Tekstur kulit jadi jauh lebih halus dan bekas jerawat memudar.", 
//             rating: 5,
//             avatar: "/img/avatar_alya.jpg",
//             verified: true,
//             usage: "2 bulan pemakaian"
//         },
//         { 
//             id: 2, 
//             name: "Siti Nurhaliza", 
//             role: "Pekerja Kantoran", 
//             text: "Suka banget sama Lip Cream Byutie. Gak bikin bibir kering, ringan banget dipakai ngantor seharian.", 
//             rating: 5,
//             avatar: "/img/avatar_siti.jpg",
//             verified: true,
//             usage: "1 bulan pemakaian"
//         },
//         { 
//             id: 3, 
//             name: "Nadia Safira", 
//             role: "Beauty Enthusiast", 
//             text: "Sunscreen-nya gampang di-blend dan gak ada whitecast sama sekali. Kualitas premium harga lokal!", 
//             rating: 4,
//             avatar: "/img/avatar_nadia.jpg",
//             verified: false,
//             usage: "3 minggu pemakaian"
//         },
//         { 
//             id: 4, 
//             name: "Dina Larasati", 
//             role: "Ibu Rumah Tangga", 
//             text: "Rangkaian skincare Byutie memudarkan flek hitam saya. Sistem membernya juga asik, sering dapat diskon.", 
//             rating: 5,
//             avatar: "/img/avatar_dina.jpg",
//             verified: true,
//             usage: "3 bulan pemakaian"
//         },
//     ];

//     // --- DATA FAQ ---
//     const faqData = [
//         {
//             id: 1,
//             question: "Apakah produk Byutie aman untuk kulit sensitif?",
//             answer: "Ya, semua produk Byutie diformulasikan khusus untuk kulit sensitif dan telah lolos uji dermatologis. Kami menggunakan bahan-bahan alami yang hypoallergenic dan bebas dari bahan kimia berbahaya."
//         },
//         {
//             id: 2,
//             question: "Bagaimana cara mendaftar menjadi member?",
//             answer: "Klik tombol 'Daftar Member' atau 'Akun Member' di website kami. Isi formulir pendaftaran dengan data diri yang valid, dan Anda akan langsung mendapatkan akses ke berbagai keuntungan eksklusif member Byutie."
//         },
//         {
//             id: 3,
//             question: "Berapa lama pengiriman produk?",
//             answer: "Pengiriman biasanya memakan waktu 2-5 hari kerja tergantung lokasi Anda. Kami bekerja sama dengan berbagai ekspedisi terpercaya seperti JNE, J&T, dan SiCepat untuk memastikan produk sampai dengan aman dan cepat."
//         },
//         {
//             id: 4,
//             question: "Apakah produk Byutie sudah BPOM?",
//             answer: "Ya, seluruh produk Byutie telah terdaftar di BPOM dan memiliki nomor registrasi resmi. Anda dapat mengecek keaslian produk melalui website resmi BPOM atau menghubungi customer service kami."
//         },
//         {
//             id: 5,
//             question: "Bagaimana cara klaim garansi produk?",
//             answer: "Jika Anda menerima produk yang rusak atau tidak sesuai, silakan hubungi customer service kami dalam waktu 7 hari setelah produk diterima. Kami akan membantu proses pengembalian atau penggantian produk."
//         },
//     ];

//     // --- DATA STATISTIK ---
//     const stats = [
//         { icon: <MdPeople className="text-4xl" />, value: "10K+", label: "Member Aktif", color: "from-blue-500 to-blue-600" },
//         { icon: <MdStar className="text-4xl" />, value: "4.9/5", label: "Rating Pelanggan", color: "from-yellow-500 to-yellow-600" },
//         { icon: <MdVerified className="text-4xl" />, value: "BPOM", label: "Tersertifikasi", color: "from-green-500 to-green-600" },
//         { icon: <MdTrendingUp className="text-4xl" />, value: "50K+", label: "Produk Terjual", color: "from-purple-500 to-purple-600" },
//     ];

//     return (
//         <div className="font-nunito bg-[#FAFAFA] min-h-screen relative overflow-x-hidden selection:bg-[#B01030] selection:text-white">
            
//             {/* Custom CSS */}
//             <style jsx>{`
//                 @keyframes fadeInLeft {
//                     from { opacity: 0; transform: translateX(-50px); }
//                     to { opacity: 1; transform: translateX(0); }
//                 }
//                 @keyframes fadeInRight {
//                     from { opacity: 0; transform: translateX(50px); }
//                     to { opacity: 1; transform: translateX(0); }
//                 }
//                 @keyframes float {
//                     0%, 100% { transform: translateY(0); }
//                     50% { transform: translateY(-10px); }
//                 }
//                 @keyframes slideDown {
//                     from { opacity: 0; transform: translateY(-10px); }
//                     to { opacity: 1; transform: translateY(0); }
//                 }
//                 @keyframes gradient {
//                     0% { background-position: 0% 50%; }
//                     50% { background-position: 100% 50%; }
//                     100% { background-position: 0% 50%; }
//                 }
//                 .animate-fadeInLeft { animation: fadeInLeft 0.6s ease-out; }
//                 .animate-fadeInRight { animation: fadeInRight 0.6s ease-out; }
//                 .animate-float { animation: float 3s ease-in-out infinite; }
//                 .animate-slideDown { animation: slideDown 0.3s ease-out; }
//                 .animate-gradient { 
//                     background-size: 200% 200%;
//                     animation: gradient 3s ease infinite;
//                 }
//             `}</style>

//             {/* --- NAVBAR (Enhanced Glassmorphism) --- */}
//             <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-gray-200/50 shadow-lg transition-all duration-300">
//                 <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
//                     {/* Logo */}
//                     <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo(0, 0)}>
//                         <MdOutlineAutoAwesome className="text-[#B01030] text-3xl group-hover:rotate-12 transition-transform duration-300" />
//                         <span className="text-2xl text-[#202224] font-extrabold tracking-tight">byutie<span className="text-[#B01030]">.</span></span>
//                     </div>

//                     {/* Desktop Navigation */}
//                     <div className="hidden lg:flex items-center gap-8 font-semibold text-gray-600 text-sm">
//                         <a href="#hero" className="hover:text-[#B01030] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#B01030] hover:after:w-full after:transition-all duration-300">Beranda</a>
//                         <a href="#benefits" className="hover:text-[#B01030] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#B01030] hover:after:w-full after:transition-all duration-300">Keunggulan</a>
//                         <a href="#products" className="hover:text-[#B01030] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#B01030] hover:after:w-full after:transition-all duration-300">Terlaris</a>
//                         <a href="#membership" className="hover:text-[#B01030] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#B01030] hover:after:w-full after:transition-all duration-300">Membership</a>
//                         <a href="#faq" className="hover:text-[#B01030] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#B01030] hover:after:w-full after:transition-all duration-300">FAQ</a>
//                     </div>

//                     {/* Right Section */}
//                     <div className="flex items-center gap-3">
//                         {/* Search Bar - Desktop */}
//                         <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
//                             <MdSearch className="text-gray-400 text-xl" />
//                             <input 
//                                 type="text" 
//                                 placeholder="Cari produk..." 
//                                 className="bg-transparent border-none outline-none text-sm ml-2 w-32 lg:w-48"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                             />
//                         </div>

//                         {/* Cart Icon */}
//                         <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
//                             <MdShoppingCart id="cart-icon" className="text-2xl text-gray-700 hover:text-[#B01030] transition-colors" />
//                             {cartCount > 0 && (
//                                 <span className="absolute -top-2 -right-2 bg-[#B01030] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
//                                     {cartCount}
//                                 </span>
//                             )}
//                         </div>

//                         {/* Login Button */}
//                         <button 
//                             onClick={() => navigate('/login')} 
//                             className="hidden sm:flex bg-gradient-to-r from-[#B01030] to-[#8e0d27] text-white px-6 py-2.5 rounded-full font-bold hover:shadow-lg hover:shadow-red-900/30 transition-all duration-300 active:scale-95 items-center gap-2 text-sm"
//                         >
//                             Akun Member <MdArrowForward />
//                         </button>

//                         {/* Mobile Menu Button */}
//                         <button 
//                             onClick={() => setIsMenuOpen(!isMenuOpen)}
//                             className="lg:hidden text-2xl text-gray-700"
//                         >
//                             {isMenuOpen ? <MdClose /> : <MdMenu />}
//                         </button>
//                     </div>
//                 </div>

//                 {/* Mobile Menu */}
//                 {isMenuOpen && (
//                     <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 animate-slideDown">
//                         <div className="flex flex-col gap-4">
//                             {/* Mobile Search */}
//                             <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-2">
//                                 <MdSearch className="text-gray-400 text-xl" />
//                                 <input 
//                                     type="text" 
//                                     placeholder="Cari produk..." 
//                                     className="bg-transparent border-none outline-none text-sm ml-2 w-full"
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                 />
//                             </div>
//                             <a href="#hero" onClick={() => setIsMenuOpen(false)} className="font-semibold text-gray-600 hover:text-[#B01030] py-2">Beranda</a>
//                             <a href="#benefits" onClick={() => setIsMenuOpen(false)} className="font-semibold text-gray-600 hover:text-[#B01030] py-2">Keunggulan</a>
//                             <a href="#products" onClick={() => setIsMenuOpen(false)} className="font-semibold text-gray-600 hover:text-[#B01030] py-2">Terlaris</a>
//                             <a href="#membership" onClick={() => setIsMenuOpen(false)} className="font-semibold text-gray-600 hover:text-[#B01030] py-2">Membership</a>
//                             <a href="#faq" onClick={() => setIsMenuOpen(false)} className="font-semibold text-gray-600 hover:text-[#B01030] py-2">FAQ</a>
//                             <button 
//                                 onClick={() => { navigate('/login'); setIsMenuOpen(false); }} 
//                                 className="sm:hidden bg-gradient-to-r from-[#B01030] to-[#8e0d27] text-white px-6 py-3 rounded-full font-bold text-center"
//                             >
//                                 Akun Member <MdArrowForward className="inline ml-2" />
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </nav>

//             {/* --- HERO SECTION (Enhanced) --- */}
//             <section id="hero" className="pt-28 pb-20 px-6 lg:px-10 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[90vh]">
//                 <div className="flex flex-col gap-6 relative z-10 animate-fadeInLeft">
//                     <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-50 to-red-100 text-[#B01030] font-black px-6 py-2.5 rounded-full text-xs tracking-widest uppercase w-fit shadow-lg border border-red-200">
//                         <MdRocket className="text-lg" /> Skincare Revolusioner
//                     </div>
//                     <h1 className="text-5xl lg:text-7xl font-black text-[#202224] leading-[1.1] tracking-tight">
//                         Definisi Baru <br/>
//                         <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B01030] via-pink-600 to-rose-500 animate-gradient">
//                             Perawatan Kulit
//                         </span>
//                     </h1>
//                     <p className="text-lg text-gray-600 font-medium max-w-lg leading-relaxed">
//                         Bangkitkan pesona alami Anda dengan inovasi kecantikan eksklusif. Diformulasikan khusus untuk merawat, melindungi, dan menyempurnakan kulit wanita Indonesia.
//                     </p>
                    
//                     <div className="flex flex-wrap items-center gap-4 mt-2">
//                         <a href="#products" className="bg-gradient-to-r from-[#202224] to-gray-800 text-white px-8 py-4 rounded-full font-black hover:from-[#B01030] hover:to-[#8e0d27] transition-all duration-500 shadow-xl flex items-center gap-2 text-sm active:scale-95 group">
//                             <MdOutlineShoppingBag className="text-xl group-hover:rotate-12 transition-transform" /> Eksplor Produk
//                         </a>
//                         <a href="#membership" className="bg-white text-[#202224] border-2 border-gray-300 px-8 py-3.5 rounded-full font-black hover:border-[#B01030] hover:text-[#B01030] transition-all duration-300 flex items-center gap-2 text-sm active:scale-95 hover:shadow-lg">
//                             <MdLoyalty className="text-lg" /> Daftar Member
//                         </a>
//                     </div>

//                     {/* Enhanced Trust Badges */}
//                     <div className="flex items-center gap-6 lg:gap-8 mt-8 pt-8 border-t border-gray-200/60">
//                         <div className="flex items-center gap-3">
//                             <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
//                                 <MdPeople className="text-[#B01030] text-xl" />
//                             </div>
//                             <div className="flex flex-col">
//                                 <span className="text-2xl font-black text-[#202224]">10K+</span>
//                                 <span className="text-xs font-bold text-gray-400">Member</span>
//                             </div>
//                         </div>
//                         <div className="flex items-center gap-3">
//                             <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center">
//                                 <MdStar className="text-yellow-500 text-xl" />
//                             </div>
//                             <div className="flex flex-col">
//                                 <span className="text-2xl font-black text-[#202224]">4.9/5</span>
//                                 <span className="text-xs font-bold text-gray-400">Rating</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="relative flex justify-center items-center lg:justify-end animate-fadeInRight">
//                     {/* Decorative Elements */}
//                     <div className="absolute w-[400px] h-[400px] bg-gradient-to-tr from-red-200/30 to-pink-100/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
//                     <div className="absolute -right-10 top-10 w-40 h-40 bg-yellow-100/40 rounded-full mix-blend-multiply filter blur-2xl"></div>
//                     <div className="absolute -left-5 bottom-10 w-32 h-32 bg-pink-200/40 rounded-full mix-blend-multiply filter blur-2xl"></div>
                    
//                     <img 
//                         src="/img/hero_model_aesthetic.png" 
//                         alt="Byutie Skincare Models" 
//                         className="relative z-10 w-[90%] max-w-md lg:max-w-lg h-auto object-cover rounded-t-[8rem] rounded-b-[3rem] shadow-2xl border-8 border-white transform hover:scale-[1.02] transition-transform duration-500"
//                     />
                    
//                     {/* Enhanced Floating Cards */}
//                     <div className="absolute bottom-16 -left-5 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 animate-float">
//                         <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center text-green-600 text-2xl">
//                             <MdVerified />
//                         </div>
//                         <div>
//                             <p className="text-xs text-gray-500 font-bold">Tersertifikasi</p>
//                             <p className="text-sm font-black text-gray-900">Aman & Halal</p>
//                         </div>
//                     </div>

//                     <div className="absolute top-16 -right-2 z-20 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-gray-100 animate-float" style={{animationDelay: '0.5s'}}>
//                         <div className="flex items-center gap-2">
//                             <div className="flex">
//                                 {[...Array(5)].map((_, i) => (
//                                     <MdStar key={i} className="text-yellow-400 text-sm" />
//                                 ))}
//                             </div>
//                             <span className="text-xs font-black text-gray-900">4.9</span>
//                         </div>
//                         <p className="text-xs text-gray-500 mt-1">Customer Rating</p>
//                     </div>
//                 </div>
//             </section>

//             {/* --- STATISTICS SECTION (New) --- */}
//             <section id="stats" className="py-16 bg-gradient-to-r from-[#202224] to-gray-900">
//                 <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//                         {stats.map((stat, index) => (
//                             <div key={index} className="text-center text-white transform hover:scale-105 transition-transform duration-300">
//                                 <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${stat.color} mb-4 shadow-lg`}>
//                                     {stat.icon}
//                                 </div>
//                                 <h3 className="text-3xl font-black mb-2">
//                                     {stat.value}
//                                 </h3>
//                                 <p className="text-gray-400 font-semibold text-sm">{stat.label}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* --- VALUE PROPOSITION (Enhanced) --- */}
//             <section id="benefits" className="py-20 bg-white">
//                 <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
//                     <div className="text-center mb-16">
//                         <div className="inline-flex items-center gap-2 bg-red-50 text-[#B01030] font-black px-4 py-2 rounded-full text-xs uppercase mb-4">
//                             <MdStars /> Keunggulan Kami
//                         </div>
//                         <h2 className="text-4xl lg:text-5xl font-black text-[#202224] mb-4">Mengapa Memilih Byutie?</h2>
//                         <p className="text-gray-500 font-medium max-w-2xl mx-auto">Komitmen kami untuk menghadirkan produk berkualitas dengan standar tertinggi</p>
//                     </div>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                         <div className="group bg-gradient-to-b from-white to-gray-50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#B01030]/20">
//                             <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center text-4xl text-[#B01030] mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
//                                 <MdOutlineSpa />
//                             </div>
//                             <h3 className="text-2xl font-black mb-4">Ekstrak Alami Premium</h3>
//                             <p className="text-gray-600 text-sm leading-relaxed font-medium mb-4">Bahan aktif premium yang diekstrak dari alam Indonesia, terbukti secara klinis aman untuk kulit sensitif dan merawat skin barrier.</p>
//                             <ul className="space-y-2">
//                                 <li className="flex items-center gap-2 text-sm text-gray-500">
//                                     <MdVerified className="text-green-500" /> Centella Asiatica
//                                 </li>
//                                 <li className="flex items-center gap-2 text-sm text-gray-500">
//                                     <MdVerified className="text-green-500" /> Niacinamide
//                                 </li>
//                                 <li className="flex items-center gap-2 text-sm text-gray-500">
//                                     <MdVerified className="text-green-500" /> Hyaluronic Acid
//                                 </li>
//                             </ul>
//                         </div>
                        
//                         <div className="group bg-gradient-to-b from-white to-gray-50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#B01030]/20">
//                             <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-4xl text-blue-600 mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
//                                 <MdShield />
//                             </div>
//                             <h3 className="text-2xl font-black mb-4">Teruji Klinis & BPOM</h3>
//                             <p className="text-gray-600 text-sm leading-relaxed font-medium mb-4">Seluruh rangkaian produk Byutie telah lulus uji BPOM dan diformulasikan oleh ahli dermatologi terkemuka.</p>
//                             <ul className="space-y-2">
//                                 <li className="flex items-center gap-2 text-sm text-gray-500">
//                                     <MdVerified className="text-green-500" /> BPOM Approved
//                                 </li>
//                                 <li className="flex items-center gap-2 text-sm text-gray-500">
//                                     <MdVerified className="text-green-500" /> Dermatologist Tested
//                                 </li>
//                                 <li className="flex items-center gap-2 text-sm text-gray-500">
//                                     <MdVerified className="text-green-500" /> Halal Certified
//                                 </li>
//                             </ul>
//                         </div>
                        
//                         <div className="group bg-gradient-to-b from-white to-gray-50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#B01030]/20">
//                             <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center text-4xl text-green-600 mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
//                                 <MdCrueltyFree />
//                             </div>
//                             <h3 className="text-2xl font-black mb-4">Cruelty-Free & Eco-Friendly</h3>
//                             <p className="text-gray-600 text-sm leading-relaxed font-medium mb-4">Kecantikan tanpa menyakiti. Kami menjamin 100% proses produksi tidak melibatkan pengujian pada hewan.</p>
//                             <ul className="space-y-2">
//                                 <li className="flex items-center gap-2 text-sm text-gray-500">
//                                     <MdVerified className="text-green-500" /> No Animal Testing
//                                 </li>
//                                 <li className="flex items-center gap-2 text-sm text-gray-500">
//                                     <MdVerified className="text-green-500" /> Recyclable Packaging
//                                 </li>
//                                 <li className="flex items-center gap-2 text-sm text-gray-500">
//                                     <MdVerified className="text-green-500" /> Sustainable Sourcing
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* --- PRODUCTS SECTION (Enhanced) --- */}
//             <section id="products" className="py-24 bg-[#F8FAFC] px-6 lg:px-10 relative">
//                 <div className="max-w-[1400px] mx-auto">
//                     <div className="flex flex-col md:flex-row justify-between items-end mb-16">
//                         <div>
//                             <div className="flex items-center gap-2 text-[#B01030] font-black tracking-widest text-sm uppercase mb-3">
//                                 <MdStar className="animate-pulse" /> Produk Unggulan
//                             </div>
//                             <h2 className="text-4xl lg:text-5xl font-black text-[#202224] mb-2">Best Seller Byutie</h2>
//                             <p className="text-gray-500 font-medium">Produk terfavorit yang paling banyak diburu</p>
//                         </div>
//                         <div className="flex gap-4 mt-4 md:mt-0">
//                             <button className="px-6 py-2.5 bg-[#B01030] text-white rounded-full font-bold text-sm hover:bg-[#8e0d27] transition-colors">Semua</button>
//                             <button className="px-6 py-2.5 bg-white text-gray-700 rounded-full font-bold text-sm hover:bg-gray-50 transition-colors border border-gray-200">Skincare</button>
//                             <button className="px-6 py-2.5 bg-white text-gray-700 rounded-full font-bold text-sm hover:bg-gray-50 transition-colors border border-gray-200">Makeup</button>
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//                         {topProducts.map(product => (
//                             <div key={product.id} className="group bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 hover:border-[#B01030]/20 transform hover:-translate-y-2">
//                                 <div className="relative h-64 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
//                                     <img 
//                                         src={product.image} 
//                                         alt={product.name} 
//                                         className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700" 
//                                     />
//                                     {/* Badge */}
//                                     <div className="absolute top-4 left-4 flex flex-col gap-2">
//                                         <span className="bg-gradient-to-r from-[#B01030] to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
//                                             {product.badge}
//                                         </span>
//                                         {product.discount && (
//                                             <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
//                                                 -{product.discount}
//                                             </span>
//                                         )}
//                                     </div>
//                                     {/* Favorite Button */}
//                                     <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-50">
//                                         <MdFavoriteBorder className="text-gray-600 hover:text-red-500 transition-colors" />
//                                     </button>
//                                 </div>
                                
//                                 <div className="p-5">
//                                     <div className="flex items-center gap-1 text-yellow-400 text-sm mb-2">
//                                         <MdStar/><MdStar/><MdStar/><MdStar/><MdStar/>
//                                         <span className="text-gray-400 ml-1 text-xs">({product.sold})</span>
//                                     </div>
//                                     <h3 className="font-black text-gray-900 text-lg mb-1 line-clamp-2 leading-snug">{product.name}</h3>
//                                     <p className="text-xs text-gray-500 mb-3">{product.category}</p>
//                                     <div className="flex items-center justify-between">
//                                         <p className="text-[#B01030] font-black text-xl">{product.price}</p>
//                                         <button 
//                                             onClick={addToCart}
//                                             className="w-10 h-10 bg-[#B01030] text-white rounded-full flex items-center justify-center hover:bg-[#8e0d27] transition-colors active:scale-95 transform hover:rotate-12"
//                                         >
//                                             <MdOutlineShoppingBag className="text-lg" />
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     {/* View All Button */}
//                     <div className="text-center mt-12">
//                         <button className="inline-flex items-center gap-2 bg-white text-[#202224] border-2 border-gray-300 px-8 py-3.5 rounded-full font-black hover:border-[#B01030] hover:text-[#B01030] transition-all duration-300 group">
//                             Lihat Semua Produk 
//                             <MdArrowForward className="group-hover:translate-x-2 transition-transform" />
//                         </button>
//                     </div>
//                 </div>
//             </section>

//             {/* --- VIDEO PROMO SECTION (New) --- */}
//             <section className="py-20 bg-gradient-to-br from-red-50 via-white to-pink-50">
//                 <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//                         <div className="space-y-6">
//                             <div className="inline-flex items-center gap-2 bg-white text-[#B01030] font-black px-4 py-2 rounded-full text-xs uppercase shadow-md border border-red-100">
//                                 <MdRocket /> Tutorial
//                             </div>
//                                                         <h2 className="text-4xl lg:text-5xl font-black text-[#202224] leading-tight">
//                                 Lihat Bagaimana <br/>
//                                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B01030] to-pink-500">Byutie Bekerja</span>
//                             </h2>
//                             <p className="text-gray-600 font-medium text-lg leading-relaxed">
//                                 Dapatkan tips dan trik exclusive dari beauty expert kami untuk memaksimalkan hasil perawatan kulit Anda.
//                             </p>
//                             <button className="bg-[#202224] text-white px-8 py-4 rounded-full font-black hover:bg-[#B01030] transition-all duration-300 flex items-center gap-2 active:scale-95 w-fit">
//                                 <MdArrowForward /> Tonton Tutorial
//                             </button>
//                         </div>
//                         <div className="relative">
//                             <div className="aspect-video bg-gray-900 rounded-3xl overflow-hidden shadow-2xl relative group cursor-pointer">
//                                 <img 
//                                     src="/img/video_thumbnail.jpg" 
//                                     alt="Tutorial Byutie" 
//                                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                                 />
//                                 <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all flex items-center justify-center">
//                                     <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
//                                         <div className="w-0 h-0 border-l-[20px] border-l-[#B01030] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
//                                     </div>
//                                 </div>
//                             </div>
//                             {/* Decorative elements */}
//                             <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-red-200 to-pink-200 rounded-3xl"></div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* --- CRM MEMBERSHIP INTEGRATION SECTION (Enhanced) --- */}
//             <section id="membership" className="py-20 px-6 lg:px-10 bg-white">
//                 <div className="max-w-[1400px] mx-auto bg-gradient-to-br from-[#202224] via-gray-900 to-[#1a1a1a] rounded-[3rem] p-10 lg:p-16 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
//                     {/* Background Pattern */}
//                     <div className="absolute inset-0 opacity-10">
//                         <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-red-500 to-transparent rounded-full"></div>
//                         <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-500 to-transparent rounded-full"></div>
//                     </div>
                    
//                     <div className="flex-1 relative z-10">
//                         <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B01030] to-red-700 text-white font-black px-5 py-2 rounded-full text-xs uppercase mb-6 shadow-lg shadow-red-900/30">
//                             <MdLoyalty className="text-sm" /> Byutie Loves Community
//                         </div>
//                         <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
//                             Eksklusif untuk <br/>
//                             <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">Member Setia</span>
//                         </h2>
//                         <p className="text-gray-400 font-medium mb-8 leading-relaxed max-w-lg">
//                             Bergabunglah menjadi member resmi Byutie dan nikmati pengalaman belanja eksklusif. Dapatkan akses ke promo spesial, poin reward, dan event khusus member.
//                         </p>
                        
//                         <div className="flex flex-col gap-5 mb-10">
//                             <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
//                                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white text-xl shrink-0 shadow-lg">
//                                     <MdCardGiftcard />
//                                 </div>
//                                 <div>
//                                     <h4 className="font-black text-white mb-1">Poin Hadiah Setiap Belanja</h4>
//                                     <p className="text-xs text-gray-400">Kumpulkan poin dan tukarkan dengan produk eksklusif</p>
//                                 </div>
//                             </div>
//                             <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
//                                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white text-xl shrink-0 shadow-lg">
//                                     <MdStars />
//                                 </div>
//                                 <div>
//                                     <h4 className="font-black text-white mb-1">Voucher Ulang Tahun</h4>
//                                     <p className="text-xs text-gray-400">Kejutan spesial di hari istimewa Anda</p>
//                                 </div>
//                             </div>
//                             <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
//                                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-xl shrink-0 shadow-lg">
//                                     <MdVerified />
//                                 </div>
//                                 <div>
//                                     <h4 className="font-black text-white mb-1">Akses Early Bird</h4>
//                                     <p className="text-xs text-gray-400">Dapatkan produk baru sebelum yang lain</p>
//                                 </div>
//                             </div>
//                         </div>

//                         <button onClick={() => navigate('/login')} className="bg-gradient-to-r from-[#B01030] to-red-700 text-white px-8 py-4 rounded-full font-black hover:shadow-lg hover:shadow-red-900/30 transition-all duration-300 flex items-center gap-2 active:scale-95 w-fit group">
//                             Buat Akun Sekarang <MdArrowForward className="group-hover:translate-x-1 transition-transform" />
//                         </button>
//                     </div>

//                     <div className="flex-1 relative z-10 w-full max-w-md">
//                         <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border border-white/20 relative transform hover:rotate-0 rotate-3 transition-transform duration-500">
//                             <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex flex-col items-center justify-center text-white font-black leading-none shadow-lg transform -rotate-12 animate-float">
//                                 <span className="text-lg">FREE</span>
//                                 <span className="text-[10px] uppercase">Join</span>
//                             </div>
                            
//                             {/* Mockup Card */}
//                             <div className="space-y-4">
//                                 <div className="w-full h-48 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
//                                     <div className="flex justify-between items-start">
//                                         <div>
//                                             <p className="text-white/80 text-xs font-bold">Byutie Member</p>
//                                             <p className="text-white font-black text-lg">Gold Card</p>
//                                         </div>
//                                         <MdOutlineAutoAwesome className="text-white text-3xl" />
//                                     </div>
//                                     <div>
//                                         <p className="text-white/80 text-xs mb-1">Member ID</p>
//                                         <p className="text-white font-mono font-bold">001-BYUTIE-2026</p>
//                                     </div>
//                                 </div>
                                
//                                 <div className="grid grid-cols-2 gap-3">
//                                     <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
//                                         <p className="text-2xl font-black text-white">250</p>
//                                         <p className="text-xs text-gray-400">Poin</p>
//                                     </div>
//                                     <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
//                                         <p className="text-2xl font-black text-white">10%</p>
//                                         <p className="text-xs text-gray-400">Diskon</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* --- TESTIMONIALS SECTION (Enhanced) --- */}
//             <section id="testimonials" className="py-24 bg-white px-6 lg:px-10">
//                 <div className="max-w-[1400px] mx-auto">
//                     <div className="text-center mb-16 flex flex-col items-center">
//                         <div className="inline-flex items-center gap-2 bg-red-50 text-[#B01030] font-black px-4 py-2 rounded-full text-xs uppercase mb-4">
//                             <MdChatBubbleOutline /> Testimoni
//                         </div>
//                         <h2 className="text-4xl lg:text-5xl font-black text-[#202224] mb-3">Apa Kata Byutie Loves</h2>
//                         <p className="text-gray-500 font-bold max-w-2xl text-lg">Testimoni jujur dari mereka yang telah membuktikan pesona Byutie</p>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                         {testimonials.map(testi => (
//                             <div key={testi.id} className="bg-gradient-to-b from-white to-gray-50 p-8 rounded-3xl border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 relative group">
//                                 {/* Quote Icon */}
//                                 <div className="absolute top-6 right-6 text-6xl text-gray-100 group-hover:text-red-50 transition-colors duration-300">
//                                     "
//                                 </div>
                                
//                                 <div className="flex gap-1 text-yellow-400 mb-6 text-lg">
//                                     {[...Array(testi.rating)].map((_, i) => (
//                                         <MdStar key={i} />
//                                     ))}
//                                 </div>
//                                 <p className="text-gray-600 font-medium mb-6 leading-relaxed text-sm relative z-10">
//                                     "{testi.text}"
//                                 </p>
                                
//                                 <div className="border-t border-gray-200 pt-6">
//                                     <div className="flex items-center gap-3">
//                                         <div className="relative">
//                                             <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center font-black text-[#B01030] text-lg shadow-inner">
//                                                 {testi.name.charAt(0)}
//                                             </div>
//                                             {testi.verified && (
//                                                 <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
//                                                     <MdVerified className="text-white text-xs" />
//                                                 </div>
//                                             )}
//                                         </div>
//                                         <div>
//                                             <h4 className="font-black text-gray-900 text-sm">{testi.name}</h4>
//                                             <p className="text-xs text-gray-400 font-bold">{testi.role}</p>
//                                             <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
//                                                 <MdAccessTime className="text-xs" /> {testi.usage}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Rating Summary */}
//                     <div className="mt-16 bg-gradient-to-r from-red-50 to-pink-50 rounded-3xl p-8 lg:p-12">
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
//                             <div className="text-center">
//                                 <p className="text-5xl font-black text-[#202224] mb-2">4.9</p>
//                                 <div className="flex justify-center gap-1 text-yellow-400 mb-2">
//                                     <MdStar /><MdStar /><MdStar /><MdStar /><MdStar />
//                                 </div>
//                                 <p className="text-sm text-gray-500 font-bold">Dari 1000+ Ulasan</p>
//                             </div>
//                             <div className="md:col-span-2 space-y-2">
//                                 <div className="flex items-center gap-3">
//                                     <span className="text-sm font-bold text-gray-600 w-16">5 Bintang</span>
//                                     <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
//                                         <div className="h-full bg-yellow-400 rounded-full" style={{width: '85%'}}></div>
//                                     </div>
//                                     <span className="text-sm font-bold text-gray-600">85%</span>
//                                 </div>
//                                 <div className="flex items-center gap-3">
//                                     <span className="text-sm font-bold text-gray-600 w-16">4 Bintang</span>
//                                     <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
//                                         <div className="h-full bg-yellow-400 rounded-full" style={{width: '10%'}}></div>
//                                     </div>
//                                     <span className="text-sm font-bold text-gray-600">10%</span>
//                                 </div>
//                                 <div className="flex items-center gap-3">
//                                     <span className="text-sm font-bold text-gray-600 w-16">3 Bintang</span>
//                                     <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
//                                         <div className="h-full bg-yellow-400 rounded-full" style={{width: '5%'}}></div>
//                                     </div>
//                                     <span className="text-sm font-bold text-gray-600">5%</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* --- FAQ SECTION (New) --- */}
//             <section id="faq" className="py-20 bg-[#F8FAFC] px-6 lg:px-10">
//                 <div className="max-w-[1400px] mx-auto">
//                     <div className="text-center mb-16">
//                         <div className="inline-flex items-center gap-2 bg-red-50 text-[#B01030] font-black px-4 py-2 rounded-full text-xs uppercase mb-4">
//                             <MdChatBubbleOutline /> FAQ
//                         </div>
//                         <h2 className="text-4xl lg:text-5xl font-black text-[#202224] mb-3">Pertanyaan yang Sering Diajukan</h2>
//                         <p className="text-gray-500 font-bold max-w-2xl mx-auto">Temukan jawaban untuk pertanyaan umum seputar produk dan layanan Byutie</p>
//                     </div>

//                     <div className="max-w-3xl mx-auto space-y-4">
//                         {faqData.map((faq) => (
//                             <div 
//                                 key={faq.id} 
//                                 className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
//                             >
//                                 <button
//                                     onClick={() => toggleAccordion(faq.id)}
//                                     className="w-full flex items-center justify-between p-6 text-left"
//                                 >
//                                     <h3 className="font-black text-gray-900 text-lg pr-4">{faq.question}</h3>
//                                     <div className="shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-transform duration-300">
//                                         {activeAccordion === faq.id ? 
//                                             <MdExpandLess className="text-[#B01030] text-xl" /> : 
//                                             <MdExpandMore className="text-gray-600 text-xl" />
//                                         }
//                                     </div>
//                                 </button>
//                                 <div 
//                                     className={`transition-all duration-300 overflow-hidden ${
//                                         activeAccordion === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
//                                     }`}
//                                 >
//                                     <div className="px-6 pb-6 text-gray-600 font-medium leading-relaxed border-t border-gray-50 pt-4">
//                                         {faq.answer}
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Contact Support */}
//                     <div className="text-center mt-12">
//                         <p className="text-gray-500 font-medium mb-4">Masih punya pertanyaan?</p>
//                         <a 
//                             href="https://wa.me/6281234567890" 
//                             target="_blank" 
//                             rel="noreferrer"
//                             className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-black hover:bg-[#1ebe57] transition-all duration-300 shadow-lg hover:shadow-green-500/30"
//                         >
//                             <FaWhatsapp className="text-xl" /> Chat Customer Service
//                         </a>
//                     </div>
//                 </div>
//             </section>

//             {/* --- INSTAGRAM FEED SECTION (New) --- */}
//             <section className="py-20 bg-white px-6 lg:px-10">
//                 <div className="max-w-[1400px] mx-auto">
//                     <div className="text-center mb-16">
//                         <div className="inline-flex items-center gap-2 bg-red-50 text-[#B01030] font-black px-4 py-2 rounded-full text-xs uppercase mb-4">
//                             <FaInstagram /> Instagram
//                         </div>
//                         <h2 className="text-4xl lg:text-5xl font-black text-[#202224] mb-3">Follow @byutie.official</h2>
//                         <p className="text-gray-500 font-bold max-w-2xl mx-auto">Dapatkan inspirasi kecantikan dan update terbaru dari kami</p>
//                     </div>

//                     <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//                         {[1, 2, 3, 4, 5, 6].map((item) => (
//                             <div key={item} className="aspect-square bg-gray-100 rounded-2xl overflow-hidden group cursor-pointer relative">
//                                 <img 
//                                     src={`/img/instagram_${item}.jpg`} 
//                                     alt={`Instagram post ${item}`}
//                                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                                 />
//                                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4">
//                                     <div className="flex items-center gap-3 text-white text-sm">
//                                         <span className="flex items-center gap-1"><MdFavoriteBorder /> 1.2k</span>
//                                         <span className="flex items-center gap-1"><MdChatBubbleOutline /> 48</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     <div className="text-center mt-10">
//                         <a 
//                             href="https://instagram.com" 
//                             target="_blank" 
//                             rel="noreferrer"
//                             className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-8 py-4 rounded-full font-black hover:shadow-lg transition-all duration-300"
//                         >
//                             <FaInstagram className="text-xl" /> Follow Instagram Kami
//                         </a>
//                     </div>
//                 </div>
//             </section>

//             {/* --- NEWSLETTER SECTION (New) --- */}
//             <section className="py-16 bg-gradient-to-r from-[#B01030] to-red-700 px-6 lg:px-10">
//                 <div className="max-w-[1400px] mx-auto text-center">
//                     <div className="max-w-2xl mx-auto">
//                         <MdEmail className="text-white/30 text-5xl mx-auto mb-6" />
//                         <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">Dapatkan Update Terbaru</h2>
//                         <p className="text-white/80 font-medium mb-8">Subscribe newsletter kami dan dapatkan info promo eksklusif, tips kecantikan, dan produk terbaru langsung di inbox Anda.</p>
                        
//                         <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
//                             <input 
//                                 type="email" 
//                                 placeholder="Masukkan email Anda" 
//                                 className="flex-1 px-6 py-4 rounded-full bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white font-medium"
//                             />
//                             <button 
//                                 type="submit"
//                                 className="bg-white text-[#B01030] px-8 py-4 rounded-full font-black hover:bg-gray-100 transition-all duration-300 active:scale-95"
//                             >
//                                 Subscribe
//                             </button>
//                         </form>
//                         <p className="text-white/50 text-xs mt-4">Kami menghormati privasi Anda. Tidak ada spam, hanya info bermanfaat.</p>
//                     </div>
//                 </div>
//             </section>

//             {/* --- FOOTER (Enhanced) --- */}
//             <footer className="bg-[#1A1A1A] text-white pt-24 pb-10 rounded-t-[3rem] px-6 lg:px-10 border-t-4 border-[#B01030]">
//                 <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
//                     {/* Brand Info */}
//                     <div className="md:col-span-4 flex flex-col gap-6">
//                         <div className="flex items-center gap-2">
//                             <MdOutlineAutoAwesome className="text-[#B01030] text-3xl" />
//                             <span className="text-3xl font-extrabold tracking-tight text-white">byutie<span className="text-[#B01030]">.</span></span>
//                         </div>
//                         <p className="text-gray-400 font-medium leading-relaxed text-sm">
//                             Mendedikasikan inovasi untuk menghadirkan produk kecantikan yang aman, halal, dan terjangkau untuk setiap lapisan masyarakat Indonesia.
//                         </p>
//                         <div className="flex gap-3">
//                             <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#B01030] transition-all text-lg text-white">
//                                 <FaInstagram />
//                             </a>
//                             <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#B01030] transition-all text-lg text-white">
//                                 <FaTiktok />
//                             </a>
//                             <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#B01030] transition-all text-lg text-white">
//                                 <FaYoutube />
//                             </a>
//                             <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#B01030] transition-all text-lg text-white">
//                                 <FaShopify />
//                             </a>
//                         </div>
//                     </div>

//                     {/* Quick Links */}
//                     <div className="md:col-span-2 flex flex-col gap-4">
//                         <h3 className="text-base font-black text-white uppercase tracking-wider mb-2">Eksplor</h3>
//                         <a href="#hero" className="text-sm text-gray-400 hover:text-white transition-colors">Beranda</a>
//                         <a href="#benefits" className="text-sm text-gray-400 hover:text-white transition-colors">Keunggulan</a>
//                         <a href="#products" className="text-sm text-gray-400 hover:text-white transition-colors">Katalog Produk</a>
//                         <a href="#testimonials" className="text-sm text-gray-400 hover:text-white transition-colors">Ulasan Pelanggan</a>
//                         <a href="#faq" className="text-sm text-gray-400 hover:text-white transition-colors">FAQ</a>
//                     </div>

//                     {/* Layanan */}
//                     <div className="md:col-span-2 flex flex-col gap-4">
//                         <h3 className="text-base font-black text-white uppercase tracking-wider mb-2">Layanan</h3>
//                         <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Lacak Pesanan</a>
//                         <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Panduan Ukuran</a>
//                         <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Pengembalian</a>
//                         <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Affiliate Program</a>
//                         <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Dropship</a>
//                     </div>

//                     {/* Kontak & Alamat */}
//                     <div className="md:col-span-4 flex flex-col gap-4">
//                         <h3 className="text-base font-black text-white uppercase tracking-wider mb-2">Hubungi Kami</h3>
//                         <div className="flex flex-col gap-4 text-gray-400 font-bold text-sm">
//                             <div className="flex items-start gap-3">
//                                 <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
//                                     <MdLocationOn className="text-[#B01030] text-lg" />
//                                 </div>
//                                 <p className="leading-relaxed">Jl. Yos Sudarso No. 101, Rumbai<br/>Pekanbaru, Riau, Indonesia</p>
//                             </div>
//                             <div className="flex items-center gap-3">
//                                 <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
//                                     <MdPhone className="text-[#B01030] text-lg" />
//                                 </div>
//                                 <p>+62 812-3456-7890</p>
//                             </div>
//                             <div className="flex items-center gap-3">
//                                 <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
//                                     <MdEmail className="text-[#B01030] text-lg" />
//                                 </div>
//                                 <p>hello@byutie.com</p>
//                             </div>
//                             <div className="flex items-center gap-3">
//                                 <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
//                                     <MdAccessTime className="text-[#B01030] text-lg" />
//                                 </div>
//                                 <div>
//                                     <p className="text-white font-black text-xs mb-0.5">Jam Operasional</p>
//                                     <p className="text-xs">Senin - Jumat: 08.00 - 17.00 WIB</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="max-w-[1400px] mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-bold">
//                     <p>&copy; 2026 Byutie Cosmetics (CRM Ecosystem). Hak Cipta Dilindungi.</p>
//                     <div className="flex gap-6">
//                         <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
//                         <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
//                         <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
//                     </div>
//                 </div>
//             </footer>

//             {/* --- FLOATING CS BUTTON (Enhanced) --- */}
//             <a 
//                 href="https://wa.me/6281234567890" 
//                 target="_blank" 
//                 rel="noreferrer"
//                 className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_20px_rgba(37,211,102,0.3)] hover:bg-[#1ebe57] transition-all duration-300 hover:-translate-y-2 group z-50 flex items-center gap-0 hover:gap-3 overflow-hidden"
//             >
//                 <FaWhatsapp className="text-3xl" />
//                 <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-500 font-black text-sm">
//                     Chat Admin Byutie
//                 </span>
//             </a>

//             {/* --- BACK TO TOP BUTTON (New) --- */}
//             {showScrollTop && (
//                 <button
//                     onClick={scrollToTop}
//                     className="fixed bottom-8 right-28 bg-[#202224] text-white p-3 rounded-full shadow-lg hover:bg-[#B01030] transition-all duration-300 animate-bounce z-50"
//                 >
//                     <MdKeyboardArrowUp className="text-2xl" />
//                 </button>
//             )}

//         </div>
//     );
// }


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    MdOutlineAutoAwesome, 
    MdStar, 
    MdLocationOn, 
    MdPhone, 
    MdEmail, 
    MdOutlineShoppingBag,
    MdArrowForward,
    MdChatBubbleOutline,
    MdVerified,
    MdOutlineSpa,
    MdCrueltyFree,
    MdLoyalty,
    MdCardGiftcard,
    MdStars,
    MdClose,
    MdMenu,
    MdSearch,
    MdShoppingCart,
    MdFavoriteBorder,
    MdKeyboardArrowUp,
    MdAccessTime,
    MdShield,
    MdPeople,
    MdTrendingUp,
    MdRocket,
    MdExpandMore,
    MdExpandLess
} from "react-icons/md";
import { FaInstagram, FaTiktok, FaWhatsapp, FaYoutube, FaShopify } from "react-icons/fa";

export default function CompanyProfile() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [activeAccordion, setActiveAccordion] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const addToCart = () => {
        setCartCount(prev => prev + 1);
        const cartIcon = document.getElementById('cart-icon');
        if (cartIcon) {
            cartIcon.classList.add('animate-bounce');
            setTimeout(() => cartIcon.classList.remove('animate-bounce'), 1000);
        }
    };

    const toggleAccordion = (id) => {
        setActiveAccordion(activeAccordion === id ? null : id);
    };

    // --- DATA PRODUK TERLARIS ---
    const topProducts = [
        { id: 1, name: "Radiant Glow Serum", price: "Rp 145.000", sold: "2.5k+", image: "/img/bestseller_serum.jpg", rating: 4.9, badge: "Best Seller", discount: null, category: "Serum" },
        { id: 2, name: "Hydrating Toner 100ml", price: "Rp 98.000", sold: "1.8k+", image: "/img/bestseller_toner.jpg", rating: 4.8, badge: "New", discount: "15%", category: "Toner" },
        { id: 3, name: "Matte Lip Cream Velvet", price: "Rp 85.000", sold: "3.2k+", image: "/img/bestseller_lipcream.jpg", rating: 4.7, badge: "Hot", discount: null, category: "Lip Cream" },
        { id: 4, name: "Daily Sunscreen SPF 50", price: "Rp 115.000", sold: "4.1k+", image: "/img/bestseller_sunscreen.jpg", rating: 4.9, badge: "Best Value", discount: "10%", category: "Sunscreen" },
        { id: 5, name: "Acne Spot Treatment", price: "Rp 75.000", sold: "1.2k+", image: "/img/bestseller_acne.png", rating: 4.6, badge: "Limited", discount: null, category: "Treatment" },
    ];

    // Data testimoni asli (untuk infinite scroll, akan diduplikasi)
    const rawTestimonials = [
        { id: 1, name: "Alya Maharani", role: "Mahasiswi", text: "Serumnya benar-benar bikin wajah glowing alami! Tekstur kulit jadi jauh lebih halus dan bekas jerawat memudar.", rating: 5, verified: true, usage: "2 bulan" },
        { id: 2, name: "Siti Nurhaliza", role: "Pekerja Kantoran", text: "Suka banget sama Lip Cream Byutie. Gak bikin bibir kering, ringan banget dipakai ngantor seharian.", rating: 5, verified: true, usage: "1 bulan" },
        { id: 3, name: "Nadia Safira", role: "Beauty Enthusiast", text: "Sunscreen-nya gampang di-blend dan gak ada whitecast sama sekali. Kualitas premium harga lokal!", rating: 4, verified: false, usage: "3 minggu" },
        { id: 4, name: "Dina Larasati", role: "Ibu Rumah Tangga", text: "Rangkaian skincare Byutie memudarkan flek hitam saya. Sistem membernya juga asik, sering dapat diskon.", rating: 5, verified: true, usage: "3 bulan" },
    ];
    const testimonials = [...rawTestimonials, ...rawTestimonials]; // untuk infinite loop

    const faqData = [
        { id: 1, question: "Apakah produk Byutie aman untuk kulit sensitif?", answer: "Ya, semua produk Byutie diformulasikan khusus untuk kulit sensitif dan telah lolos uji dermatologis. Kami menggunakan bahan-bahan alami yang hypoallergenic." },
        { id: 2, question: "Bagaimana cara mendaftar menjadi member?", answer: "Klik tombol 'Daftar Member' atau 'Akun Member'. Isi formulir pendaftaran dan dapatkan akses ke berbagai keuntungan eksklusif." },
        { id: 3, question: "Berapa lama pengiriman produk?", answer: "Pengiriman 2-5 hari kerja. Kami bekerja sama dengan JNE, J&T, dan SiCepat." },
        { id: 4, question: "Apakah produk Byutie sudah BPOM?", answer: "Ya, seluruh produk telah terdaftar di BPOM dan memiliki nomor registrasi resmi." },
    ];

    const stats = [
        { icon: <MdPeople className="text-2xl lg:text-3xl" />, value: "10K+", label: "Member", color: "from-blue-500 to-blue-600" },
        { icon: <MdStar className="text-2xl lg:text-3xl" />, value: "4.9/5", label: "Rating", color: "from-yellow-500 to-yellow-600" },
        { icon: <MdVerified className="text-2xl lg:text-3xl" />, value: "BPOM", label: "Tersertifikasi", color: "from-green-500 to-green-600" },
        { icon: <MdTrendingUp className="text-2xl lg:text-3xl" />, value: "50K+", label: "Terjual", color: "from-purple-500 to-purple-600" },
    ];

    const membershipTiers = [
        {
            name: 'Free',
            price: 'Gratis',
            color: 'from-gray-400 to-gray-500',
            bg: 'bg-gray-100',
            border: 'border-gray-300',
            textColor: 'text-gray-700',
            benefits: ['Akses katalog produk', 'Notifikasi promo']
        },
        {
            name: 'Bronze',
            price: 'Rp 50K/bulan',
            color: 'from-amber-600 to-amber-800',
            bg: 'bg-amber-50',
            border: 'border-amber-400',
            textColor: 'text-amber-800',
            benefits: ['Diskon 5%', 'Poin 2x', 'Voucher ulang tahun']
        },
        {
            name: 'Silver',
            price: 'Rp 100K/bulan',
            color: 'from-gray-400 to-gray-600',
            bg: 'bg-gray-50',
            border: 'border-gray-400',
            textColor: 'text-gray-800',
            benefits: ['Diskon 10%', 'Poin 3x', 'Gratis ongkir', 'Akses early bird']
        },
        {
            name: 'Gold',
            price: 'Rp 150K/bulan',
            color: 'from-yellow-400 to-yellow-600',
            bg: 'bg-yellow-50',
            border: 'border-yellow-500',
            textColor: 'text-yellow-800',
            benefits: ['Diskon 20%', 'Poin 5x', 'Gratis ongkir', 'Akses eksklusif event', 'Hadiah ulang tahun spesial'],
            featured: true
        }
    ];

    return (
        <div className="font-nunito bg-[#FAFAFA] min-h-screen relative overflow-x-hidden selection:bg-[#B01030] selection:text-white">
            {/* CSS Animations */}
            <style>{`
                @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
                @keyframes fadeInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
                @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
                @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes infiniteScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-fadeInLeft { animation: fadeInLeft 0.6s ease-out; }
                .animate-fadeInRight { animation: fadeInRight 0.6s ease-out; }
                .animate-float { animation: float 3s ease-in-out infinite; }
                .animate-slideDown { animation: slideDown 0.3s ease-out; }
                .scroll-container { display: flex; gap: 1.5rem; animation: infiniteScroll 35s linear infinite; width: max-content; }
                .scroll-container:hover { animation-play-state: paused; }
                .scroll-wrapper { overflow: hidden; position: relative; }
                .scroll-wrapper::before, .scroll-wrapper::after { content: ''; position: absolute; top: 0; bottom: 0; width: 60px; z-index: 2; pointer-events: none; }
                .scroll-wrapper::before { left: 0; background: linear-gradient(to right, white, transparent); }
                .scroll-wrapper::after { right: 0; background: linear-gradient(to left, white, transparent); }
            `}</style>

            {/* --- NAVBAR FLOATING SETENGAH LINGKARAN --- */}
            {/* --- NAVBAR FLOATING SETENGAH LINGKARAN --- */}
            <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-[1400px] bg-transparent backdrop-blur-xl z-50 shadow-2xl rounded-full border border-white/60">
    <div className="px-4 sm:px-6 lg:px-8 h-14 lg:h-16 flex items-center justify-between">
        <div className="flex items-center gap-1.5 cursor-pointer group" onClick={() => window.scrollTo(0, 0)}>
            <MdOutlineAutoAwesome className="text-[#B01030] text-xl lg:text-2xl group-hover:rotate-12 transition-transform" />
            <span className="text-lg lg:text-xl font-extrabold tracking-tight text-[#202224]">byutie<span className="text-[#B01030]">.</span></span>
        </div>

        <div className="hidden lg:flex items-center gap-5 xl:gap-7 font-semibold text-gray-800 drop-shadow-sm text-xs lg:text-sm">
            <a href="#hero" className="hover:text-[#B01030] transition-colors">Beranda</a>
            <a href="#benefits" className="hover:text-[#B01030] transition-colors">Keunggulan</a>
            <a href="#products" className="hover:text-[#B01030] transition-colors">Terlaris</a>
            <a href="#membership" className="hover:text-[#B01030] transition-colors">Membership</a>
            <a href="#faq" className="hover:text-[#B01030] transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
            <div className="hidden md:flex items-center bg-white/50 border border-white/60 rounded-full px-3 py-1.5">
                <MdSearch className="text-gray-600 text-lg" />
                <input type="text" placeholder="Cari..." className="bg-transparent border-none outline-none text-xs lg:text-sm ml-1 w-20 lg:w-32 text-gray-900 placeholder-gray-600 font-bold" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            
            {/* Tombol troli (dinonaktifkan sesuai desain Anda) */}
            <div className="relative cursor-default opacity-50 pointer-events-none" title="Fitur Keranjang Segera Hadir">
                <MdShoppingCart id="cart-icon" className="text-xl lg:text-2xl text-gray-900" />
                {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[#B01030] text-white text-[10px] rounded-full w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center font-bold">{cartCount}</span>}
            </div>
            
            <button onClick={() => navigate('/login')} className="hidden sm:flex bg-gradient-to-r from-[#B01030] to-[#8e0d27] text-white px-4 lg:px-5 py-1.5 lg:py-2 rounded-full font-bold text-xs lg:text-sm hover:shadow-lg transition-all active:scale-95 items-center gap-1 border border-red-500/50">Member <MdArrowForward className="text-sm"/></button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-xl text-gray-800">{isMenuOpen ? <MdClose /> : <MdMenu />}</button>
        </div>
    </div>
    {isMenuOpen && (
        <div className="lg:hidden bg-white/90 backdrop-blur-xl border-t border-white/50 px-6 py-4 rounded-b-3xl shadow-lg animate-slideDown">
            <div className="flex flex-col gap-3">
                <div className="flex items-center bg-gray-100/80 border border-gray-200 rounded-full px-4 py-2 mb-2">
                    <MdSearch className="text-gray-500 text-lg" />
                    <input type="text" placeholder="Cari produk..." className="bg-transparent border-none outline-none text-sm ml-2 w-full font-bold text-gray-800" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <a href="#hero" onClick={() => setIsMenuOpen(false)} className="font-bold text-gray-800 py-2 hover:text-[#B01030]">Beranda</a>
                <a href="#benefits" onClick={() => setIsMenuOpen(false)} className="font-bold text-gray-800 py-2 hover:text-[#B01030]">Keunggulan</a>
                <a href="#products" onClick={() => setIsMenuOpen(false)} className="font-bold text-gray-800 py-2 hover:text-[#B01030]">Terlaris</a>
                <a href="#membership" onClick={() => setIsMenuOpen(false)} className="font-bold text-gray-800 py-2 hover:text-[#B01030]">Membership</a>
                <a href="#faq" onClick={() => setIsMenuOpen(false)} className="font-bold text-gray-800 py-2 hover:text-[#B01030]">FAQ</a>
                <button onClick={() => { navigate('/login'); setIsMenuOpen(false); }} className="sm:hidden bg-gradient-to-r from-[#B01030] to-[#8e0d27] text-white px-6 py-3 rounded-full font-bold text-center border border-red-400/50 shadow-md">Akun Member</button>
            </div>
        </div>
    )}
            </nav>

            <div className="pt-20 lg:pt-24"></div>

            {/* --- HERO SECTION (Enhanced) --- */}
            <section id="hero" className="pt-28 pb-20 px-6 lg:px-10 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[90vh]">
                {/* KOLOM KIRI: TEKS (TEMA BEAUTY STORE) */}
                <div className="flex flex-col gap-6 relative z-10 animate-fadeInLeft">
                    {/* Badge Tema Store */}
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-50 to-red-100 text-[#B01030] font-black px-6 py-2.5 rounded-full text-xs tracking-widest uppercase w-fit shadow-lg border border-red-200">
                        <MdOutlineShoppingBag className="text-lg" /> Destinasi Kecantikan Utama
                    </div>
                    
                    {/* Headline Kecantikan Umum */}
                    <h1 className="text-5xl lg:text-7xl font-black text-[#202224] leading-[1.1] tracking-tight">
                        Ekspresikan <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B01030] via-pink-600 to-rose-500 animate-gradient">
                            Dunia Cantikmu
                        </span>
                    </h1>
                    
                    {/* Deskripsi mencakup semua produk */}
                    <p className="text-lg text-gray-600 font-medium max-w-lg leading-relaxed">
                        Temukan koleksi lengkap kurasi produk kecantikan terbaik. Mulai dari skincare inovatif, makeup tren terbaru, hingga parfum eksklusif untuk memancarkan rasa percaya diri Anda setiap hari.
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 mt-2">
                        <a href="#products" className="bg-gradient-to-r from-[#202224] to-gray-800 text-white px-8 py-4 rounded-full font-black hover:from-[#B01030] hover:to-[#8e0d27] transition-all duration-500 shadow-xl flex items-center gap-2 text-sm active:scale-95 group">
                            <MdOutlineShoppingBag className="text-xl group-hover:rotate-12 transition-transform" /> Belanja Sekarang
                        </a>
                        <a href="#membership" className="bg-white text-[#202224] border-2 border-gray-300 px-8 py-3.5 rounded-full font-black hover:border-[#B01030] hover:text-[#B01030] transition-all duration-300 flex items-center gap-2 text-sm active:scale-95 hover:shadow-lg">
                            <MdLoyalty className="text-lg" /> Gabung Member
                        </a>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex items-center gap-6 lg:gap-8 mt-8 pt-8 border-t border-gray-200/60">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                                <MdPeople className="text-[#B01030] text-xl" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-black text-[#202224]">10K+</span>
                                <span className="text-xs font-bold text-gray-400">Pelanggan Setia</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center">
                                <MdStar className="text-yellow-500 text-xl" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-black text-[#202224]">4.9/5</span>
                                <span className="text-xs font-bold text-gray-400">Review Positif</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* KOLOM KANAN: GAMBAR (GAYA LAMA, UKURAN LEBIH BESAR) */}
                <div className="relative flex justify-center items-center lg:justify-end animate-fadeInRight">
                    {/* Decorative Elements */}
                    <div className="absolute w-[400px] h-[400px] bg-gradient-to-tr from-red-200/30 to-pink-100/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                    <div className="absolute -right-10 top-10 w-40 h-40 bg-yellow-100/40 rounded-full mix-blend-multiply filter blur-2xl"></div>
                    <div className="absolute -left-5 bottom-10 w-32 h-32 bg-pink-200/40 rounded-full mix-blend-multiply filter blur-2xl"></div>
                    
                    {/* PERUBAHAN DI SINI:
                        - max-w-lg (lama) diubah menjadi max-w-xl (lebih besar)
                        - w-[90%] (lama) diubah menjadi w-[95%] (lebih lebar di mobile)
                        - rounded-t-[8rem] (lama) diubah jadi [10rem] agar proporsional dengan ukuran baru
                    */}
                    <img 
                        src="/img/hero_model_aestheticc.png" 
                        alt="Byutie Skincare Models" 
                        className="relative z-10 w-[95%] lg:w-full max-w-xl h-auto object-cover rounded-t-[10rem] rounded-b-[4rem] shadow-2xl border-8 border-white transform hover:scale-[1.02] transition-transform duration-500"
                    />
                    
                    {/* Floating Cards (Tetap ada) */}
                    <div className="absolute bottom-16 -left-5 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 animate-float hidden sm:flex">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center text-green-600 text-2xl">
                            <MdVerified />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-bold">Produk 100%</p>
                            <p className="text-sm font-black text-gray-900">Original & BPOM</p>
                        </div>
                    </div>

                    <div className="absolute top-16 -right-2 z-20 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-gray-100 animate-float hidden sm:block" style={{animationDelay: '0.5s'}}>
                        <div className="flex items-center gap-2">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <MdStar key={i} className="text-yellow-400 text-sm" />
                                ))}
                            </div>
                            <span className="text-xs font-black text-gray-900">4.9</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Beauty Store Rating</p>
                    </div>
                </div>
            </section>

            {/* --- STATS SECTION (background lebih terang) --- */}
            <section id="stats" className="py-10 lg:py-12 bg-gradient-to-r from-gray-800 to-gray-900">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center text-white transform hover:scale-105 transition-transform">
                            <div className={`inline-flex p-3 lg:p-4 rounded-full bg-gradient-to-br ${stat.color} mb-3 shadow-lg`}>{stat.icon}</div>
                            <h3 className="text-2xl lg:text-3xl font-black mb-1">{stat.value}</h3>
                            <p className="text-gray-400 font-semibold text-xs lg:text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- VALUE PROPOSITION (Luxury Enhanced) --- */}
            <section id="benefits" className="py-28 relative overflow-hidden bg-gradient-to-br from-white via-rose-50/30 to-white">
    {/* Dekorasi Latar Mewah */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#B01030]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-transparent via-rose-100/20 to-transparent blur-2xl"></div>
    </div>

    <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
        <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-white/40 shadow-lg text-[#B01030] font-black px-5 py-2 rounded-full text-xs uppercase mb-5 tracking-wider">
                <MdStars className="text-lg" /> Keunggulan Eksklusif
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-[#202224] mb-5 tracking-tight">
                Mengapa <span className="bg-gradient-to-r from-[#B01030] to-[#e03a5a] bg-clip-text text-transparent">Byutie</span>?
            </h2>
            <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto">Standar tertinggi untuk kulit terawat & kecantikan berkelanjutan</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Card 1 - Ekstrak Alami Premium */}
            <div className="group relative bg-white/70 backdrop-blur-md rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-3xl border border-white/40 shadow-xl hover:border-[#B01030]/40">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#B01030]/10 to-[#B01030]/5 flex items-center justify-center text-5xl text-[#B01030] mb-7 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-inner">
                        <MdOutlineSpa />
                    </div>
                    <h3 className="text-2xl font-black mb-4 tracking-tight">Ekstrak Alami <br/>Premium</h3>
                    <p className="text-gray-600 text-sm leading-relaxed font-medium mb-6">Bahan aktif premium dari alam Indonesia, terbukti klinis aman untuk kulit sensitif & memperkuat skin barrier.</p>
                    <div className="h-px w-12 bg-[#B01030]/30 group-hover:w-full transition-all duration-700 mb-5"></div>
                    <ul className="space-y-3">
                        {["Centella Asiatica", "Niacinamide", "Hyaluronic Acid"].map((item) => (
                            <li key={item} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                                <MdVerified className="text-[#B01030] text-base" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Card 2 - Teruji Klinis & BPOM */}
            <div className="group relative bg-white/70 backdrop-blur-md rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-3xl border border-white/40 shadow-xl hover:border-[#B01030]/40">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-5xl text-blue-700 mb-7 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-inner">
                        <MdShield />
                    </div>
                    <h3 className="text-2xl font-black mb-4 tracking-tight">Teruji Klinis & <br/>BPOM</h3>
                    <p className="text-gray-600 text-sm leading-relaxed font-medium mb-6">Formulasi oleh ahli dermatologi, seluruh produk telah lulus uji ketat BPOM & bersertifikat halal.</p>
                    <div className="h-px w-12 bg-blue-500/30 group-hover:w-full transition-all duration-700 mb-5"></div>
                    <ul className="space-y-3">
                        {["BPOM Approved", "Dermatologist Tested", "Halal Certified"].map((item) => (
                            <li key={item} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                                <MdVerified className="text-blue-600 text-base" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Card 3 - Cruelty-Free & Eco-Friendly */}
            <div className="group relative bg-white/70 backdrop-blur-md rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-3xl border border-white/40 shadow-xl hover:border-[#B01030]/40">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center text-5xl text-green-700 mb-7 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-inner">
                        <MdCrueltyFree />
                    </div>
                    <h3 className="text-2xl font-black mb-4 tracking-tight">Cruelty-Free & <br/>Eco-Friendly</h3>
                    <p className="text-gray-600 text-sm leading-relaxed font-medium mb-6">Kecantikan tanpa menyakiti. 100% bebas uji hewan, kemasan daur ulang, dan bahan baku berkelanjutan.</p>
                    <div className="h-px w-12 bg-green-500/30 group-hover:w-full transition-all duration-700 mb-5"></div>
                    <ul className="space-y-3">
                        {["No Animal Testing", "Recyclable Packaging", "Sustainable Sourcing"].map((item) => (
                            <li key={item} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                                <MdVerified className="text-green-600 text-base" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </div>
            </section>

            {/* --- PRODUCTS SECTION (Enhanced) --- */}
            {/* --- PRODUCTS SECTION --- */}
            <section id="products" className="py-24 bg-[#F8FAFC] px-6 lg:px-10 relative">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                        <div>
                            <div className="flex items-center gap-2 text-[#B01030] font-black tracking-widest text-sm uppercase mb-3">
                                <MdStar className="animate-pulse text-lg" /> Produk Unggulan
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-black text-[#202224] mb-2">Best Seller Byutie</h2>
                            <p className="text-gray-500 font-bold text-lg">Produk terfavorit yang paling banyak diburu</p>
                        </div>
                        <div className="flex gap-3 mt-6 md:mt-0 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                            <button className="px-6 py-2.5 bg-[#B01030] text-white rounded-full font-bold text-sm shadow-md flex-shrink-0">Semua</button>
                            <button className="px-6 py-2.5 bg-white text-gray-700 rounded-full font-bold text-sm hover:bg-gray-50 transition-colors border border-gray-200 flex-shrink-0">Skincare</button>
                            <button className="px-6 py-2.5 bg-white text-gray-700 rounded-full font-bold text-sm hover:bg-gray-50 transition-colors border border-gray-200 flex-shrink-0">Makeup</button>
                        </div>
                    </div>

                    {/* Layout Tampilan 3 Atas, 2 Bawah (Rata Tengah) */}
                    <div className="flex flex-wrap justify-center gap-6">
                        {topProducts.map((product) => (
                            <div 
                                key={product.id} 
                                // Di Desktop (lg): w-[calc(33.333%-16px)] untuk 3 kolom. 
                                // Di Tablet (sm): w-[calc(50%-12px)] untuk 2 kolom.
                                // Di Mobile: w-full
                                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(30%-16px)] group bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 hover:border-[#B01030]/30 transform hover:-translate-y-2 flex flex-col"
                            >
                                <div className="relative h-64 overflow-hidden bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
                                    <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-contain drop-shadow-xl" 
                                             onError={(e) => {e.target.style.display='none'; e.target.parentElement.innerHTML = '<span class="text-gray-400 font-bold text-xs">Image Placeholder</span>';}} />
                                    </div>
                                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                                        <span className="bg-gradient-to-r from-[#B01030] to-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black shadow-md uppercase tracking-wider">
                                            {product.badge}
                                        </span>
                                        {product.discount && (
                                            <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-[10px] font-black shadow-md">
                                                -{product.discount}
                                            </span>
                                        )}
                                    </div>
                                    <button className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-50 hover:text-[#B01030]">
                                        <MdFavoriteBorder className="text-lg" />
                                    </button>
                                </div>
                                
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center gap-1 text-yellow-400 text-sm mb-2">
                                        <MdStar/><MdStar/><MdStar/><MdStar/><MdStar/>
                                        <span className="text-gray-400 ml-1 text-xs font-bold">({product.sold})</span>
                                    </div>
                                    <h3 className="font-black text-gray-900 text-lg mb-1 leading-snug">{product.name}</h3>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-4">{product.category}</p>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                        <p className="text-[#B01030] font-black text-xl">{product.price}</p>
                                        {/* --- TOMBOL ADD TO CART DIMATIKAN --- */}
                                        <button 
                                            className="w-10 h-10 bg-gray-100 text-gray-400 rounded-xl flex items-center justify-center cursor-not-allowed border border-gray-200"
                                            title="Fitur keranjang belum tersedia"
                                        >
                                            <MdOutlineShoppingBag className="text-lg" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View All Button */}
                    <div className="text-center mt-12">
                        <button className="inline-flex items-center gap-2 bg-white text-[#202224] border-2 border-gray-300 px-8 py-3.5 rounded-full font-black hover:border-[#B01030] hover:text-[#B01030] transition-all duration-300 group">
                            Lihat Semua Produk 
                            <MdArrowForward className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>

            {/* --- VIDEO PROMO SECTION (New) --- */}
            <section className="py-20 bg-gradient-to-br from-red-50 via-white to-pink-50">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 bg-white text-[#B01030] font-black px-4 py-2 rounded-full text-xs uppercase shadow-md border border-red-100">
                                <MdRocket /> Tutorial
                            </div>
                                                        <h2 className="text-4xl lg:text-5xl font-black text-[#202224] leading-tight">
                                Lihat Bagaimana <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B01030] to-pink-500">Byutie Bekerja</span>
                            </h2>
                            <p className="text-gray-600 font-medium text-lg leading-relaxed">
                                Dapatkan tips dan trik exclusive dari beauty expert kami untuk memaksimalkan hasil perawatan kulit Anda.
                            </p>
                            <button className="bg-[#202224] text-white px-8 py-4 rounded-full font-black hover:bg-[#B01030] transition-all duration-300 flex items-center gap-2 active:scale-95 w-fit">
                                <MdArrowForward /> Tonton Tutorial
                            </button>
                        </div>
                        <div className="relative">
                            <div className="aspect-video bg-gray-900 rounded-3xl overflow-hidden shadow-2xl relative group cursor-pointer">
                                <img 
                                    src="/img/video_thumbnail.png" 
                                    alt="Tutorial Byutie" 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all flex items-center justify-center">
                                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                                        <div className="w-0 h-0 border-l-[20px] border-l-[#B01030] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
                                    </div>
                                </div>
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-red-200 to-pink-200 rounded-3xl"></div>
                        </div>
                    </div>
                </div>
            </section>

                        {/* --- MEMBERSHIP 4 TIPE + CRM (yang sudah ada di bawahnya) --- */}
            <section id="membership" className="py-16 lg:py-20 bg-white px-4 sm:px-6 lg:px-10">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl lg:text-5xl font-black text-[#202224] mb-3">Pilih Paket Membership Anda</h2>
                        <p className="text-gray-500">Dapatkan keuntungan lebih dengan bergabung</p>
                    </div>
                    {/* Kartu 4 tier */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {membershipTiers.map((tier) => (
                            <div key={tier.name} className={`relative rounded-3xl p-6 border-2 ${tier.border} ${tier.bg} shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${tier.featured ? 'ring-4 ring-yellow-400 scale-105 lg:scale-110 z-10' : ''}`}>
                                {tier.featured && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-5 py-1 rounded-full text-xs font-black shadow-md">PALING DIMINATI</div>}
                                <div className="text-center mb-4">
                                    <h3 className={`text-2xl font-black ${tier.textColor}`}>{tier.name}</h3>
                                    <p className={`text-3xl font-black mt-2 bg-gradient-to-r ${tier.color} bg-clip-text text-transparent`}>{tier.price}</p>
                                </div>
                                <ul className="space-y-3 flex-1 mb-6">
                                    {tier.benefits.map((b, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm font-medium text-gray-700"><MdVerified className="text-green-500 shrink-0"/>{b}</li>
                                    ))}
                                </ul>
                                <button className={`w-full py-3 rounded-full font-black text-sm transition-all ${tier.featured ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white hover:shadow-lg' : 'bg-white border-2 border-gray-300 hover:border-[#B01030] hover:text-[#B01030]'}`}>Pilih {tier.name}</button>
                            </div>
                        ))}
                    </div>

                    {/* CRM Membership (yang sudah ada, TIDAK DIUBAH) */}
                    <div className="bg-gradient-to-br from-[#202224] via-gray-900 to-[#1a1a1a] rounded-[3rem] p-10 lg:p-16 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-red-500 to-transparent rounded-full"></div>
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-500 to-transparent rounded-full"></div>
                        </div>
                        <div className="flex-1 relative z-10">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B01030] to-red-700 text-white font-black px-5 py-2 rounded-full text-xs uppercase mb-6 shadow-lg shadow-red-900/30">
                                <MdLoyalty className="text-sm" /> Byutie Loves Community
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                                Eksklusif untuk <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">Member Setia</span>
                            </h2>
                            <p className="text-gray-400 font-medium mb-8 leading-relaxed max-w-lg">
                                Bergabunglah menjadi member resmi Byutie dan nikmati pengalaman belanja eksklusif. Dapatkan akses ke promo spesial, poin reward, dan event khusus member.
                            </p>
                            <div className="flex flex-col gap-5 mb-10">
                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white text-xl shrink-0 shadow-lg">
                                        <MdCardGiftcard />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-white mb-1">Poin Hadiah Setiap Belanja</h4>
                                        <p className="text-xs text-gray-400">Kumpulkan poin dan tukarkan dengan produk eksklusif</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white text-xl shrink-0 shadow-lg">
                                        <MdStars />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-white mb-1">Voucher Ulang Tahun</h4>
                                        <p className="text-xs text-gray-400">Kejutan spesial di hari istimewa Anda</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-xl shrink-0 shadow-lg">
                                        <MdVerified />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-white mb-1">Akses Early Bird</h4>
                                        <p className="text-xs text-gray-400">Dapatkan produk baru sebelum yang lain</p>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => navigate('/login')} className="bg-gradient-to-r from-[#B01030] to-red-700 text-white px-8 py-4 rounded-full font-black hover:shadow-lg hover:shadow-red-900/30 transition-all duration-300 flex items-center gap-2 active:scale-95 w-fit group">
                                Buat Akun Sekarang <MdArrowForward className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                        <div className="flex-1 relative z-10 w-full max-w-md">
                            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border border-white/20 relative transform hover:rotate-0 rotate-3 transition-transform duration-500">
                                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex flex-col items-center justify-center text-white font-black leading-none shadow-lg transform -rotate-12 animate-float">
                                    <span className="text-lg">FREE</span>
                                    <span className="text-[10px] uppercase">Join</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="w-full h-48 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-white/80 text-xs font-bold">Byutie Member</p>
                                                <p className="text-white font-black text-lg">Gold Card</p>
                                            </div>
                                            <MdOutlineAutoAwesome className="text-white text-3xl" />
                                        </div>
                                        <div>
                                            <p className="text-white/80 text-xs mb-1">Member ID</p>
                                            <p className="text-white font-mono font-bold">001-BYUTIE-2026</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
                                            <p className="text-2xl font-black text-white">250</p>
                                            <p className="text-xs text-gray-400">Poin</p>
                                        </div>
                                        <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
                                            <p className="text-2xl font-black text-white">10%</p>
                                            <p className="text-xs text-gray-400">Diskon</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- TESTIMONIALS INFINITE SCROLL (kartu besar, bintang utuh, rating summary di bawah) --- */}
            <section id="testimonials" className="py-20 bg-white px-4 sm:px-6 lg:px-10 overflow-hidden">
                <div className="max-w-[1400px] mx-auto mb-12">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 bg-red-50 text-[#B01030] font-black px-4 py-2 rounded-full text-xs uppercase mb-4">
                            <MdChatBubbleOutline /> Testimoni
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black text-[#202224] mb-3">Apa Kata Byutie Loves</h2>
                        <p className="text-gray-500 font-medium max-w-2xl mx-auto">Testimoni jujur dari mereka yang telah membuktikan pesona Byutie</p>
                    </div>
                </div>

                {/* Scroll Container */}
                <div className="scroll-wrapper mb-12">
                    <div className="scroll-container py-4">
                        {testimonials.map((testi, index) => (
                            <div key={`${testi.id}-${index}`} className="min-w-[340px] sm:min-w-[380px] lg:min-w-[400px] bg-gradient-to-b from-white to-gray-50 p-6 lg:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all flex-shrink-0">
                                <div className="flex gap-1 text-yellow-400 mb-4 text-xl">
                                    {[...Array(testi.rating)].map((_, i) => (
                                        <MdStar key={i} />
                                    ))}
                                </div>
                                <p className="text-gray-600 font-medium mb-6 leading-relaxed text-sm lg:text-base">
                                    "{testi.text}"
                                </p>
                                <div className="border-t border-gray-200 pt-5 flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center font-black text-[#B01030] text-lg shadow-inner">
                                            {testi.name.charAt(0)}
                                        </div>
                                        {testi.verified && (
                                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                                                <MdVerified className="text-white text-xs" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-gray-900 text-sm">{testi.name}</h4>
                                        <p className="text-xs text-gray-400 font-bold">{testi.role}</p>
                                        <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
                                            <MdAccessTime className="text-xs" /> {testi.usage}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Rating Summary */}
                <div className="max-w-[1400px] mx-auto">
                    <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-3xl p-8 lg:p-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                            <div className="text-center">
                                <p className="text-5xl font-black text-[#202224] mb-2">4.9</p>
                                <div className="flex justify-center gap-1 text-yellow-400 mb-2">
                                    <MdStar /><MdStar /><MdStar /><MdStar /><MdStar />
                                </div>
                                <p className="text-sm text-gray-500 font-bold">Dari 1000+ Ulasan</p>
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-bold text-gray-600 w-16">5 Bintang</span>
                                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-yellow-400 rounded-full" style={{width: '85%'}}></div>
                                    </div>
                                    <span className="text-sm font-bold text-gray-600">85%</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-bold text-gray-600 w-16">4 Bintang</span>
                                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-yellow-400 rounded-full" style={{width: '10%'}}></div>
                                    </div>
                                    <span className="text-sm font-bold text-gray-600">10%</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-bold text-gray-600 w-16">3 Bintang</span>
                                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-yellow-400 rounded-full" style={{width: '5%'}}></div>
                                    </div>
                                    <span className="text-sm font-bold text-gray-600">5%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FAQ SECTION --- */}
            <section id="faq" className="py-20 bg-[#F8FAFC] px-4 sm:px-6 lg:px-10">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-red-50 text-[#B01030] font-black px-4 py-2 rounded-full text-xs uppercase mb-4">
                            <MdChatBubbleOutline /> FAQ
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black text-[#202224] mb-3">Pertanyaan yang Sering Diajukan</h2>
                        <p className="text-gray-500 font-medium">Temukan jawaban untuk pertanyaan umum seputar produk dan layanan Byutie</p>
                    </div>
                    <div className="space-y-3">
                        {faqData.map((faq) => (
                            <div key={faq.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
                                <button onClick={() => toggleAccordion(faq.id)} className="w-full flex items-center justify-between p-6 text-left">
                                    <h3 className="font-black text-gray-900 text-lg pr-4">{faq.question}</h3>
                                    <div className="shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                        {activeAccordion === faq.id ? <MdExpandLess className="text-[#B01030] text-xl" /> : <MdExpandMore className="text-gray-600 text-xl" />}
                                    </div>
                                </button>
                                <div className={`transition-all duration-300 overflow-hidden ${activeAccordion === faq.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="px-6 pb-6 text-gray-600 font-medium border-t border-gray-50 pt-4">{faq.answer}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <p className="text-gray-500 font-medium mb-3">Masih punya pertanyaan?</p>
                        <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[#1ebe57] transition-all shadow-md">
                            <FaWhatsapp className="text-lg" /> Chat Customer Service
                        </a>
                    </div>
                </div>
            </section>

            {/* --- NEWSLETTER PADAT (dengan jarak ke footer) --- */}
            <section className="py-10 lg:py-12 bg-gradient-to-r from-[#B01030] to-red-700 px-4 sm:px-6 lg:px-10 mb-8">
                <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-white text-center sm:text-left">
                        <h3 className="text-xl lg:text-2xl font-black mb-1">Dapatkan Update Terbaru</h3>
                        <p className="text-white/70 text-xs lg:text-sm">Info promo eksklusif langsung ke inbox Anda.</p>
                    </div>
                    <form className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto" onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Email Anda" className="px-5 py-2.5 rounded-full bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none text-sm w-full sm:w-64" />
                        <button type="submit" className="bg-white text-[#B01030] px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-100 transition-all">Subscribe</button>
                    </form>
                </div>
            </section>

            {/* --- FOOTER (ikon sosmed tidak bisa diklik) --- */}
            <footer className="bg-[#1A1A1A] text-white pt-14 pb-6 rounded-t-[2rem] lg:rounded-t-[3rem] px-4 sm:px-6 lg:px-10 border-t-4 border-[#B01030]">
                <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-sm">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-2">
                            <MdOutlineAutoAwesome className="text-[#B01030] text-xl" />
                            <span className="text-lg font-extrabold">byutie<span className="text-[#B01030]">.</span></span>
                        </div>
                        <p className="text-gray-400 text-xs leading-relaxed">Kecantikan aman, halal, dan terjangkau.</p>
                        <div className="flex gap-3 mt-4 text-gray-400 text-lg">
                            <span className="cursor-default opacity-60"><FaInstagram /></span>
                            <span className="cursor-default opacity-60"><FaTiktok /></span>
                            <span className="cursor-default opacity-60"><FaYoutube /></span>
                            <span className="cursor-default opacity-60"><FaShopify /></span>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-black text-white text-xs uppercase mb-3">Eksplor</h4>
                        <div className="flex flex-col gap-1.5 text-gray-400 text-xs">
                            <a href="#hero" className="hover:text-white">Beranda</a>
                            <a href="#benefits" className="hover:text-white">Keunggulan</a>
                            <a href="#products" className="hover:text-white">Produk</a>
                            <a href="#faq" className="hover:text-white">FAQ</a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-black text-white text-xs uppercase mb-3">Layanan</h4>
                        <div className="flex flex-col gap-1.5 text-gray-400 text-xs">
                            <a href="#" className="hover:text-white">Lacak Pesanan</a>
                            <a href="#" className="hover:text-white">Pengembalian</a>
                            <a href="#" className="hover:text-white">Kontak</a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-black text-white text-xs uppercase mb-3">Hubungi Kami</h4>
                        <div className="flex flex-col gap-2 text-gray-400 text-xs">
                            <div className="flex items-start gap-2">
                                <MdLocationOn className="text-[#B01030] text-sm shrink-0 mt-0.5" />
                                <p>Jl. Yos Sudarso No. 101, Pekanbaru</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <MdPhone className="text-[#B01030] text-sm shrink-0" />
                                <p>+62 812-3456-7890</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <MdEmail className="text-[#B01030] text-sm shrink-0" />
                                <p>hello@byutie.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-[1400px] mx-auto border-t border-white/10 pt-5 flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] text-gray-500 font-bold">
                    <p>&copy; 2026 Byutie Cosmetics. Hak Cipta Dilindungi.</p>
                    <div className="flex gap-4">
                        <span className="hover:text-white cursor-default">Syarat & Ketentuan</span>
                        <span className="hover:text-white cursor-default">Kebijakan Privasi</span>
                    </div>
                </div>
            </footer>

            {/* --- FLOATING BUTTONS --- */}
            <a 
                href="https://wa.me/6281234567890" 
                target="_blank" 
                rel="noreferrer"
                className="fixed bottom-6 right-6 bg-[#25D366] text-white p-3 lg:p-4 rounded-full shadow-lg hover:bg-[#1ebe57] transition-all hover:-translate-y-1 z-50 flex items-center gap-2 group"
            >
                <FaWhatsapp className="text-xl lg:text-2xl" />
                <span className="hidden group-hover:inline text-xs lg:text-sm font-black whitespace-nowrap">Chat Admin</span>
            </a>

            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-20 lg:right-24 bg-[#202224] text-white p-2 lg:p-3 rounded-full shadow-lg hover:bg-[#B01030] transition-all z-50"
                >
                    <MdKeyboardArrowUp className="text-xl lg:text-2xl" />
                </button>
            )}
        </div>
    );
}