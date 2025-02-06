import { memo } from 'react';
import { useNavigate } from 'react-router';
import cls from './ProfilePage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { AppRoutes } from '../../routeConfig.tsx';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { Button, ButtonTheme } from '../../ui/Button/Button.tsx';
import { getUserAuthData } from '../../models/user/selectors/getUserAuthData.ts';
import { authLogout } from '../../models/auth/services/authLogout.ts';
import { AppLink, AppLinkMode, AppLinkTheme } from '../../ui/AppLink/AppLink.tsx';
import { UserCard } from '../../components/UserCard/UserCard.tsx';

export const ProfilePage = memo(() => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const user = useAppSelector(getUserAuthData);

    const logoutClick = async () => {
        const res = await dispatch(authLogout());
        if (res.meta.requestStatus === 'fulfilled') {
            navigate(AppRoutes.SIGN_IN);
        }
    };

    if (!user) return <div>user loading...</div>;
    return (
        <div className={classNames(cls.ProfilePage, {}, [])}>
            <div className={cls.header}>
                <UserCard user={user} className={cls.userCard} />
                <div className={cls.actions}>
                    <Button onClick={logoutClick} theme={ButtonTheme.NEGATIVE}>Logout</Button>
                    <AppLink mode={AppLinkMode.BUTTON} theme={AppLinkTheme.POSITIVE} to={AppRoutes.EDIT_PROFILE}>
                        Edit Profile
                    </AppLink>
                </div>
            </div>
        </div>
    );
});
