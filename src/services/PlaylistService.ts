import { Album, AlbumWithTracks } from '../models/Album.ts';
import { $api, SearchParamsDto } from '../api.ts';
import { Playlist, PlaylistWithTracks } from '../models/Playlist.ts';

export default class PlaylistService {
    static async getAllPlaylists(params: SearchParamsDto): Promise<Playlist[]> {
        const res = await $api.get<Playlist[]>('/playlists/all', { params });
        if (!res.data) {
            throw new Error();
        }
        return res.data;
    }

    static async getCreatedPlaylists(userId: number, params: SearchParamsDto): Promise<Playlist[]> {
        const res = await $api.get<Playlist[]>(`/users/playlists/${userId}`, { params });
        if (!res.data) {
            throw new Error();
        }
        return res.data;
    }

    static async getFavouritesPlaylists(userId: number, params: SearchParamsDto): Promise<Playlist[]> {
        const res = await $api.get<Playlist[]>(`/users/favourite-playlists/${userId}`, { params });
        if (!res.data) {
            throw new Error();
        }
        return res.data;
    }

    static async getPlaylistWithTracks(playlistId: number): Promise<PlaylistWithTracks> {
        const res = await $api.get<PlaylistWithTracks>(`/playlists/with-tracks/${playlistId}`);
        if (!res.data) {
            throw new Error();
        }
        return res.data;
    }

    static async createPlaylist(data: FormData): Promise<Playlist> {
        const res = await $api.post<Playlist>('/playlists', data);
        if (!res.data) {
            throw new Error();
        }
        return res.data;
    }

    static async updatePlaylist(id: number, updates: FormData): Promise<Playlist> {
        const res = await $api.patch<Playlist>(`/playlists/${id}`, updates);
        if (!res.data) {
            throw new Error();
        }
        return res.data;
    }

    static async deletePlaylist(id: number) {
        await $api.delete(`/playlists/${id}`);
    }

    static async addTrackToPlaylist(playlistId: number, trackId: number) {
        await $api.post(`/playlists/tracks/${playlistId}/${trackId}`);
    }

    static async deleteTrackFromPlaylist(playlistId: number, trackId: number) {
        await $api.delete(`/playlists/tracks/${playlistId}/${trackId}`);
    }

    static async addUserFavouritesPlaylist(playlistId: number) {
        await $api.post(`/users/favourite-playlists/${playlistId}`);
    }

    static async deleteUserFavouritesPlaylist(playlistId: number) {
        await $api.delete(`/users/favourite-playlists/${playlistId}`);
    }
}
