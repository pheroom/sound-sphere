import { StateSchema } from '../../store.ts';

export const getArtistAuthData = (state: StateSchema) => state.artist.authData;
