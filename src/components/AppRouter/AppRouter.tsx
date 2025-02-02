import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router';
import { appRouteType, routeConfig } from '../../routeConfig.tsx';
import { RequireAuth } from './RequireAuth.tsx';
import { PageLoader } from '../PageLoader/PageLoader.tsx';

export const AppRouter = memo(() => {
    const renderWithWrapper = useCallback((route: appRouteType) => {
        const element = <div className="page-wrapper">{route.element}</div>;
        return (
            <Route
                key={route.path}
                path={route.path}
                element={<RequireAuth authTargets={route.targets}>{element}</RequireAuth>}
            />
        );
    }, []);

    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {routeConfig.map(renderWithWrapper)}
            </Routes>
        </Suspense>
    );
});
