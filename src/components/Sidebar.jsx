import { 
  MdDashboard, 
  MdListAlt, 
  MdPeople, 
  MdOutlineErrorOutline,
  MdOutlinePeopleAlt, 
  MdOutlineMedicalServices, 
  MdOutlineEventNote, 
  MdOutlineCalendarToday, 
  MdOutlineSpa, 
  MdOutlineStarBorder, 
  MdOutlinePayment, 
  MdOutlineMessage,
  MdOutlineAutoAwesome,
  MdLogout,
  MdTrendingDown, // <-- Tambahan Import
  MdDoneAll,      // <-- Tambahan Import
  MdBusiness      // <-- Tambahan Import untuk Suppliers
} from "react-icons/md";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Tambahkan logika hapus token/sesi di sini jika sudah ada
    // localStorage.removeItem('token'); 
    navigate('/login');
  };

  // --- KELOMPOK 1: Fitur Utama CRM ---
  const mainMenus = [
    { id: 'menu-1', name: 'Dashboard', path: '/', icon: <MdDashboard className="mr-4 text-xl" /> },
    { id: 'menu-2', name: 'Orders', path: '/orders', icon: <MdListAlt className="mr-4 text-xl" /> },
    { id: 'menu-3', name: 'Customers', path: '/customers', icon: <MdPeople className="mr-4 text-xl" /> },
    { id: 'menu-5', name: 'Product', path: '/jenismakeup', icon: <MdOutlinePeopleAlt className="mr-4 text-xl" /> },
    { id: 'menu-13', name: 'Suppliers', path: '/suppliers', icon: <MdOutlinePayment className="mr-4 text-xl" /> },
    { id: 'menu-9', name: 'Treatments', path: '/treatments', icon: <MdOutlineSpa className="mr-4 text-xl" /> },
    { id: 'menu-10', name: 'Reviews', path: '/reviews', icon: <MdOutlineStarBorder className="mr-4 text-xl" /> },
    { id: 'menu-11', name: 'Payments', path: '/payments', icon: <MdOutlinePayment className="mr-4 text-xl" /> },
    { id: 'menu-12', name: 'Messages', path: '/messages', icon: <MdOutlineMessage className="mr-4 text-xl" />, badge: 6 },
    // Di array mainMenus (tambahkan sesuai kategorinya)
    { id: 'menu-14', name: 'Expenses', path: '/expenses', icon: <MdTrendingDown className="mr-4 text-xl" /> },
    { id: 'menu-15', name: 'Retention', path: '/retention', icon: <MdDoneAll className="mr-4 text-xl" /> },
    { id: 'menu-16', name: 'Staff Schedule', path: '/staff', icon: <MdOutlinePeopleAlt className="mr-4 text-xl" /> },
    { id: 'menu-17', name: 'User Management', path: '/usermanagement', icon: <MdOutlinePeopleAlt className="mr-4 text-xl" /> },
  ];

  // --- KELOMPOK 2: UI Tools ---
  const devMenus = [
    { id: 'menu-6', name: 'Components', path: '/components', icon: <MdOutlineMedicalServices className="mr-4 text-xl" /> },
    { id: 'menu-7', name: 'Fitur ShadCN UI', path: '/fiturshadcnui', icon: <MdOutlineEventNote className="mr-4 text-xl" /> },
    { id: 'menu-8', name: 'Hooks Demo', path: '/hooksdemo', icon: <MdOutlineCalendarToday className="mr-4 text-xl" /> },
  ];

  const renderMenuItem = (menu) => {
    const isActive = location.pathname === menu.path;
    return (
      <li key={menu.id}>
        <NavLink 
          to={menu.path}
          className={`flex cursor-pointer items-center rounded-xl p-3 transition-all duration-200 group ${
            isActive 
              ? "bg-[#B01030] text-white shadow-md shadow-red-900/10 font-bold" 
              : "text-[#202224] hover:bg-gray-50 hover:text-[#B01030] font-medium"
          }`}
        >
          <span className={`${isActive ? "text-white" : "text-[#202224] group-hover:text-[#B01030]"}`}>
            {menu.icon}
          </span>
          <span className="text-[14px]">{menu.name}</span>
          
          {menu.badge && (
            <div className={`ml-auto flex h-[20px] w-[20px] items-center justify-center rounded-full text-[10px] font-bold ${
              isActive ? "bg-white text-[#B01030]" : "bg-[#B01030] text-white"
            }`}>
              {menu.badge}
            </div>
          )}
        </NavLink>
      </li>
    );
  };

  return (
    <div id="sidebar" className="flex min-h-screen w-[280px] flex-col bg-white px-6 py-8 border-r border-gray-100 overflow-y-auto font-['Nunito_Sans'] scrollbar-hide">
      
      {/* Logo Section */}
      <div id="sidebar-logo" className="flex items-center gap-2 mb-10 pl-2">
        <MdOutlineAutoAwesome className="text-[#B01030] text-2xl" />
        <span id="logo-title" className="text-2xl text-[#202224] font-extrabold tracking-tight">
          byutie
        </span>
      </div>

      {/* Bagian 1: Menu Utama CRM */}
      <div id="sidebar-main-menu" className="mb-2">
        <ul className="space-y-1">
          {mainMenus.map(renderMenuItem)}
        </ul>
      </div>

      {/* Bagian 2: Logout Button & Garis Pembatas Pertama */}
      <div className="mb-8 border-b border-gray-100 pb-8 mt-2">
        <button 
          onClick={handleLogout}
          className="flex w-full items-center rounded-xl p-3 text-[#202224] transition-all duration-200 hover:bg-red-50 hover:text-[#B01030] font-bold group"
        >
          <MdLogout className="mr-4 text-xl text-gray-500 group-hover:text-[#B01030]" />
          <span className="text-[14px]">Logout</span>
        </button>
      </div>

      {/* Bagian 3: UI Components (Developer Tools) & Garis Pembatas Kedua */}
      <div id="sidebar-dev-tools" className="mb-8 border-b border-gray-100 pb-8">
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 pl-3">
          UI Components
        </h3>
        <ul className="space-y-1">
          {devMenus.map(renderMenuItem)}
        </ul>
      </div>

      {/* Bagian 4: Error Pages & Garis Pembatas Ketiga */}
      <div id="sidebar-error-pages" className="mb-8 border-b border-gray-100 pb-8">
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 pl-3">
          Error Pages
        </h3>
        <ul className="space-y-1">
          {['400', '401', '403', '404'].map((errorCode) => (
            <li key={`error-${errorCode}`}>
              <NavLink
                to={`/${errorCode}`}
                className={({ isActive }) =>
                  `flex items-center rounded-xl p-3 transition-all duration-200 ${
                    isActive
                      ? "bg-[#B01030] text-white font-bold"
                      : "text-[#202224] hover:bg-gray-50 hover:text-[#B01030] font-medium"
                  }`
                }
              >
                <MdOutlineErrorOutline className="mr-4 text-xl" />
                <span className="text-[14px]">Error {errorCode}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
}