import { memo, useCallback, useEffect, useRef, useState } from 'react';
import cls from './Player.module.css';
import { classNames } from '../../utils/classNames.ts';
import { Progress } from '../../ui/Progress/Progress.tsx';
import VolumeIcon from '../../assets/icons/volume.svg?react';
import MutedIcon from '../../assets/icons/mute.svg?react';
import PlayNextIcon from '../../assets/icons/playNext.svg?react';
import PlayPrevIcon from '../../assets/icons/playPrev.svg?react';
import PlayIcon from '../../assets/icons/play.svg?react';
import PauseIcon from '../../assets/icons/pause.svg?react';
import RepeatIcon from '../../assets/icons/repeat.svg?react';
import RepeatOneIcon from '../../assets/icons/repeat1.svg?react';
import AddIcon from '../../assets/icons/add.svg?react';
import AddedIcon from '../../assets/icons/added.svg?react';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { getPlayerData } from '../../store/player/selectors/getPlayerData.ts';
import { getPlayerTrack } from '../../store/player/selectors/getPlayerTrack.ts';
import { getFullFilePath } from '../../utils/getFullFilePath.ts';
import { playerActions } from '../../store/player/playerSlice.ts';
import { ArtistsLinks } from '../ArtistsLinks/ArtistsLinks.tsx';
import { Picture, PictureSize } from '../../ui/Picture/Picture.tsx';
import { useDebounce } from '../../utils/useDebounce.ts';
import { VOLUME_LOCALSTORAGE_KEY } from '../../utils/const.ts';
import { RepeatMode } from '../../store/player/playerSchema.ts';
import { getPlayerCurrentVolume } from '../../store/player/selectors/getPlayerCurrentVolume.ts';

interface PlayerProps {
    className?: string
}

