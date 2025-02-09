import { AppRoutes } from '../../routeConfig.tsx';
import { useAppSelector } from '../../store/store.ts';
import { getAuthTarget } from '../../models/auth/selectors/getAuthTarget.ts';
import { AppLink, AppLinkMode } from '../../ui/AppLink/AppLink.tsx';
import { TargetTypes } from '../../models/auth/authSchema.ts';

export const RequireAuth = ({ children, authTargets }: { children: JSX.Element, authTargets: TargetTypes[] }) => {
    const authTarget = useAppSelector(getAuthTarget);
    if (!authTargets.includes(authTarget)) {
        return (
            <div>
                <br />
                <div>you don`t have perm to visit this page</div>
                <br />
                <AppLink mode={AppLinkMode.BUTTON} to={AppRoutes.MAIN}>To main page</AppLink>
            </div>
        );
    }
    return children;
};
