import { Album, AlbumWithTracks } from '../models/albumsList/albumsListSchema.ts';
import { $api } from '../api.ts';
import { Track } from '../models/tracsList/tracksListSchema.ts';

export default class TrackService {
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
}
