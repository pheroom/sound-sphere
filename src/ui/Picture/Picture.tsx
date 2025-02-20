import { memo } from 'react';
import cls from './Picture.module.css';
import { classNames } from '../../utils/classNames.ts';
import musicPlaceholder from '../../assets/musicPlaceholder.png';
import userPlaceholder from '../../assets/avatarPlaceholder.jpg';
import { getFullFilePath } from '../../utils/getFullFilePath.ts';

export enum PictureSize{
    S = 35,
    XS = 50,
    M = 100,
    L = 130,
}

export enum PictureBorderMode{
    BASE = 'border-base',
    CIRCLE = 'border-circle',
}

export enum PicturePlaceholder{
    MUSIC = 'music',
    USER = 'user',
}

const picturePlaceholderDict = {
    [PicturePlaceholder.MUSIC]: musicPlaceholder,
    [PicturePlaceholder.USER]: userPlaceholder,
};

export interface PictureProps {
    className?: string
    size?: PictureSize | number
    borderMode?: PictureBorderMode
    picturePlaceholder?: PicturePlaceholder
    imgSrc?: string
    noApiUrl?: boolean
}

export const Picture = memo(({
    className, size = PictureSize.M, borderMode = PictureBorderMode.BASE, imgSrc, noApiUrl = false,
    picturePlaceholder = PicturePlaceholder.MUSIC,
}: PictureProps) => {
    const styles = {
        width: size,
        height: size,
    };

    return (
        <div
            className={classNames(cls.Picture, {}, [className, cls[borderMode]])}
            style={styles}
        >
            <img
                src={getFullFilePath(imgSrc, noApiUrl) || picturePlaceholderDict[picturePlaceholder]}
                alt="pictureImg"
            />
        </div>
    );
});
