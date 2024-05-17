import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../component/Login/Login';
import Register from '../component/Register/Register'
import Home from '../component/Home/Home'
import PrivateRoute from './PrivateRoute';
import LocalRoutes from './LocalRoutes';
import Otp from '../component/OTP/Otp';
import PhoneBook from '../component/PhoneBook/PhoneBook';
import PrivateAdminRoute from './PrivateAdminRoute';
import Dashboard from '../component/admin/DashBoard/Dashboard';
import AdminLogin from '../component/admin/Login/AdminLogin';
import SelectUser from '../component/admin/SelectUser/SelectUser';

const AppRoutes = (props) => {
    const { user, setuser } = props;

    return (
        <Routes>
            <Route path='login' element={<LocalRoutes component={<Login />} />} />
            <Route path='register' element={<LocalRoutes component={<Register />} />} />

            <Route path='/otp/:email' element={<Otp />} />
            <Route path='/' element={<PrivateRoute component={<Home
                user={user}
                setuser={setuser}
            />} />} />
            <Route path='/phonebook' element={<PrivateRoute component={<PhoneBook
                user={user}
                setuser={setuser}
            />} />} />

            <Route path='/admin/login' element={<AdminLogin />} />
            <Route path='/admin' element={<PrivateAdminRoute component={<Dashboard />} />} />
            <Route path="/admin/selectUser/:id" element={<SelectUser />} />
            <Route path="*" element={<>404 not found</>} />
        </Routes>
    );
};

export default AppRoutes;