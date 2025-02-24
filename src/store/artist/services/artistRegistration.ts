import { createAsyncThunk } from '@reduxjs/toolkit';
import { Artist, CreateArtistDto } from '../../../models/Artist.ts';
import { ARTIST_LOCALSTORAGE_KEY } from '../../../utils/const.ts';
import { ThunkConfig } from '../../store.ts';
import { getFetchError } from '../../../utils/getFetchError.ts';
import { authActions } from '../../auth/authSlice.ts';
import { TargetTypes } from '../../auth/authSchema.ts';
import { artistActions } from '../artistSlice.ts';

export const artistRegistration = createAsyncThunk<Artist, CreateArtistDto, ThunkConfig<string>>(
    'artist/artistRegistration',
    async (authData, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.api.post<{token: string, artist: Artist}>('/auth/artists/registration', authData);
            if (!response.data) {
                throw new Error();
            }
            const { token, artist } = response.data;
            localStorage.setItem(ARTIST_LOCALSTORAGE_KEY, token);
            dispatch(artistActions.setAuthData(artist));
            dispatch(authActions.setAuthTarget(TargetTypes.ARTIST));
            return artist;
        } catch (e) {
            console.log(e);
            return rejectWithValue(getFetchError(e));
        }
    },
);
