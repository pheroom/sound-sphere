import { FC } from 'react';
import cls from './PageLoader.module.css';
import { classNames } from '../../utils/classNames.ts';
import { Loader } from '../../ui/Loader/Loader.tsx';

interface PageLoaderProps{
    className?: string
}

export const PageLoader: FC<PageLoaderProps> = ({ className }) => (
    <div className={classNames(cls.PageLoader, {}, [className])}>
        <Loader />
    </div>
);
