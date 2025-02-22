import { memo, useEffect, useState } from 'react';
import cls from './ArtistsListPage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { getArtistsListData } from '../../models/artistsList/selectors/getArtistsListData.ts';
import { fetchArtistsBySearch } from '../../models/artistsList/services/fetchArtistsBySearch.ts';
import { ArtistCard } from '../../components/ArtistCard/ArtistCard.tsx';
import { AppLink } from '../../ui/AppLink/AppLink.tsx';
import { AppRoutes } from '../../routeConfig.tsx';
import { Input } from '../../ui/Input/Input.tsx';
import { Button } from '../../ui/Button/Button.tsx';

interface ArtistsListPageProps {
    className?: string
}

export const ArtistsListPage = memo(({ className }: ArtistsListPageProps) => {
    const dispatch = useAppDispatch();
    const artistsList = useAppSelector(getArtistsListData);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(fetchArtistsBySearch({ page: 1, limit: 10, query: '' }));
    }, [dispatch]);

    const fetchArtists = () => dispatch(fetchArtistsBySearch({ page: 1, limit: 10, query: searchQuery }));

    return (
        <div className={classNames(cls.ArtistsListPage, {}, [className])}>
            <div className={cls.searchForm}>
                <Input
                    classNameBox={cls.input}
                    fullWidth
                    placeholder="Search query"
                    value={searchQuery}
                    onChange={(value) => setSearchQuery(value)}
                />
                <Button onClick={fetchArtists}>Search</Button>
            </div>
            <div className={cls.artistsList}>
                {artistsList && artistsList.map((artist) => (
                    <AppLink className={cls.link} to={`${AppRoutes.ARTISTS}/${artist.id}`} key={artist.id}>
                        <ArtistCard artist={artist} />
                    </AppLink>
                ))}
            </div>
        </div>
    );
});
