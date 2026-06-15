// import { Suspense } from 'react';
// import './assets/tailwind.css';
// import { Route, Routes } from 'react-router-dom';
// import React from 'react';
// import Loading from './components/Loading';

// // --- LAZY IMPORTS (STANDARISASI AGAR WEB LEBIH CEPAT) ---
// const Dashboard = React.lazy(() => import("./pages/Dashboard"));
// const Orders = React.lazy(() => import("./pages/Orders"));
// const Customers = React.lazy(() => import("./pages/Customers"));
// const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));
// const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
// const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
// const Login = React.lazy(() => import("./pages/auth/Login"));
// const Register = React.lazy(() => import("./pages/auth/Register"));
// const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
// const JenisMakeup = React.lazy(() => import("./pages/JenisMakeup"));
// const MakeupDetail = React.lazy(() => import("./pages/MakeupDetail"));
// const Components = React.lazy(() => import("./pages/Components"));
// const Fiturshadcnui = React.lazy(() => import("./pages/fiturShadcnui"));
// const HooksDemo = React.lazy(() => import("./pages/HooksDemo"));
// const Messages = React.lazy(() => import("./pages/Messages"));
// const Reviews = React.lazy(() => import("./pages/Reviews"));
// const Payments = React.lazy(() => import("./pages/Payments"));
// const Treatments = React.lazy(() => import("./pages/Treatments"));
// const Suppliers = React.lazy(() => import("./pages/Suppliers"));
// const Expenses = React.lazy(() => import("./pages/Expenses"));
// const Staff = React.lazy(() => import("./pages/Staff"));
// const Retention = React.lazy(() => import("./pages/Retention"));
// const UserManagement = React.lazy(() => import("./pages/UserManagement"));
// const MemberAuth = React.lazy(() => import("./pages/auth/MemberAuth"));
// const MemberDashboard = React.lazy(() => import("./pages/MemberDashboard"));

// // ---> IMPORT HALAMAN WAJAH DEPAN (TANPA SIDEBAR) <---
// const CompanyProfile = React.lazy(() => import("./pages/CompanyProfile"));

// function App() {
//   return (
//     <Suspense fallback={<Loading />}>
//       <Routes>
        
//         {/* --- 1. ROUTE STANDALONE (TAMPILAN AWAL TANPA SIDEBAR) --- */}
//         {/* Diletakkan di LUAR MainLayout agar bisa Full Screen */}
//         <Route path="/landing" element={<CompanyProfile />} />
//         <Route path="/companyprofile" element={<CompanyProfile />} />
//         <Route path="/login" element={<MemberAuth />} /> 
//         <Route path="/member/dashboard" element={<MemberDashboard />} />

//         {/* --- 2. ROUTES DENGAN MAIN LAYOUT (ADA SIDEBAR ADMIN) --- */}
//         <Route element={<MainLayout />}>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/orders" element={<Orders />} />
//           <Route path="/customers" element={<Customers />} />
//           <Route path="/jenismakeup" element={<JenisMakeup />} />
//           <Route path="/jenismakeup/:id" element={<MakeupDetail/>} />
//           <Route path="/components" element={<Components/>} />
//           <Route path="/fiturshadcnui" element={<Fiturshadcnui/>} />
//           <Route path="/hooksdemo" element={<HooksDemo/>} />
//           <Route path="/messages" element={<Messages/>} />
//           <Route path="/reviews" element={<Reviews/>} />
//           <Route path="/payments" element={<Payments/>} />
//           <Route path="/treatments" element={<Treatments/>} />
//           <Route path="/suppliers" element={<Suppliers/>} />
//           <Route path="/expenses" element={<Expenses/>} />
//           <Route path="/staff" element={<Staff />} />
//           <Route path="/retention" element={<Retention />} />
          
//           {/* Sesuai dengan settingan Sidebar kamu sebelumnya */}
//           <Route path="/users" element={<UserManagement />} /> 
//           <Route path="/usermanagement" element={<UserManagement />} /> 

//           {/* Halaman Error */}
//           <Route path="/400" element={<ErrorPage errorCode="400" title={<>Oops! <br /> Bad Request!</>} />} />
//           <Route path="/401" element={<ErrorPage errorCode="401" title={<>Hold Up! <br /> Unauthorized!</>} />} />
//           <Route path="/403" element={<ErrorPage errorCode="403" title={<>Stop! <br /> Access Denied!</>} />} />
//           <Route path="/404" element={<ErrorPage errorCode="404" title={<>Go Home, <br /> You're Drunk!</>} />} />
//           <Route path="*" element={<ErrorPage errorCode="404" title={<>Go Home, <br /> You're Drunk!</>} />} />
//         </Route>

