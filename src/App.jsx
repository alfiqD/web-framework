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

const Dashboard = React.lazy(() => import("./pages/Dashboard"))
const Orders = React.lazy(() => import("./pages/Orders"))
const Customers = React.lazy(() => import("./pages/Customers"))
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"))
const MainLayout = React.lazy(() => import("./layouts/MainLayout"))
const Login = React.lazy(() => import("./pages/auth/Login"))
const Register = React.lazy(() => import("./pages/auth/Register"))
const Forgot = React.lazy(() => import("./pages/auth/Forgot"))
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"))

function App() {
  return (
<Suspense fallback={<Loading />}>
    <Routes>
      {/* --- ROUTES DENGAN LAYOUT --- */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />

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