import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Artist, ArtistSchema } from './artistSchema.ts';
import { artistLoginByUsername } from './services/artistLoginByUsername.ts';
import { artistRegistration } from './services/artistRegistration.ts';
import { checkArtistAuth } from './services/checkArtistAuth.ts';

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
            .addCase(checkArtistAuth.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(checkArtistAuth.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(checkArtistAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: artistActions } = artistSlice;

export const { reducer: artistReducer } = artistSlice;
