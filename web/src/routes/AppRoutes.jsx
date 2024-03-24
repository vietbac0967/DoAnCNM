import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../component/Login/Login';
import Register from '../component/Register/Register'
import Home from '../component/Home/Home'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='/' element={<Home />} />

            <Route path="*" element={<>404 not found</>} />
        </Routes>
    );
};

export default AppRoutes;