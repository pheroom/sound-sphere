import axios from 'axios';
import { ARTIST_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_KEY } from './utils/const.ts';

export const $api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        authorization:
            `Bearer ${localStorage.getItem(USER_LOCALSTORAGE_KEY) || localStorage.getItem(ARTIST_LOCALSTORAGE_KEY) || ''}`,
    },
});
