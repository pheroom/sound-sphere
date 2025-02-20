import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import cls from './EditTrackPage.module.css';
import { Form, FormButton, FormError, FormInput, FormInputFile } from '../../ui/Form/Form.tsx';
import { classNames } from '../../utils/classNames.ts';
import { useFetching } from '../../utils/useFetching.ts';
import TrackService from '../../services/TrackService.ts';
import { Track } from '../../models/tracsList/tracksListSchema.ts';

interface EditTrackPageProps {
    className?: string
}

export const EditTrackPage = memo(({ className }: EditTrackPageProps) => {
    const { id: trackId } = useParams();

    const [trackData, setTrackData] = useState<Track | undefined>();
    const [fetchTrack, trackIsLoading, trackError] = useFetching(async (id) => {
        const track = await TrackService.getTrack(id);
        setTrackData(track);
    });
    const [updateTrack, updateTrackIsLoading, updateTrackError] = useFetching(TrackService.updateTrack);
    const [updatesData, setUpdatesData] = useState<Partial<Track>>({ name: '' });
    const [audio, setAudio] = useState<File>();

    useEffect(() => {
        if (trackId) {
            fetchTrack(+trackId);
        }
    }, [trackId]);

    useEffect(() => {
        if (trackData) {
            setUpdatesData({ name: trackData.name });
        }
    }, [trackData]);

    const confirmClick = async () => {
        if (!trackData || !trackId) return;
        let hasChanges = !!audio;
        const formData = new FormData();
        if (audio) formData.append('audio', audio, audio.name);
        Object.entries(updatesData).forEach(([key, value]) => {
            // @ts-ignore
            if (trackData[key] !== value) {
                // @ts-ignore
                formData.append(key, value);
                hasChanges = true;
            }
        });
        if (hasChanges) {
            updateTrack(+trackId, formData);
        }
    };

    return (
        <div className={classNames(cls.EditTrackPage, {}, [className])}>
            <Form title="Edit Track">
                <FormInput
                    placeholder="Name"
                    value={updatesData.name}
                    setData={setUpdatesData}
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
                    disabled={updateTrackIsLoading}
                    onClick={confirmClick}
                >
                    Confirm
                </FormButton>
                <FormError>{updateTrackError}</FormError>
            </Form>
        </div>
    );
});
