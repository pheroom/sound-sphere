import { memo } from 'react';
import { Link, useNavigate } from 'react-router';
import cls from './Navbar.module.css';
import { classNames } from '../../utils/classNames.ts';
import { AppRoutes } from '../../routeConfig.tsx';
import { Logo } from '../../ui/Logo/Logo.tsx';
import { AppLink, AppLinkMode } from '../../ui/AppLink/AppLink.tsx';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { getAuthTarget } from '../../models/auth/selectors/getAuthTarget.ts';
import { TargetTypes } from '../../models/auth/authSchema.ts';
import { Button } from '../../ui/Button/Button.tsx';
import { getAuthInited } from '../../models/auth/selectors/getAuthInited.ts';
import { authLogout } from '../../models/auth/services/authLogout.ts';

interface NavbarProps{
    className?: string,
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const isAuthInited = useAppSelector(getAuthInited);
    const authTarget = useAppSelector(getAuthTarget);

    const contentForUnlogin = (
        <nav className={cls.links}>
            <AppLink mode={AppLinkMode.LINK} className={cls.commonLink} to={AppRoutes.ARTIST_SIGN_IN}>
                Sign In As Artist
            </AppLink>
            <AppLink mode={AppLinkMode.BUTTON} className={cls.buttonLink} to={AppRoutes.SIGN_IN}>
                Sign In
            </AppLink>
        </nav>
    );

    const contentForUser = (
        <nav className={cls.links}>
            <AppLink className={cls.navLink} activeClassName={cls.activeNavLink} navLink to={AppRoutes.TRACKS}>
                Tracks
            </AppLink>
            <AppLink className={cls.navLink} activeClassName={cls.activeNavLink} navLink to={AppRoutes.ALBUMS}>
                Albums
            </AppLink>
            <AppLink className={cls.navLink} activeClassName={cls.activeNavLink} navLink to={AppRoutes.PLAYLISTS}>
                Playlists
            </AppLink>
            <Link to={AppRoutes.PROFILE} className={cls.profileLink}>
                <img
                    className={cls.avatarImg}
                    src="https://avatars.cloudflare.steamstatic.com/a559e8bee2492a9a551c53e1c6558fe948409fea_full.jpg"
                    alt="avatarImg"
                />
                <div className={cls.userInfo}>
                    <span className={cls.fullname}>Johan Liebert</span>
                    <span className={cls.username}>demon6</span>
                </div>
            </Link>
        </nav>
    );

    const contentForArtist = (
        <nav className={cls.links}>
            <Link to={AppRoutes.ARTIST_PROFILE} className={cls.profileLink}>
                <img
                    className={cls.avatarImg}
                    src="https://avatars.cloudflare.steamstatic.com/a559e8bee2492a9a551c53e1c6558fe948409fea_full.jpg"
                    alt="avatarImg"
                />
                <div className={cls.userInfo}>
                    <span className={cls.fullname}>Johan Liebert</span>
                    <span className={cls.username}>demon6</span>
                </div>
            </Link>
        </nav>
    );

    let contentByAuthTarget;
    switch (authTarget) {
        case TargetTypes.UNLOGIN:
            contentByAuthTarget = contentForUnlogin;
            break;
        case TargetTypes.USER:
            contentByAuthTarget = contentForUser;
            break;
        case TargetTypes.ARTIST:
            contentByAuthTarget = contentForArtist;
            break;
        default:
            contentByAuthTarget = <></>;
    }

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className="container">
                <div className={cls.inner}>
                    <Logo />
                    {isAuthInited ? contentByAuthTarget : <div>skeleton</div>}
                </div>
            </div>
        </div>
    );
});
