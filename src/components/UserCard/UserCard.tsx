import { memo } from 'react';
import cls from './UserCard.module.css';
import { classNames } from '../../utils/classNames.ts';
import { Avatar, AvatarSize } from '../../ui/Avatar/Avatar.tsx';
import { User } from '../../models/user/userSchema.ts';

export enum UserCardSize{
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
}

interface UserCardProps {
    className?: string,
    user?: User
    size?: UserCardSize
}

export const UserCard = memo(({ className, user, size = UserCardSize.M }: UserCardProps) => {
    if (!user) return <div>user data loading...</div>;
    if (size === UserCardSize.M) {
        return (
            <div className={classNames(cls.UserCard, {}, [className, cls[size]])}>
                <Avatar
                    imgSrc={user.avatarURL}
                    size={AvatarSize.S}
                    className={cls.avatarImg}
                />
                <div className={cls.userInfo}>
                    <span className={cls.fullname}>{`${user.firstname} ${user.lastname || ''}`}</span>
                    <span className={cls.username}>{user.username}</span>
                </div>
            </div>
        );
    }
    if (size === UserCardSize.S) {
        return (
            <div className={classNames(cls.UserCard, {}, [className, cls[size]])}>
                <Avatar
                    imgSrc={user.avatarURL}
                    size={AvatarSize.S}
                    className={cls.avatarImg}
                />
                <div className={cls.userInfo}>
                    <span className={cls.fullname}>{`${user.firstname} ${user.lastname || ''}`}</span>
                    <span className={cls.username}>{user.username}</span>
                </div>
            </div>
        );
    }
    return (
        <div className={classNames(cls.UserCard, {}, [className, cls[size]])}>
            <Avatar imgSrc={user.avatarURL} />
            <div className={cls.data}>
                <div className={cls.nameBox}>
                    <div className={cls.fullname}>
                        {`${user.firstname} ${user.lastname || ''}`}
                    </div>
                    <div className={cls.username}>{user.username}</div>
                </div>
                <div className={cls.description}>
                    {user.description || <i>The description is not set</i>}
                </div>
            </div>
        </div>
    );
});
