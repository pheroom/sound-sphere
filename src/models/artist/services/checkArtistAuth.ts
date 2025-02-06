import { createAsyncThunk } from '@reduxjs/toolkit';
import { Artist } from '../artistSchema.ts';
import { ThunkConfig } from '../../../store/store.ts';
import { getFetchError } from '../../../utils/getFetchError.ts';
import { artistActions } from '../artistSlice.ts';

export const checkArtistAuth = createAsyncThunk<Artist, void, ThunkConfig<string>>(
    'artist/checkArtistAuth',
    async (_, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.api.get<Artist>('/artists/get-one-by-token');
            if (!response.data) {
                throw new Error();
            }
            dispatch(artistActions.setAuthData(response.data));
            return response.data;
        } catch (e: any) {
            console.log(e);
            return rejectWithValue(e);
        }
    },
);
