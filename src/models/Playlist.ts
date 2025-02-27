import { Track } from './Track.ts';
import { User } from './User.ts';

export interface Playlist{
    id: number
    name: string
    description: string
    pictureURL: string
    isPrivate: boolean
    createdAt: string
    isFavourite?: boolean
    user: User
    userId: number
}

export interface PlaylistWithTracks extends Playlist {
    tracks: Track[]
}
