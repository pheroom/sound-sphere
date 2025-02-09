import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ArtistsListSchema } from './artistsListSchema.ts';
import { fetchArtistsBySearch } from './services/fetchArtistsBySearch.ts';
import { Artist } from '../artist/artistSchema.ts';

const initialState: ArtistsListSchema = {
    isLoading: false,
    error: undefined,
};

export const artistsListSlice = createSlice({
    name: 'artistsList',
    initialState,
    reducers: {
        setArtists: (state, action: PayloadAction<Artist[]>) => {
            state.artists = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArtistsBySearch.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArtistsBySearch.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(fetchArtistsBySearch.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: artistsListActions } = artistsListSlice;

export const { reducer: artistsListReducer } = artistsListSlice;
