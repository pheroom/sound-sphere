export interface User{
    id: number
    username: string
    firstname: string
    lastname?: string
    description?: string
    avatarURL?: string
}

export interface LoginUserDto {
    username: string
    password: string
}

export interface CreateUserDto {
    username: string
    password: string
    firstname: string
    lastname?: string
}

export interface UserSchema{
    authData?: User
    isLoading: boolean
    error?: string
}
