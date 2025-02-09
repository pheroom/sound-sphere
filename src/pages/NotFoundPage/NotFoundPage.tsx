import { FC } from 'react';
import { classNames } from '../../utils/classNames.ts';
import cls from './NotFoundPage.module.css';
import { AppLink, AppLinkMode } from '../../ui/AppLink/AppLink.tsx';
import { AppRoutes } from '../../routeConfig.tsx';

interface NotFoundPageProps{
    className?: string
}

const NotFoundPage: FC<NotFoundPageProps> = ({ className }) => {
    return (
        <div className={classNames(cls.NotFoundPage, {}, [className])}>
            <h1>Page not found</h1>
            <AppLink to={AppRoutes.MAIN} mode={AppLinkMode.BUTTON}>To main page</AppLink>
        </div>
    );
};

export default NotFoundPage;
