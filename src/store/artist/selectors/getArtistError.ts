import { StateSchema } from '../../store.ts';

export const getArtistError = (state: StateSchema) => state.artist.error;
