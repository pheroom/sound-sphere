import { memo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import cls from './UsersProfilePage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { getArtistsProfileIsLoading } from '../../models/artistsProfile/selectors/getArtistsProfileIsLoading.ts';
import { PageLoader } from '../../components/PageLoader/PageLoader.tsx';
import { getUsersProfileData } from '../../models/userProfile/selectors/getUsersProfileData.ts';
import { getUsersProfileError } from '../../models/userProfile/selectors/getUsersProfileError.ts';
import { UserCard, UserCardSize } from '../../components/UserCard/UserCard.tsx';
import { fetchUsersProfile } from '../../models/userProfile/services/fetchUsersProfile.ts';
import { ErrorPage } from '../ErrorPage/ErrorPage.tsx';

export const UsersProfilePage = memo(() => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(getUsersProfileData);
    const isLoading = useAppSelector(getArtistsProfileIsLoading);
    const usersProfileError = useAppSelector(getUsersProfileError);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(fetchUsersProfile(+id));
        }
    }, [id, dispatch]);

    if (usersProfileError) return <ErrorPage text={usersProfileError} />;
    if (!user || isLoading) return <PageLoader />;
    return (
        <div className={classNames(cls.UsersProfilePage, {}, [])}>
            <div className={cls.header}>
                <UserCard user={user} className={cls.userCard} />
            </div>
        </div>
    );
});
