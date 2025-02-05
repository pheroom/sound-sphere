import { createAsyncThunk } from '@reduxjs/toolkit';
import { ARTIST_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_KEY } from '../../../utils/const.ts';
import { ThunkConfig } from '../../../store/store.ts';
import { checkUserAuth } from '../../user/services/checkUserAuth.ts';
import { authActions } from '../authSlice.ts';
import { TargetTypes } from '../authSchema.ts';
import { checkArtistAuth } from '../../artist/services/checkArtistAuth.ts';

export const checkAuthTarget = createAsyncThunk<void, void, ThunkConfig<string>>(
    'auth/checkAuthTarget',
    async (_, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const userToken = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            const artistToken = localStorage.getItem(ARTIST_LOCALSTORAGE_KEY);
            if (userToken) {
                try {
                    const user = await dispatch(checkUserAuth()).unwrap();
                    dispatch(authActions.setAuthTarget(TargetTypes.USER));
                } catch (e) {
                    localStorage.removeItem(USER_LOCALSTORAGE_KEY);
                    console.log('user error: ', e);
                }
            } else if (artistToken) {
                try {
                    const artist = await dispatch(checkArtistAuth()).unwrap();
                    dispatch(authActions.setAuthTarget(TargetTypes.ARTIST));
                } catch (e) {
                    // localStorage.removeItem(ARTIST_LOCALSTORAGE_KEY);
                    console.log('artist error: ', e);
                }
            }
        } catch (e: any) {
            console.log(e);
            return rejectWithValue(e);
        } finally {
            dispatch(authActions.setInited());
        }
    },
);