//         {/* --- 3. ROUTES DENGAN AUTH LAYOUT (LOGIN/REGISTER) --- */}
//         <Route element={<AuthLayout />}>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/forgot" element={<Forgot />} />
//         </Route>

//       </Routes>
//     </Suspense>
//   );
// }

// export default App;

import { Suspense } from 'react';
import './assets/tailwind.css';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Loading from './components/Loading';

// --- LAZY IMPORTS (STANDARISASI AGAR WEB LEBIH CEPAT) ---
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const JenisMakeup = React.lazy(() => import("./pages/JenisMakeup"));
const MakeupDetail = React.lazy(() => import("./pages/MakeupDetail"));
const Components = React.lazy(() => import("./pages/Components"));
const Fiturshadcnui = React.lazy(() => import("./pages/fiturShadcnui"));
const HooksDemo = React.lazy(() => import("./pages/HooksDemo"));
const Messages = React.lazy(() => import("./pages/Messages"));
const Reviews = React.lazy(() => import("./pages/Reviews"));
const Payments = React.lazy(() => import("./pages/Payments"));
const Treatments = React.lazy(() => import("./pages/Treatments"));
const Suppliers = React.lazy(() => import("./pages/Suppliers"));
const Expenses = React.lazy(() => import("./pages/Expenses"));
const Staff = React.lazy(() => import("./pages/Staff"));
const Retention = React.lazy(() => import("./pages/Retention"));
const UserManagement = React.lazy(() => import("./pages/UserManagement"));

// ---> IMPORT HALAMAN MEMBER & WAJAH DEPAN <---
// Pastikan path import ini sesuai dengan lokasi file kamu!
const CompanyProfile = React.lazy(() => import("./pages/CompanyProfile"));
const MemberAuth = React.lazy(() => import("./pages/auth/MemberAuth")); // Sesuai kodinganmu
const MemberDashboard = React.lazy(() => import("./pages/MemberDashboard"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        
        {/* =========================================
            1. AREA PUBLIK & MEMBER (Tanpa Sidebar)
            ========================================= */}
        {/* Akses awal web langsung diarahkan ke Company Profile */}
        <Route path="/" element={<CompanyProfile />} />
        <Route path="/landing" element={<CompanyProfile />} />
        <Route path="/companyprofile" element={<CompanyProfile />} />
        
        {/* Jalur Khusus Pelanggan/Member */}
        <Route path="/login" element={<MemberAuth />} /> 
        <Route path="/member/dashboard" element={<MemberDashboard />} />

        {/* =========================================
            2. AREA LOGIN ADMIN (Tanpa Sidebar)
            ========================================= */}
        <Route element={<AuthLayout />}>
          {/* Diubah menjadi /admin-login agar tidak bentrok dengan /login member */}
          <Route path="/admin-login" element={<Login />} />
          <Route path="/admin-register" element={<Register />} />
          <Route path="/admin-forgot" element={<Forgot />} />
        </Route>

        {/* =========================================
            3. AREA DASHBOARD ADMIN (Dengan Sidebar)
            ========================================= */}
        <Route element={<MainLayout />}>
          {/* Dashboard admin dipindah ke /dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/jenismakeup" element={<JenisMakeup />} />
          <Route path="/jenismakeup/:id" element={<MakeupDetail/>} />
          <Route path="/components" element={<Components/>} />
          <Route path="/fiturshadcnui" element={<Fiturshadcnui/>} />
          <Route path="/hooksdemo" element={<HooksDemo/>} />
          <Route path="/messages" element={<Messages/>} />
          <Route path="/reviews" element={<Reviews/>} />
          <Route path="/payments" element={<Payments/>} />
          <Route path="/treatments" element={<Treatments/>} />
          <Route path="/suppliers" element={<Suppliers/>} />
          <Route path="/expenses" element={<Expenses/>} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/retention" element={<Retention />} />
          <Route path="/users" element={<UserManagement />} /> 
          <Route path="/usermanagement" element={<UserManagement />} /> 

          {/* Halaman Error */}
          <Route path="/400" element={<ErrorPage errorCode="400" title={<>Oops! <br /> Bad Request!</>} />} />
          <Route path="/401" element={<ErrorPage errorCode="401" title={<>Hold Up! <br /> Unauthorized!</>} />} />
          <Route path="/403" element={<ErrorPage errorCode="403" title={<>Stop! <br /> Access Denied!</>} />} />
          <Route path="/404" element={<ErrorPage errorCode="404" title={<>Go Home, <br /> You're Drunk!</>} />} />
          
          {/* Tangkap semua URL yang tidak terdaftar (Wildcard) */}
          <Route path="*" element={<ErrorPage errorCode="404" title={<>Go Home, <br /> You're Drunk!</>} />} />
        </Route>

      </Routes>
    </Suspense>
  );
}

export default App;