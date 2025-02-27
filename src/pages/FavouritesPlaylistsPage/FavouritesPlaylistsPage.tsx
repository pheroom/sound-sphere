import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import cls from './FavouritesPlaylistsPage.module.css';
import { AlbumsList } from '../../components/AlbumsList/AlbumsList.tsx';
import { AppRoutes } from '../../routeConfig.tsx';
import { ListTemplate } from '../../components/ListTemplate/ListTemplate.tsx';
import { Album } from '../../models/Album.ts';
import { useFetching } from '../../utils/useFetching.ts';
import AlbumService from '../../services/AlbumService.ts';
import { Playlist } from '../../models/Playlist.ts';
import PlaylistService from '../../services/PlaylistService.ts';
import { PlaylistsList } from '../../components/PlaylistsList/PlaylistsList.tsx';
import { classNames } from '../../utils/classNames.ts';
import { ErrorPage } from '../ErrorPage/ErrorPage.tsx';

interface FavouritesPlaylistsPageProps {
    className?: string
}

export const FavouritesPlaylistsPage = memo(({ className }: FavouritesPlaylistsPageProps) => {
    const { id: userId } = useParams();

    const [playlists, setPlaylists] = useState<Playlist[] | undefined>();
    const [fetchPlaylists, playlistsIsLoading, playlistsError] = useFetching(async (userId, params) => {
        const playlists = await PlaylistService.getFavouritesPlaylists(userId, params);
        setPlaylists(playlists);
    });

    useEffect(() => {
        if (userId) {
            fetchPlaylists(+userId, { page: 1, limit: 10, query: '' });
        }
    }, [userId]);

    if (playlistsError) return <ErrorPage text={playlistsError} />;
    return (
        <div className={classNames(cls.FavouritesPlaylistsPage, {}, [className])}>
            <ListTemplate title="Favourites Albums">
                <PlaylistsList
                    showFavActions
                    linkFunc={AppRoutes.getPlaylist}
                    playlists={playlists}
                    isLoading={playlistsIsLoading}
                />
            </ListTemplate>
        </div>
    );
});
