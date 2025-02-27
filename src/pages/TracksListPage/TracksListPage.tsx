import { memo, useEffect, useRef, useState } from 'react';
import cls from './TracksListPage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { Input } from '../../ui/Input/Input.tsx';
import { Button } from '../../ui/Button/Button.tsx';
import { Loader, LoaderSize } from '../../ui/Loader/Loader.tsx';
import { AppRoutes } from '../../routeConfig.tsx';
import { useFetching } from '../../utils/useFetching.ts';
import { Track } from '../../models/Track.ts';
import TrackService from '../../services/TrackService.ts';
import { TracksList } from '../../components/TracksList/TracksList.tsx';
import { useObserver } from '../../utils/useObserver.ts';
import { PageLoader } from '../../components/PageLoader/PageLoader.tsx';
import { ErrorPage } from '../ErrorPage/ErrorPage.tsx';
import { Anchor } from '../../ui/Anchor/Anchor.tsx';

interface TracksListPageProps {
    className?: string
}

export const TracksListPage = memo(({ className }: TracksListPageProps) => {
    const [prevSearchQuery, setPrevSearchQuery] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [canLoad, setCanLoad] = useState(true);
    const [tracks, setTracks] = useState<Track[] | undefined>();
    const [fetchTracks, tracksIsLoading, tracksError] = useFetching(async (params) => {
        const tracks = await TrackService.getAllTracks(params);
        if (tracks.length < 10) setCanLoad(false);
        if (searchQuery !== prevSearchQuery) {
            setTracks(tracks);
        } else {
            setTracks((prev) => (prev || []).concat(tracks));
        }
    });

    useEffect(() => {
        fetchTracks({ page: 1, limit: 10, searchQuery }, true);
    }, []);

    useEffect(() => {
        if (page === 1) return;
        fetchTracks({ page, limit: 10, searchQuery });
    }, [page]);

    const lastElementRef = useObserver(canLoad, tracksIsLoading, () => {
        if (tracks === undefined) return;
        setPage(page + 1);
    });

    const searchClick = () => {
        setPage(1);
        setCanLoad(true);
        setTracks(undefined);
        fetchTracks({ page: 1, limit: 10, query: searchQuery }, true);
    };

    if (tracksError) return <ErrorPage text={tracksError} />;
    return (
        <div className={classNames(cls.TracksListPage, {}, [className])}>
            <div className={cls.searchForm}>
                <Input
                    classNameBox={cls.input}
                    placeholder="Search query"
                    value={searchQuery}
                    onChange={(value) => setSearchQuery(value)}
                />
                <Button onClick={searchClick}>Search</Button>
            </div>
            <TracksList
                isLoading={tracksIsLoading}
                showFavActions
                linkFunc={AppRoutes.getTrack}
                tracks={tracks}
            />
            <Anchor ref={lastElementRef} />
        </div>
    );
});
