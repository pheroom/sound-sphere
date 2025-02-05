import { StateSchema } from '../../../store/store.ts';

export const getArtistAuthData = (state: StateSchema) => state.artist.authData;
