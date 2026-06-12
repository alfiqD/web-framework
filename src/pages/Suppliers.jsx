import { useState, useEffect } from 'react';
import PageHeader from "../components/PageHeader";
import { 
    MdSearch, 
    MdFilterList, 
    MdAdd,
    MdMoreVert,
    MdBusiness,
    MdInventory2,
    MdCheckCircle,
    MdCancel,
    MdOutlineEdit,
    MdDeleteOutline,
    MdFileDownload,
    MdPhone
} from "react-icons/md";
// Import data JSON Pemasok
import suppliersData from "../data/suppliers.json";

export default function Suppliers() {
    // --- STATE MANAGEMENT ---
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Menampilkan 10 data per halaman

    // --- LOGIKA FILTER DATA ---
    const filteredSuppliers = suppliersData.filter((sup) => {
        const matchesSearch = sup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              sup.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCategory = categoryFilter === 'All' || sup.category === categoryFilter;
        return matchesSearch && matchCategory;
    });

    // Reset halaman ke 1 jika filter berubah
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, categoryFilter]);

    // --- LOGIKA PAGINATION ---
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSuppliers = filteredSuppliers.slice(indexOfFirstItem, indexOfLastItem);
    
    const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    // --- KALKULASI ANALITIK OTOMATIS ---
    const totalSuppliersCount = suppliersData.length;
    const activeSuppliersCount = suppliersData.filter(s => s.status === 'Active').length;
    const totalProductsSupplied = suppliersData.reduce((acc, curr) => acc + curr.totalProducts, 0);

    // Fungsi Helper Warna Badge Kategori Produk
    const getCategoryBadge = (category) => {
        switch (category) {
            case 'Skincare': 
                return <span className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-[12px] font-black border border-blue-100">{category}</span>;
            case 'Cosmetics': 
                return <span className="bg-pink-50 text-pink-600 px-3 py-1.5 rounded-lg text-[12px] font-black border border-pink-100">{category}</span>;
            case 'Bodycare': 
                return <span className="bg-green-50 text-green-600 px-3 py-1.5 rounded-lg text-[12px] font-black border border-green-100">{category}</span>;
            case 'Haircare': 
                return <span className="bg-purple-50 text-purple-600 px-3 py-1.5 rounded-lg text-[12px] font-black border border-purple-100">{category}</span>;
            case 'Accessories': 
                return <span className="bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg text-[12px] font-black border border-orange-100">{category}</span>;
            default: 
                return <span className="bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg text-[12px] font-black border border-gray-200">{category}</span>;
        }
    };

    return (
        <div id="dashboard-container" className="flex flex-col gap-6 font-nunito bg-[#F4F7FE] min-h-screen pb-10">
            
            <PageHeader title="Suppliers & Brands" breadcrumb={["Dashboard", "Suppliers"]}>
                {/* <button className="bg-white text-gray-600 border border-gray-200 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all font-bold text-sm flex items-center gap-2 shadow-sm active:scale-95">
                    <MdFileDownload className="text-lg" /> Export Supplier List
                </button> */}
            </PageHeader>

            {/* --- ANALYTICS CARDS (3 Grid Layout) --- */}
            <div className="mx-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center text-2xl">
                        <MdBusiness />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Suppliers</p>
                        <h3 className="text-3xl font-black text-gray-800 leading-none">{totalSuppliersCount} <span className="text-sm text-gray-400 font-bold">Brands</span></h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center text-2xl">
                        <MdCheckCircle />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Active Partners</p>
                        <h3 className="text-3xl font-black text-gray-800 leading-none">{activeSuppliersCount} <span className="text-sm text-green-400 font-bold">Live</span></h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#B01030] flex items-center justify-center text-2xl">
                        <MdInventory2 />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Items Supplied</p>
                        <h3 className="text-3xl font-black text-gray-800 leading-none">{totalProductsSupplied} <span className="text-sm text-gray-400 font-bold">SKU</span></h3>
                    </div>
                </div>
            </div>

            {/* --- MAIN DATA CONTAINER --- */}
            <div className="mx-8 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                
                {/* TOOLBAR */}
                <div className="p-6 border-b border-gray-50 flex flex-col lg:flex-row justify-between items-center gap-4 bg-white/50 backdrop-blur-md">
                    <div className="relative w-full lg:w-96 group">
                        <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-[#B01030] transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Cari nama supplier atau contact person..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-[#B01030]/10 focus:border-[#B01030] transition-all font-bold text-sm text-gray-700 placeholder-gray-400"
                        />
                    </div>
                    
                    <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
                        <div className="flex items-center gap-2 text-gray-400 font-bold mr-2 hidden sm:flex">
                            <MdFilterList size={20} /> <span className="text-sm">Kategori:</span>
                        </div>
                        <select 
                            value={categoryFilter} 
                            onChange={(e) => setCategoryFilter(e.target.value)} 
                            className="w-full sm:w-auto bg-white border border-gray-200 text-gray-600 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:ring-4 ring-[#B01030]/10 focus:border-[#B01030] cursor-pointer shadow-sm transition-all"
                        >
                            <option value="All">Semua Kategori</option>
                            <option value="Skincare">Skincare</option>
                            <option value="Cosmetics">Cosmetics</option>
                            <option value="Bodycare">Bodycare</option>
                            <option value="Haircare">Haircare</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                        <button className="bg-[#B01030] text-white px-4 py-3 rounded-xl hover:bg-[#8e0d27] transition-all font-bold text-sm flex items-center gap-1.5 shrink-0 shadow-md shadow-red-900/10 active:scale-95">
                            <MdAdd size={18} /> Tambah
                        </button>
                    </div>
                </div>

                {/* TABEL DATA */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="p-5 pl-8 text-[12px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Supplier Name</th>
                                <th className="p-5 text-[12px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Category</th>
                                <th className="p-5 text-[12px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Contact Person</th>
                                <th className="p-5 text-[12px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Items Supplied</th>
                                <th className="p-5 text-[12px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Status</th>
                                <th className="p-5 pr-8 text-[12px] font-black text-gray-400 uppercase tracking-widest text-right border-b border-gray-100">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {currentSuppliers.length > 0 ? currentSuppliers.map((sup) => (
                                <tr key={sup.id} className="hover:bg-red-50/10 transition-colors group">
                                    
                                    {/* Kolom 1: Nama Supplier */}
                                    <td className="p-5 pl-8">
                                        <div className="text-[15px] font-black text-gray-900">{sup.name}</div>
                                        <div className="text-[11px] font-bold text-gray-400 mt-0.5">ID: SUP-{sup.id.toString().padStart(3, '0')}</div>
                                    </td>
                                    
                                    {/* Kolom 2: Badge Kategori */}
                                    <td className="p-5">
                                        {getCategoryBadge(sup.category)}
                                    </td>

                                    {/* Kolom 3: Kontak & Telepon */}
                                    <td className="p-5">
                                        <div className="text-[14px] font-extrabold text-gray-800">{sup.contactPerson}</div>
                                        <div className="text-[12px] font-bold text-gray-400 flex items-center gap-1 mt-0.5"><MdPhone size={14}/> {sup.phone}</div>
                                    </td>

                                    {/* Kolom 4: Jumlah Produk */}
                                    <td className="p-5">
                                        <div className="text-[14px] font-black text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg w-fit">
                                            {sup.totalProducts} Items
                                        </div>
                                    </td>

                                    {/* Kolom 5: Status Kemitraan */}
                                    <td className="p-5">
                                        <div className="flex items-center gap-2">
                                            {sup.status === 'Active' ? (
                                                <span className="flex items-center gap-1 text-green-600 text-[13px] font-bold">
                                                    <MdCheckCircle className="text-green-500 text-base shadow-[0_0_8px_rgba(34,197,94,0.4)] rounded-full" /> Active
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-gray-400 text-[13px] font-bold line-through">
                                                    <MdCancel className="text-gray-300 text-base" /> Inactive
                                                </span>
                                            )}
                                        </div>
                                    </td>

                                    {/* Kolom 6: Aksi */}
                                    <td className="p-5 pr-8 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100" title="Edit Data">
                                                <MdOutlineEdit size={18} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100" title="Hapus">
                                                <MdDeleteOutline size={18} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all" title="Opsi Lain">
                                                <MdMoreVert size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="p-16 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <MdBusiness className="text-6xl mb-4 text-gray-200" />
                                            <p className="font-black text-lg text-gray-500">Supplier Tidak Ditemukan</p>
                                            <p className="font-semibold text-sm mt-1">Coba ketik kata kunci yang berbeda atau ganti filter kategori.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* --- FOOTER PAGINATION --- */}
                <div className="p-5 border-t border-gray-50 bg-gray-50/30 flex flex-col md:flex-row gap-4 justify-between items-center px-8">
                    <p className="text-sm font-bold text-gray-400">
                        Showing <span className="text-gray-700">{filteredSuppliers.length > 0 ? indexOfFirstItem + 1 : 0} - {Math.min(indexOfLastItem, filteredSuppliers.length)}</span> of <span className="text-gray-700">{filteredSuppliers.length}</span> partners
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