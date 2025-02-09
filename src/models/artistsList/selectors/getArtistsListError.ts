import { StateSchema } from '../../../store/store.ts';

export const getArtistsListError = (state: StateSchema) => state.artistsList.error;
