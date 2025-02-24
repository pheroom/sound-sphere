import { memo, ReactNode } from 'react';
import cls from './TracksList.module.css';
import { classNames } from '../../utils/classNames.ts';
import { Track } from '../../models/Track.ts';
import { ArtistsLinks } from '../ArtistsLinks/ArtistsLinks.tsx';
import { AppLink } from '../../ui/AppLink/AppLink.tsx';
import { Button, ButtonMode } from '../../ui/Button/Button.tsx';
import { Picture, PictureSize } from '../../ui/Picture/Picture.tsx';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { playerActions } from '../../store/player/playerSlice.ts';
import { getPlayerData } from '../../store/player/selectors/getPlayerData.ts';
import AddIcon from '../../assets/icons/add.svg?react';
import AddedIcon from '../../assets/icons/added.svg?react';
import { getUserAuthData } from '../../store/user/selectors/getUserAuthData.ts';
import { useFetching } from '../../utils/useFetching.ts';
import TrackService from '../../services/TrackService.ts';
import { AppRoutes } from '../../routeConfig.tsx';

interface TrackListProps {
    className?: string
    tracks?: Track[]
    linkFunc?: (id: number) => string
    actions?: [ReactNode, (id: number) => void][]
}

export const TracksList = memo(({ className, tracks, actions, linkFunc = AppRoutes.getTrack }: TrackListProps) => {
    const dispatch = useAppDispatch();
    const { queue, currentIndex, isActive, isPlaying } = useAppSelector(getPlayerData);
    const [favouriteTrack] = useFetching(TrackService.addUserFavouritesTrack);
    const [unfavouriteTrack] = useFetching(TrackService.deleteUserFavouritesTrack);
    const user = useAppSelector(getUserAuthData);

    const clickTrackHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!tracks || !(e.target instanceof HTMLDivElement) || e.target?.dataset?.index === undefined) return;
        const i = Number(e.target?.dataset?.index);
        if (queue[currentIndex]?.id === tracks[i].id) {
            dispatch(playerActions.setIsPlaying(!isPlaying));
        } else if (queue !== tracks) {
            dispatch(playerActions.setQueue({ queue: tracks, currentIndex: i }));
        } else if (currentIndex !== i) {
            dispatch(playerActions.setQueue({ currentIndex: i }));
        }
    };

    const isActiveTrack = (id: number) => {
        const currentTrack = queue[currentIndex];
        if (!currentTrack) return false;
        return currentTrack.id === id;
    };

    const favouriteTrackHandler = (track: Track) => {
        if (!user) return;
        if (track.isFavourite) {
            unfavouriteTrack(track.id);
            track.isFavourite = false;
        } else {
            favouriteTrack(track.id);
            track.isFavourite = true;
        }
    };

    return (
        <div className={classNames(cls.TracksList, {}, [className])} onClick={(e) => clickTrackHandler(e)}>
            {tracks?.length
                ? tracks.map((track, i) => (
                    <div
                        key={track.id}
                        className={classNames(cls.box, { [cls.activeTrack]: isActiveTrack(track.id) })}
                        data-index={i}
                    >
                        <AppLink className={cls.imgBox} to={linkFunc(track.id)}>
                            <Picture
                                className={cls.img}
                                size={45}
                                imgSrc={track.pictureURL}
                            />
                        </AppLink>
                        <div className={cls.info}>
                            <AppLink className={cls.title} to={linkFunc(track.id)}>{track.name}</AppLink>
                            <ArtistsLinks className={cls.artistsLinks} artists={track.artists} />
                        </div>
                        <div className={cls.actions}>
                            {/* {actions && actions.map(([icon, action], i) => ( */}
                            {/*    <Button mode={ButtonMode.TERTIARY} isIcon key={i} onClick={() => action(track.id)}> */}
                            {/*        {icon} */}
                            {/*    </Button> */}
                            {/* ))} */}
                            <Button mode={ButtonMode.TERTIARY} isIcon key={i} onClick={() => favouriteTrackHandler(track)}>
                                {track.isFavourite
                                    ? <AddedIcon />
                                    : <AddIcon />}
                            </Button>
                        </div>
                    </div>
                ))
                : <i>No tracks added</i>}
        </div>
    );
});
