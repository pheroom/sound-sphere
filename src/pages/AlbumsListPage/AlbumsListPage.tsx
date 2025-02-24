import { memo, useEffect, useState } from 'react';
import cls from './AlbumsListPage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { Input } from '../../ui/Input/Input.tsx';
import { Button } from '../../ui/Button/Button.tsx';
import { Text, TextMode } from '../../ui/Text/Text.tsx';
import { Loader } from '../../ui/Loader/Loader.tsx';
import { TracksList } from '../../components/TracksList/TracksList.tsx';
import { AppRoutes } from '../../routeConfig.tsx';
import { useFetching } from '../../utils/useFetching.ts';
import { Album } from '../../models/Album.ts';
import AlbumService from '../../services/AlbumService.ts';
import { AlbumsList } from '../../components/AlbumsList/AlbumsList.tsx';

interface AlbumsListPageProps {
    className?: string
}

export const AlbumsListPage = memo(({ className }: AlbumsListPageProps) => {
    const [searchQuery, setSearchQuery] = useState('');

    const [albums, setAlbums] = useState<Album[] | undefined>();
    const [fetchAlbums, albumsIsLoading, albumsError] = useFetching(async (params) => {
        const tracks = await AlbumService.getAllAlbums(params);
        setAlbums(tracks);
    });

    useEffect(() => {
        fetchAlbums({ page: 1, limit: 10, query: '' });
    }, []);

    const searchClick = () => fetchAlbums({ page: 1, limit: 10, query: searchQuery });

    return (
        <div className={classNames(cls.AlbumsListPage, {}, [className])}>
            <div className={cls.searchForm}>
                <Input
                    classNameBox={cls.input}
                    placeholder="Search query"
                    value={searchQuery}
                    onChange={(value) => setSearchQuery(value)}
                />
                <Button onClick={searchClick}>Search</Button>
            </div>
            <Text mode={TextMode.ERROR}>{albumsError}</Text>
            {albumsIsLoading && <Loader />}
            <AlbumsList
                linkFunc={AppRoutes.getAlbumWithTracks}
                albums={albums}
            />
        </div>
    );
});
