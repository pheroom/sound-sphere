import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import cls from './SignInPage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { AppRoutes } from '../../routeConfig.tsx';
import { Form, FormButton, FormError, FormInput, FormLink, FormSep } from '../../ui/Form/Form.tsx';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { getUserIsLoading } from '../../store/user/selectors/getUserIsLoading.ts';
import { getUserError } from '../../store/user/selectors/getUserError.ts';
import { userLoginByUsername } from '../../store/user/services/userLoginByUsername.ts';

export const SignInPage = memo(() => {
    const navigate = useNavigate();
    const [signData, setSignData] = useState({ username: '', password: '' });

    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(getUserIsLoading);
    const error = useAppSelector(getUserError);

    const signInClick = async () => {
        const res = await dispatch(userLoginByUsername(signData));
        if (res.meta.requestStatus === 'fulfilled') navigate(AppRoutes.MAIN);
    };

    return (
        <div className={classNames(cls.SignInPage, {}, [])}>
            <Form title="Sign In">
                <FormInput
                    autoFocus
                    placeholder="Username"
                    value={signData.username}
                    setData={setSignData}
                    dataName="username"
                />
                <FormInput
                    placeholder="Password"
                    value={signData.password}
                    setData={setSignData}
                    dataName="password"
                />
                <FormButton
                    disabled={isLoading}
                    onClick={signInClick}
                >
                    Confirm
                </FormButton>
                <FormSep />
                <FormLink to={AppRoutes.SIGN_ON}>
                    Create Account
                </FormLink>
                <FormError>{error}</FormError>
            </Form>
        </div>
    );
});
