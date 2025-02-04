import { ChangeEvent, memo, useEffect, useState } from 'react';
import cls from './Player.module.css';
import { classNames } from '../../utils/classNames.ts';
import { Progress } from '../../ui/Progress/Progress.tsx';
import trackCover from '../../assets/trackCover.jpg';
import VolumeIcon from '../../assets/icons/volume.svg?react';
import PlayIcon from '../../assets/icons/play.svg?react';
import PauseIcon from '../../assets/icons/pause.svg?react';

let audio: HTMLAudioElement;

interface PlayerProps {
    className?: string
}

export const Player = memo(({ className }: PlayerProps) => {
    const [pause, setPause] = useState(true);
    const [volume, setVolume] = useState(44);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(1);

    const progressValueToVolume = (value: number) => value / 300;

    useEffect(() => {
        if (!audio) {
            audio = new Audio();
            audio.src = 'https://muzne.net/uploads/files/kai-angel-9mice-pauki-ost-smertelnyj-strim.mp3';
            audio.volume = progressValueToVolume(volume);
            audio.onloadedmetadata = () => {
                setDuration(audio.duration);
            };
            audio.ontimeupdate = () => {
                setCurrentTime(audio.currentTime);
            };
        }
    }, [volume]);

    const playClick = () => {
        if (pause) {
            // playTrack();
            setPause(false);
            audio.play();
        } else {
            // pauseTrack();
            setPause(true);
            audio.pause();
        }
    };

    const changeVolumeHandler = (newVolume: number) => {
        audio.volume = progressValueToVolume(newVolume);
        setVolume(newVolume);
    };

    const changeTimeHandler = (newTime: number) => {
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const getPrettyTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    return (
        <div className={classNames(cls.Player, {}, [className, 'container'])}>
            <div className={cls.mainBlock}>
                <div className={cls.fullInfoBlock}>
                    <img className={cls.cover} src={trackCover} alt="trackImg" />
                    <div className={cls.infoBlock}>
                        <span className={cls.name}>Пауки (OST Смертельный стрим)</span>
                        <span className={cls.artists}>Kai Angel, 9mice</span>
                    </div>
                </div>
                <button className={cls.iconButton} onClick={playClick}>
                    {pause
                        ? <PlayIcon className={cls.icon} />
                        : <PauseIcon className={cls.icon} />}
                </button>
                <Progress
                    className={cls.timeProgress}
                    haveThumb
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={changeTimeHandler}
                />
                <div className={cls.timeInfo}>
                    {`${getPrettyTime(currentTime)} / ${getPrettyTime(duration)}`}
                </div>
                <div className={cls.volumeBlock}>
                    <VolumeIcon className={cls.icon} />
                    <Progress className={cls.volumeProgress} min={0} max={100} value={volume} onChange={changeVolumeHandler} />
                </div>
            </div>
        </div>
    );
});
