import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../component/Login/Login';
import Register from '../component/Register/Register'
import Home from '../component/Home/Home'
import PrivateRoute from './PrivateRoute';
import LocalRoutes from './LocalRoutes';
import Otp from '../component/OTP/Otp';
import MessagePage from '../pages/MessagePage/MessagePage';
import GroupPage from '../pages/GroupPage/GroupPage';
import AdminLogin from '../pages/AdminPage/AdminLogin';
import Dashboard from '../scenes/dashboard';
import AllUser from '../scenes/dashboard/AllUser';
import { useMode } from '../theme';
import PrivateAdminRoute from './PrivateAdminRoute';
import UserDetail from '../scenes/dashboard/UserDetail';

const AppRoutes = () => {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

    return (


        <div className="app">
            {/* <Sidebar isSidebar={isSidebar} /> */}
            <main className="content">
                <Routes>
                    <Route path='login' element={<LocalRoutes component={<Login />} />} />
                    <Route path='/admin/login' element={<AdminLogin />} />
                    {/* <Route path='register' element={<LocalRoutes component={<Register />} />} /> */}
                    <Route path='register' element={<Register />} />
                    <Route path='otp' element={<Otp />} />
                    <Route path='message' element={<MessagePage />} />
                    <Route path='group' element={<GroupPage />} />
                    <Route path='/' element={<PrivateRoute component={<Home />} />} />
                    <Route path='/admin' element={<PrivateAdminRoute component={<Dashboard />} />} />
                    <Route path="/admin/userdetail" element={<UserDetail />} />
                    <Route path="/admin/all-user" element={<AllUser />} />

                    <Route path="*" element={<>404 not found</>} />
                </Routes>




            </main>
        </div>

    );
};


export default AppRoutes;