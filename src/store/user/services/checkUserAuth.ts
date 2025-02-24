import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { LoginUserDto, User } from '../../../models/User.ts';
import { USER_LOCALSTORAGE_KEY } from '../../../utils/const.ts';
import { userActions } from '../userSlice.ts';
import { ThunkConfig } from '../../store.ts';
import { getFetchError } from '../../../utils/getFetchError.ts';

export const checkUserAuth = createAsyncThunk<User, void, ThunkConfig<string>>(
    'user/checkUserAuth',
    async (_, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.api.get<User>('/users/get-one-by-token');
            if (!response.data) {
                throw new Error();
            }
            dispatch(userActions.setAuthData(response.data));
            return response.data;
        } catch (e: any) {
            console.log(e);
            return rejectWithValue(e);
        }
    },
);
