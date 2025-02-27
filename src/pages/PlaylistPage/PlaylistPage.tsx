import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import cls from './PlaylistPage.module.css';
import { Picture } from '../../ui/Picture/Picture.tsx';
import { Text, TextMode } from '../../ui/Text/Text.tsx';
import { ArtistsLinks } from '../../components/ArtistsLinks/ArtistsLinks.tsx';
import { ListTemplate } from '../../components/ListTemplate/ListTemplate.tsx';
import { TracksList } from '../../components/TracksList/TracksList.tsx';
import { AppRoutes } from '../../routeConfig.tsx';
import { classNames } from '../../utils/classNames.ts';
import { AlbumWithTracks } from '../../models/Album.ts';
import { useFetching } from '../../utils/useFetching.ts';
import AlbumService from '../../services/AlbumService.ts';
import { ErrorPage } from '../ErrorPage/ErrorPage.tsx';
import { PageLoader } from '../../components/PageLoader/PageLoader.tsx';
import { Playlist, PlaylistWithTracks } from '../../models/Playlist.ts';
import PlaylistService from '../../services/PlaylistService.ts';
import { AppLink } from '../../ui/AppLink/AppLink.tsx';

interface PlaylistPageProps {
    className?: string
}

export const PlaylistPage = memo(({ className }: PlaylistPageProps) => {
    const { id: playlistId } = useParams();

    const [playlist, setPlaylist] = useState<PlaylistWithTracks | undefined>();
    const [fetchPlaylist, playlistIsLoading, playlistError] = useFetching(async (id, params) => {
        const playlist = await PlaylistService.getPlaylistWithTracks(id);
        setPlaylist(playlist);
    });

    useEffect(() => {
        if (playlistId) {
            fetchPlaylist(+playlistId);
        }
    }, [playlistId]);

    if (playlistError) return <ErrorPage text={playlistError} />;
    if (playlistIsLoading || !playlist) return <PageLoader />;
    return (
        <div className={classNames(cls.PlaylistPage, {}, [className])}>
            <div className={cls.playlistCard}>
                <Picture imgSrc={playlist.pictureURL} size={80} />
                <div className={cls.playlistCardInfo}>
                    <Text mode={TextMode.TITLE}>{playlist.name}</Text>
                    <AppLink to={AppRoutes.getUsersProfile(playlist.userId)}>
                        {playlist.user?.firstname}
                        {' '}
                        {playlist.user?.lastname}
                    </AppLink>
                </div>
            </div>
            <ListTemplate
                title="Tracks"
            >
                <TracksList
                    showFavActions
                    tracks={playlist.tracks}
                    linkFunc={AppRoutes.getTrack}
                />
            </ListTemplate>
        </div>
    );
});
