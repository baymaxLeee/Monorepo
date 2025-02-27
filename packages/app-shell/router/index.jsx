import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router';

const lazyLoad = (loader) => {
    const LazyComponent = lazy(loader);
    console.log(LazyComponent)
    return (
        <Suspense fallback={<div>Loading</div>}>
            <LazyComponent />
        </Suspense>
    )
}

const routes = [
    {
        path: '/',
        element: lazyLoad(() => import('../src/pages')),
        children: [
            {
                path: 'home',
                element: lazyLoad(() => import('app_home/App')),
            },
            {
                path: 'dashboard',
                element: lazyLoad(() => import('app_dashboard/App')),
            },
        ],
    }
];

export const router = createBrowserRouter(routes, { basename: '/' });