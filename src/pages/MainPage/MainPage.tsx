import { memo } from 'react';
import { Link } from 'react-router';
import cls from './MainPage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { AppRoutes } from '../../routeConfig.tsx';

export const MainPage = memo(() => {
    return (
        <div className={classNames(cls.MainPage, {}, [])}>
            / main

            <div>
                <Link to={AppRoutes.TRACKS}>tracks</Link>
            </div>
            <div>
                <Link to={AppRoutes.ALBUMS}>albums</Link>
            </div>

        </div>
    );
});
