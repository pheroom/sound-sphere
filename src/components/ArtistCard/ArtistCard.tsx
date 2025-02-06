import { memo } from 'react';
import cls from './ArtistCard.module.css';
import { classNames } from '../../utils/classNames.ts';
import { Avatar, AvatarSize } from '../../ui/Avatar/Avatar.tsx';
import { Artist } from '../../models/artist/artistSchema.ts';

export enum ArtistCardSize{
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
}

interface UserCardProps {
    className?: string,
    artist?: Artist
    size?: ArtistCardSize
}

export const ArtistCard = memo(({ className, artist, size = ArtistCardSize.M }: UserCardProps) => {
    if (!artist) return <div>user data loading...</div>;
    if (size === ArtistCardSize.S) {
        return (
            <div className={classNames(cls.ArtistCard, {}, [className, cls[size]])}>
                <Avatar
                    imgSrc={artist.avatarURL}
                    size={AvatarSize.S}
                    className={cls.avatarImg}
                />
                <div className={cls.userInfo}>
                    <span className={cls.fullname}>{artist.name}</span>
                    <span className={cls.username}>{artist.username}</span>
                </div>
            </div>
        );
    }
    return (
        <div className={classNames(cls.ArtistCard, {}, [className, cls[size]])}>
            <Avatar imgSrc={artist.avatarURL} />
            <div className={cls.userData}>
                <div className={cls.userName}>
                    <div className={cls.userFullname}>
                        {artist.name}
                    </div>
                    <div className={cls.userUsername}>{artist.username}</div>
                </div>
                <div className={cls.userDescription}>
                    {artist.description || <i>The description is not set</i>}
                </div>
            </div>
        </div>
    );
});
