import { User } from '../../models/User.ts';

export interface UserSchema {
    authData?: User
    isLoading: boolean
    error?: string
}
