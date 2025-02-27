import { memo, ReactNode } from 'react';
import { useNavigate } from 'react-router';
import cls from './PlaylistsList.module.css';
import { Picture } from '../../ui/Picture/Picture.tsx';
import { Button, ButtonMode } from '../../ui/Button/Button.tsx';
import { classNames } from '../../utils/classNames.ts';
import { Playlist } from '../../models/Playlist.ts';
import { useFetching } from '../../utils/useFetching.ts';
import { useAppSelector } from '../../store/store.ts';
import { getUserAuthData } from '../../store/user/selectors/getUserAuthData.ts';
import PlaylistService from '../../services/PlaylistService.ts';
import { Loader, LoaderSize } from '../../ui/Loader/Loader.tsx';
import { AppLink, AppLinkMode } from '../../ui/AppLink/AppLink.tsx';
import { AppRoutes } from '../../routeConfig.tsx';
import AddIcon from '../../assets/icons/add.svg?react';
import AddedIcon from '../../assets/icons/added.svg?react';

interface PlaylistsListProps {
    className?: string
    playlists?: Playlist[]
    linkFunc: (id: number) => string
    actions?: [ReactNode, (id: number) => void][]
    isLoading?: boolean
    showFavActions?: boolean
}

export const PlaylistsList = memo(({
    className, playlists, showFavActions, linkFunc, actions, isLoading,
}: PlaylistsListProps) => {
    const navigate = useNavigate();
    const [favouritePlaylist] = useFetching(PlaylistService.addUserFavouritesPlaylist);
    const [unfavouritePlaylist] = useFetching(PlaylistService.deleteUserFavouritesPlaylist);
    const user = useAppSelector(getUserAuthData);

    const clickPlaylistHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!(e.target instanceof HTMLDivElement) || e.target?.dataset?.playlistId === undefined) return;
        const playlistId = Number(e.target?.dataset?.playlistId);
        navigate(linkFunc(playlistId));
    };

    const favouritePlaylistHandler = (playlist: Playlist) => {
        if (!user) return;
        if (playlist.isFavourite) {
            unfavouritePlaylist(playlist.id);
            playlist.isFavourite = false;
        } else {
            favouritePlaylist(playlist.id);
            playlist.isFavourite = true;
        }
    };

    return (
        <div
            className={classNames(cls.PlaylistsList, {}, [className])}
            onClick={(e) => clickPlaylistHandler(e)}
        >
            {playlists?.length
                ? playlists.map((playlist) => (
                    <div key={playlist.id} data-playlist-id={playlist.id} className={cls.box}>
                        <Picture
                            className={cls.img}
                            size={42}
                            imgSrc={playlist.pictureURL}
                        />
                        <div className={cls.info}>
                            <div className={cls.title}>{playlist.name}</div>
                            <AppLink
                                className={cls.userLink}
                                mode={AppLinkMode.LINK}
                                to={AppRoutes.getUsersProfile(playlist.userId)}
                            >
                                {playlist.user?.firstname}
                                {' '}
                                {playlist.user?.lastname}
                            </AppLink>
                        </div>
                        <div className={cls.actions}>
                            {actions && actions.map(([icon, action], i) => (
                                <Button mode={ButtonMode.TERTIARY} isIcon key={i} onClick={() => action(playlist.id)}>
                                    {icon}
                                </Button>
                            ))}
                            {showFavActions
                                && (
                                    <Button
                                        mode={ButtonMode.TERTIARY}
                                        isIcon
                                        onClick={() => favouritePlaylistHandler(playlist)}
                                    >
                                        {playlist.isFavourite
                                            ? <AddedIcon />
                                            : <AddIcon />}
                                    </Button>
                                )}
                        </div>
                    </div>
                ))
                : !isLoading && <i>No playlists added</i>}
            {isLoading && <Loader size={LoaderSize.SMALL} />}
        </div>
    );
});
