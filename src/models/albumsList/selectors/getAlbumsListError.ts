import { StateSchema } from '../../../store/store.ts';

export const getAlbumsListError = (state: StateSchema) => state.albumsList.error;
