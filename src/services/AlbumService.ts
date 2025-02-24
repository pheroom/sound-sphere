import { Album, AlbumWithTracks } from '../models/Album.ts';
import { $api, SearchParamsDto } from '../api.ts';

export default class AlbumService {
    static async getAllAlbums(params: SearchParamsDto): Promise<Album[]> {
        const res = await $api.get<Album[]>('/albums/all', { params });
        if (!res.data) {
            throw new Error();
        }
        return res.data;
    }

    static async getAlbumsByAuthArtist(params: SearchParamsDto): Promise<Album[]> {
        const res = await $api.get<Album[]>('/artists/created-albums', { params });
        if (!res.data) {
            throw new Error();
        }
        return res.data;
    }

    static async getAlbumsByArtistId(artistId: number, params: SearchParamsDto): Promise<Album[]> {
        const res = await $api.get<Album[]>(`/artists/albums/${artistId}`, { params });
        if (!res.data) {
            throw new Error();
        }
        return res.data;
    }

    static async getAlbumWithTracksByAuthArtist(albumId: number): Promise<AlbumWithTracks> {
        const res = await $api.get<AlbumWithTracks>(`/albums/artist-with-tracks/${albumId}`);
        if (!res.data) {
            throw new Error();
        }
        return res.data;
    }

    static async getAlbumWithTracks(albumId: number): Promise<AlbumWithTracks> {
        const res = await $api.get<AlbumWithTracks>(`/albums/with-tracks/${albumId}`);
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

    static async getUserFavouritesAlbums(userId: number, params: SearchParamsDto): Promise<Album[]> {
        const res = await $api.get<Album[]>(`/users/favourite-albums/${userId}`, { params });
        if (!res.data) {
            throw new Error();
        }
        return res.data;
    }

    static async addUserFavouritesAlbum(albumId: number) {
        await $api.post(`/users/favourite-albums/${albumId}`);
    }

    static async deleteUserFavouritesAlbum(albumId: number) {
        await $api.delete(`/users/favourite-albums/${albumId}`);
    }
}
