import { memo } from 'react';
import cls from './SignInPage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { SignInForm } from '../../components/SignInForm/SignInForm.tsx';

export const SignInPage = memo(() => {
    return (
        <div className={classNames(cls.SignInPage, {}, [])}>
            <SignInForm />
        </div>
    );
});
