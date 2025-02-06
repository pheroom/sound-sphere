import { memo } from 'react';
import cls from './Loader.module.css';
import { classNames } from '../../utils/classNames.ts';

interface LoaderProps{
    className?: string
}

export const Loader = memo(({ className }: LoaderProps) => (
    <div className={classNames(cls.Loader, {}, [className])}>
        <svg viewBox="25 25 50 50">
            <circle r="20" cy="50" cx="50" />
        </svg>
    </div>
));
