import NotFoundPage from './pages/NotFoundPage/NotFoundPage.tsx';
import { MainPage } from './pages/MainPage/MainPage.tsx';
import { SignOnPage } from './pages/SignOnPage/SignOnPage.tsx';
import { SignInPage } from './pages/SignInPage/SignInPage.tsx';
import { ArtistSignInPage } from './pages/ArtistSignInPage/ArtistSignInPage.tsx';
import { ArtistSignOnPage } from './pages/ArtistSignOnPage/ArtistSignOnPage.tsx';
import { TargetTypes } from './store/auth/authSchema.ts';
import { UserProfilePage } from './pages/UserProfilePage/UserProfilePage.tsx';
import { ArtistProfilePage } from './pages/ArtistProfilePage/ArtistProfilePage.tsx';
import { EditUserProfilePage } from './pages/EditUserProfilePage/EditUserProfilePage.tsx';
import { EditArtistProfilePage } from './pages/EditArtistProfilePage/EditArtistProfilePage.tsx';
import { ArtistsProfilePage } from './pages/ArtistsProfilePage/ArtistsProfilePage.tsx';
import { UsersProfilePage } from './pages/UsersProfilePage/UsersProfilePage.tsx';
import { ArtistsListPage } from './pages/ArtistsListPage/ArtistsListPage.tsx';
import { CreateAlbumPage } from './pages/CreateAlbumPage/CreateAlbumPage.tsx';
import { EditAlbumPage } from './pages/EditAlbumPage/EditAlbumPage.tsx';
import { CreateTrackPage } from './pages/CreateTrackPage/CreateTrackPage.tsx';
import { EditTrackPage } from './pages/EditTrackPage/EditTrackPage.tsx';
import { AlbumPage } from './pages/AlbumPage/AlbumPage.tsx';
import { ArtistAlbumsPage } from './pages/ArtistAlbumsPage/ArtistAlbumsPage.tsx';
import { TracksListPage } from './pages/TracksListPage/TracksListPage.tsx';
import { TrackPage } from './pages/TrackPage/TrackPage.tsx';
import { AlbumsListPage } from './pages/AlbumsListPage/AlbumsListPage.tsx';
import { FavouritesAlbumsPage } from './pages/FavouritesAlbumsPage/FavouritesAlbumsPage.tsx';
import { CreatePlaylistPage } from './pages/CreatePlaylistPage/CreatePlaylistPage.tsx';
import { PlaylistsListPage } from './pages/PlaylistsListPage/PlaylistsListPage.tsx';
import { CreatedPlaylistsPage } from './pages/CreatedPlaylistsPage/CreatedPlaylistsPage.tsx';
import { FavouritesPlaylistsPage } from './pages/FavouritesPlaylistsPage/FavouritesPlaylistsPage.tsx';
import { PlaylistPage } from './pages/PlaylistPage/PlaylistPage.tsx';

export class AppRoutes {
    static MAIN = '/';
    static ARTIST_SIGN_IN = '/artist-sign-in';
    static ARTIST_SIGN_ON = '/artist-sign-on';
    static SIGN_IN = '/sign-in';
    static SIGN_ON = '/sign-on';
    static PROFILE = '/profile';
    static EDIT_PROFILE = '/edit-profile';
    static USERS_PROFILE = '/users/:id';
    static TRACKS = '/tracks';
    static ALBUMS = '/albums';
    static PLAYLISTS = '/playlists';
    static ARTISTS = '/artists';
    static ARTISTS_PROFILE = '/artists/:id';
    static ARTIST_PROFILE = '/artist-profile';
    static ARTIST_EDIT_PROFILE = '/artist-edit-profile';
    static ARTIST_CREATE_ALBUM = '/artist-create-album';
    static ARTIST_EDIT_ALBUM = '/artist-edit-album';
    static ARTIST_EDIT_ALBUM_PATH = '/artist-edit-album/:id';
    static ARTIST_CREATE_TRACK = '/artist-create-track';
    static ARTIST_CREATE_TRACK_PATH = '/artist-create-track/:albumId';
    static ARTIST_EDIT_TRACK = '/artist-edit-track';
    static ARTIST_EDIT_TRACK_PATH = '/artist-edit-track/:id';

    static getUsersProfile(userId: number | ':id' = ':id') {
        return `/users/${userId}`;
    }

    static getCreateAlbum() {
        return '/create-album';
    }

    static getEditAlbum(albumId: number | ':id' = ':id') {
        return `/edit-album/${albumId}`;
    }

    static getArtistAlbums(artistId: number | ':id' = ':id') {
        return `/artists-albums/${artistId}`;
    }

    static getAlbumWithTracks(albumId: number | ':id' = ':id') {
        return `/albums/${albumId}`;
    }

    static getCreateTrack(albumId: number | ':id' = ':id') {
        return `/create-track/${albumId}`;
    }

    static getEditTrack(trackId: number | ':id' = ':id') {
        return `/edit-track/${trackId}`;
    }

