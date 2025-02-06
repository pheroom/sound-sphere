import { memo, useEffect, useState } from 'react';
import cls from './EditProfilePage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { getUserAuthData } from '../../models/user/selectors/getUserAuthData.ts';
import { Input } from '../../ui/Input/Input.tsx';
import { Button, ButtonSize, ButtonTheme } from '../../ui/Button/Button.tsx';
import { getUserIsLoading } from '../../models/user/selectors/getUserIsLoading.ts';
import { getUserError } from '../../models/user/selectors/getUserError.ts';
import { Avatar, AvatarSize } from '../../ui/Avatar/Avatar.tsx';
import { InputFile } from '../../ui/InputFile/InputFile.tsx';
import { AppLink, AppLinkMode, AppLinkSize } from '../../ui/AppLink/AppLink.tsx';
import { AppRoutes } from '../../routeConfig.tsx';
import { Textarea } from '../../ui/Textarea/Textarea.tsx';
import { updateUserProfile } from '../../models/user/services/updateUserProfile.ts';
import { UpdateUserDto } from '../../models/user/userSchema.ts';

export const EditProfilePage = memo(() => {
    const dispatch = useAppDispatch();

    const user = useAppSelector(getUserAuthData);
    const isLoading = useAppSelector(getUserIsLoading);
    const error = useAppSelector(getUserError);

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [avatar, setAvatar] = useState<File>();

    useEffect(() => {
        if (user) {
            setFirstname(user.firstname);
            setLastname(user.lastname || '');
            setUsername(user.username);
            setDescription(user.description || '');
        }
    }, [user]);

    const confirmClick = async () => {
        if (!user) return;
        const updates: UpdateUserDto = { username, firstname, lastname, description };
        let hasChanges = !!avatar;
        const formData = new FormData();
        if (avatar) formData.append('image', avatar, avatar.name);
        Object.entries(updates).forEach(([key, value]) => {
            // @ts-ignore
            if (user[key] !== updates[key]) {
                // @ts-ignore
                formData.append(key, updates[key]);
                hasChanges = true;
            }
        });
        if (hasChanges) dispatch(updateUserProfile(formData));
    };

    if (!user) return <div>user data loading...</div>;
    return (
        <div className={classNames(cls.EditProfilePage, {}, [])}>
            <div className={cls.EditProfileForm}>
                <p className={cls.title}>Edit Profile</p>
                <InputFile className={cls.input} text="Select new avatar image" onChange={(e) => setAvatar(e?.[0])} />
                <Input
                    fullWidth
                    placeholder="Firstname"
                    value={firstname}
                    onChange={(value) => setFirstname(value)}
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
                <Textarea
                    classNameBox={cls.input}
                    onChange={(value) => setDescription(value)}
                    value={description}
                    placeholder="Description"
                    autoComplete="off"
                />
                <Button
                    disabled={isLoading}
                    size={ButtonSize.L}
                    theme={ButtonTheme.POSITIVE}
                    onClick={confirmClick}
                    className={cls.button}
                >
                    Confirm
                </Button>
                <div className={cls.sep} />
                <AppLink
                    className={cls.link}
                    size={AppLinkSize.L}
                    mode={AppLinkMode.BUTTON}
                    to={AppRoutes.PROFILE}
                >
                    To profile page
                </AppLink>
                {error && <div className={cls.error}>{error}</div>}
            </div>
            <div className={cls.avatarBox}>
                <p className={cls.avatarBoxText}>Selected new avatar image:</p>
                <Avatar size={AvatarSize.L} noApiUrl imgSrc={avatar && URL.createObjectURL(avatar)} />
            </div>
        </div>
    );
});
