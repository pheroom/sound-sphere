import { StateSchema } from '../../../store/store.ts';

export const getAlbumsListData = (state: StateSchema) => state.albumsList.albums;
