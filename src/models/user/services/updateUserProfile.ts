import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../userSchema.ts';
import { userActions } from '../userSlice.ts';
import { ThunkConfig } from '../../../store/store.ts';
import { getFetchError } from '../../../utils/getFetchError.ts';

export const updateUserProfile = createAsyncThunk<User, FormData, ThunkConfig<string>>(
    'user/updateUserProfile',
    async (updateUserData, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.api.patch<User>('/users', updateUserData);
            if (!response.data) {
                throw new Error();
            }
            const user = response.data;
            dispatch(userActions.setAuthData(user));
            return user;
        } catch (e: any) {
            console.log(e);
            return rejectWithValue(getFetchError(e));
        }
    },
);
