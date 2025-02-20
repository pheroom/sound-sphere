import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../store/store.ts';
import { getFetchError } from '../../../utils/getFetchError.ts';
import { Album } from '../../albumsList/albumsListSchema.ts';
import { artistActions } from '../artistSlice.ts';

export interface fetchCreatedAlbumsListProps{
    page?: number
    limit?: number
}

export const fetchCreatedAlbumsList = createAsyncThunk<Album[], fetchCreatedAlbumsListProps, ThunkConfig<string>>(
    'artist/fetchCreatedAlbumsList',
    async (params, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.api.get<Album[]>('/artists/created-albums');
            if (!response.data) {
                throw new Error();
            }
            const albums = response.data;
            console.log(albums);
            dispatch(artistActions.setCreatedAlbums(albums));
            return albums;
        } catch (e: any) {
            console.log(e);
            return rejectWithValue(getFetchError(e));
        }
    },
);
