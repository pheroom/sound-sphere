import { memo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import cls from './ArtistsProfilePage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { ArtistCard, ArtistCardSize } from '../../components/ArtistCard/ArtistCard.tsx';
import { fetchArtistsProfile } from '../../models/artistsProfile/services/fetchArtistsProfile.ts';
import { getArtistsProfileData } from '../../models/artistsProfile/selectors/getArtistsProfileData.ts';
import { getArtistsProfileError } from '../../models/artistsProfile/selectors/getArtistsProfileError.ts';
import { getArtistsProfileIsLoading } from '../../models/artistsProfile/selectors/getArtistsProfileIsLoading.ts';
import { PageLoader } from '../../components/PageLoader/PageLoader.tsx';
import { ErrorPage } from '../ErrorPage/ErrorPage.tsx';

export const ArtistsProfilePage = memo(() => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const artist = useAppSelector(getArtistsProfileData);
    const isLoading = useAppSelector(getArtistsProfileIsLoading);
    const artistsProfileError = useAppSelector(getArtistsProfileError);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(fetchArtistsProfile(+id));
        }
    }, [id, dispatch]);

    if (artistsProfileError) return <ErrorPage text={artistsProfileError} />;
    if (!artist || isLoading) return <PageLoader />;
    return (
        <div className={classNames(cls.ArtistsProfilePage, {}, [])}>
            <div className={cls.header}>
                <ArtistCard artist={artist} size={ArtistCardSize.L} className={cls.userCard} />
            </div>
        </div>
    );
});
