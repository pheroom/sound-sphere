import { memo } from 'react';
import { useNavigate } from 'react-router';
import cls from './ArtistSignInPage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { ArtistSignInForm } from '../../components/ArtistSignInForm/ArtistSignInForm.tsx';
import { AppRoutes } from '../../routeConfig.tsx';

export const ArtistSignInPage = memo(() => {
    const navigate = useNavigate();

    const onSuccess = () => {
        navigate(AppRoutes.MAIN);
    };

    return (
        <div className={classNames(cls.ArtistSignInPage, {}, [])}>
            <ArtistSignInForm onSuccess={onSuccess} />
        </div>
    );
});
