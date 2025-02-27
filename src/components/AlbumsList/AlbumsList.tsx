import { memo, ReactNode } from 'react';
import { useNavigate } from 'react-router';
import cls from './AlbumsList.module.css';
import { classNames } from '../../utils/classNames.ts';
import { Album } from '../../models/Album.ts';
import { ArtistsLinks } from '../ArtistsLinks/ArtistsLinks.tsx';
import { Picture, PictureSize } from '../../ui/Picture/Picture.tsx';
import { Button, ButtonMode } from '../../ui/Button/Button.tsx';
import { Track } from '../../models/Track.ts';
import AddIcon from '../../assets/icons/add.svg?react';
import AddedIcon from '../../assets/icons/added.svg?react';
import { useFetching } from '../../utils/useFetching.ts';
import TrackService from '../../services/TrackService.ts';
import { useAppSelector } from '../../store/store.ts';
import { getUserAuthData } from '../../store/user/selectors/getUserAuthData.ts';
import AlbumService from '../../services/AlbumService.ts';
import { Loader, LoaderSize } from '../../ui/Loader/Loader.tsx';

interface AlbumsListProps {
    className?: string
    albums?: Album[]
    linkFunc: (id: number) => string
    actions?: [ReactNode, (id: number) => void][]
    showFavActions?: boolean
    isLoading?: boolean
}

export const AlbumsList = memo(({
    className, albums, showFavActions, linkFunc, actions, isLoading,
}: AlbumsListProps) => {
    const navigate = useNavigate();
    const [favouriteAlbum] = useFetching(AlbumService.addUserFavouritesAlbum);
    const [unfavouriteAlbum] = useFetching(AlbumService.deleteUserFavouritesAlbum);
    const user = useAppSelector(getUserAuthData);

    const clickAlbumHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!(e.target instanceof HTMLDivElement) || e.target?.dataset?.albumId === undefined) return;
        const albumId = Number(e.target?.dataset?.albumId);
        navigate(linkFunc(albumId));
    };

    const favouriteAlbumHandler = (album: Album) => {
        if (!user) return;
        console.log(album);
        if (album.isFavourite) {
            unfavouriteAlbum(album.id);
            album.isFavourite = false;
        } else {
            favouriteAlbum(album.id);
            album.isFavourite = true;
        }
    };

    return (
        <div
            className={classNames(cls.AlbumsList, {}, [className])}
            onClick={(e) => clickAlbumHandler(e)}
        >
            {albums?.length
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
                            {showFavActions
                                && (
                                    <Button
                                        mode={ButtonMode.TERTIARY}
                                        isIcon
                                        onClick={() => favouriteAlbumHandler(album)}
                                    >
                                        {album.isFavourite
                                            ? <AddedIcon />
                                            : <AddIcon />}
                                    </Button>
                                )}
                        </div>
                    </div>
                ))
                : isLoading && <i>No albums added</i>}
            {isLoading && <Loader size={LoaderSize.SMALL} />}
        </div>
    );
});
