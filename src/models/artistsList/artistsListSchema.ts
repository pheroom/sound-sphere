import { Artist } from '../artist/artistSchema.ts';

export interface ArtistsListSchema {
    artists?: Artist[]
    isLoading: boolean
    error?: string
}
