import { memo, useEffect, useState } from 'react';
import cls from './EditArtistProfilePage.module.css';
import { classNames } from '../../utils/classNames.ts';
import {
    Form,
    FormButton,
    FormError,
    FormInput,
    FormInputFile,
    FormLink,
    FormPictureBox,
    FormSep,
    FormTextarea,
} from '../../ui/Form/Form.tsx';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { getArtistAuthData } from '../../models/artist/selectors/getArtistAuthData.ts';
import { getArtistIsLoading } from '../../models/artist/selectors/getArtistIsLoading.ts';
import { getArtistError } from '../../models/artist/selectors/getArtistError.ts';
import { UpdateArtistDto } from '../../models/artist/artistSchema.ts';
import { updateArtistProfile } from '../../models/artist/services/updateArtistProfile.ts';
import { PageLoader } from '../../components/PageLoader/PageLoader.tsx';
import { AppRoutes } from '../../routeConfig.tsx';
import { PictureBorderMode, PicturePlaceholder } from '../../ui/Picture/Picture.tsx';

export const EditArtistProfilePage = memo(() => {
    const dispatch = useAppDispatch();

    const artist = useAppSelector(getArtistAuthData);
    const isLoading = useAppSelector(getArtistIsLoading);
    const error = useAppSelector(getArtistError);

    const [updatesData, setUpdatesData] = useState<UpdateArtistDto>(
        { name: '', username: '', description: '' },
    );
    const [avatar, setAvatar] = useState<File>();

    useEffect(() => {
        if (artist) {
            setUpdatesData({ name: artist.name, username: artist.username, description: artist.description || '' });
        }
    }, [artist]);

    const confirmClick = async () => {
        if (!artist) return;
        // const updates: UpdateArtistDto = { username, name, description };
        let hasChanges = !!avatar;
        const formData = new FormData();
        if (avatar) formData.append('image', avatar, avatar.name);
        Object.entries(updatesData).forEach(([key, value]) => {
            // @ts-ignore
            if (artist[key] !== updatesData[key]) {
                // @ts-ignore
                formData.append(key, updatesData[key]);
                hasChanges = true;
            }
        });
        if (hasChanges) dispatch(updateArtistProfile(formData));
    };

    if (!artist) return <PageLoader />;
    return (
        <div className={classNames(cls.EditArtistProfilePage, {}, [])}>
            <Form title="Edit Profile">
                <FormInputFile
                    text="Select new avatar image"
                    accept="image/*"
                    onChange={(e) => setAvatar(e?.[0])}
                />
                <FormInput
                    placeholder="Name"
                    value={updatesData.name}
                    setData={setUpdatesData}
                    dataName="name"
                />
                <FormInput
                    placeholder="Username"
                    value={updatesData.username}
                    setData={setUpdatesData}
                    dataName="username"
                />
                <FormTextarea
                    placeholder="Description"
                    value={updatesData.description}
                    setData={setUpdatesData}
                    dataName="description"
                />
                <FormButton
                    disabled={isLoading}
                    onClick={confirmClick}
                >
                    Confirm
                </FormButton>
                <FormSep />
                <FormLink
                    to={AppRoutes.ARTIST_PROFILE}
                >
                    To profile page
                </FormLink>
                <FormError>{error}</FormError>
            </Form>
            <FormPictureBox
                borderMode={PictureBorderMode.CIRCLE}
                imgSrc={avatar && URL.createObjectURL(avatar)}
                picturePlaceholder={PicturePlaceholder.USER}
                noApiUrl
            />
        </div>
    );
});
