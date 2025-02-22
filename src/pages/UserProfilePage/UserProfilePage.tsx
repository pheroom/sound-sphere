import { memo } from 'react';
import { useNavigate } from 'react-router';
import cls from './UserProfilePage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { AppRoutes } from '../../routeConfig.tsx';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { Button, ButtonTheme } from '../../ui/Button/Button.tsx';
import { getUserAuthData } from '../../models/user/selectors/getUserAuthData.ts';
import { authLogout } from '../../models/auth/services/authLogout.ts';
import { AppLink, AppLinkMode, AppLinkTheme } from '../../ui/AppLink/AppLink.tsx';
import { UserCard, UserCardSize } from '../../components/UserCard/UserCard.tsx';
import { PageLoader } from '../../components/PageLoader/PageLoader.tsx';

export const UserProfilePage = memo(() => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const user = useAppSelector(getUserAuthData);

    const logoutClick = async () => {
        const res = await dispatch(authLogout());
        if (res.meta.requestStatus === 'fulfilled') {
            navigate(AppRoutes.SIGN_IN);
        }
    };

    if (!user) return <PageLoader />;
    return (
        <div className={classNames(cls.ProfilePage, {}, [])}>
            <div className={cls.header}>
                <UserCard user={user} size={UserCardSize.L} className={cls.userCard} />
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
