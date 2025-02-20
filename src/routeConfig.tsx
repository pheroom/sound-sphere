import NotFoundPage from './pages/NotFoundPage/NotFoundPage.tsx';
import { MainPage } from './pages/MainPage/MainPage.tsx';
import { SignOnPage } from './pages/SignOnPage/SignOnPage.tsx';
import { SignInPage } from './pages/SignInPage/SignInPage.tsx';
import { ArtistSignInPage } from './pages/ArtistSignInPage/ArtistSignInPage.tsx';
import { ArtistSignOnPage } from './pages/ArtistSignOnPage/ArtistSignOnPage.tsx';
import { TargetTypes } from './models/auth/authSchema.ts';
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

export enum AppRoutes{
    MAIN = '/',
    ARTIST_SIGN_IN = '/artist-sign-in',
    ARTIST_SIGN_ON = '/artist-sign-on',
    SIGN_IN = '/sign-in',
    SIGN_ON = '/sign-on',
    PROFILE = '/profile',
    EDIT_PROFILE = '/edit-profile',
    USERS_PROFILE = '/users/:id',
    TRACKS = '/tracks',
    ALBUMS = '/albums',
    PLAYLISTS = '/playlists',
    ARTISTS = '/artists',
    ARTISTS_PROFILE = '/artists/:id',
    ARTIST_PROFILE = '/artist-profile',
    ARTIST_EDIT_PROFILE = '/artist-edit-profile',
    ARTIST_CREATE_ALBUM = '/artist-create-album',
    ARTIST_EDIT_ALBUM = '/artist-edit-album',
    ARTIST_EDIT_ALBUM_PATH = '/artist-edit-album/:id',
    ARTIST_CREATE_TRACK = '/artist-create-track',
    ARTIST_CREATE_TRACK_PATH = '/artist-create-track/:albumId',
    ARTIST_EDIT_TRACK = '/artist-edit-track',
    ARTIST_EDIT_TRACK_PATH = '/artist-edit-track/:id',
}

export type appRouteType = {path: AppRoutes | '*', element: JSX.Element, targets: TargetTypes[]};

export const routeConfig: appRouteType[] = [
    { path: AppRoutes.MAIN, element: <MainPage />, targets: [TargetTypes.USER, TargetTypes.ARTIST, TargetTypes.UNLOGIN] },
    { path: AppRoutes.ARTIST_SIGN_IN, element: <ArtistSignInPage />, targets: [TargetTypes.UNLOGIN] },
    { path: AppRoutes.ARTIST_SIGN_ON, element: <ArtistSignOnPage />, targets: [TargetTypes.UNLOGIN] },
    { path: AppRoutes.SIGN_IN, element: <SignInPage />, targets: [TargetTypes.UNLOGIN] },
    { path: AppRoutes.SIGN_ON, element: <SignOnPage />, targets: [TargetTypes.UNLOGIN] },

    { path: AppRoutes.PROFILE, element: <UserProfilePage />, targets: [TargetTypes.USER] },
    { path: AppRoutes.EDIT_PROFILE, element: <EditUserProfilePage />, targets: [TargetTypes.USER] },
    { path: AppRoutes.TRACKS, element: <>tracks</>, targets: [TargetTypes.USER] },
    { path: AppRoutes.ALBUMS, element: <>albums</>, targets: [TargetTypes.USER] },
    { path: AppRoutes.PLAYLISTS, element: <>playlists</>, targets: [TargetTypes.USER] },
    { path: AppRoutes.USERS_PROFILE, element: <UsersProfilePage />, targets: [TargetTypes.USER] },

    { path: AppRoutes.ARTIST_PROFILE, element: <ArtistProfilePage />, targets: [TargetTypes.ARTIST] },
    { path: AppRoutes.ARTIST_EDIT_PROFILE, element: <EditArtistProfilePage />, targets: [TargetTypes.ARTIST] },
    { path: AppRoutes.ARTIST_CREATE_ALBUM, element: <CreateAlbumPage />, targets: [TargetTypes.ARTIST] },
    { path: AppRoutes.ARTIST_EDIT_ALBUM_PATH, element: <EditAlbumPage />, targets: [TargetTypes.ARTIST] },
    { path: AppRoutes.ARTIST_CREATE_TRACK_PATH, element: <CreateTrackPage />, targets: [TargetTypes.ARTIST] },
    { path: AppRoutes.ARTIST_EDIT_TRACK_PATH, element: <EditTrackPage />, targets: [TargetTypes.ARTIST] },

    { path: AppRoutes.ARTISTS, element: <ArtistsListPage />, targets: [TargetTypes.USER, TargetTypes.ARTIST] },
    { path: AppRoutes.ARTISTS_PROFILE, element: <ArtistsProfilePage />, targets: [TargetTypes.USER, TargetTypes.ARTIST] },

    { path: '*', element: <NotFoundPage />, targets: [TargetTypes.USER, TargetTypes.ARTIST, TargetTypes.UNLOGIN] },
];
