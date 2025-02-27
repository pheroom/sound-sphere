import { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import cls from './UsersProfilePage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { PageLoader } from '../../components/PageLoader/PageLoader.tsx';
import { UserCard, UserCardSize } from '../../components/UserCard/UserCard.tsx';
import { ErrorPage } from '../ErrorPage/ErrorPage.tsx';
import { useFetching } from '../../utils/useFetching.ts';
import { User } from '../../models/User.ts';
import UserService from '../../services/UserService.ts';

export const UsersProfilePage = memo(() => {
    const navigate = useNavigate();
    const { id: userId } = useParams();
    const [user, setUser] = useState<User | undefined>();
    const [fetchUser, userIsLoading, userError] = useFetching(async (id) => {
        const user = await UserService.getUser(id);
        setUser(user);
    });

    useEffect(() => {
        if (userId) {
            fetchUser(userId);
        }
    }, [userId]);

    if (userError) return <ErrorPage text={userError} />;
    if (!user || userIsLoading) return <PageLoader />;
    return (
        <div className={classNames(cls.UsersProfilePage, {}, [])}>
            <div className={cls.header}>
                <UserCard user={user} size={UserCardSize.L} className={cls.userCard} />
            </div>
        </div>
    );
});
