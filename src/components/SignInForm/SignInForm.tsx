import { memo, useState } from 'react';
import cls from './SignInForm.module.css';
import { classNames } from '../../utils/classNames.ts';
import { Input } from '../../ui/Input/Input.tsx';
import { Button, ButtonSize } from '../../ui/Button/Button.tsx';
import { AppLink, AppLinkMode, AppLinkSize, AppLinkTheme } from '../../ui/AppLink/AppLink.tsx';
import { AppRoutes } from '../../routeConfig.tsx';

interface SignInFormProps {
    className?: string
}

export const SignInForm = memo(({ className }: SignInFormProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const signInClick = () => {
        alert('sign in');
    };

    const isLoading = false;

    return (
        <div className={classNames(cls.SignInForm, {}, [className])}>
            <p className={cls.title}>Sign In</p>
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
                to={AppRoutes.SIGN_ON}
            >
                Create Account
            </AppLink>
        </div>
    );
});
