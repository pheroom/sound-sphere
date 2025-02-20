import { memo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import cls from './CreateTrackPage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { Input } from '../../ui/Input/Input.tsx';
import { InputFile } from '../../ui/InputFile/InputFile.tsx';
import { Button, ButtonSize, ButtonTheme } from '../../ui/Button/Button.tsx';
import { useFetching } from '../../utils/useFetching.ts';
import TrackService from '../../services/TrackService.ts';
import { AppRoutes } from '../../routeConfig.tsx';

interface CreateTrackPageProps {
    className?: string
}

export const CreateTrackPage = memo(({ className }: CreateTrackPageProps) => {
    const navigate = useNavigate();
    const { albumId } = useParams();
    const [name, setName] = useState('');
    const [audio, setAudio] = useState<File>();

    const [createTrack, createTrackIsLoading, createTrackError] = useFetching(async (data: FormData) => {
        await TrackService.createTrack(data);
    });

    const confirmClick = async () => {
        if (!albumId || !name || !audio) return;
        const data = new FormData();
        if (name) data.append('albumId', albumId);
        if (name) data.append('name', name);
        if (audio) data.append('audio', audio, audio.name);

        createTrack(data).then(() => navigate(`${AppRoutes.ARTIST_EDIT_ALBUM}/${albumId}`));
    };

    return (
        <div className={classNames(cls.CreateTrackPage, {}, [className])}>
            <div className={cls.form}>
                <p className={cls.title}>Add new track</p>
                <Input
                    fullWidth
                    placeholder="Name"
                    value={name}
                    onChange={(value) => setName(value)}
                    autoFocus
                    type="text"
                    classNameBox={cls.input}
                />
                <InputFile
                    className={cls.input}
                    text="Select track audio"
                    accept="audio/*"
                    showName
                    fileName={audio?.name}
                    onChange={(e) => setAudio(e?.[0])}
                />
                <Button
                    disabled={createTrackIsLoading}
                    size={ButtonSize.L}
                    theme={ButtonTheme.POSITIVE}
                    onClick={confirmClick}
                    className={cls.button}
                >
                    Confirm
                </Button>
                {createTrackError && <div className={cls.error}>{createTrackError}</div>}
            </div>
        </div>
    );
});
