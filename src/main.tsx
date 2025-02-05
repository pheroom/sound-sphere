import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import { Provider } from 'react-redux';
import App from './App.tsx';
import { store } from './store/store.ts';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
);
