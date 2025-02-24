import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import cls from './ArtistAlbumsPage.module.css';
import { Text, TextMode } from '../../ui/Text/Text.tsx';
import { AlbumsList } from '../../components/AlbumsList/AlbumsList.tsx';
import { AppRoutes } from '../../routeConfig.tsx';
import { classNames } from '../../utils/classNames.ts';
import { Album } from '../../models/Album.ts';
import { useFetching } from '../../utils/useFetching.ts';
import { ErrorPage } from '../ErrorPage/ErrorPage.tsx';
import { PageLoader } from '../../components/PageLoader/PageLoader.tsx';
import AlbumService from '../../services/AlbumService.ts';
import { ListTemplate } from '../../components/ListTemplate/ListTemplate.tsx';

interface ArtistAlbumsPageProps {
    className?: string
}

export const ArtistAlbumsPage = memo(({ className }: ArtistAlbumsPageProps) => {
    const { id: artistId } = useParams();

    const [albums, setAlbums] = useState<Album[] | undefined>();
    const [fetchAlbums, albumsIsLoading, albumsError] = useFetching(async (artistId, params) => {
        const albums = await AlbumService.getAlbumsByArtistId(artistId, params);
        setAlbums(albums);
    });

    useEffect(() => {
        if (artistId) {
            fetchAlbums(artistId, { page: 1, limit: 10 });
        }
    }, [artistId]);

    if (albumsError) return <ErrorPage text={albumsError} />;
    if (!albums || albumsIsLoading) return <PageLoader />;
    return (
        <div className={classNames(cls.ArtistAlbumsPage, {}, [className])}>
            <ListTemplate title="Albums">
                <AlbumsList
                    albums={albums}
                    linkFunc={AppRoutes.getAlbumWithTracks}
                    // actions={[[<DeleteIcon />, deleteTrackHandler]]}
                />
            </ListTemplate>
        </div>
    );
});
