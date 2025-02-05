import { Suspense, useEffect } from 'react';
import './styles/index.css';
import { Navbar } from './components/Navbar/Navbar.tsx';
import { classNames } from './utils/classNames.ts';
import { AppRouter } from './components/AppRouter/AppRouter.tsx';
import { Player } from './components/Player/Player.tsx';
import { useAppDispatch, useAppSelector } from './store/store.ts';
import { getAuthInited } from './models/auth/selectors/getAuthInited.ts';
import { checkAuthTarget } from './models/auth/services/checkAuthTarget.ts';

function App() {
    const dispatch = useAppDispatch();
    const isAuthInited = useAppSelector(getAuthInited);

    useEffect(() => {
        if (!isAuthInited) {
            dispatch(checkAuthTarget());
        }
    }, [dispatch, isAuthInited]);

    return (
        <div className={classNames('app', {}, [])}>
            <Suspense fallback="">
                <Navbar />
                <div className="page-layout container">
                    {isAuthInited && <AppRouter />}
                </div>
                <Player />
            </Suspense>
        </div>
    );
}

export default App;
