import { memo } from 'react';
import cls from './ErrorPage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { Button } from '../../ui/Button/Button.tsx';

interface ErrorPageProps {
    className?: string
    text?: string
}

export const ErrorPage = memo(({ className, text }: ErrorPageProps) => {
    const reloadPage = () => {
        location.reload();
    };

    return (
        <div className={classNames(cls.ErrorPage, {}, [className])}>
            <h1>{text || 'An error has occurred'}</h1>
            <Button onClick={reloadPage}>Reload app</Button>
        </div>
    );
});
