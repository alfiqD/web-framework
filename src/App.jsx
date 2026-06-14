// // import BiodataDiri from "./components/BiodataDiri.jsx";
// import FormSehatInfo from './pertemuan-3/components/FormSehatInfo';

// function App() {
//   // Ganti BiodataDiri jadi FormSehatInfo
//   return (
//     <div >
//       {/* // <BiodataDiri> */}
//        <FormSehatInfo />
//     </div>
//   );
// }

// export default App;

import { Suspense, useState } from 'react'
import './assets/tailwind.css'
import { Route, Routes } from 'react-router-dom';

// import Dashboard from "./pages/Dashboard";
// import Orders from './pages/Orders';
// import Customers from './pages/Customers';
// --- IMPORT HALAMAN ERROR ---
// import ErrorPage from './pages/ErrorPage'; // Satu-satunya yang kita butuhin buat urusan error
// import MainLayout from './layouts/MainLayout';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import Forgot from './pages/auth/Forgot';
// import AuthLayout from './layouts/AuthLayout';
import React from 'react';
import Loading from './components/Loading';
import HooksDemo from './pages/HooksDemo';
import Messages from './pages/Messages';
import Reviews from './pages/Reviews';
import Payments from './pages/Payments';
import Treatments from './pages/Treatments';
import Suppliers from './pages/Suppliers';
import Expenses from './pages/Expenses';
import UserManagement from './pages/UserManagement';


const Dashboard = React.lazy(() => import("./pages/Dashboard"))
const Orders = React.lazy(() => import("./pages/Orders"))
const Customers = React.lazy(() => import("./pages/Customers"))
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"))
const MainLayout = React.lazy(() => import("./layouts/MainLayout"))
const Login = React.lazy(() => import("./pages/auth/Login"))
const Register = React.lazy(() => import("./pages/auth/Register"))
const Forgot = React.lazy(() => import("./pages/auth/Forgot"))
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"))
const JenisMakeup = React.lazy(() => import("./pages/JenisMakeup"))
const MakeupDetail = React.lazy(() => import("./pages/MakeupDetail"))
const Components = React.lazy(() => import("./pages/Components"))
const Fiturshadcnui = React.lazy(() => import("./pages/fiturShadcnui"))
const Hooksdemo = React.lazy(() => import("./pages/HooksDemo"))
const Message = React.lazy(() => import("./pages/Messages"))
const Review = React.lazy(() => import("./pages/Reviews"))
const Payment = React.lazy(() => import("./pages/Payments"))
const Treatment = React.lazy(() => import("./pages/Treatments"))
const Supplier = React.lazy(() => import("./pages/Suppliers"))
const Expense = React.lazy(() => import("./pages/Expenses"))
const Staff = React.lazy(() => import("./pages/Staff"))
const Retention = React.lazy(() => import("./pages/Retention"))
const Usermanagement = React.lazy(() => import("./pages/UserManagement"))

function App() {
  return (
<Suspense fallback={<Loading />}>
    <Routes>
      {/* --- ROUTES DENGAN LAYOUT --- */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
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
        <Route path="/usermanagement" element={<UserManagement />} />

        <Route path="/400" element={<ErrorPage errorCode="400" title={<>Oops! <br /> Bad Request!</>} />} />
        <Route path="/401" element={<ErrorPage errorCode="401" title={<>Hold Up! <br /> Unauthorized!</>} />} />
        <Route path="/403" element={<ErrorPage errorCode="403" title={<>Stop! <br /> Access Denied!</>} />} />
        <Route path="/404" element={<ErrorPage errorCode="404" title={<>Go Home, <br /> You're Drunk!</>} />} />

        {/* Catch-all route */}
        <Route path="*" element={<ErrorPage errorCode="404" title={<>Go Home, <br /> You're Drunk!</>} />} />

      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
      </Route>

    </Routes>
    </Suspense>

  );
}

export default App;