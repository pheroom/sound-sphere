import { memo, useState } from 'react';
import { useNavigate } from 'react-router';
import cls from './CreateAlbumPage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { Input } from '../../ui/Input/Input.tsx';
import { InputFile } from '../../ui/InputFile/InputFile.tsx';
import { Button, ButtonSize, ButtonTheme } from '../../ui/Button/Button.tsx';
import { AppRoutes } from '../../routeConfig.tsx';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { getArtistError } from '../../models/artist/selectors/getArtistError.ts';
import { getArtistIsLoading } from '../../models/artist/selectors/getArtistIsLoading.ts';
import { artistCreateAlbum } from '../../models/artist/services/artistCreateAlbum.ts';
import { Picture, PictureSize } from '../../ui/Picture/Picture.tsx';

interface CreateAlbumPageProps {
    className?: string
}

export const CreateAlbumPage = memo(({ className }: CreateAlbumPageProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isLoading = useAppSelector(getArtistIsLoading);
    const error = useAppSelector(getArtistError);

    const [name, setName] = useState('');
    const [picture, setPicture] = useState<File>();

    const confirmClick = async () => {
        if (!name) return;
        const res = await dispatch(artistCreateAlbum({ name }));
        if (res.meta.requestStatus === 'fulfilled') {
            navigate(AppRoutes.ARTIST_PROFILE);
        }
    };

    return (
        <div className={classNames(cls.CreateAlbumPage, {}, [className])}>
            <div className={cls.form}>
                <p className={cls.title}>Add new album</p>
                <Input
                    fullWidth
                    placeholder="Title"
                    value={name}
                    onChange={(value) => setName(value)}
                    autoFocus
                    type="text"
                    classNameBox={cls.input}
                />
                <InputFile
                    className={cls.input}
                    text="Select new album picture"
                    accept="image/*"
                    onChange={(e) => setPicture(e?.[0])}
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
                {error && <div className={cls.error}>{error}</div>}
            </div>
            <div className={cls.pictureBox}>
                <p className={cls.pictureBoxText}>Selected album cover:</p>
                <Picture
                    size={PictureSize.M}
                    imgSrc={picture && URL.createObjectURL(picture)}
                    noApiUrl
                />
            </div>
        </div>
    );
});
