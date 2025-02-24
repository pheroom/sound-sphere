import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../store.ts';
import { checkUserAuth } from '../../user/services/checkUserAuth.ts';
import { authActions } from '../authSlice.ts';
import { TargetTypes } from '../authSchema.ts';
import { getFetchError } from '../../../utils/getFetchError.ts';
import { getAuthTarget } from '../selectors/getAuthTarget.ts';
import { userActions } from '../../user/userSlice.ts';
import { ARTIST_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_KEY } from '../../../utils/const.ts';
import { artistActions } from '../../artist/artistSlice.ts';

export const authLogout = createAsyncThunk<void, void, ThunkConfig<string>>(
    'auth/logout',
    async (_, thunkAPI) => {
        const { extra, dispatch, rejectWithValue, getState } = thunkAPI;
        try {
            const authTarget = getAuthTarget(getState());
            switch (authTarget) {
                case TargetTypes.USER:
                    dispatch(userActions.logout());
                    localStorage.removeItem(USER_LOCALSTORAGE_KEY);
                    break;
                case TargetTypes.ARTIST:
                    dispatch(artistActions.logout());
                    localStorage.removeItem(ARTIST_LOCALSTORAGE_KEY);
                    break;
            }
        } catch (e) {
            console.log(e);
            return rejectWithValue(getFetchError(e));
        } finally {
            dispatch(authActions.resetAuthTarget());
        }
    },
);
