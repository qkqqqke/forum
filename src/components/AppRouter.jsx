import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Loader from './UI/Loader/Loader';
import { publicRoutes, priavteRoutes } from '../router/routes';
import { AuthContext } from '../context';

const AppRouter = () => {
    const { isAuth, isLoading } = useContext(AuthContext)
    console.log(isAuth)
    if (isLoading) {
        return <Loader/>
    } else
    return (
        isAuth ?
            <Routes>
                {priavteRoutes.map((r) => <Route key={r.path} path={r.path} element={r.component} />)}
            </Routes>
            :
            <Routes>
                {publicRoutes.map((r) => <Route key={r.path} path={r.path} element={r.component} />)}
            </Routes>

    );
};

export default AppRouter;