import { AppRoutes } from '../../routeConfig.tsx';
import { useAppSelector } from '../../store/store.ts';
import { getAuthTarget } from '../../models/auth/selectors/getAuthTarget.ts';
import { AppLink, AppLinkMode } from '../../ui/AppLink/AppLink.tsx';
import { TargetTypes } from '../../models/auth/authSchema.ts';
import cls from './RequireAuth.module.css';

export const RequireAuth = ({ children, authTargets }: { children: JSX.Element, authTargets: TargetTypes[] }) => {
    const authTarget = useAppSelector(getAuthTarget);
    if (!authTargets.includes(authTarget)) {
        return (
            <div className={cls.RequireAuth}>
                <h1>You don`t have access rights to this page.</h1>
                <AppLink to={AppRoutes.MAIN} mode={AppLinkMode.BUTTON}>To main page</AppLink>
            </div>
        );
    }
    return children;
};
