import { StateSchema } from '../../../store/store.ts';

export const getArtistsProfileIsLoading = (state: StateSchema) => state.artistsProfile.isLoading || false;
