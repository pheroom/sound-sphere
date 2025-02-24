import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Artist } from '../../models/Artist.ts';
import { artistLoginByUsername } from './services/artistLoginByUsername.ts';
import { artistRegistration } from './services/artistRegistration.ts';
import { updateArtistProfile } from './services/updateArtistProfile.ts';
import { artistCreateAlbum } from './services/artistCreateAlbum.ts';
import { Album } from '../../models/Album.ts';
import { fetchCreatedAlbumsList } from './services/fetchCreatedAlbumsList.ts';
import { ArtistSchema } from './artistSchema.ts';

const initialState: ArtistSchema = {
    isLoading: false,
    error: undefined,
};

export const artistSlice = createSlice({
    name: 'artist',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<Artist>) => {
            state.authData = action.payload;
        },
        logout: (state) => {
            state.authData = undefined;
        },
        setCreatedAlbums: (state, action: PayloadAction<Album[]>) => {
            state.createdAlbums = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(artistLoginByUsername.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(artistLoginByUsername.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(artistLoginByUsername.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(artistRegistration.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(artistRegistration.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(artistRegistration.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateArtistProfile.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(updateArtistProfile.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(updateArtistProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(artistCreateAlbum.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(artistCreateAlbum.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(artistCreateAlbum.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchCreatedAlbumsList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchCreatedAlbumsList.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(fetchCreatedAlbumsList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: artistActions } = artistSlice;

export const { reducer: artistReducer } = artistSlice;
