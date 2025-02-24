import { $api } from '../api.ts';
import { User } from '../models/User.ts';

export default class UserService {
    static async getUser(userId: number): Promise<User> {
        const res = await $api.get<User>(`/users/get-one-by-id/${userId}`);
        if (!res.data) {
            throw new Error();
        }
        return res.data;
    }

    static async checkAuthUser(): Promise<User> {
        const res = await $api.get<User>('/users/get-one-by-token');
        if (!res.data) {
            throw new Error();
        }
        return res.data;
    }

    static async updateUser(updateUserData: FormData): Promise<User> {
        const res = await $api.patch<User>('/users', updateUserData);
        if (!res.data) {
            throw new Error();
        }
        return res.data;
    }
}
