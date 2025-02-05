import { memo } from 'react';
import { useNavigate } from 'react-router';
import cls from './ArtistSignOnPage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { ArtistSignOnForm } from '../../components/ArtistSignOnForm/ArtistSignOnForm.tsx';
import { AppRoutes } from '../../routeConfig.tsx';

export const ArtistSignOnPage = memo(() => {
    const navigate = useNavigate();

    const onSuccess = () => {
        navigate(AppRoutes.MAIN);
    };

    return (
        <div className={classNames(cls.ArtistSignOnPage, {}, [])}>
            <ArtistSignOnForm onSuccess={onSuccess} />
        </div>
    );
});
