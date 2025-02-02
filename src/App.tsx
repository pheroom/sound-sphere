import { Suspense } from 'react';
import './styles/index.css';
import { Navbar } from './components/Navbar/Navbar.tsx';
import { classNames } from './utils/classNames.ts';
import { AppRouter } from './components/AppRouter/AppRouter.tsx';

function App() {
    return (
        <div className={classNames('app', {}, [])}>
            <Suspense fallback="">
                <Navbar />
                <div className="page-layout container">
                    {/* {userInited && <AppRouter/>} */}
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
}

export default App;
