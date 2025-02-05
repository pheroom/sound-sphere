import { StateSchema } from '../../../store/store.ts';

export const getArtistIsLoading = (state: StateSchema) => state.artist.isLoading || false;
