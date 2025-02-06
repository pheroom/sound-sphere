import { memo, useEffect, useState } from 'react';
import cls from './EditArtistProfilePage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { Input } from '../../ui/Input/Input.tsx';
import { Button, ButtonSize, ButtonTheme } from '../../ui/Button/Button.tsx';
import { Avatar, AvatarSize } from '../../ui/Avatar/Avatar.tsx';
import { InputFile } from '../../ui/InputFile/InputFile.tsx';
import { AppLink, AppLinkMode, AppLinkSize } from '../../ui/AppLink/AppLink.tsx';
import { AppRoutes } from '../../routeConfig.tsx';
import { Textarea } from '../../ui/Textarea/Textarea.tsx';
import { getArtistAuthData } from '../../models/artist/selectors/getArtistAuthData.ts';
import { getArtistIsLoading } from '../../models/artist/selectors/getArtistIsLoading.ts';
import { getArtistError } from '../../models/artist/selectors/getArtistError.ts';
import { updateArtistProfile } from '../../models/artist/services/updateArtistProfile.ts';
import { UpdateArtistDto } from '../../models/artist/artistSchema.ts';

export const EditArtistProfilePage = memo(() => {
    const dispatch = useAppDispatch();

    const artist = useAppSelector(getArtistAuthData);
    const isLoading = useAppSelector(getArtistIsLoading);
    const error = useAppSelector(getArtistError);

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [avatar, setAvatar] = useState<File>();

    useEffect(() => {
        if (artist) {
            setName(artist.name);
            setUsername(artist.username);
            setDescription(artist.description || '');
        }
    }, [artist]);

    const confirmClick = async () => {
        if (!artist) return;
        const updates: UpdateArtistDto = { username, name, description };
        let hasChanges = !!avatar;
        const formData = new FormData();
        if (avatar) formData.append('image', avatar, avatar.name);
        Object.entries(updates).forEach(([key, value]) => {
            // @ts-ignore
            if (artist[key] !== updates[key]) {
                // @ts-ignore
                formData.append(key, updates[key]);
                hasChanges = true;
            }
        });
        if (hasChanges) dispatch(updateArtistProfile(formData));
    };

    if (!artist) return <div>artist data loading...</div>;
    return (
        <div className={classNames(cls.EditArtistProfilePage, {}, [])}>
            <div className={cls.EditProfileForm}>
                <p className={cls.title}>Edit Profile</p>
                <InputFile className={cls.input} text="Select new avatar image" onChange={(e) => setAvatar(e?.[0])} />
                <Input
                    fullWidth
                    placeholder="Firstname"
                    value={name}
                    onChange={(value) => setName(value)}
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
                    to={AppRoutes.ARTIST_PROFILE}
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
