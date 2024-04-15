import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../component/Login/Login';
import Register from '../component/Register/Register'
import Home from '../component/Home/Home'
import PrivateRoute from './PrivateRoute';
import LocalRoutes from './LocalRoutes';
import Otp from '../component/OTP/Otp';
import PhoneBook from '../component/PhoneBook/PhoneBook';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='login' element={<LocalRoutes component={<Login />} />} />
            <Route path='register' element={<LocalRoutes component={<Register />} />} />

            <Route path='/otp/:email' element={<Otp />} />
            <Route path='/' element={<PrivateRoute component={<Home />} />} />
            <Route path='/phonebook' element={<PrivateRoute component={<PhoneBook />} />} />


            <Route path="*" element={<>404 not found</>} />
        </Routes>
    );
};

export default AppRoutes;