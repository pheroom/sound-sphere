import { Artist } from '../artist/artistSchema.ts';

export interface ArtistsProfileSchema {
    profileData?: Artist
    isLoading: boolean
    error?: string
}
