import { memo } from 'react';
import cls from './ArtistCard.module.css';
import { classNames } from '../../utils/classNames.ts';
import { Artist } from '../../models/Artist.ts';
import { Picture, PictureBorderMode, PicturePlaceholder, PictureSize } from '../../ui/Picture/Picture.tsx';

export enum ArtistCardSize{
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
}

interface ArtistCardProps {
    className?: string,
    artist?: Artist
    size?: ArtistCardSize
}

export const ArtistCard = memo(({ className, artist, size = ArtistCardSize.M }: ArtistCardProps) => {
    if (!artist) return <div>artist data loading...</div>;
    if (size === ArtistCardSize.M) {
        return (
            <div className={classNames(cls.ArtistCard, {}, [className, cls[size]])}>
                <Picture
                    imgSrc={artist.avatarURL}
                    size={PictureSize.XS}
                    borderMode={PictureBorderMode.CIRCLE}
                    picturePlaceholder={PicturePlaceholder.USER}
                    className={cls.avatarImg}
                />
                <div className={cls.info}>
                    <span className={cls.name}>{artist.name}</span>
                    <span className={cls.username}>{artist.username}</span>
                </div>
            </div>
        );
    }
    if (size === ArtistCardSize.S) {
        return (
            <div className={classNames(cls.ArtistCard, {}, [className, cls[size]])}>
                <Picture
                    imgSrc={artist.avatarURL}
                    size={PictureSize.S}
                    borderMode={PictureBorderMode.CIRCLE}
                    picturePlaceholder={PicturePlaceholder.USER}
                    className={cls.avatarImg}
                />
                <div className={cls.info}>
                    <span className={cls.name}>{artist.name}</span>
                    <span className={cls.username}>{artist.username}</span>
                </div>
            </div>
        );
    }
    return (
        <div className={classNames(cls.ArtistCard, {}, [className, cls[size]])}>
            <Picture
                imgSrc={artist.avatarURL}
                borderMode={PictureBorderMode.CIRCLE}
                picturePlaceholder={PicturePlaceholder.USER}
                className={cls.avatarImg}
            />
            <div className={cls.data}>
                <div className={cls.nameBox}>
                    <div className={cls.name}>
                        {artist.name}
                    </div>
                    <div className={cls.username}>{artist.username}</div>
                </div>
                <div className={cls.description}>
                    {artist.description || <i>The description is not set</i>}
                </div>
            </div>
        </div>
    );
});
