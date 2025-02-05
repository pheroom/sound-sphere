import { StateSchema } from '../../../store/store.ts';

export const getArtistError = (state: StateSchema) => state.artist.error;
