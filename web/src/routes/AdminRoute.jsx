import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from '../component/admin/Login/AdminLogin'
import { Dashboard } from '@mui/icons-material'
import PrivateAdminRoute from './PrivateAdminRoute'

function AdminRoute() {
    return (
        <Routes>
            {/* <Route path='/admin/login' element={<AdminLogin />} /> */}
            <Route path='/admin/' element={<PrivateAdminRoute component={<Dashboard />} />} />
            {/* <Route path="/admin/selectUser/:id" element={<SelectUser />} /> */}
            {/* <Route path='/admin/*' element={<>404 not found</>} /> */}
        </Routes>
    )
}

export default AdminRoute