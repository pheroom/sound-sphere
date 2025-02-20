import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router';
import cls from './ArtistProfilePage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { AppRoutes } from '../../routeConfig.tsx';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { Button, ButtonTheme } from '../../ui/Button/Button.tsx';
import { authLogout } from '../../models/auth/services/authLogout.ts';
import { AppLink, AppLinkMode, AppLinkTheme } from '../../ui/AppLink/AppLink.tsx';
import { getArtistAuthData } from '../../models/artist/selectors/getArtistAuthData.ts';
import { ArtistCard, ArtistCardSize } from '../../components/ArtistCard/ArtistCard.tsx';
import { fetchCreatedAlbumsList } from '../../models/artist/services/fetchCreatedAlbumsList.ts';
import { getArtistCreatedAlbums } from '../../models/artist/selectors/getArtistCreatedAlbums.ts';
import { AlbumsList } from '../../components/AlbumsList/AlbumsList.tsx';
import DeleteIcon from '../../assets/icons/delete.svg?react';
import { useFetching } from '../../utils/useFetching.ts';
import AlbumService from '../../services/AlbumService.ts';
import { PageLoader } from '../../components/PageLoader/PageLoader.tsx';
import { artistActions } from '../../models/artist/artistSlice.ts';
import { Text, TextMode } from '../../ui/Text/Text.tsx';

export const ArtistProfilePage = memo(() => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [deleteAlbum, deleteAlbumIsLoading, deleteAlbumError] = useFetching(AlbumService.deleteAlbum);

    const artist = useAppSelector(getArtistAuthData);
    const albums = useAppSelector(getArtistCreatedAlbums);

    useEffect(() => {
        dispatch(fetchCreatedAlbumsList({}));
    }, [dispatch]);

    const logoutClick = async () => {
        const res = await dispatch(authLogout());
        if (res.meta.requestStatus === 'fulfilled') {
            navigate(AppRoutes.SIGN_IN);
        }
    };

    const deleteTrackHandler = async (albumId: number) => {
        if (!albumId) return;
        await deleteAlbum(albumId);
        const newAlbums = albums?.filter(({ id: curAlbumId }) => curAlbumId !== albumId) || [];
        dispatch(artistActions.setCreatedAlbums(newAlbums));
    };

    if (!artist) return <PageLoader />;
    return (
        <div className={classNames(cls.ArtistProfilePage, {}, [])}>
            <div className={cls.header}>
                <ArtistCard artist={artist} size={ArtistCardSize.L} className={cls.userCard} />
                <div className={cls.actions}>
                    <Button onClick={logoutClick} theme={ButtonTheme.NEGATIVE}>Logout</Button>
                    <AppLink mode={AppLinkMode.BUTTON} theme={AppLinkTheme.POSITIVE} to={AppRoutes.ARTIST_EDIT_PROFILE}>
                        Edit Profile
                    </AppLink>
                </div>
            </div>
            <Text mode={TextMode.TITLE} className={cls.title}>Albums</Text>
            <Text mode={TextMode.ERROR}>{deleteAlbumError}</Text>
            <AlbumsList
                albums={albums}
                linkFunc={(id) => `${AppRoutes.ARTIST_EDIT_ALBUM}/${id}`}
                actions={[[<DeleteIcon />, deleteTrackHandler]]}
            />
        </div>
    );
});
