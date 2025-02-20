import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import { Provider } from 'react-redux';
import App from './App.tsx';
import { store } from './store/store.ts';
import { ErrorBoundary } from './pages/ErrorPage/ErrorBoundary.tsx';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <HashRouter>
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        </HashRouter>
    </Provider>,
);
