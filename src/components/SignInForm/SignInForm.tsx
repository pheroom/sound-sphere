import { memo, useState } from 'react';
import cls from './SignInForm.module.css';
import { classNames } from '../../utils/classNames.ts';
import { Input } from '../../ui/Input/Input.tsx';
import { Button, ButtonSize } from '../../ui/Button/Button.tsx';
import { AppLink, AppLinkMode, AppLinkSize, AppLinkTheme } from '../../ui/AppLink/AppLink.tsx';
import { AppRoutes } from '../../routeConfig.tsx';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { getUserIsLoading } from '../../models/user/selectors/getUserIsLoading.ts';
import { getUserError } from '../../models/user/selectors/getUserError.ts';
import { userLoginByUsername } from '../../models/user/services/userLoginByUsername.ts';

interface SignInFormProps {
    className?: string
    onSuccess?: () => void
}

export const SignInForm = memo(({ className, onSuccess }: SignInFormProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(getUserIsLoading);
    const error = useAppSelector(getUserError);

    const signInClick = async () => {
        const res = await dispatch(userLoginByUsername({ username, password }));
        if (res.meta.requestStatus === 'fulfilled' && onSuccess) {
            onSuccess();
        }
    };

    return (
        <div className={classNames(cls.SignInForm, {}, [className])}>
            <p className={cls.title}>Sign In</p>
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
            {error && <div className={cls.error}>{error}</div>}
        </div>
    );
});
