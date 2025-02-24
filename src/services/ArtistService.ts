import { $api, SearchParamsDto } from '../api.ts';
import { Artist } from '../models/Artist.ts';
import { Album } from '../models/Album.ts';

export default class ArtistService {
    static async getAllArtists(params: SearchParamsDto): Promise<Artist[]> {
        const res = await $api.get<Artist[]>('/artists/all', { params });
        if (!res.data) {
            throw new Error();
        }
        return res.data;
    }

    static async getArtist(artistId: number): Promise<Artist> {
        const res = await $api.get<Artist>(`/artists/get-one-by-id/${artistId}`);
        if (!res.data) {
            throw new Error();
        }
        return res.data;
    }

    static async checkAuthArtist(): Promise<Artist> {
        const res = await $api.get<Artist>('/artists/get-one-by-token');
        if (!res.data) {
            throw new Error();
        }
        return res.data;
    }

    static async updateArtist(updateArtistData: FormData): Promise<Artist> {
        const res = await $api.patch<Artist>('/artists', updateArtistData);
        if (!res.data) {
            throw new Error();
        }
        return res.data;
    }
}
