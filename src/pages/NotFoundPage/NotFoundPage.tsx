import { FC } from 'react';
import { classNames } from '../../utils/classNames.ts';
import cls from './NotFoundPage.module.css';

interface NotFoundPageProps{
    className?: string
}

const NotFoundPage: FC<NotFoundPageProps> = ({ className }) => {
    return (
        <div className={classNames(cls.NotFoundPage, {}, [className])}>
            Page not found
        </div>
    );
};

export default NotFoundPage;
