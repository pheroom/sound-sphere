import { StateSchema } from '../../../store/store.ts';

export const getArtistsProfileError = (state: StateSchema) => state.artistsProfile.error;
