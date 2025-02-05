import { memo, useState } from 'react';
import cls from './ArtistSignOnForm.module.css';
import { classNames } from '../../utils/classNames.ts';
import { Input } from '../../ui/Input/Input.tsx';
import { Button, ButtonSize } from '../../ui/Button/Button.tsx';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { getArtistIsLoading } from '../../models/artist/selectors/getArtistIsLoading.ts';
import { getArtistError } from '../../models/artist/selectors/getArtistError.ts';
import { artistRegistration } from '../../models/artist/services/artistRegistration.ts';

interface ArtistSignOnFormProps {
    className?: string
    onSuccess?: () => void
}

export const ArtistSignOnForm = memo(({ className, onSuccess }: ArtistSignOnFormProps) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(getArtistIsLoading);
    const error = useAppSelector(getArtistError);

    const signOnClick = async () => {
        const res = await dispatch(artistRegistration({ username, password, name }));
        if (res.meta.requestStatus === 'fulfilled' && onSuccess) {
            onSuccess();
        }
    };

    return (
        <div className={classNames(cls.ArtistSignOnForm, {}, [className])}>
            <p className={cls.title}>Sign On As Artist</p>
            <Input
                fullWidth
                placeholder="Name"
                value={name}
                onChange={(value) => setName(value)}
                autoFocus
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
