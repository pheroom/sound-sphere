import { memo } from 'react';
import { Link } from 'react-router';
import cls from './Navbar.module.css';
import { classNames } from '../../utils/classNames.ts';
import { AppRoutes } from '../../routeConfig.tsx';
import { Logo } from '../../ui/Logo/Logo.tsx';
import { AppLink, AppLinkMode } from '../../ui/AppLink/AppLink.tsx';
import { useAppSelector } from '../../store/store.ts';
import { getAuthTarget } from '../../models/auth/selectors/getAuthTarget.ts';
import { TargetTypes } from '../../models/auth/authSchema.ts';
import { getAuthInited } from '../../models/auth/selectors/getAuthInited.ts';
import { Avatar } from '../../ui/Avatar/Avatar.tsx';
import { UserCard, UserCardSize } from '../UserCard/UserCard.tsx';
import { getUserAuthData } from '../../models/user/selectors/getUserAuthData.ts';
import { getArtistAuthData } from '../../models/artist/selectors/getArtistAuthData.ts';
import { ArtistCard, ArtistCardSize } from '../ArtistCard/ArtistCard.tsx';

interface NavbarProps{
    className?: string,
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const isAuthInited = useAppSelector(getAuthInited);
    const authTarget = useAppSelector(getAuthTarget);
    const user = useAppSelector(getUserAuthData);
    const artist = useAppSelector(getArtistAuthData);

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
        <nav className={cls.mainLinks}>
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
                <UserCard user={user} size={UserCardSize.S} />
            </Link>
        </nav>
    );

    const contentForArtist = (
        <nav className={cls.mainLinks}>
            <Link to={AppRoutes.ARTIST_PROFILE} className={cls.profileLink}>
                <ArtistCard artist={artist} size={ArtistCardSize.S} />
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
