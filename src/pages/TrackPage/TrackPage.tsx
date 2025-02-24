import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import cls from './TrackPage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { useFetching } from '../../utils/useFetching.ts';
import { Track } from '../../models/Track.ts';
import TrackService from '../../services/TrackService.ts';
import { ErrorPage } from '../ErrorPage/ErrorPage.tsx';
import { PageLoader } from '../../components/PageLoader/PageLoader.tsx';
import { Picture, PictureSize } from '../../ui/Picture/Picture.tsx';
import { Text, TextMode } from '../../ui/Text/Text.tsx';
import { ArtistsLinks } from '../../components/ArtistsLinks/ArtistsLinks.tsx';
import PlayIcon from '../../assets/icons/play.svg?react';
import PauseIcon from '../../assets/icons/pause.svg?react';
import { playerActions } from '../../store/player/playerSlice.ts';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { getPlayerData } from '../../store/player/selectors/getPlayerData.ts';
import { getPlayerTrack } from '../../store/player/selectors/getPlayerTrack.ts';
import { Button, ButtonMode } from '../../ui/Button/Button.tsx';

interface TrackPageProps {
    className?: string
}

export const TrackPage = memo(({ className }: TrackPageProps) => {
    const dispatch = useAppDispatch();
    const { isPlaying } = useAppSelector(getPlayerData);
    const currentTrack = useAppSelector(getPlayerTrack);
    const { id: trackId } = useParams();

    const [track, setTrack] = useState<Track | undefined>();
    const [fetchTrack, trackIsLoading, trackError] = useFetching(async (id) => {
        const track = await TrackService.getTrack(id);
        setTrack(track);
    });

    useEffect(() => {
        if (trackId) {
            fetchTrack(+trackId);
        }
    }, [trackId]);

    const clickHandler = () => {
        if (!trackId || !track) return;
        if (currentTrack?.id === +trackId) {
            dispatch(playerActions.setIsPlaying(!isPlaying));
        } else {
            dispatch(playerActions.setQueue({ queue: [track], currentIndex: 0 }));
        }
    };

    if (trackError) return <ErrorPage text={trackError} />;
    if (!trackId || trackIsLoading || !track) return <PageLoader />;
    return (
        <div className={classNames(cls.TrackPage, {}, [className])}>
            <div className={cls.trackCard}>
                <Picture imgSrc={track.pictureURL} size={PictureSize.L} />
                <div className={cls.info}>
                    <Text mode={TextMode.TITLE}>{track.name}</Text>
                    <ArtistsLinks artists={track.artists} />
                </div>
                <Button isIcon onClick={clickHandler} mode={ButtonMode.TERTIARY}>
                    {isPlaying && currentTrack?.id === +trackId
                        ? <PauseIcon className={cls.icon} />
                        : <PlayIcon className={cls.icon} />}
                </Button>
            </div>
        </div>
    );
});
