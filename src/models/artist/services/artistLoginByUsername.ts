import { createAsyncThunk } from '@reduxjs/toolkit';
import { Artist, LoginArtistDto } from '../artistSchema.ts';
import { ThunkConfig } from '../../../store/store.ts';
import { getFetchError } from '../../../utils/getFetchError.ts';
import { authActions } from '../../auth/authSlice.ts';
import { TargetTypes } from '../../auth/authSchema.ts';
import { ARTIST_LOCALSTORAGE_KEY } from '../../../utils/const.ts';
import { artistActions } from '../artistSlice.ts';

export const artistLoginByUsername = createAsyncThunk<Artist, LoginArtistDto, ThunkConfig<string>>(
    'artist/artistLoginByUsername',
    async (authData, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.api.post<{token: string, artist: Artist}>('/auth/artists/login', authData);
            if (!response.data) {
                throw new Error();
            }
            const { token, artist } = response.data;
            console.log(token, artist);
            localStorage.setItem(ARTIST_LOCALSTORAGE_KEY, token);
            dispatch(artistActions.setAuthData(artist));
            dispatch(authActions.setAuthTarget(TargetTypes.ARTIST));
            return artist;
        } catch (e: any) {
            console.log(e);
            return rejectWithValue(getFetchError(e));
        }
    },
);
