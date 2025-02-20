import { StateSchema } from '../../../store/store.ts';

export const getAlbumsListIsLoading = (state: StateSchema) => state.albumsList.isLoading || false;
