import { configureStore, Dispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AxiosInstance } from 'axios';
import { $api } from '../api.ts';
import { counterReducer } from '../models/counter/counterSlice.ts';
import { userReducer } from '../models/user/userSlice.ts';
import { authReducer } from '../models/auth/authSlice.ts';
import { artistReducer } from '../models/artist/artistSlice.ts';
import { artistsProfileReducer } from '../models/artistsProfile/artistsProfileSlice.ts';
import { usersProfileReducer } from '../models/userProfile/usersProfileSlice.ts';
import { artistsListReducer } from '../models/artistsList/artistsListSlice.ts';
import { albumsListReducer } from '../models/albumsList/albumsListSlice.ts';
import { playerReducer } from '../models/player/playerSlice.ts';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
        user: userReducer,
        usersProfile: usersProfileReducer,
        artist: artistReducer,
        artistsList: artistsListReducer,
        artistsProfile: artistsProfileReducer,
        albumsList: albumsListReducer,
        player: playerReducer,
    },
    devTools: import.meta.env.DEV,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: {
            extraArgument: {
                api: $api,
            },
        },
    }),
});

export type StateSchema = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;

export interface ThunkExtraArg{
    api: AxiosInstance
}

export interface ThunkConfig<T> {
    rejectValue: T,
    extra: ThunkExtraArg
    dispatch?: Dispatch
    state: StateSchema
}
