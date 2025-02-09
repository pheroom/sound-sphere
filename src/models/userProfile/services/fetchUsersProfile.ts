import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../store/store.ts';
import { getFetchError } from '../../../utils/getFetchError.ts';
import { User } from '../../user/userSchema.ts';
import { usersProfileActions } from '../usersProfileSlice.ts';

export const fetchUsersProfile = createAsyncThunk<User, number, ThunkConfig<string>>(
    'usersProfile/fetchUsersProfile',
    async (userId, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.api.get<User>(`/users/get-one-by-id/${userId}`);
            if (!response.data) {
                throw new Error();
            }
            const user = response.data;
            dispatch(usersProfileActions.setProfileData(user));
            return user;
        } catch (e: any) {
            console.log(e);
            return rejectWithValue(getFetchError(e));
        }
    },
);
