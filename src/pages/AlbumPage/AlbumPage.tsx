import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AppRoutes } from '../../routeConfig.tsx';
import { ListTemplate } from '../../components/ListTemplate/ListTemplate.tsx';
import { AlbumWithTracks } from '../../models/Album.ts';
import { useFetching } from '../../utils/useFetching.ts';
import AlbumService from '../../services/AlbumService.ts';
import { PageLoader } from '../../components/PageLoader/PageLoader.tsx';
import { TracksList } from '../../components/TracksList/TracksList.tsx';
import { Picture } from '../../ui/Picture/Picture.tsx';
import { ArtistsLinks } from '../../components/ArtistsLinks/ArtistsLinks.tsx';
import { Text, TextMode } from '../../ui/Text/Text.tsx';
import { ErrorPage } from '../ErrorPage/ErrorPage.tsx';
import cls from './AlbumPage.module.css';

interface AlbumPageProps {
    className?: string
}

export const AlbumPage = memo(({ className }: AlbumPageProps) => {
    const { id: albumId } = useParams();

    const [albumData, setAlbumData] = useState<AlbumWithTracks | undefined>();
    const [fetchAlbum, albumIsLoading, albumError] = useFetching(async (id) => {
        const album = await AlbumService.getAlbumWithTracks(id);
        setAlbumData(album);
    });

    useEffect(() => {
        if (albumId) {
            fetchAlbum(+albumId);
        }
    }, [albumId]);

    if (albumError) return <ErrorPage text={albumError} />;
    if (albumIsLoading || !albumData) return <PageLoader />;
    return (
        <div>
            <div className={cls.albumCard}>
                <Picture imgSrc={albumData.pictureURL} size={80} />
                <div className={cls.albumCardInfo}>
                    <Text mode={TextMode.TITLE}>{albumData.name}</Text>
                    <ArtistsLinks artists={albumData.artists} />
                </div>
            </div>
            <ListTemplate
                title="Tracks"
            >
                <TracksList
                    showFavActions
                    tracks={albumData.tracks}
                    linkFunc={AppRoutes.getTrack}
                />
            </ListTemplate>
        </div>
    );
});
