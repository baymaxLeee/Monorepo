import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import { Spin } from 'antd';

const lazyLoad = (loader) => {
    const LazyComponent = lazy(loader);

    return (
        <Suspense fallback={<div className='app-container'><Spin size="large" /> </div>}>
            <LazyComponent />
        </Suspense>
    )
}

const routes = [
    {
        path: '/',
        element: <Navigate to="/login" />,
        children: [],
    },
    {
        path: '/home',
        element: lazyLoad(() => import('@/pages/layout')),
    },
    {
        path: '/login',
        element: lazyLoad(() => import('@/pages/login')),
    },
    {
        path: '/register',
        element: lazyLoad(() => import('@/pages/register')),
    },
];

export const router = createBrowserRouter(routes, { basename: '/' });