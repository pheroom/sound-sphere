import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { AuthSchema, TargetTypes } from './authSchema.ts';
import { userLoginByUsername } from '../user/services/userLoginByUsername.ts';
import { userRegistration } from '../user/services/userRegistration.ts';
import { checkUserAuth } from '../user/services/checkUserAuth.ts';
import { User } from '../../models/User.ts';
import { checkAuthTarget } from './services/checkAuthTarget.ts';
import { USER_LOCALSTORAGE_KEY } from '../../utils/const.ts';
import { authLogout } from './services/authLogout.ts';

const initialState: AuthSchema = {
    authTarget: TargetTypes.UNLOGIN,
    _inited: false,
    isLoading: false,
    error: undefined,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthTarget: (state, action: PayloadAction<TargetTypes>) => {
            state.authTarget = action.payload;
        },
        resetAuthTarget: (state) => {
            state.authTarget = TargetTypes.UNLOGIN;
        },
        setInited: (state) => {
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuthTarget.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(checkAuthTarget.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(checkAuthTarget.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(authLogout.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(authLogout.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(authLogout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: authActions } = authSlice;

export const { reducer: authReducer } = authSlice;
