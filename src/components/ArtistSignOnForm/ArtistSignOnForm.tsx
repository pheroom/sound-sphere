import { memo, useState } from 'react';
import cls from './ArtistSignOnForm.module.css';
import { classNames } from '../../utils/classNames.ts';
import { Input } from '../../ui/Input/Input.tsx';
import { Button, ButtonSize } from '../../ui/Button/Button.tsx';

interface ArtistSignOnFormProps {
    className?: string
}

export const ArtistSignOnForm = memo(({ className }: ArtistSignOnFormProps) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const signOnClick = () => {
        alert('artist sign on');
    };

    const isLoading = false;

    return (
        <div className={classNames(cls.ArtistSignOnForm, {}, [className])}>
            <p className={cls.title}>Sign On As Artist</p>
            {/* {error && <Text text="Неверный логин или пароль" theme={TextTheme.ERROR}/>} */}
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
        </div>
    );
});
