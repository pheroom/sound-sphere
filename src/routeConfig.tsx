import NotFoundPage from './pages/NotFoundPage/NotFoundPage.tsx';
import { MainPage } from './pages/MainPage/MainPage.tsx';
import { SignOnPage } from './pages/SignOnPage/SignOnPage.tsx';
import { SignInPage } from './pages/SignInPage/SignInPage.tsx';
import { ArtistSignInPage } from './pages/ArtistSignInPage/ArtistSignInPage.tsx';
import { ArtistSignOnPage } from './pages/ArtistSignOnPage/ArtistSignOnPage.tsx';
import { TargetTypes } from './models/auth/authSchema.ts';
import { ProfilePage } from './pages/ProfilePage/ProfilePage.tsx';
import { ArtistProfilePage } from './pages/ArtistProfilePage/ArtistProfilePage.tsx';
import { EditProfilePage } from './pages/EditProfilePage/EditProfilePage.tsx';
import { EditArtistProfilePage } from './pages/EditArtistProfilePage/EditArtistProfilePage.tsx';

export enum AppRoutes{
    MAIN = '/',
    ARTIST_SIGN_IN = '/artist-sign-in',
    ARTIST_SIGN_ON = '/artist-sign-on',
    SIGN_IN = '/sign-in',
    SIGN_ON = '/sign-on',
    TRACKS = '/tracks',
    ALBUMS = '/albums',
    PLAYLISTS = '/playlists',
    ARTISTS = '/artists',
    PROFILE = '/profile',
    EDIT_PROFILE = '/edit-profile',
    ARTIST_PROFILE = '/artist-profile',
    ARTIST_EDIT_PROFILE = '/artist-edit-profile',
}

export type appRouteType = {path: AppRoutes | '*', element: JSX.Element, targets: TargetTypes[]};

export const routeConfig: appRouteType[] = [
    { path: AppRoutes.MAIN, element: <MainPage />, targets: [TargetTypes.USER, TargetTypes.ARTIST, TargetTypes.UNLOGIN] },
    { path: AppRoutes.ARTIST_SIGN_IN, element: <ArtistSignInPage />, targets: [TargetTypes.UNLOGIN] },
    { path: AppRoutes.ARTIST_SIGN_ON, element: <ArtistSignOnPage />, targets: [TargetTypes.UNLOGIN] },
    { path: AppRoutes.SIGN_IN, element: <SignInPage />, targets: [TargetTypes.UNLOGIN] },
    { path: AppRoutes.SIGN_ON, element: <SignOnPage />, targets: [TargetTypes.UNLOGIN] },

    { path: AppRoutes.PROFILE, element: <ProfilePage />, targets: [TargetTypes.USER] },
    { path: AppRoutes.EDIT_PROFILE, element: <EditProfilePage />, targets: [TargetTypes.USER] },
    { path: AppRoutes.TRACKS, element: <>tracks</>, targets: [TargetTypes.USER] },
    { path: AppRoutes.ALBUMS, element: <>albums</>, targets: [TargetTypes.USER] },
    { path: AppRoutes.PLAYLISTS, element: <>playlists</>, targets: [TargetTypes.USER] },
    { path: AppRoutes.ARTISTS, element: <>artists</>, targets: [TargetTypes.USER] },

    { path: AppRoutes.ARTIST_PROFILE, element: <ArtistProfilePage />, targets: [TargetTypes.ARTIST] },
    { path: AppRoutes.ARTIST_EDIT_PROFILE, element: <EditArtistProfilePage />, targets: [TargetTypes.ARTIST] },

    { path: '*', element: <NotFoundPage />, targets: [TargetTypes.USER, TargetTypes.ARTIST, TargetTypes.UNLOGIN] },
];