    static getTrack(trackId: number | ':id' = ':id') {
        return `/tracks/${trackId}`;
    }

    static getUserFavouritesAlbums(userId: number | ':id' = ':id') {
        return `/favourites-albums/${userId}`;
    }

    static getUserFavouritesPlaylists(userId: number | ':id' = ':id') {
        return `/favourites-playlists/${userId}`;
    }

    static getUserCreatedPlaylists(userId: number | ':id' = ':id') {
        return `/created-playlists/${userId}`;
    }

    static getPlaylist(playlistId: number | ':id' = ':id') {
        return `/playlists/${playlistId}`;
    }

    static getPlaylists() {
        return '/playlists';
    }

    static getCreatePlaylist() {
        return '/create-playlist';
    }

    static getEditPlaylist(playlistId: number | ':id' = ':id') {
        return `/edit-playlist/${playlistId}`;
    }
}

export type appRouteType = {path: string, element: JSX.Element, targets: TargetTypes[]};

export const routeConfig: appRouteType[] = [
    { path: AppRoutes.MAIN, element: <MainPage />, targets: [TargetTypes.USER, TargetTypes.ARTIST, TargetTypes.UNLOGIN] },
    { path: AppRoutes.ARTIST_SIGN_IN, element: <ArtistSignInPage />, targets: [TargetTypes.UNLOGIN] },
    { path: AppRoutes.ARTIST_SIGN_ON, element: <ArtistSignOnPage />, targets: [TargetTypes.UNLOGIN] },
    { path: AppRoutes.SIGN_IN, element: <SignInPage />, targets: [TargetTypes.UNLOGIN] },
    { path: AppRoutes.SIGN_ON, element: <SignOnPage />, targets: [TargetTypes.UNLOGIN] },

    { path: AppRoutes.PROFILE, element: <UserProfilePage />, targets: [TargetTypes.USER] },
    { path: AppRoutes.EDIT_PROFILE, element: <EditUserProfilePage />, targets: [TargetTypes.USER] },
    { path: AppRoutes.TRACKS, element: <TracksListPage />, targets: [TargetTypes.USER] },
    { path: AppRoutes.ALBUMS, element: <AlbumsListPage />, targets: [TargetTypes.USER] },
    { path: AppRoutes.getUsersProfile(), element: <UsersProfilePage />, targets: [TargetTypes.USER] },
    { path: AppRoutes.getUserFavouritesAlbums(), element: <FavouritesAlbumsPage />, targets: [TargetTypes.USER] },
    { path: AppRoutes.getPlaylists(), element: <PlaylistsListPage />, targets: [TargetTypes.USER] },
    { path: AppRoutes.getUserFavouritesPlaylists(), element: <FavouritesPlaylistsPage />, targets: [TargetTypes.USER] },
    { path: AppRoutes.getCreatePlaylist(), element: <CreatePlaylistPage />, targets: [TargetTypes.USER] },
    { path: AppRoutes.getUserCreatedPlaylists(), element: <CreatedPlaylistsPage />, targets: [TargetTypes.USER] },
    { path: AppRoutes.getPlaylist(), element: <PlaylistPage />, targets: [TargetTypes.USER] },
    { path: AppRoutes.getEditPlaylist(), element: <div>update playlist</div>, targets: [TargetTypes.USER] },

    { path: AppRoutes.ARTIST_PROFILE, element: <ArtistProfilePage />, targets: [TargetTypes.ARTIST] },
    { path: AppRoutes.ARTIST_EDIT_PROFILE, element: <EditArtistProfilePage />, targets: [TargetTypes.ARTIST] },
    { path: AppRoutes.getCreateAlbum(), element: <CreateAlbumPage />, targets: [TargetTypes.ARTIST] },
    { path: AppRoutes.getEditAlbum(), element: <EditAlbumPage />, targets: [TargetTypes.ARTIST] },
    { path: AppRoutes.getCreateTrack(), element: <CreateTrackPage />, targets: [TargetTypes.ARTIST] },
    { path: AppRoutes.getEditTrack(), element: <EditTrackPage />, targets: [TargetTypes.ARTIST] },

    { path: AppRoutes.getArtistAlbums(), element: <ArtistAlbumsPage />, targets: [TargetTypes.USER, TargetTypes.ARTIST] },
    { path: AppRoutes.getAlbumWithTracks(), element: <AlbumPage />, targets: [TargetTypes.USER, TargetTypes.ARTIST] },
    { path: AppRoutes.getTrack(), element: <TrackPage />, targets: [TargetTypes.USER, TargetTypes.ARTIST] },
    { path: AppRoutes.ARTISTS, element: <ArtistsListPage />, targets: [TargetTypes.USER, TargetTypes.ARTIST] },
    { path: AppRoutes.ARTISTS_PROFILE, element: <ArtistsProfilePage />, targets: [TargetTypes.USER, TargetTypes.ARTIST] },

    { path: '*', element: <NotFoundPage />, targets: [TargetTypes.USER, TargetTypes.ARTIST, TargetTypes.UNLOGIN] },
];
