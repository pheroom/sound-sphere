import { memo, useState } from 'react';
import { useNavigate } from 'react-router';
import cls from './CreatePlaylistPage.module.css';
import {
    Form,
    FormButton,
    FormError,
    FormInput,
    FormInputFile,
    FormPictureBox,
    FormTextarea,
} from '../../ui/Form/Form.tsx';
import { classNames } from '../../utils/classNames.ts';
import { Album } from '../../models/Album.ts';
import { useFetching } from '../../utils/useFetching.ts';
import AlbumService from '../../services/AlbumService.ts';
import { AppRoutes } from '../../routeConfig.tsx';
import PlaylistService from '../../services/PlaylistService.ts';
import { Playlist } from '../../models/Playlist.ts';
import { useAppSelector } from '../../store/store.ts';
import { getUserAuthData } from '../../store/user/selectors/getUserAuthData.ts';

interface CreatePlaylistPageProps {
    className?: string
}

export const CreatePlaylistPage = memo(({ className }: CreatePlaylistPageProps) => {
    const navigate = useNavigate();
    const user = useAppSelector(getUserAuthData);

    const [createdData, setCreatedData] = useState<Partial<Playlist>>({ name: '', description: '' });
    const [picture, setPicture] = useState<File>();

    const [createPlaylist, createPlaylistIsLoading, createPlaylistError] = useFetching(async (data: FormData) => {
        return PlaylistService.createPlaylist(data);
    });

    const confirmClick = async () => {
        if (!user || !createdData.name) return;
        const data = new FormData();
        data.append('name', createdData.name);
        if (createdData.description) data.append('description', createdData.description);
        if (picture) data.append('image', picture, picture.name);

        createPlaylist(data).then((res) => res && navigate(AppRoutes.getUserCreatedPlaylists(user.id)));
    };

    return (
        <div className={classNames(cls.CreatePlaylistPage, {}, [className])}>
            <Form title="Add new playlist">
                <FormInputFile
                    text="Select new avatar image"
                    accept="image/*"
                    onChange={(e) => setPicture(e?.[0])}
                />
                <FormInput
                    placeholder="Name"
                    value={createdData.name}
                    setData={setCreatedData}
                    dataName="name"
                />
                <FormTextarea
                    placeholder="Description"
                    value={createdData.description}
                    setData={setCreatedData}
                    dataName="description"
                />
                <FormButton
                    disabled={createPlaylistIsLoading}
                    onClick={confirmClick}
                >
                    Confirm
                </FormButton>
                <FormError>{createPlaylistError}</FormError>
            </Form>
            <FormPictureBox
                imgSrc={(picture && URL.createObjectURL(picture))}
                noApiUrl={!!picture}
            />
        </div>
    );
});
