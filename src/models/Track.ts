import { Artist } from './Artist.ts';

export interface Track{
    id: number;
    albumId: number;
    name: string;
    pictureURL?: string
    audioURL?: string
    number: number
    isFavourite?: boolean
    artists: Artist[]
}
