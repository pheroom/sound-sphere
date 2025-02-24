import { StateSchema } from '../../store.ts';

export const getArtistCreatedAlbums = (state: StateSchema) => state.artist.createdAlbums;
