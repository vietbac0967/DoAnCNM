import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fechUserToken } from '../redux/UserSlice';
import Loading from '../loading/Loading';
import { Navigate, Route, Routes } from 'react-router-dom';

const LocalRoutes = (props) => {
    const dispatch = useDispatch();

    const dataredux = useSelector((state) => state.userisaccess);

    useEffect(() => {
        if (window.location.pathname !== '/login' || window.location.pathname !== '/register')
            dispatch(fechUserToken())
    }, [])

    if (dataredux.isLoading === true) {
        return (
            <Loading />
        )
    } else {
        if (dataredux && dataredux.isAuthenticated === false) {
            return (
                <Routes>
                    <Route path="/" element={props.component} />
                </Routes>
            );
        }
        else {
            return <Navigate to="/" replace />
        }
    }


};

export default LocalRoutes;