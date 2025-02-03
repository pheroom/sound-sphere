import { memo } from 'react';
import { Link } from 'react-router';
import cls from './SignOnPage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { SignOnForm } from '../../components/SignOnForm/SignOnForm.tsx';

export const SignOnPage = memo(() => {
    return (
        <div className={classNames(cls.SignOnPage, {}, [])}>
            <SignOnForm />
        </div>
    );
});
