import { Artist } from './Artist.ts';
import { Track } from './Track.ts';

export interface Album{
    id: number
    name: string
    pictureURL: string
    isPrivate: boolean
    createdAt: string
    isFavourite?: boolean
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
