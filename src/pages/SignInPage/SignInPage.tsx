import { memo } from 'react';
import { useNavigate } from 'react-router';
import cls from './SignInPage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { SignInForm } from '../../components/SignInForm/SignInForm.tsx';
import { AppRoutes } from '../../routeConfig.tsx';

export const SignInPage = memo(() => {
    const navigate = useNavigate();

    const onSuccess = () => {
        navigate(AppRoutes.MAIN);
    };

    return (
        <div className={classNames(cls.SignInPage, {}, [])}>
            <SignInForm onSuccess={onSuccess} />
        </div>
    );
});