export const Player = memo(({ className }: PlayerProps) => {
    const audioRef = useRef<HTMLAudioElement>(new Audio());

    const [isAdded, setIsAdded] = useState(false);

    const dispatch = useAppDispatch();
    const { isActive, currentTime, repeatMode, isMuted, duration, volume, isPlaying } = useAppSelector(getPlayerData);
    const currentVolume = useAppSelector(getPlayerCurrentVolume);
    const currentTrack = useAppSelector(getPlayerTrack);

    const localSaveVolume = useDebounce(
        (volume: number) => localStorage.setItem(VOLUME_LOCALSTORAGE_KEY, String(volume)),
        1000,
    );

    const progressValueToVolume = (value: number) => value / 100;

    useEffect(() => {
        if (currentTrack && isActive) {
            const audioFileUrl = getFullFilePath(currentTrack.audioURL);
            if (!audioFileUrl) return;
            // audioRef.current = new Audio();
            const audio = audioRef.current;
            audio.src = audioFileUrl;
            audio.volume = progressValueToVolume(currentVolume);
            audio.onloadedmetadata = () => {
                dispatch(playerActions.setDuration(audio.duration));
            };
            audio.ontimeupdate = () => {
                dispatch(playerActions.setCurrentTime(audio.currentTime));
            };
            audio.autoplay = true;
        }
    }, [currentTrack, dispatch]);

    useEffect(() => {
        const handleEnded = () => {
            dispatch(playerActions.playNextTrackByEnd());
        };
        audioRef.current?.addEventListener('ended', handleEnded);

        return () => {
            audioRef.current?.removeEventListener('ended', handleEnded);
        };
    }, [dispatch]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    const playClick = useCallback(() => {
        dispatch(playerActions.setIsPlaying(!isPlaying));
    }, [dispatch, isPlaying]);

    useEffect(() => {
        const keyDownHandler = (e: KeyboardEvent) => {
            if ((e.target as HTMLElement).tagName === 'BODY' && e.code === 'Space') {
                e.preventDefault();
                playClick();
            }
        };
        document.addEventListener('keydown', keyDownHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [playClick]);

    const playPrevTrackClick = () => {
        dispatch(playerActions.playPrevTrack());
    };

    const playNextTrackClick = () => {
        dispatch(playerActions.playNextTrack());
    };

    const changeVolumeHandler = (newVolume: number) => {
        // const audio = audioRef.current;
        // audio.volume = progressValueToVolume(newVolume);
        // console.log(newVolume);
        dispatch(playerActions.setVolume(newVolume));
        localSaveVolume(newVolume);
    };

    const changeTimeHandler = (newTime: number) => {
        const audio = audioRef.current;
        audio.currentTime = newTime;
        dispatch(playerActions.setCurrentTime(newTime));
    };

    const getPrettyTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    const repeatClick = () => {
        dispatch(playerActions.setNextRepeatMode());
    };

    const volumeClick = () => {
        dispatch(playerActions.setIsMuted(!isMuted));
    };

    useEffect(() => {
        const audio = audioRef.current;
        audio.volume = progressValueToVolume(currentVolume);
    }, [currentVolume]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.loop = repeatMode === RepeatMode.REPEAT_ONE;
        }
    }, [repeatMode]);

    // useEffect(() => {
    //     if (audioRef.current.paused === isPlaying) {
    //         console.log(audioRef.current.paused, isPlaying);
    //         dispatch(playerActions.setIsPlaying(audioRef.current.paused));
    //     }
    // }, [audioRef.current.paused]);

    if (!isActive || !currentTrack) return <></>;
    return (
        <div className={classNames(cls.Player, {}, [className, 'container'])}>
            <div className={cls.mainBlock}>
                <div className={cls.fullInfoBlock}>
                    {/* <img className={cls.cover} src={trackCover} alt="trackImg" /> */}
                    <Picture size={PictureSize.S} imgSrc={currentTrack.pictureURL} />
                    <div className={cls.infoBlock}>
                        <div className={cls.name} title={currentTrack.name}>{currentTrack.name}</div>
                        <ArtistsLinks className={cls.artists} artists={currentTrack.artists} />
                    </div>
                </div>
                <div className={cls.playActions}>
                    <button className={cls.iconButton} onClick={playPrevTrackClick}>
                        <PlayPrevIcon className={cls.primaryIcon} />
                    </button>
                    <button className={cls.iconButton} onClick={playClick}>
                        {isPlaying
                            ? <PauseIcon className={cls.primaryIcon} />
                            : <PlayIcon className={cls.primaryIcon} />}
                    </button>
                    <button className={cls.iconButton} onClick={playNextTrackClick}>
                        <PlayNextIcon className={cls.primaryIcon} />
                    </button>
                    <button className={cls.iconButton} onClick={repeatClick}>
                        {repeatMode === RepeatMode.REPEAT_ONE
                            ? <RepeatOneIcon className={cls.icon} />
                            : (
                                <RepeatIcon
                                    className={classNames(cls.icon, { [cls.iconDisabled]: repeatMode === RepeatMode.NO_REPEAT })}
                                />
                            )}
                    </button>
                    {/* <button className={cls.iconButton} onClick={() => setIsAdded((prev) => !prev)}> */}
                    {/*    {isAdded ? <AddedIcon className={cls.icon} /> : <AddIcon className={cls.primaryIcon} />} */}
                    {/* </button> */}
                </div>
                <Progress
                    className={cls.timeProgress}
                    // haveThumb
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={changeTimeHandler}
                />
                <div className={classNames(cls.timeInfo, {}, ['noselect'])}>
                    {`${getPrettyTime(currentTime)} / ${getPrettyTime(duration)}`}
                </div>
                <div className={cls.volumeBlock}>
                    <button className={cls.iconButton} onClick={volumeClick}>
                        {isMuted ? <MutedIcon className={cls.icon} /> : <VolumeIcon className={cls.icon} />}
                    </button>
                    <Progress
                        className={cls.volumeProgress}
                        min={0}
                        max={100}
                        value={currentVolume}
                        onChange={changeVolumeHandler}
                    />
                </div>
            </div>
        </div>
    );
});
