import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import cls from './UserProfilePage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { AppRoutes } from '../../routeConfig.tsx';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { Button, ButtonTheme } from '../../ui/Button/Button.tsx';
import { getUserAuthData } from '../../store/user/selectors/getUserAuthData.ts';
import { authLogout } from '../../store/auth/services/authLogout.ts';
import { AppLink, AppLinkMode, AppLinkTheme } from '../../ui/AppLink/AppLink.tsx';
import { UserCard, UserCardSize } from '../../components/UserCard/UserCard.tsx';
import { PageLoader } from '../../components/PageLoader/PageLoader.tsx';
import { Track } from '../../models/Track.ts';
import { useFetching } from '../../utils/useFetching.ts';
import TrackService from '../../services/TrackService.ts';
import { TracksList } from '../../components/TracksList/TracksList.tsx';
import { ListTemplate } from '../../components/ListTemplate/ListTemplate.tsx';
import NextSquareIcon from '../../assets/icons/next-square.svg?react';

export const UserProfilePage = memo(() => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const user = useAppSelector(getUserAuthData);

    const [favouritesTracks, setFavouritesTracks] = useState<Track[] | undefined>();
    const [fetchFavouritesTracks] = useFetching(async () => {
        if (!user) return;
        const tracks = await TrackService.getUserFavouritesTracks(user.id, { page: 1, limit: 10 });
        setFavouritesTracks(tracks);
    });

    useEffect(() => {
        fetchFavouritesTracks();
    }, []);

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
            <div className={cls.nav}>
                <AppLink to={AppRoutes.getUserFavouritesAlbums(user.id)}>
                    Favourites Albums
                    <NextSquareIcon />
                </AppLink>
                <AppLink to={AppRoutes.getUserFavouritesPlaylists(user.id)}>
                    Favourites Playlists
                    <NextSquareIcon />
                </AppLink>
                <AppLink to={AppRoutes.getUserCreatedPlaylists(user.id)}>
                    Created Playlists
                    <NextSquareIcon />
                </AppLink>
            </div>
            <ListTemplate title="Favourites Tracks">
                <TracksList showFavActions tracks={favouritesTracks} />
            </ListTemplate>
        </div>
    );
});
