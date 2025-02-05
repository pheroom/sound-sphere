import { memo } from 'react';
import { Link, useNavigate } from 'react-router';
import cls from './SignOnPage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { SignOnForm } from '../../components/SignOnForm/SignOnForm.tsx';
import { AppRoutes } from '../../routeConfig.tsx';

export const SignOnPage = memo(() => {
    const navigate = useNavigate();

    const onSuccess = () => {
        navigate(AppRoutes.MAIN);
    };

    return (
        <div className={classNames(cls.SignOnPage, {}, [])}>
            <SignOnForm onSuccess={onSuccess} />
        </div>
    );
});
