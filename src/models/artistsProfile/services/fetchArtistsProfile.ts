import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../store/store.ts';
import { getFetchError } from '../../../utils/getFetchError.ts';
import { Artist } from '../../artist/artistSchema.ts';
import { artistsProfileActions } from '../artistsProfileSlice.ts';

export const fetchArtistsProfile = createAsyncThunk<Artist, number, ThunkConfig<string>>(
    'artistsProfile/fetchArtistsProfile',
    async (artistId, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.api.get<Artist>(`/artists/get-one-by-id/${artistId}`);
            if (!response.data) {
                throw new Error();
            }
            const artist = response.data;
            dispatch(artistsProfileActions.setProfileData(artist));
            return artist;
        } catch (e: any) {
            console.log(e);
            return rejectWithValue(getFetchError(e));
        }
    },
);
