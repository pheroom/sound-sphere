import { memo } from 'react';
import cls from './ArtistSignOnPage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { ArtistSignOnForm } from '../../components/ArtistSignOnForm/ArtistSignOnForm.tsx';

export const ArtistSignOnPage = memo(() => {
    return (
        <div className={classNames(cls.ArtistSignOnPage, {}, [])}>
            <ArtistSignOnForm />
        </div>
    );
});
