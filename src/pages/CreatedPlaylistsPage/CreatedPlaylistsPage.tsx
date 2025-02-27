import { memo, useEffect, useState } from 'react';
import cls from './CreatedPlaylistsPage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { ListTemplate } from '../../components/ListTemplate/ListTemplate.tsx';
import { PlaylistsList } from '../../components/PlaylistsList/PlaylistsList.tsx';
import { AppRoutes } from '../../routeConfig.tsx';
import { useAppSelector } from '../../store/store.ts';
import { getUserAuthData } from '../../store/user/selectors/getUserAuthData.ts';
import { ErrorPage } from '../ErrorPage/ErrorPage.tsx';
import { Playlist } from '../../models/Playlist.ts';
import { useFetching } from '../../utils/useFetching.ts';
import PlaylistService from '../../services/PlaylistService.ts';

interface CreatedPlaylistsPageProps {
    className?: string
}

export const CreatedPlaylistsPage = memo(({ className }: CreatedPlaylistsPageProps) => {
    const user = useAppSelector(getUserAuthData);

    const [playlists, setPlaylists] = useState<Playlist[] | undefined>();
    const [fetchPlaylists, playlistsIsLoading, playlistsError] = useFetching(async (userId, params) => {
        const playlists = await PlaylistService.getCreatedPlaylists(userId, params);
        setPlaylists(playlists);
    });

    useEffect(() => {
        if (user) {
            fetchPlaylists(user.id, { page: 1, limit: 10 });
        }
    }, []);

    if (!user) return <ErrorPage text="Login please." />;
    return (
        <div className={classNames(cls.CreatedPlaylistsPage, {}, [className])}>
            <ListTemplate
                title="Created Playlists"
                linkPath={AppRoutes.getCreatePlaylist()}
                linkText="Add new playlist"
            >
                <PlaylistsList
                    linkFunc={AppRoutes.getEditPlaylist}
                    playlists={playlists}
                    showFavActions
                    isLoading={playlistsIsLoading}
                />
            </ListTemplate>
        </div>
    );
});
