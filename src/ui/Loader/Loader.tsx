import { memo } from 'react';
import cls from './Loader.module.css';
import { classNames } from '../../utils/classNames.ts';

export enum LoaderSize{
    MEDIUM = 'medium',
    SMALL = 'small',
}

interface LoaderProps{
    className?: string
    size?: LoaderSize
}

export const Loader = memo(({ className, size = LoaderSize.MEDIUM }: LoaderProps) => (
    <div className={classNames(cls.Loader, {}, [className, cls[size]])}>
        <svg viewBox="25 25 50 50">
            <circle r="20" cy="50" cx="50" />
        </svg>
    </div>
));
