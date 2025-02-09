import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../store/store.ts';
import { getFetchError } from '../../../utils/getFetchError.ts';
import { Artist } from '../../artist/artistSchema.ts';
import { artistsListActions } from '../artistsListSlice.ts';

export interface SearchParamsDto{
    query: string
    page: number
    limit: number
}

export const fetchArtistsBySearch = createAsyncThunk<Artist[], SearchParamsDto, ThunkConfig<string>>(
    'artistsList/fetchArtistsBySearch',
    async (params, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.api.get<Artist[]>('/artists/all', { params });
            if (!response.data) {
                throw new Error();
            }
            const artists = response.data;
            dispatch(artistsListActions.setArtists(artists));
            return artists;
        } catch (e: any) {
            console.log(e);
            return rejectWithValue(getFetchError(e));
        }
    },
);
