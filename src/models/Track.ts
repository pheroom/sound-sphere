import { Artist } from './Artist.ts';
import { User } from './User.ts';

export interface Track{
    id: number;
    albumId: number;
    name: string;
    pictureURL?: string
    audioURL?: string
    number: number
    favouriteOfUsers?: User[]
    isFavourite?: boolean
    artists: Artist[]
}
