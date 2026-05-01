import { 
  MdDashboard, 
  MdListAlt, 
  MdPeople, 
  MdBarChart, 
  MdAdd, 
  MdOutlineErrorOutline,
  MdOutlinePeopleAlt, 
  MdOutlineMedicalServices, 
  MdOutlineEventNote, 
  MdOutlineCalendarToday, 
  MdOutlineSpa, 
  MdOutlineStarBorder, 
  MdOutlinePayment, 
  MdOutlineMessage,
  MdOutlineAutoAwesome
} from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";

export default function Sidebar() {
  // Menggabungkan menu lama dan baru agar bisa kamu sortir sendiri nanti
  const menus = [
    // --- MENU LAMA ---
    { id: 'menu-1', name: 'Dashboard', path: '/', icon: <MdDashboard className="mr-4 text-xl" /> },
    { id: 'menu-2', name: 'Orders', path: '/orders', icon: <MdListAlt className="mr-4 text-xl" /> },
    { id: 'menu-3', name: 'Customers', path: '/customers', icon: <MdPeople className="mr-4 text-xl" /> },
    { id: 'menu-4', name: 'Analytics', path: '/analytics', icon: <MdBarChart className="mr-4 text-xl" /> },
    
    // --- MENU BARU TEMPLATE BEAUTY ---
    { id: 'menu-5', name: 'Patients', path: '/patients', icon: <MdOutlinePeopleAlt className="mr-4 text-xl" /> },
    { id: 'menu-6', name: 'Doctors', path: '/doctors', icon: <MdOutlineMedicalServices className="mr-4 text-xl" /> },
    { id: 'menu-7', name: 'Appointments', path: '/appointments', icon: <MdOutlineEventNote className="mr-4 text-xl" /> },
    { id: 'menu-8', name: 'Surgery Schedule', path: '/surgery-schedule', icon: <MdOutlineCalendarToday className="mr-4 text-xl" /> },
    { id: 'menu-9', name: 'Treatments', path: '/treatments', icon: <MdOutlineSpa className="mr-4 text-xl" /> },
    { id: 'menu-10', name: 'Reviews', path: '/reviews', icon: <MdOutlineStarBorder className="mr-4 text-xl" /> },
    { id: 'menu-11', name: 'Payments', path: '/payments', icon: <MdOutlinePayment className="mr-4 text-xl" /> },
    { id: 'menu-12', name: 'Messages', path: '/messages', icon: <MdOutlineMessage className="mr-4 text-xl" />, badge: 6 },
  ];

  const location = useLocation();

  return (
    <div id="sidebar" className="flex min-h-screen w-[280px] flex-col bg-white px-6 py-8 border-r border-gray-50 overflow-y-auto">
      
      {/* Logo Section */}
      <div id="sidebar-logo" className="flex items-center gap-2 mb-10 pl-2">
        <MdOutlineAutoAwesome className="text-[#FCA5A5] text-2xl" />
        <span id="logo-title" className="font-poppins text-2xl text-gray-800 font-semibold tracking-wide">
          byutie
        </span>
      </div>

      {/* Sidebar Menu Utama */}
      <div id="sidebar-menu" className="mb-8">
        <ul id="menu-list" className="space-y-2">
          {menus.map((menu) => {
            const isActive = location.pathname === menu.path;

            return (
              <li key={menu.id}>
                <NavLink 
                  id={menu.id} 
                  to={menu.path}
                  // Efek timbul dan warna pink saat aktif ada di baris ini
                  className={`flex cursor-pointer items-center rounded-2xl p-3 font-medium transition-all duration-300 group ${
                    isActive 
                      ? "bg-[#FFE4E6] text-[#E17887] shadow-md shadow-pink-100 transform -translate-y-0.5 font-semibold" 
                      : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                  }`}
                >
                  <span className={`${isActive ? "text-[#E17887]" : "text-gray-400 group-hover:text-gray-500"}`}>
                    {menu.icon}
                  </span>
                  <span className="text-[15px]">{menu.name}</span>
                  
                  {/* Render Badge (Notifikasi) jika ada */}
                  {menu.badge && (
                    <div className="ml-auto flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#FCA5A5] text-[10px] font-bold text-white shadow-sm">
                      {menu.badge}
                    </div>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      {/* --- BAGIAN ERROR PAGES (Disimpan sesuai permintaan) --- */}
      <div id="sidebar-error-pages" className="mb-10 pt-4 border-t border-gray-100">
        <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-4 pl-3">
          Error Pages
        </h3>
        <ul className="space-y-2">
          {['400', '401', '403', '404'].map((errorCode) => (
            <li key={`error-${errorCode}`}>
              <NavLink
                to={`/${errorCode}`}
                className={({ isActive }) =>
                  `flex items-center rounded-2xl p-3 font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-[#FFE4E6] text-[#E17887] shadow-md shadow-pink-100 transform -translate-y-0.5"
                      : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                  }`
                }
              >
                <MdOutlineErrorOutline className="mr-3 text-lg" />
                <span className="text-[15px]">Error {errorCode}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Sidebar Footer (Disimpan dan disesuaikan warnanya) */}
      <div id="sidebar-footer" className="mt-auto">
        <div id="footer-card" className="bg-gradient-to-br from-[#FFE4E6] to-[#FCA5A5] p-6 rounded-3xl shadow-md shadow-pink-100 mb-6 flex flex-col items-center relative overflow-hidden text-center">
          <img 
            id="footer-avatar" 
            className="w-16 h-16 rounded-full border-4 border-white object-cover mb-3 shadow-sm" 
            src="/img/logoprofil.png"
            alt="User Avatar"
          />
          <div id="footer-text" className="text-gray-800 text-sm z-10">
            <p className="mb-4 font-medium">Manage your menus</p>
            <div id="add-menu-button" className="flex justify-center items-center p-2 bg-white rounded-xl space-x-2 cursor-pointer shadow-sm active:scale-95 transition-transform hover:shadow-md">
              <MdAdd className="text-[#E17887] text-xl" />
              <span className="text-[#E17887] font-bold text-sm">Add Menu</span>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}