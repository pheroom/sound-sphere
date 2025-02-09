import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UsersProfileSchema } from './usersProfileSchema.ts';
import { fetchUsersProfile } from './services/fetchUsersProfile.ts';
import { User } from '../user/userSchema.ts';

const initialState: UsersProfileSchema = {
    isLoading: false,
    error: undefined,
};

export const usersProfileSlice = createSlice({
    name: 'usersProfile',
    initialState,
    reducers: {
        setProfileData: (state, action: PayloadAction<User>) => {
            state.profileData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersProfile.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchUsersProfile.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(fetchUsersProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: usersProfileActions } = usersProfileSlice;

export const { reducer: usersProfileReducer } = usersProfileSlice;
