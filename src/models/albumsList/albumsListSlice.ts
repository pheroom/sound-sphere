import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Album, AlbumsListSchema } from './albumsListSchema.ts';
import { fetchAlbumsList } from './services/fetchAlbumsList.ts';

const initialState: AlbumsListSchema = {
    isLoading: false,
    error: undefined,
};

export const albumsListSlice = createSlice({
    name: 'albumsList',
    initialState,
    reducers: {
        setAlbums: (state, action: PayloadAction<Album[]>) => {
            state.albums = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAlbumsList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchAlbumsList.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(fetchAlbumsList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: albumsListActions } = albumsListSlice;

export const { reducer: albumsListReducer } = albumsListSlice;
