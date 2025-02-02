import { memo } from 'react';
import { NavLink } from 'react-router';
import cls from './Navbar.module.css';
import { classNames } from '../../utils/classNames.ts';
import { AppRoutes } from '../../routeConfig.tsx';
import { Logo } from '../Logo/Logo.tsx';

interface NavbarProps{
    className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className="container">
                <div className={cls.inner}>
                    <Logo />
                    <nav className={cls.nav}>
                        <NavLink to={AppRoutes.SIGN_ON}>Sign On</NavLink>
                        <NavLink to={AppRoutes.ARTIST_SIGN_ON}>Sign On As Artist</NavLink>
                    </nav>
                </div>
            </div>
        </div>
    );
});
