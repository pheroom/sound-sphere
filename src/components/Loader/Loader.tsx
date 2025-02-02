import { memo } from 'react';
import cls from './Loader.module.css';
import { classNames } from '../../utils/classNames.ts';

interface LoaderProps{
    className?: string
}

export const Loader = memo(({ className }: LoaderProps) => (
    <div className={classNames(cls.Loader, {}, [className])}>
        <div className={cls.loaderItem} />
    </div>
));
