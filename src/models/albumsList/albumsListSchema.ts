import { Artist } from '../artist/artistSchema.ts';
import { Track } from '../tracsList/tracksListSchema.ts';

export interface Album{
    id: number
    name: string
    pictureURL: string
    isPrivate: boolean
    createdAt: string
    artists: Artist[]
}

export interface CreateAlbumDto{
    name: string
}

export interface AlbumWithTracks extends Album {
    tracks: Track[]
}

export interface UpdateAlbumDto{
    name?: string
    isPrivate?: boolean
}

export interface AlbumsListSchema {
    albums?: Album[]
    isLoading: boolean
    error?: string
}
