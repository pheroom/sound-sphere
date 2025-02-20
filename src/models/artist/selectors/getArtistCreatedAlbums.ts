import { StateSchema } from '../../../store/store.ts';

export const getArtistCreatedAlbums = (state: StateSchema) => state.artist.createdAlbums;
