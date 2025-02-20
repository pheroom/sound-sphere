import { Artist } from '../artist/artistSchema.ts';

export interface Track{
    id: number;
    albumId: number;
    name: string;
    pictureURL?: string
    audioURL?: string
    number: number
    artists: Artist[]
}
