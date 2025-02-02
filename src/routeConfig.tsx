import NotFoundPage from './pages/NotFoundPage/NotFoundPage.tsx';
import { MainPage } from './pages/MainPage/MainPage.tsx';

export enum AppRoutes{
    MAIN = '/',
    ARTIST_SIGN_IN = '/artist-sign-in',
    ARTIST_SIGN_ON = '/artist-sign-on',
    SIGN_IN = '/sign-in',
    SIGN_ON = '/sign-on',
    TRACKS = '/tracks',
    ALBUMS = '/albums',
}

export enum TargetTypes{
    USER = 'user',
    ARTIST = 'artist',
    UNLOGIN = 'unlogin',
}

export type appRouteType = {path: AppRoutes | '*', element: JSX.Element, targets: TargetTypes[]};

export const routeConfig: appRouteType[] = [
    { path: AppRoutes.MAIN, element: <MainPage />, targets: [TargetTypes.USER, TargetTypes.ARTIST, TargetTypes.UNLOGIN] },
    { path: AppRoutes.ARTIST_SIGN_IN, element: <>artist sign in</>, targets: [TargetTypes.UNLOGIN] },
    { path: AppRoutes.ARTIST_SIGN_ON, element: <>artist sign on</>, targets: [TargetTypes.UNLOGIN] },
    { path: AppRoutes.SIGN_IN, element: <>sign in</>, targets: [TargetTypes.UNLOGIN] },
    { path: AppRoutes.SIGN_ON, element: <>sign on</>, targets: [TargetTypes.UNLOGIN] },

    { path: AppRoutes.TRACKS, element: <>tracks</>, targets: [TargetTypes.USER, TargetTypes.ARTIST] },
    { path: AppRoutes.ALBUMS, element: <>albums</>, targets: [TargetTypes.USER, TargetTypes.ARTIST] },

    { path: '*', element: <NotFoundPage />, targets: [TargetTypes.USER, TargetTypes.ARTIST, TargetTypes.UNLOGIN] },
];
