import { memo } from 'react';
import { useNavigate } from 'react-router';
import cls from './ProfilePage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { AppRoutes } from '../../routeConfig.tsx';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { Button } from '../../ui/Button/Button.tsx';
import { getUserAuthData } from '../../models/user/selectors/getUserAuthData.ts';
import { authLogout } from '../../models/auth/services/authLogout.ts';
import { AppLink, AppLinkMode, AppLinkTheme } from '../../ui/AppLink/AppLink.tsx';
import { userRegistration } from '../../models/user/services/userRegistration.ts';

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

            {user.avatarURL ? <img src={user.avatarURL} alt="avatarImg" /> : <i>avatar not set</i>}

            <br />
            <span>{user.firstname}</span>
            <br />
            <span>{user.lastname || <i>lastname not set</i>}</span>
            <br />
            <span>{user.username}</span>
            <br />
            <span>{user.description || <i>desc not set</i>}</span>

            <br />
            <br />
            <Button onClick={logoutClick}>Logout</Button>

            <br />
            <AppLink mode={AppLinkMode.BUTTON} theme={AppLinkTheme.POSITIVE} to={AppRoutes.EDIT_PROFILE}>Edit Profile</AppLink>

        </div>
    );
});
