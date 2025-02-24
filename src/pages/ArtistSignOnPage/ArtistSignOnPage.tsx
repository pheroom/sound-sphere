import { memo, useState } from 'react';
import { useNavigate } from 'react-router';
import cls from './ArtistSignOnPage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { AppRoutes } from '../../routeConfig.tsx';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { getUserIsLoading } from '../../store/user/selectors/getUserIsLoading.ts';
import { getUserError } from '../../store/user/selectors/getUserError.ts';
import { Form, FormButton, FormError, FormInput } from '../../ui/Form/Form.tsx';
import { artistRegistration } from '../../store/artist/services/artistRegistration.ts';
import { getArtistIsLoading } from '../../store/artist/selectors/getArtistIsLoading.ts';
import { getArtistError } from '../../store/artist/selectors/getArtistError.ts';

export const ArtistSignOnPage = memo(() => {
    const navigate = useNavigate();
    const [signData, setSignData] = useState({ username: '', name: '', password: '' });

    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(getArtistIsLoading);
    const error = useAppSelector(getArtistError);

    const signOnClick = async () => {
        const res = await dispatch(artistRegistration(signData));
        if (res.meta.requestStatus === 'fulfilled') navigate(AppRoutes.MAIN);
    };

    return (
        <div className={classNames(cls.ArtistSignOnPage, {}, [])}>
            <Form title="Sign On As Artist">
                <FormInput
                    autoFocus
                    placeholder="Name"
                    value={signData.name}
                    setData={setSignData}
                    dataName="name"
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
