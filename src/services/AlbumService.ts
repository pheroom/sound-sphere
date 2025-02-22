import { Album, AlbumWithTracks } from '../models/albumsList/albumsListSchema.ts';
import { $api } from '../api.ts';

export default class AlbumService {
    static async getAlbum(id: number): Promise<AlbumWithTracks> {
        const res = await $api.get<AlbumWithTracks>(`/albums/artist-with-tracks/${id}`);
        if (!res.data) {
            throw new Error();
        }
        return res.data;
    }

    static async createAlbum(data: FormData): Promise<Album> {
        const res = await $api.post<Album>('/albums', data);
        if (!res.data) {
            throw new Error();
        }
        return res.data;
    }

    static async updateAlbum(id: number, updates: FormData): Promise<Album> {
        const res = await $api.patch<Album>(`/albums/${id}`, updates);
        if (!res.data) {
            throw new Error();
        }
        return res.data;
    }

    static async deleteAlbum(id: number) {
        await $api.delete(`/albums/${id}`);
    }
}
