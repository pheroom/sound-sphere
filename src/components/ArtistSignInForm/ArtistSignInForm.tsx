import { memo, useState } from 'react';
import cls from './ArtistSignInForm.module.css';
import { classNames } from '../../utils/classNames.ts';
import { Input } from '../../ui/Input/Input.tsx';
import { Button, ButtonSize } from '../../ui/Button/Button.tsx';
import { AppLink, AppLinkMode, AppLinkSize, AppLinkTheme } from '../../ui/AppLink/AppLink.tsx';
import { AppRoutes } from '../../routeConfig.tsx';

interface ArtistSignInFormProps {
    className?: string
}

export const ArtistSignInForm = memo(({ className }: ArtistSignInFormProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const signInClick = () => {
        alert('artist sign in');
    };

    const isLoading = false;

    return (
        <div className={classNames(cls.ArtistSignInForm, {}, [className])}>
            <p className={cls.title}>Sign In As Artist</p>
            {/* {error && <Text text="Неверный логин или пароль" theme={TextTheme.ERROR}/>} */}
            <Input
                fullWidth
                placeholder="Username"
                value={username}
                onChange={(value) => setUsername(value)}
                autoFocus
                type="text"
                classNameBox={cls.input}
            />
            <Input
                fullWidth
                placeholder="Password"
                value={password}
                onChange={(value) => setPassword(value)}
                type="text"
                classNameBox={cls.input}
            />
            <Button disabled={isLoading} size={ButtonSize.L} onClick={signInClick} className={cls.signInBtn}>
                Confirm
            </Button>
            <div className={cls.sep} />
            <AppLink
                className={cls.signOnLink}
                size={AppLinkSize.L}
                mode={AppLinkMode.BUTTON}
                theme={AppLinkTheme.POSITIVE}
                to={AppRoutes.ARTIST_SIGN_ON}
            >
                Create Artist Account
            </AppLink>
        </div>
    );
});
