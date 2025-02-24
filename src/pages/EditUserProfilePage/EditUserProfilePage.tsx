import { memo, useEffect, useState } from 'react';
import cls from './EditUserProfilePage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { PageLoader } from '../../components/PageLoader/PageLoader.tsx';
import {
    Form,
    FormButton,
    FormError,
    FormInput,
    FormInputFile,
    FormLink, FormPictureBox,
    FormSep,
    FormTextarea,
} from '../../ui/Form/Form.tsx';
import { AppRoutes } from '../../routeConfig.tsx';
import { PictureBorderMode, PicturePlaceholder } from '../../ui/Picture/Picture.tsx';
import { getUserAuthData } from '../../store/user/selectors/getUserAuthData.ts';
import { getUserIsLoading } from '../../store/user/selectors/getUserIsLoading.ts';
import { getUserError } from '../../store/user/selectors/getUserError.ts';
import { UpdateUserDto } from '../../models/User.ts';
import { updateUserProfile } from '../../store/user/services/updateUserProfile.ts';

export const EditUserProfilePage = memo(() => {
    const dispatch = useAppDispatch();

    const user = useAppSelector(getUserAuthData);
    const isLoading = useAppSelector(getUserIsLoading);
    const error = useAppSelector(getUserError);

    const [updatesData, setUpdatesData] = useState<UpdateUserDto>(
        { firstname: '', lastname: '', username: '', description: '' },
    );
    const [avatar, setAvatar] = useState<File>();

    useEffect(() => {
        if (user) {
            setUpdatesData({
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                description: user.description || '' });
        }
    }, [user]);

    const confirmClick = async () => {
        if (!user) return;
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
        if (hasChanges) dispatch(updateUserProfile(formData));
    };

    if (!user) return <PageLoader />;
    return (
        <div className={classNames(cls.EditUserProfilePage, {}, [])}>
            <Form title="Edit Profile">
                <FormInputFile
                    text="Select new avatar image"
                    accept="image/*"
                    onChange={(e) => setAvatar(e?.[0])}
                />
                <FormInput
                    placeholder="Firstname"
                    value={updatesData.firstname}
                    setData={setUpdatesData}
                    dataName="firstname"
                />
                <FormInput
                    placeholder="Lastname"
                    value={updatesData.lastname}
                    setData={setUpdatesData}
                    dataName="lastname"
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
                    to={AppRoutes.PROFILE}
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
