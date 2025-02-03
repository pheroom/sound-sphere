import { memo } from 'react';
import cls from './ArtistSignInPage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { ArtistSignInForm } from '../../components/ArtistSignInForm/ArtistSignInForm.tsx';

export const ArtistSignInPage = memo(() => {
    return (
        <div className={classNames(cls.ArtistSignInPage, {}, [])}>
            <ArtistSignInForm />
        </div>
    );
});
