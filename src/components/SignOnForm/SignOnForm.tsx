import { memo, useState } from 'react';
import cls from './SignOnForm.module.css';
import { classNames } from '../../utils/classNames.ts';
import { Input } from '../../ui/Input/Input.tsx';
import { Button, ButtonSize } from '../../ui/Button/Button.tsx';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { getUserIsLoading } from '../../models/user/selectors/getUserIsLoading.ts';
import { getUserError } from '../../models/user/selectors/getUserError.ts';
import { userLoginByUsername } from '../../models/user/services/userLoginByUsername.ts';
import { userRegistration } from '../../models/user/services/userRegistration.ts';

interface SignOnFormProps {
    className?: string
    onSuccess?: () => void
}

export const SignOnForm = memo(({ className, onSuccess }: SignOnFormProps) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(getUserIsLoading);
    const error = useAppSelector(getUserError);

    const signOnClick = async () => {
        const res = await dispatch(userRegistration({ username, password, firstname, lastname }));
        if (res.meta.requestStatus === 'fulfilled' && onSuccess) {
            onSuccess();
        }
    };

    return (
        <div className={classNames(cls.SignOnForm, {}, [className])}>
            <p className={cls.title}>Sign On</p>
            <Input
                fullWidth
                placeholder="Firstname"
                value={firstname}
                onChange={(value) => setFirstname(value)}
                autoFocus
                type="text"
                classNameBox={cls.input}
            />
            <Input
                fullWidth
                placeholder="Lastname"
                value={lastname}
                onChange={(value) => setLastname(value)}
                type="text"
                classNameBox={cls.input}
            />
            <Input
                fullWidth
                placeholder="Username"
                value={username}
                onChange={(value) => setUsername(value)}
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
            <Button disabled={isLoading} size={ButtonSize.L} onClick={signOnClick} className={cls.signOnBtn}>
                Confirm
            </Button>
            {error && <div className={cls.error}>{error}</div>}
        </div>
    );
});
