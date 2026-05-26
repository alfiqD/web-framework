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
  const menus = [
    { id: 'menu-1', name: 'Dashboard', path: '/', icon: <MdDashboard className="mr-4 text-xl" /> },
    { id: 'menu-2', name: 'Orders', path: '/orders', icon: <MdListAlt className="mr-4 text-xl" /> },
    { id: 'menu-3', name: 'Customers', path: '/customers', icon: <MdPeople className="mr-4 text-xl" /> },
    { id: 'menu-4', name: 'Analytics', path: '/analytics', icon: <MdBarChart className="mr-4 text-xl" /> },
    { id: 'menu-5', name: 'Jenis Makeup', path: '/jenismakeup', icon: <MdOutlinePeopleAlt className="mr-4 text-xl" /> },
    { id: 'menu-6', name: 'Components', path: '/components', icon: <MdOutlineMedicalServices className="mr-4 text-xl" /> },
    { id: 'menu-7', name: 'Fitur ShadCN UI', path: '/fiturshadcnui', icon: <MdOutlineEventNote className="mr-4 text-xl" /> },
    { id: 'menu-8', name: 'Surgery Schedule', path: '/surgery-schedule', icon: <MdOutlineCalendarToday className="mr-4 text-xl" /> },
    { id: 'menu-9', name: 'Treatments', path: '/treatments', icon: <MdOutlineSpa className="mr-4 text-xl" /> },
    { id: 'menu-10', name: 'Reviews', path: '/reviews', icon: <MdOutlineStarBorder className="mr-4 text-xl" /> },
    { id: 'menu-11', name: 'Payments', path: '/payments', icon: <MdOutlinePayment className="mr-4 text-xl" /> },
    { id: 'menu-12', name: 'Messages', path: '/messages', icon: <MdOutlineMessage className="mr-4 text-xl" />, badge: 6 },
  ];

  const location = useLocation();

  return (
    /* Menggunakan font-['Nunito_Sans'] untuk seluruh container sidebar */
    <div id="sidebar" className="flex min-h-screen w-[280px] flex-col bg-white px-6 py-8 border-r border-gray-100 overflow-y-auto font-['Nunito_Sans']">
      
      {/* Logo Section */}
      <div id="sidebar-logo" className="flex items-center gap-2 mb-10 pl-2">
        <MdOutlineAutoAwesome className="text-[#B01030] text-2xl" />
        <span id="logo-title" className="text-2xl text-[#202224] font-extrabold tracking-tight">
          byutie
        </span>
      </div>

      {/* Sidebar Menu Utama */}
      <div id="sidebar-menu" className="mb-8">
        <ul id="menu-list" className="space-y-1">
          {menus.map((menu) => {
            const isActive = location.pathname === menu.path;

            return (
              <li key={menu.id}>
                <NavLink 
                  id={menu.id} 
                  to={menu.path}
                  /* Ukuran teks 14px menggunakan text-[14px] */
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
          })}
        </ul>
      </div>

      {/* Error Pages Section */}
      <div id="sidebar-error-pages" className="mb-10 pt-4 border-t border-gray-100">
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

      {/* Sidebar Footer */}
      <div id="sidebar-footer" className="mt-auto">
        <div id="footer-card" className="bg-[#202224] p-5 rounded-2xl shadow-lg mb-4 flex flex-col items-center text-center">
          <img 
            id="footer-avatar" 
            className="w-12 h-12 rounded-full border-2 border-[#B01030] object-cover mb-3" 
            src="/img/logoprofil.png"
            alt="User Avatar"
          />
          <div id="footer-text" className="text-white text-[13px] mb-4">
            <p className="font-light opacity-80">System Management</p>
          </div>
          <div id="add-menu-button" className="w-full flex justify-center items-center py-2.5 bg-[#B01030] text-white rounded-xl space-x-2 cursor-pointer active:scale-95 transition-transform hover:bg-[#8e0d27]">
            <MdAdd className="text-lg" />
            <span className="font-bold text-[14px]">Add Menu</span>
          </div>
        </div>
      </div>
      
    </div>
  );
}