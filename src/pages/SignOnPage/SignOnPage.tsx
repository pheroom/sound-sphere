import { memo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import cls from './SignOnPage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { AppRoutes } from '../../routeConfig.tsx';
import { Form, FormButton, FormError, FormInput } from '../../ui/Form/Form.tsx';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { getUserIsLoading } from '../../store/user/selectors/getUserIsLoading.ts';
import { getUserError } from '../../store/user/selectors/getUserError.ts';
import { userRegistration } from '../../store/user/services/userRegistration.ts';

export const SignOnPage = memo(() => {
    const navigate = useNavigate();
    const [signData, setSignData] = useState({ username: '', lastname: '', firstname: '', password: '' });

    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(getUserIsLoading);
    const error = useAppSelector(getUserError);

    const signOnClick = async () => {
        const res = await dispatch(userRegistration(signData));
        if (res.meta.requestStatus === 'fulfilled') navigate(AppRoutes.MAIN);
    };

    return (
        <div className={classNames(cls.SignOnPage, {}, [])}>
            <Form title="Sign In">
                <FormInput
                    autoFocus
                    placeholder="Firstname"
                    value={signData.firstname}
                    setData={setSignData}
                    dataName="firstname"
                />
                <FormInput
                    placeholder="Lastname"
                    value={signData.lastname}
                    setData={setSignData}
                    dataName="lastname"
                />
                <FormInput
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
                    onClick={signOnClick}
                >
                    Confirm
                </FormButton>
                <FormError>{error}</FormError>
            </Form>
        </div>
    );
});
