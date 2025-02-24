import { configureStore, Dispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AxiosInstance } from 'axios';
import { $api } from '../api.ts';
import { userReducer } from './user/userSlice.ts';
import { authReducer } from './auth/authSlice.ts';
import { artistReducer } from './artist/artistSlice.ts';
import { playerReducer } from './player/playerSlice.ts';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        artist: artistReducer,
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
