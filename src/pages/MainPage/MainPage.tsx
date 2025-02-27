import { memo } from 'react';
import { Link } from 'react-router';
import cls from './MainPage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { useAppSelector } from '../../store/store.ts';
import { getAuthTarget } from '../../store/auth/selectors/getAuthTarget.ts';
import { TargetTypes } from '../../store/auth/authSchema.ts';
import { AppRoutes } from '../../routeConfig.tsx';
import MainVideo from '../../assets/mainVideo.mp4';
import MainVideoPlaceholder from '../../assets/mainVideo.webp';

export const MainPage = memo(() => {
    const authTarget = useAppSelector(getAuthTarget);

    return (
        <div className={classNames(cls.MainPage, {}, [])}>
            <div className={cls.info}>
                <h1 className={cls.title}>
                    Millions of tracks
                    <br />
                    by any artist
                    <br />
                    for everyone
                </h1>
                <p className={cls.p}>Music that unites — listen together with your friends</p>
                <Link
                    to={authTarget === TargetTypes.USER
                        ? AppRoutes.TRACKS
                        : authTarget === TargetTypes.ARTIST
                            ? AppRoutes.ARTIST_PROFILE
                            : AppRoutes.SIGN_IN}
                    className={cls.link}
                >
                    Try it for free
                </Link>
            </div>
            <div className={cls.video}>
                <video
                    src={MainVideo}
                    poster={MainVideoPlaceholder}
                    playsInline
                    loop
                    autoPlay
                    width="456"
                    height="540"
                />
            </div>
        </div>
    );
});
