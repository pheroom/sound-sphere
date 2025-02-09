import { StateSchema } from '../../../store/store.ts';

export const getArtistsListIsLoading = (state: StateSchema) => state.artistsList.isLoading || false;
