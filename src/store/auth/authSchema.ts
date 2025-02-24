export enum TargetTypes{
    USER = 'user',
    ARTIST = 'artist',
    UNLOGIN = 'unlogin',
}

export interface AuthSchema {
    authTarget: TargetTypes
    _inited: boolean
    isLoading: boolean
    error?: string
}
