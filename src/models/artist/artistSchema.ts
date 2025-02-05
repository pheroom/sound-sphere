export interface Artist {
    id: number
    username: string
    name: string
    description?: string
    avatarURL?: string
}

export interface LoginArtistDto {
    username: string
    password: string
}

export interface CreateArtistDto {
    username: string
    password: string
    name: string
}

export interface ArtistSchema {
    authData?: Artist
    isLoading: boolean
    error?: string
}
