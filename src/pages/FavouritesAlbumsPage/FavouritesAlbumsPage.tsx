import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import cls from './FavouritesAlbumsPage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { ListTemplate } from '../../components/ListTemplate/ListTemplate.tsx';
import { Album } from '../../models/Album.ts';
import { useFetching } from '../../utils/useFetching.ts';
import AlbumService from '../../services/AlbumService.ts';
import { AppRoutes } from '../../routeConfig.tsx';
import { AlbumsList } from '../../components/AlbumsList/AlbumsList.tsx';

interface FavouritesAlbumsPageProps {
    className?: string
}

export const FavouritesAlbumsPage = memo(({ className }: FavouritesAlbumsPageProps) => {
    const { id: userId } = useParams();
    const [albums, setAlbums] = useState<Album[] | undefined>();
    const [fetchAlbums, albumsIsLoading, albumsError] = useFetching(async (id, params) => {
        const albums = await AlbumService.getUserFavouritesAlbums(id, params);
        setAlbums(albums);
    });

    useEffect(() => {
        if (userId) {
            fetchAlbums(+userId, { page: 1, limit: 10 });
        }
    }, [userId]);

    return (
        <div className={classNames(cls.FavouritesAlbumsPage, {}, [className])}>
            <ListTemplate title="Favourites Albums">
                <AlbumsList
                    showFavActions
                    linkFunc={AppRoutes.getAlbumWithTracks}
                    albums={albums}
                />
            </ListTemplate>
        </div>
    );
});
