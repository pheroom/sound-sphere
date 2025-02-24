import { memo, useEffect } from 'react';
import { Link } from 'react-router';
import cls from './MainPage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { AppRoutes } from '../../routeConfig.tsx';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { Button } from '../../ui/Button/Button.tsx';
import { getAuthTarget } from '../../store/auth/selectors/getAuthTarget.ts';
import { TargetTypes } from '../../store/auth/authSchema.ts';

export const MainPage = memo(() => {
    const authTarget = useAppSelector(getAuthTarget);

    if (authTarget === TargetTypes.USER) {
        return (
            <div className={classNames(cls.MainPage, {}, [])}>
                sign in complete as USER
            </div>
        );
    }
    if (authTarget === TargetTypes.ARTIST) {
        return (
            <div className={classNames(cls.MainPage, {}, [])}>
                sign in complete as ARTIST
            </div>
        );
    }
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
