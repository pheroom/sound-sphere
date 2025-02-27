import { memo, useEffect, useState } from 'react';
import cls from './PlaylistsListPage.module.css';
import { Input } from '../../ui/Input/Input.tsx';
import { Button } from '../../ui/Button/Button.tsx';
import { Text, TextMode } from '../../ui/Text/Text.tsx';
import { Loader } from '../../ui/Loader/Loader.tsx';
import { AlbumsList } from '../../components/AlbumsList/AlbumsList.tsx';
import { AppRoutes } from '../../routeConfig.tsx';
import { PlaylistsList } from '../../components/PlaylistsList/PlaylistsList.tsx';
import { Album } from '../../models/Album.ts';
import { useFetching } from '../../utils/useFetching.ts';
import AlbumService from '../../services/AlbumService.ts';
import { Playlist } from '../../models/Playlist.ts';
import PlaylistService from '../../services/PlaylistService.ts';
import { classNames } from '../../utils/classNames.ts';
import { ErrorPage } from '../ErrorPage/ErrorPage.tsx';

interface PlaylistsListPageProps {
    className?: string
}

export const PlaylistsListPage = memo(({ className }: PlaylistsListPageProps) => {
    const [searchQuery, setSearchQuery] = useState('');

    const [playlists, setPlaylists] = useState<Playlist[] | undefined>();
    const [fetchPlaylists, playlistsIsLoading, playlistsError] = useFetching(async (params) => {
        const playlists = await PlaylistService.getAllPlaylists(params);
        setPlaylists(playlists);
    });

    useEffect(() => {
        fetchPlaylists({ page: 1, limit: 10, query: '' });
    }, []);

    const searchClick = () => fetchPlaylists({ page: 1, limit: 10, query: searchQuery });

    if (playlistsError) return <ErrorPage text={playlistsError} />;
    return (
        <div className={classNames(cls.PlaylistsListPage, {}, [className])}>
            <div className={cls.searchForm}>
                <Input
                    classNameBox={cls.input}
                    placeholder="Search query"
                    value={searchQuery}
                    onChange={(value) => setSearchQuery(value)}
                />
                <Button onClick={searchClick}>Search</Button>
            </div>
            <PlaylistsList
                showFavActions
                linkFunc={AppRoutes.getPlaylist}
                playlists={playlists}
                isLoading={playlistsIsLoading}
            />
        </div>
    );
});
