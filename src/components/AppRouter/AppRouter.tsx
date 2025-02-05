import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router';
import { appRouteType, routeConfig } from '../../routeConfig.tsx';
import { RequireAuth } from './RequireAuth.tsx';
import { PageLoader } from '../PageLoader/PageLoader.tsx';

export const AppRouter = memo(() => {
    const renderWithWrapper = useCallback((route: appRouteType) => {
        return (
            <Route
                key={route.path}
                path={route.path}
                element={(
                    <div className="page-wrapper">
                        <RequireAuth authTargets={route.targets}>{route.element}</RequireAuth>
                    </div>
                )}
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
