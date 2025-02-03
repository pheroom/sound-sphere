import { Navigate, useLocation } from 'react-router';
import { AppRoutes, TargetTypes } from '../../routeConfig.tsx';
// import { useSelector } from 'react-redux';
// import { getUserAuthData } from 'entities/User';

export const RequireAuth = ({ children, authTargets }: { children: JSX.Element, authTargets: TargetTypes[] }) => {
    // const auth = useSelector(getUserAuthData);
    const auth = false;
    // const location = useLocation();
    // if (!auth) {
    //     return <Navigate to={AppRoutes.MAIN} state={{ from: location }} replace />;
    // }
    return children;
};
