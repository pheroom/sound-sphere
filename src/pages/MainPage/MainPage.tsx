import { memo } from 'react';
import { Link } from 'react-router';
import cls from './MainPage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { AppRoutes } from '../../routeConfig.tsx';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { getCounterValue } from '../../models/counter/selectors/getCounterValue.ts';
import { Button } from '../../ui/Button/Button.tsx';
import { counterActions } from '../../models/counter/counterSlice.ts';
import { getAuthTarget } from '../../models/auth/selectors/getAuthTarget.ts';
import { TargetTypes } from '../../models/auth/authSchema.ts';

export const MainPage = memo(() => {
    const dispatch = useAppDispatch();
    const value = useAppSelector(getCounterValue);
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

            <br />
            <h3>{value}</h3>
            <br />
            <Button onClick={() => dispatch(counterActions.increment())}>+</Button>
            <br />
            <Button onClick={() => dispatch(counterActions.decrement())}>-</Button>

        </div>
    );
});
