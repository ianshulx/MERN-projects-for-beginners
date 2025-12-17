import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import type { Album, Song, Stats } from '@/types';
import toast from 'react-hot-toast';

interface MusicStore {
    songs: Song[];
    albums: Album[];
    isLoading: boolean;
    error: string | null;
    currentAlbum: Album | null,
    featuredSongs: Song[],
    madeForYouSongs: Song[],
    trendingSongs: Song[],
    Single: [],
    stats: Stats,
    isSongsLoading: boolean,
    isStatsLoading: boolean,


    fetchAlbums: () => Promise<void>,
    fetchAlbumById: (id: string) => Promise<void>
    fetchFeaturedSongs: () => Promise<void>,
    fetchMadeForYou: () => Promise<void>,
    fetchTrendingSongs: () => Promise<void>,
    fetchStats: () => Promise<void>,
    fetchSongs: () => Promise<void>,
    deleteSong: (id: string) => Promise<void>,
    deleteAlbum: (id: string) => Promise<void>,

    fetchSingleSong: () => Promise<void>,
}



export const useMusicStore = create<MusicStore>((set) => ({
    albums: [],
    songs: [],
    isLoading: false,
    error: null,
    currentAlbum: null,
    featuredSongs: [],
    madeForYouSongs: [],
    trendingSongs: [],
    Single: [],
    stats: {
        totalSongs: 0,
        totalAlbums: 0,
        totalUsers: 0,
        totalArtists: 0,
    },
    isSongsLoading: false,
    isStatsLoading: false,

    fetchSingleSong: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/songs/single');

            if (response.data.success && response.data.songs) {
                set({ Single: response.data.songs });
                console.log('Single song fetched successfully:', response.data.songs);
            } else {
                throw new Error(response.data.message || 'Invalid response format');
            }
        } catch (error) {
            const e = error as any;
            console.error("Error in fetchSingleSong:", e);
            const errorMessage = e?.response?.data?.message || e?.message || "Failed to fetch song";
            set({ error: errorMessage });
            toast.error(errorMessage);
        } finally {
            set({ isLoading: false });
        }
    },

    deleteSong: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.delete(`/admin/songs/${id}`);

            set((state) => ({
                songs: state.songs.filter((song) => song._id !== id),
            }));
            toast.success("Song deleted successfully");
        } catch (error) {
            const e = error as any;
            console.log("Error in deleteSong", e);
            toast.error("Error deleting song");
        } finally {
            set({ isLoading: false });
        }
    },

    deleteAlbum: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.delete(`/admin/albums/${id}`);
            set((state) => ({
                albums: state.albums.filter((album) => album._id !== id),
                songs: state.songs.map((song) =>
                    song.albumId === state.albums.find((a) => a._id === id)?.title ? { ...song, album: null } : song
                ),
            }));
            toast.success("Album deleted successfully");
        } catch (error) {
            const e = error as any;
            toast.error("Failed to delete album: " + (e?.message || e));
        } finally {
            set({ isLoading: false });
        }
    },

    fetchSongs: async () => {
        set({ isSongsLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/songs');
            set({ songs: response.data.songs });
            // console.log(response);

        } catch (error) {
            const e = error as any;
            set({ error: e?.message || 'Error fetching songs' });
        } finally {
            set({ isSongsLoading: false })
        }
    },


    fetchStats: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/stats");
            set({ stats: response.data });
            console.log(response);

        } catch (error) {
            const e = error as any;
            set({ error: e?.message || 'Error fetching stats' });
        } finally {
            set({ isLoading: false });
        }
    },



    fetchAlbums: async () => {
        set({
            isLoading: true,
            error: null,
        });

        try {
            const response = await axiosInstance.get("/albums");
            set({ albums: response.data.albums });
            // console.log(response);


        } catch (error) {
            const e = error as any;
            set({ error: e?.response?.data?.message || e?.message || 'Error fetching albums' })
        } finally {
            set({
                isLoading: false,

            })
        }
    },

    fetchAlbumById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get(`/albums/${id}`);
            set({ currentAlbum: response.data.album });
            // console.log(response);

        } catch (error) {
            const e = error as any;
            set({ error: e?.response?.data?.message || e?.message || 'Error fetching album' });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchFeaturedSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/songs/featured');
            set({ featuredSongs: response.data.songs });
            // console.log(response);
        } catch (error) {
            const e = error as any;
            set({ error: e?.response?.data?.message || e?.message || 'Error fetching featured songs' });
        } finally {
            set({ isLoading: false })
        }

    },
    fetchMadeForYou: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/songs/made-for-you');
            set({ madeForYouSongs: response.data.songs });
            // console.log(response);
        } catch (error) {
            const e = error as any;
            set({ error: e?.response?.data?.message || e?.message || 'Error fetching made-for-you songs' });
        } finally {
            set({ isLoading: false })
        }

    },
    fetchTrendingSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/songs/trending');
            set({ trendingSongs: response.data.songs });
            // console.log(response);
        } catch (error) {
            const e = error as any;
            set({ error: e?.response?.data?.message || e?.message || 'Error fetching trending songs' });
        } finally {
            set({ isLoading: false })
        }
    },

}))

