import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { userLoginByUsername } from './services/userLoginByUsername.ts';
import { userRegistration } from './services/userRegistration.ts';
import { updateUserProfile } from './services/updateUserProfile.ts';
import { UserSchema } from './userSchema.ts';
import { User } from '../../models/User.ts';

const initialState: UserSchema = {
    isLoading: false,
    error: undefined,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        logout: (state) => {
            state.authData = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLoginByUsername.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(userLoginByUsername.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(userLoginByUsername.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(userRegistration.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(userRegistration.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(userRegistration.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateUserProfile.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: userActions } = userSlice;

export const { reducer: userReducer } = userSlice;
