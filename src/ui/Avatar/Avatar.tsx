import { memo } from 'react';
import cls from './Avatar.module.css';
import { classNames } from '../../utils/classNames.ts';
import avatarPlaceholder from '../../assets/avatarPlaceholder.png';
import { getFullFilePath } from '../../utils/getFullFilePath.ts';

export enum AvatarSize{
    S = 'size_s',
    XS = 'size_xs',
    M = 'size_m',
    L = 'size_l',
}

interface AvatarProps {
    className?: string
    size?: AvatarSize
    imgSrc?: string
    noApiUrl?: boolean
}

export const Avatar = memo(({ className, size = AvatarSize.M, imgSrc, noApiUrl = false }: AvatarProps) => {
    return (
        <div className={classNames(cls.Avatar, {}, [className, cls[size]])}>
            <img src={getFullFilePath(imgSrc, noApiUrl) || avatarPlaceholder} alt="avatarImg" />
        </div>
    );
});
