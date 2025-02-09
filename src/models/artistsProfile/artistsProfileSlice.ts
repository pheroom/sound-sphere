import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ArtistsProfileSchema } from './artistsProfileSchema.ts';
import { fetchArtistsProfile } from './services/fetchArtistsProfile.ts';
import { Artist } from '../artist/artistSchema.ts';

const initialState: ArtistsProfileSchema = {
    isLoading: false,
    error: undefined,
};

export const artistsProfileSlice = createSlice({
    name: 'artistsProfile',
    initialState,
    reducers: {
        setProfileData: (state, action: PayloadAction<Artist>) => {
            state.profileData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArtistsProfile.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArtistsProfile.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(fetchArtistsProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: artistsProfileActions } = artistsProfileSlice;

export const { reducer: artistsProfileReducer } = artistsProfileSlice;
