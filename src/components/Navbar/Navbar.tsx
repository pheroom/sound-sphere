import { memo } from 'react';
import { useNavigate } from 'react-router';
import cls from './Navbar.module.css';
import { classNames } from '../../utils/classNames.ts';
import { AppRoutes } from '../../routeConfig.tsx';
import { Logo } from '../../ui/Logo/Logo.tsx';
import { AppLink, AppLinkMode } from '../../ui/AppLink/AppLink.tsx';

interface NavbarProps{
    className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const navigate = useNavigate();

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className="container">
                <div className={cls.inner}>
                    <Logo />
                    <nav className={cls.links}>
                        <AppLink mode={AppLinkMode.LINK} className={cls.commonLink} to={AppRoutes.ARTIST_SIGN_IN}>
                            Sign In As Artist
                        </AppLink>
                        <AppLink mode={AppLinkMode.BUTTON} className={cls.buttonLink} to={AppRoutes.SIGN_IN}>
                            Sign In
                        </AppLink>
                    </nav>
                </div>
            </div>
        </div>
    );
});
