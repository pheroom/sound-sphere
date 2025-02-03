import React, { FC } from 'react';
import { Link } from 'react-router';
import { classNames } from '../../utils/classNames.ts';
import cls from './Logo.module.css';
import { AppRoutes } from '../../routeConfig.tsx';
import logo from '../../assets/icons/logo.png';

interface LogoProps{
    className?: string
}

export const Logo: FC<LogoProps> = ({ className }) => {
    return (
        <Link className={classNames(cls.Logo, {}, [className])} to={AppRoutes.MAIN}>
            <img className={cls.logoImg} src={logo} alt="logo" />
            <span>Sound Sphere</span>
        </Link>
    );
};
