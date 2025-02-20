import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../store/store.ts';
import { getFetchError } from '../../../utils/getFetchError.ts';
import { Album, CreateAlbumDto } from '../../albumsList/albumsListSchema.ts';

export const artistCreateAlbum = createAsyncThunk<Album, CreateAlbumDto, ThunkConfig<string>>(
    'artist/artistCreateAlbum',
    async (albumDto, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.api.post<Album>('/albums', albumDto);
            if (!response.data) {
                throw new Error();
            }
            const album = response.data;
            return album;
        } catch (e) {
            console.log(e);
            return rejectWithValue(getFetchError(e));
        }
    },
);
