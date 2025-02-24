import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginUserDto, User } from '../../../models/User.ts';
import { USER_LOCALSTORAGE_KEY } from '../../../utils/const.ts';
import { userActions } from '../userSlice.ts';
import { ThunkConfig } from '../../store.ts';
import { getFetchError } from '../../../utils/getFetchError.ts';
import { authActions } from '../../auth/authSlice.ts';
import { TargetTypes } from '../../auth/authSchema.ts';

export const userLoginByUsername = createAsyncThunk<User, LoginUserDto, ThunkConfig<string>>(
    'user/userLoginByUsername',
    async (authData, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.api.post<{token: string, user: User}>('/auth/login', authData);
            if (!response.data) {
                throw new Error();
            }
            const { token, user } = response.data;
            localStorage.setItem(USER_LOCALSTORAGE_KEY, token);
            dispatch(userActions.setAuthData(user));
            dispatch(authActions.setAuthTarget(TargetTypes.USER));
            return user;
        } catch (e: any) {
            console.log(e);
            return rejectWithValue(getFetchError(e));
        }
    },
);
