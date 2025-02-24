import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../store.ts';
import { getFetchError } from '../../../utils/getFetchError.ts';
import { Artist } from '../../../models/Artist.ts';
import { artistActions } from '../artistSlice.ts';

export const updateArtistProfile = createAsyncThunk<Artist, FormData, ThunkConfig<string>>(
    'artist/updateArtistProfile',
    async (updateArtistData, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.api.patch<Artist>('/artists', updateArtistData);
            if (!response.data) {
                throw new Error();
            }
            const artist = response.data;
            dispatch(artistActions.setAuthData(artist));
            return artist;
        } catch (e: any) {
            console.log(e);
            return rejectWithValue(getFetchError(e));
        }
    },
);
