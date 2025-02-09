import { StateSchema } from '../../../store/store.ts';

export const getArtistsProfileData = (state: StateSchema) => state.artistsProfile.profileData;
