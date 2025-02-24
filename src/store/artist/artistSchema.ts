import { Album } from '../../models/Album.ts';
import { Artist } from '../../models/Artist.ts';

export interface ArtistSchema {
    createdAlbums?: Album[]
    authData?: Artist
    isLoading: boolean
    error?: string
}
