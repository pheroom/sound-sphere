import { Suspense, useEffect } from 'react';
import './styles/index.css';
import { Navbar } from './components/Navbar/Navbar.tsx';
import { classNames } from './utils/classNames.ts';
import { AppRouter } from './components/AppRouter/AppRouter.tsx';
import { Player } from './components/Player/Player.tsx';
import { useAppDispatch, useAppSelector } from './store/store.ts';
import { getAuthInited } from './store/auth/selectors/getAuthInited.ts';
import { checkAuthTarget } from './store/auth/services/checkAuthTarget.ts';
import { PageLoader } from './components/PageLoader/PageLoader.tsx';
import { getAuthIsLoading } from './store/auth/selectors/getAuthIsLoading.ts';
import { getPlayerData } from './store/player/selectors/getPlayerData.ts';

function App() {
    const dispatch = useAppDispatch();
    const isAuthInited = useAppSelector(getAuthInited);
    const authIsLoading = useAppSelector(getAuthIsLoading);
    const { isActive } = useAppSelector(getPlayerData);

    useEffect(() => {
        if (!isAuthInited) {
            dispatch(checkAuthTarget());
        }
    }, [dispatch, isAuthInited]);

    return (
        <div className={classNames('app', {}, [])}>
            <Suspense fallback="">
                <Navbar />
                <div className={classNames('page-layout container', { 'page-layout--offseted': isActive })}>
                    {isAuthInited && <AppRouter />}
                </div>
                <Player />
                {authIsLoading && <PageLoader />}
            </Suspense>
        </div>
    );
}

export default App;
