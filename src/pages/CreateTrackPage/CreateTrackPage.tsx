import { memo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import cls from './CreateTrackPage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { useFetching } from '../../utils/useFetching.ts';
import TrackService from '../../services/TrackService.ts';
import { AppRoutes } from '../../routeConfig.tsx';
import { Form, FormButton, FormError, FormInput, FormInputFile } from '../../ui/Form/Form.tsx';
import { Track } from '../../models/tracsList/tracksListSchema.ts';

interface CreateTrackPageProps {
    className?: string
}

export const CreateTrackPage = memo(({ className }: CreateTrackPageProps) => {
    const navigate = useNavigate();
    const { albumId } = useParams();
    const [createdData, setCreatedData] = useState<Partial<Track>>({ name: '' });
    const [audio, setAudio] = useState<File>();

    const [createTrack, createTrackIsLoading, createTrackError] = useFetching(async (data: FormData) => {
        return TrackService.createTrack(data);
    });

    const confirmClick = async () => {
        if (!albumId || !createdData.name || !audio) return;
        const data = new FormData();
        data.append('albumId', albumId);
        data.append('name', createdData.name);
        data.append('audio', audio, audio.name);

        createTrack(data).then((res) => res && navigate(`${AppRoutes.ARTIST_EDIT_ALBUM}/${albumId}`));
    };

    return (
        <div className={classNames(cls.CreateTrackPage, {}, [className])}>
            <Form title="Add new track">
                <FormInput
                    placeholder="Name"
                    value={createdData.name}
                    setData={setCreatedData}
                    dataName="name"
                />
                <FormInputFile
                    text="Select new audio"
                    accept="audio/*"
                    showName
                    fileName={audio?.name}
                    onChange={(e) => setAudio(e?.[0])}
                />
                <FormButton
                    disabled={createTrackIsLoading}
                    onClick={confirmClick}
                >
                    Confirm
                </FormButton>
                <FormError>{createTrackError}</FormError>
            </Form>
        </div>
    );
});
