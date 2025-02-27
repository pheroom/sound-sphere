import { $api, SearchParamsDto } from '../api.ts';
import { Track } from '../models/Track.ts';

export default class TrackService {
    static async getAllTracks(params: SearchParamsDto): Promise<Track[]> {
        const res = await $api.get<Track[]>('/tracks/all', { params });
        if (!res.data) {
            throw new Error();
        }
        return res.data;
    }

    static async getTrack(id: number): Promise<Track> {
        const res = await $api.get<Track>(`/tracks/get-one-by-id/${id}`);
        if (!res.data) {
            throw new Error();
        }
        return res.data;
    }

    static async createTrack(data: FormData): Promise<Track> {
        const res = await $api.post<Track>('/tracks', data);
        if (!res.data) {
            throw new Error();
        }
        console.log(res);
        return res.data;
    }

    static async updateTrack(id: number, updates: FormData): Promise<Track> {
        const res = await $api.patch<Track>(`/tracks/${id}`, updates);
        if (!res.data) {
            throw new Error();
        }
        return res.data;
    }

    static async deleteAlbum(id: number) {
        await $api.delete(`/tracks/${id}`);
    }

    static async getUserFavouritesTracks(userId: number, params: SearchParamsDto): Promise<Track[]> {
        const res = await $api.get<Track[]>(`/users/favourite-tracks/${userId}`, { params });
        if (!res.data) {
            throw new Error();
        }
        return res.data;
    }

    static async addUserFavouritesTrack(trackId: number) {
        await $api.post(`/users/favourite-tracks/${trackId}`);
    }

    static async deleteUserFavouritesTrack(trackId: number) {
        await $api.delete(`/users/favourite-tracks/${trackId}`);
    }
}
