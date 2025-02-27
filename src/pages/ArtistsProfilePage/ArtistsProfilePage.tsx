import { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import cls from './ArtistsProfilePage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { ArtistCard, ArtistCardSize } from '../../components/ArtistCard/ArtistCard.tsx';
import { PageLoader } from '../../components/PageLoader/PageLoader.tsx';
import { ErrorPage } from '../ErrorPage/ErrorPage.tsx';
import { Album, AlbumWithTracks } from '../../models/Album.ts';
import { useFetching } from '../../utils/useFetching.ts';
import AlbumService from '../../services/AlbumService.ts';
import { Text, TextMode } from '../../ui/Text/Text.tsx';
import { AppRoutes } from '../../routeConfig.tsx';
import AddIcon from '../../assets/icons/add.svg?react';
import { Artist } from '../../models/Artist.ts';
import ArtistService from '../../services/ArtistService.ts';
import { AlbumsList } from '../../components/AlbumsList/AlbumsList.tsx';
import { AppLink, AppLinkMode } from '../../ui/AppLink/AppLink.tsx';
import { ListTemplate } from '../../components/ListTemplate/ListTemplate.tsx';

export const ArtistsProfilePage = memo(() => {
    const navigate = useNavigate();
    const { id: artistId } = useParams();
    const [artist, setArtist] = useState<Artist | undefined>();
    const [fetchArtist, artistIsLoading, artistError] = useFetching(async (id) => {
        const artist = await ArtistService.getArtist(id);
        setArtist(artist);
    });
    const [albumsData, setAlbumsData] = useState<Album[]>([]);
    const [fetchAlbums, albumsIsLoading, albumsError] = useFetching(async (id) => {
        const albums = await AlbumService.getAlbumsByArtistId(id, { page: 1, limit: 5 });
        setAlbumsData(albums);
    });

    useEffect(() => {
        if (artistId) {
            fetchArtist(+artistId);
            fetchAlbums(+artistId);
        }
    }, [artistId]);

    if (artistError) return <ErrorPage text={artistError} />;
    if (!artistId || !artist || artistIsLoading) return <PageLoader />;
    return (
        <div className={classNames(cls.ArtistsProfilePage, {}, [])}>
            <div className={cls.header}>
                <ArtistCard artist={artist} size={ArtistCardSize.L} className={cls.userCard} />
            </div>
            <ListTemplate
                title="Albums"
                linkPath={AppRoutes.getArtistAlbums(+artistId)}
                linkText="Show all albums"
                error={albumsError}
            >
                <AlbumsList
                    showFavActions
                    albums={albumsData}
                    linkFunc={AppRoutes.getAlbumWithTracks}
                />
            </ListTemplate>
        </div>
    );
});
