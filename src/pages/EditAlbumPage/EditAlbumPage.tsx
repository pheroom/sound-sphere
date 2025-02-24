import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import cls from './EditAlbumPage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { AlbumWithTracks, UpdateAlbumDto } from '../../models/Album.ts';
import { PageLoader } from '../../components/PageLoader/PageLoader.tsx';
import { TracksList } from '../../components/TracksList/TracksList.tsx';
import DeleteIcon from '../../assets/icons/delete.svg?react';
import { AppLink, AppLinkMode } from '../../ui/AppLink/AppLink.tsx';
import { AppRoutes } from '../../routeConfig.tsx';
import { useFetching } from '../../utils/useFetching.ts';
import AlbumService from '../../services/AlbumService.ts';
import { Form, FormButton, FormError, FormInput, FormInputFile, FormPictureBox } from '../../ui/Form/Form.tsx';
import { ErrorPage } from '../ErrorPage/ErrorPage.tsx';
import TrackService from '../../services/TrackService.ts';
import { Text, TextMode } from '../../ui/Text/Text.tsx';
import { ListTemplate } from '../../components/ListTemplate/ListTemplate.tsx';

interface EditAlbumPageProps {
    className?: string
}

export const EditAlbumPage = memo(({ className }: EditAlbumPageProps) => {
    const { id: albumId } = useParams();

    const [albumData, setAlbumData] = useState<AlbumWithTracks | undefined>();
    const [fetchAlbum, albumIsLoading, albumError] = useFetching(async (id) => {
        const album = await AlbumService.getAlbumWithTracksByAuthArtist(id);
        setAlbumData(album);
    });
    const [updateAlbum, updateAlbumIsLoading, updateAlbumError] = useFetching(AlbumService.updateAlbum);
    const [deleteTrack, deleteTrackIsLoading, deleteTrackError] = useFetching(TrackService.deleteAlbum);
    const [updatesData, setUpdatesData] = useState<UpdateAlbumDto>({ name: '' });
    const [picture, setPicture] = useState<File>();

    useEffect(() => {
        if (albumId) {
            fetchAlbum(+albumId);
        }
    }, [albumId]);

    useEffect(() => {
        if (albumData) {
            setUpdatesData({ name: albumData.name });
        }
    }, [albumData]);

    const confirmClick = async () => {
        if (!albumData || !albumId) return;
        let hasChanges = !!picture;
        const formData = new FormData();
        if (picture) formData.append('image', picture, picture.name);
        Object.entries(updatesData).forEach(([key, value]) => {
            // console.log(ke)
            // @ts-ignore
            if (albumData[key] !== value) {
                // @ts-ignore
                formData.append(key, value);
                hasChanges = true;
            }
        });
        if (hasChanges) {
            updateAlbum(+albumId, formData);
        }
    };

    const deleteTrackHandler = async (trackId: number) => {
        await deleteTrack(trackId);
        setAlbumData((prev) => {
            if (!prev) return prev;
            const tracks = prev.tracks.filter(({ id: curTrackId }) => curTrackId !== trackId);
            return { ...prev, tracks };
        });
    };

    if (albumError) return <ErrorPage text={albumError} />;
    if (!albumData || !albumId) return <PageLoader />;
    return (
        <div className={classNames(cls.EditAlbumPage, {}, [className])}>
            <div className={cls.editFormBox}>
                <Form title="Edit Album" alignTitle="flex-start">
                    <FormInput
                        placeholder="Name"
                        value={updatesData.name}
                        setData={setUpdatesData}
                        dataName="name"
                    />
                    <FormInputFile
                        text="Select new avatar image"
                        accept="image/*"
                        onChange={(e) => setPicture(e?.[0])}
                    />
                    <FormButton
                        disabled={updateAlbumIsLoading}
                        onClick={confirmClick}
                    >
                        Confirm
                    </FormButton>
                    <FormError>{updateAlbumError}</FormError>
                </Form>
                <FormPictureBox
                    imgSrc={(picture && URL.createObjectURL(picture)) || albumData.pictureURL}
                    noApiUrl={!!picture}
                />
            </div>
            <ListTemplate
                title="Albums Tracks"
                linkPath={AppRoutes.getCreateTrack(+albumId)}
                linkText="Add track"
                error={deleteTrackError}
            >
                <TracksList
                    tracks={albumData.tracks}
                    linkFunc={AppRoutes.getEditTrack}
                    actions={[[<DeleteIcon />, deleteTrackHandler]]}
                    // actions={[[<AddIcon />, () => console.log('fd')]]}
                />
            </ListTemplate>
        </div>
    );
});
