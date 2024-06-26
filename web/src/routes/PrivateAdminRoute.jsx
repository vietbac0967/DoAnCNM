import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fechUserToken } from '../redux/UserSlice';
import Loading from '../loading/Loading';
import { Navigate, Route, Routes } from 'react-router-dom';
function PrivateAdminRoute(props) {
    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess);

    console.log(dataredux)

    useEffect(() => {
        if (window.location.pathname !== '/admin/login')
            dispatch(fechUserToken())
    }, [])

    if (dataredux.isLoading === true) {
        return (
            <Loading />
        )
    } else {
        if (dataredux && dataredux.isAuthenticated === true) {
            return (
                <Routes>
                    <Route path="/" element={props.component} />
                </Routes>
            );
        }
        else {
            return <Navigate to="/admin/login" replace />
        }
    }
}

export default PrivateAdminRoute