import { StateSchema } from '../../store.ts';

export const getArtistIsLoading = (state: StateSchema) => state.artist.isLoading || false;
