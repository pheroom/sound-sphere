import { StateSchema } from '../../../store/store.ts';

export const getArtistsListData = (state: StateSchema) => state.artistsList.artists;
