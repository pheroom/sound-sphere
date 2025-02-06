import { memo } from 'react';
import { useNavigate } from 'react-router';
import cls from './ArtistProfilePage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { AppRoutes } from '../../routeConfig.tsx';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { Button, ButtonTheme } from '../../ui/Button/Button.tsx';
import { authLogout } from '../../models/auth/services/authLogout.ts';
import { AppLink, AppLinkMode, AppLinkTheme } from '../../ui/AppLink/AppLink.tsx';
import { getArtistAuthData } from '../../models/artist/selectors/getArtistAuthData.ts';
import { ArtistCard } from '../../components/ArtistCard/ArtistCard.tsx';

export const ArtistProfilePage = memo(() => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const artist = useAppSelector(getArtistAuthData);

    const logoutClick = async () => {
        const res = await dispatch(authLogout());
        if (res.meta.requestStatus === 'fulfilled') {
            navigate(AppRoutes.SIGN_IN);
        }
    };

    if (!artist) return <div>artist loading...</div>;
    return (
        <div className={classNames(cls.ArtistProfilePage, {}, [])}>
            <div className={cls.header}>
                <ArtistCard artist={artist} className={cls.userCard} />
                <div className={cls.actions}>
                    <Button onClick={logoutClick} theme={ButtonTheme.NEGATIVE}>Logout</Button>
                    <AppLink mode={AppLinkMode.BUTTON} theme={AppLinkTheme.POSITIVE} to={AppRoutes.ARTIST_EDIT_PROFILE}>
                        Edit Profile
                    </AppLink>
                </div>
            </div>
        </div>
    );
});
