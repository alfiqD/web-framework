import { useState, useEffect } from 'react';
import PageHeader from "../components/PageHeader";
import { 
    MdSearch, 
    MdStar, 
    MdStarBorder, 
    MdFilterList, 
    MdOutlineChatBubbleOutline, 
    MdVerified,
    MdFileDownload,
    MdReply,
    MdDeleteOutline,
    MdMoreVert,
    MdSentimentVerySatisfied
} from "react-icons/md";
// Import data dari file JSON
import reviewsData from "../data/reviews.json";

export default function Reviews() {
    // --- STATE UNTUK PENCARIAN, FILTER & PAGINATION ---
    const [searchTerm, setSearchTerm] = useState('');
    const [ratingFilter, setRatingFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    
    // PERUBAHAN DI SINI: Menampilkan 5 ulasan per halaman
    const itemsPerPage = 5; 

    // --- LOGIKA FILTER DATA ---
    const filteredReviews = reviewsData.filter(rev => {
        const matchesSearch = rev.comment.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              rev.customer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchRating = ratingFilter === 'All' || rev.rating === parseInt(ratingFilter);
        return matchesSearch && matchRating;
    });

    // Reset pagination setiap kali user mencari atau nge-filter
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, ratingFilter]);

    // --- LOGIKA PEMOTONGAN DATA (PAGINATION) ---
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReviews = filteredReviews.slice(indexOfFirstItem, indexOfLastItem);
    
    const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // --- KALKULASI STATISTIK OTOMATIS ---
    const totalReviews = reviewsData.length;
    const averageRating = totalReviews > 0 
        ? (reviewsData.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1) 
        : 0;
    const fiveStarReviews = reviewsData.filter(r => r.rating === 5).length;

    // Render Bintang
    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            i < rating ? <MdStar key={i} className="text-yellow-400 text-lg" /> : <MdStarBorder key={i} className="text-gray-300 text-lg" />
        ));
    };

    return (
        <div id="dashboard-container" className="flex flex-col gap-6 font-nunito bg-[#F4F7FE] min-h-screen pb-10">
            
            <PageHeader title="Customer Reviews" breadcrumb={["Dashboard", "Reviews"]}>
                {/* <button className="bg-white text-gray-600 border border-gray-200 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all font-bold text-sm flex items-center gap-2 shadow-sm active:scale-95">
                    <MdFileDownload className="text-lg" /> Export Report
                </button> */}
            </PageHeader>

            {/* --- ANALYTICS CARDS (3 Grid Layout) --- */}
            <div className="mx-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-yellow-50 text-yellow-500 flex items-center justify-center text-2xl">
                        <MdStar />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Average Rating</p>
                        <h3 className="text-3xl font-black text-gray-800 leading-none">{averageRating} <span className="text-lg text-gray-400">/ 5.0</span></h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center text-2xl">
                        <MdOutlineChatBubbleOutline />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Reviews</p>
                        <h3 className="text-3xl font-black text-gray-800 leading-none">{totalReviews}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center text-2xl">
                        <MdSentimentVerySatisfied />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">5-Star Ratings</p>
                        <h3 className="text-3xl font-black text-gray-800 leading-none">{fiveStarReviews}</h3>
                    </div>
                </div>
            </div>

            {/* --- REVIEWS LIST CONTAINER --- */}
            <div className="mx-8 bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                
                {/* TOOLBAR */}
                <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 bg-white/50 backdrop-blur-md">
                    <div className="relative w-full lg:w-96 group">
                        <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-[#B01030] transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Cari nama pelanggan atau ulasan..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-[#B01030]/10 focus:border-[#B01030] transition-all font-bold text-sm text-gray-700 placeholder-gray-400"
                        />
                    </div>
                    
                    <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
                        <div className="flex items-center gap-2 text-gray-400 font-bold mr-2 hidden md:flex">
                            <MdFilterList size={20} /> <span className="text-sm">Filter:</span>
                        </div>
                        <select 
                            value={ratingFilter} 
                            onChange={(e) => setRatingFilter(e.target.value)} 
                            className="bg-white border border-gray-200 text-gray-600 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] cursor-pointer shadow-sm transition-all"
                        >
                            <option value="All">Semua Rating</option>
                            <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                            <option value="4">⭐⭐⭐⭐ (4)</option>
                            <option value="3">⭐⭐⭐ (3)</option>
                            <option value="2">⭐⭐ (2)</option>
                            <option value="1">⭐ (1)</option>
                        </select>
                    </div>
                </div>

                {/* REVIEW ITEMS */}
                <div className="divide-y divide-gray-50 overflow-x-auto min-w-[800px]">
                    {currentReviews.length > 0 ? currentReviews.map(rev => (
                        <div key={rev.id} className="p-8 hover:bg-gray-50/50 transition-colors flex gap-6 group relative">
                            {/* Avatar */}
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-100 flex items-center justify-center font-black text-gray-500 text-lg shrink-0 shadow-inner">
                                {rev.customer.charAt(0)}
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-black text-gray-900 text-[15px]">{rev.customer}</h4>
                                            <MdVerified className="text-blue-500 text-[15px]" title="Verified Buyer" />
                                        </div>
                                        <div className="flex gap-0.5 mt-1">{renderStars(rev.rating)}</div>
                                    </div>
                                    <span className="text-[12px] font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">{rev.date}</span>
                                </div>
                                <p className="text-[14px] font-semibold text-gray-600 leading-relaxed bg-white border border-gray-100 shadow-sm p-5 rounded-2xl rounded-tl-none mt-3 max-w-3xl relative">
                                    "{rev.comment}"
                                </p>
                            </div>

                            {/* Action Menu (Muncul saat di-hover) */}
                            <div className="absolute top-8 right-8 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <button className="p-2.5 bg-white border border-gray-200 text-gray-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-100 rounded-xl transition-all shadow-sm" title="Balas Ulasan">
                                    <MdReply size={18} />
                                </button>
                                <button className="p-2.5 bg-white border border-gray-200 text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-100 rounded-xl transition-all shadow-sm" title="Hapus Ulasan">
                                    <MdDeleteOutline size={18} />
                                </button>
                                <button className="p-2.5 bg-white border border-gray-200 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all shadow-sm" title="Opsi Lain">
                                    <MdMoreVert size={18} />
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div className="p-20 flex flex-col items-center justify-center text-center">
                            <MdOutlineChatBubbleOutline className="text-7xl text-gray-200 mb-4" />
                            <h3 className="text-xl font-black text-gray-800 mb-1">Ulasan Tidak Ditemukan</h3>
                            <p className="text-sm font-bold text-gray-400">Coba gunakan kata kunci atau filter rating yang berbeda.</p>
                        </div>
                    )}
                </div>

                {/* --- FOOTER PAGINATION --- */}
                <div className="p-5 border-t border-gray-50 bg-gray-50/30 flex flex-col md:flex-row gap-4 justify-between items-center px-8">
                    <p className="text-sm font-bold text-gray-400">
                        Menampilkan <span className="text-gray-700">{filteredReviews.length > 0 ? indexOfFirstItem + 1 : 0} - {Math.min(indexOfLastItem, filteredReviews.length)}</span> dari <span className="text-gray-700">{filteredReviews.length}</span> ulasan
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