import { memo, useEffect, useState } from 'react';
import cls from './ArtistsListPage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { ArtistCard } from '../../components/ArtistCard/ArtistCard.tsx';
import { AppLink } from '../../ui/AppLink/AppLink.tsx';
import { AppRoutes } from '../../routeConfig.tsx';
import { Input } from '../../ui/Input/Input.tsx';
import { Button } from '../../ui/Button/Button.tsx';
import { useFetching } from '../../utils/useFetching.ts';
import { Artist } from '../../models/Artist.ts';
import ArtistService from '../../services/ArtistService.ts';
import { Loader } from '../../ui/Loader/Loader.tsx';
import { Text, TextMode } from '../../ui/Text/Text.tsx';
import { ErrorPage } from '../ErrorPage/ErrorPage.tsx';

interface ArtistsListPageProps {
    className?: string
}

export const ArtistsListPage = memo(({ className }: ArtistsListPageProps) => {
    const [searchQuery, setSearchQuery] = useState('');

    const [artists, setArtists] = useState<Artist[] | undefined>();
    const [fetchArtists, artistsIsLoading, artistsError] = useFetching(async (params) => {
        const artists = await ArtistService.getAllArtists(params);
        setArtists(artists);
    });

    useEffect(() => {
        fetchArtists({ page: 1, limit: 10, query: '' });
    }, []);

    const searchClick = () => fetchArtists({ page: 1, limit: 10, query: searchQuery });

    if (artistsError) return <ErrorPage text={artistsError} />;
    return (
        <div className={classNames(cls.ArtistsListPage, {}, [className])}>
            <div className={cls.searchForm}>
                <Input
                    classNameBox={cls.input}
                    placeholder="Search query"
                    value={searchQuery}
                    onChange={(value) => setSearchQuery(value)}
                />
                <Button onClick={searchClick}>Search</Button>
            </div>
            <div className={cls.artistsList}>
                {artistsIsLoading && <Loader />}
                {artists && artists.map((artist) => (
                    <AppLink className={cls.link} to={`${AppRoutes.ARTISTS}/${artist.id}`} key={artist.id}>
                        <ArtistCard artist={artist} />
                    </AppLink>
                ))}
            </div>
        </div>
    );
});
