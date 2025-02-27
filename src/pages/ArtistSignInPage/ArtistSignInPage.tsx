import { memo, useState } from 'react';
import { useNavigate } from 'react-router';
import cls from './ArtistSignInPage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { AppRoutes } from '../../routeConfig.tsx';
import { Form, FormButton, FormError, FormInput, FormLink, FormSep } from '../../ui/Form/Form.tsx';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { getArtistIsLoading } from '../../store/artist/selectors/getArtistIsLoading.ts';
import { getArtistError } from '../../store/artist/selectors/getArtistError.ts';
import { artistLoginByUsername } from '../../store/artist/services/artistLoginByUsername.ts';

export const ArtistSignInPage = memo(() => {
    const navigate = useNavigate();
    const [signData, setSignData] = useState({ username: '', password: '' });

    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(getArtistIsLoading);
    const error = useAppSelector(getArtistError);

    const signInClick = async () => {
        const res = await dispatch(artistLoginByUsername(signData));
        if (res.meta.requestStatus === 'fulfilled') navigate(AppRoutes.MAIN);
    };

    return (
        <div className={classNames(cls.ArtistSignInPage, {}, [])}>
            <Form title="Sign In As Artist">
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
                <FormLink to={AppRoutes.ARTIST_SIGN_ON}>
                    Create Artist Account
                </FormLink>
                <FormError>{error}</FormError>
            </Form>
        </div>
    );
});
