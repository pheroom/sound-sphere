import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../store/store.ts';
import { getFetchError } from '../../../utils/getFetchError.ts';
import { albumsListActions } from '../albumsListSlice.ts';
import { Album } from '../albumsListSchema.ts';

export interface SearchParamsDto{
    query: string
    page: number
    limit: number
}

export const fetchAlbumsList = createAsyncThunk<Album[], SearchParamsDto, ThunkConfig<string>>(
    'albumsList/fetchAlbumsList',
    async (params, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.api.get<Album[]>('/albums/all', { params });
            if (!response.data) {
                throw new Error();
            }
            const albums = response.data;
            console.log(albums);
            dispatch(albumsListActions.setAlbums(albums));
            return albums;
        } catch (e: any) {
            console.log(e);
            return rejectWithValue(getFetchError(e));
        }
    },
);
