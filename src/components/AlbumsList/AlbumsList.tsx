import { memo, ReactNode } from 'react';
import { useNavigate } from 'react-router';
import cls from './AlbumsList.module.css';
import { classNames } from '../../utils/classNames.ts';
import { Album } from '../../models/albumsList/albumsListSchema.ts';
import { AppLink } from '../../ui/AppLink/AppLink.tsx';
import { ArtistsLinks } from '../ArtistsLinks/ArtistsLinks.tsx';
import { Picture, PictureSize } from '../../ui/Picture/Picture.tsx';
import { Button, ButtonMode } from '../../ui/Button/Button.tsx';
import { playerActions } from '../../models/player/playerSlice.ts';

interface AlbumsListProps {
    className?: string
    albums?: Album[]
    linkFunc: (id: number) => string
    actions?: [ReactNode, (id: number) => void][]
}

export const AlbumsList = memo(({ className, albums, linkFunc, actions }: AlbumsListProps) => {
    const navigate = useNavigate();

    const clickAlbumHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!(e.target instanceof HTMLDivElement) || e.target?.dataset?.albumId === undefined) return;
        const albumId = Number(e.target?.dataset?.albumId);
        navigate(linkFunc(albumId));
    };

    return (
        <div
            className={classNames(cls.AlbumsList, {}, [className])}
            onClick={(e) => clickAlbumHandler(e)}
        >
            {albums
                ? albums.map((album) => (
                    <div key={album.id} data-album-id={album.id} className={cls.box}>
                        <Picture
                            className={cls.img}
                            size={42}
                            imgSrc={album.pictureURL}
                        />
                        <div className={cls.info}>
                            <div className={cls.title}>{album.name}</div>
                            <ArtistsLinks className={cls.artistsLinks} artists={album.artists} />
                        </div>
                        <div className={cls.actions}>
                            {actions && actions.map(([icon, action], i) => (
                                <Button mode={ButtonMode.TERTIARY} isIcon key={i} onClick={() => action(album.id)}>
                                    {icon}
                                </Button>
                            ))}
                        </div>
                    </div>
                ))
                : <i>No albums added</i>}
        </div>
    );
});
