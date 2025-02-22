import { memo, useState } from 'react';
import { useNavigate } from 'react-router';
import cls from './CreateAlbumPage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { AppRoutes } from '../../routeConfig.tsx';
import { Form, FormButton, FormError, FormInput, FormInputFile, FormPictureBox } from '../../ui/Form/Form.tsx';
import { useFetching } from '../../utils/useFetching.ts';
import { Album } from '../../models/albumsList/albumsListSchema.ts';
import AlbumService from '../../services/AlbumService.ts';

interface CreateAlbumPageProps {
    className?: string
}

export const CreateAlbumPage = memo(({ className }: CreateAlbumPageProps) => {
    const navigate = useNavigate();

    const [createdData, setCreatedData] = useState<Partial<Album>>({ name: '' });
    const [picture, setPicture] = useState<File>();

    const [createAlbum, createAlbumIsLoading, createAlbumError] = useFetching(async (data: FormData) => {
        return AlbumService.createAlbum(data);
    });

    const confirmClick = async () => {
        if (!createdData.name) return;
        const data = new FormData();
        data.append('name', createdData.name);
        if (picture) data.append('image', picture, picture.name);

        createAlbum(data).then((res) => res && navigate(AppRoutes.ARTIST_PROFILE));
    };

    return (
        <div className={classNames(cls.CreateAlbumPage, {}, [className])}>
            <Form title="Add new album">
                <FormInput
                    placeholder="Name"
                    value={createdData.name}
                    setData={setCreatedData}
                    dataName="name"
                />
                <FormInputFile
                    text="Select new avatar image"
                    accept="image/*"
                    onChange={(e) => setPicture(e?.[0])}
                />
                <FormButton
                    disabled={createAlbumIsLoading}
                    onClick={confirmClick}
                >
                    Confirm
                </FormButton>
                <FormError>{createAlbumError}</FormError>
            </Form>
            <FormPictureBox
                imgSrc={(picture && URL.createObjectURL(picture))}
                noApiUrl={!!picture}
            />
        </div>
    );
});
