import { memo } from 'react';
import cls from './Avatar.module.css';
import { classNames } from '../../utils/classNames.ts';
import avatarPlaceholder from '../../assets/avatarPlaceholder.jpg';

export enum AvatarSize{
    S = 'size_s',
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
    const getFullFilePath = (name?: string) => {
        if (noApiUrl) return name;
        if (!name) return '';
        return import.meta.env.VITE_STATIC_URL + name;
    };

    return (
        <div className={classNames(cls.Avatar, {}, [className, cls[size]])}>
            <img src={getFullFilePath(imgSrc) || avatarPlaceholder} alt="avatarImg" />
        </div>
    );
});
