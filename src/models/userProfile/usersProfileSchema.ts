import { User } from '../user/userSchema.ts';

export interface UsersProfileSchema {
    profileData?: User
    isLoading: boolean
    error?: string
}
