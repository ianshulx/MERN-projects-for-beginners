import type { Song } from "@/types";
import { create } from "zustand";

interface PlayerStore {
    currentSong: Song | null;
    isPlaying: boolean;
    queue: Song[];
    currentIndex: number;
    repeatMode: 'off' | 'all' | 'one';
    isShuffled: boolean;
    originalQueue: Song[]; // Store original order for unshuffle

    initializeQueue: (songs: Song[]) => void;
    playAlbum: (songs: Song[], startIndex?: number) => void;
    setCurrentSong: (song: Song | null) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
    toggleRepeat: () => void;
    setRepeatMode: (mode: 'off' | 'all' | 'one') => void;
    toggleShuffle: () => void;
    shuffleQueue: () => void;
    unshuffleQueue: () => void;
    getNextIndex: () => number | null;
    getPreviousIndex: () => number | null;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
    currentSong: null,
    isPlaying: false,
    queue: [],
    currentIndex: -1,
    repeatMode: 'off',
    isShuffled: false,
    originalQueue: [], // Store original order
    
    initializeQueue: (songs: Song[]) => {
        set({
            queue: songs,
            originalQueue: [...songs], // Store original order
            currentSong: songs[0] || null,
            currentIndex: 0,
            repeatMode: 'off',
            isShuffled: false, // Reset shuffle when new queue
        });
    },
    
    playAlbum: (songs: Song[], startIndex = 0) => {
        if (songs.length === 0) return;

        const index = Math.max(0, Math.min(startIndex, songs.length - 1));
        const song = songs[index];
        
        set({
            queue: songs,
            originalQueue: [...songs], // Store original order
            currentSong: song,
            currentIndex: index,
            isPlaying: true,
            isShuffled: false, // New album starts unshuffled
        });
    },
    
    setCurrentSong: (song: Song | null) => {
        if (!song) {
            set({ 
                currentSong: null, 
                isPlaying: false,
                currentIndex: -1 
            });
            return;
        }

        const songIndex = get().queue.findIndex(s => s._id === song._id);
        set({
            currentSong: song,
            isPlaying: true,
            currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
        });
    },
    
    togglePlay: () => {
        const willStartPlaying = !get().isPlaying;
        set({
            isPlaying: willStartPlaying,
        });
    },
    
    // Spotify-style repeat cycle: off → all → one → off
    toggleRepeat: () => {
        const { repeatMode } = get();
        let nextMode: 'off' | 'all' | 'one';
        
        if (repeatMode === 'off') {
            nextMode = 'all';
        } else if (repeatMode === 'all') {
            nextMode = 'one';
        } else {
            nextMode = 'off';
        }
        
        set({ repeatMode: nextMode });
    },
    
    setRepeatMode: (mode: 'off' | 'all' | 'one') => {
        set({ repeatMode: mode });
    },
    
    // Toggle shuffle on/off
    toggleShuffle: () => {
        const { isShuffled } = get();
        
        if (isShuffled) {
            get().unshuffleQueue();
        } else {
            get().shuffleQueue();
        }
    },
    
    // Shuffle the current queue
    shuffleQueue: () => {
        const { queue, currentSong, currentIndex } = get();
        
        if (queue.length <= 1) return; // Nothing to shuffle
        
        // Fisher-Yates shuffle algorithm
        const shuffled = [...queue];
        let currentSongIndex = currentIndex;
        
        // If there's a current song, ensure it stays in place or handle it
        if (currentSong) {
            // Remove current song from shuffle to keep it in position
            const currentSongItem = shuffled.splice(currentIndex, 1)[0];
            
            // Shuffle the rest
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            
            // Reinsert current song at the beginning
            shuffled.unshift(currentSongItem);
            currentSongIndex = 0;
        } else {
            // No current song, shuffle everything
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            currentSongIndex = -1;
        }
        
        set({
            queue: shuffled,
            currentIndex: currentSongIndex,
            isShuffled: true,
        });
    },
    
    // Restore original queue order
    unshuffleQueue: () => {
        const { originalQueue, currentSong } = get();
        
        if (originalQueue.length === 0) return;
        
        // Find current song index in original queue
        let currentIndex = -1;
        if (currentSong) {
            currentIndex = originalQueue.findIndex(song => song._id === currentSong._id);
        }
        
        set({
            queue: [...originalQueue],
            currentIndex: currentIndex,
            isShuffled: false,
        });
    },
    
    getNextIndex: () => {
        const { currentIndex, queue, repeatMode } = get();
        
        if (queue.length === 0) return null;
        
        // If repeat one mode, stay on current song
        if (repeatMode === 'one') {
            return currentIndex;
        }
        
        // Calculate next index
        const nextIndex = currentIndex + 1;
        
        // If at the end of queue
        if (nextIndex >= queue.length) {
            // If repeat all mode, loop to beginning
            if (repeatMode === 'all') {
                return 0;
            }
            // If repeat off, return null to stop
            return null;
        }
        
        return nextIndex;
    },
    
    getPreviousIndex: () => {
        const { currentIndex, queue, repeatMode } = get();
        
        if (queue.length === 0) return null;
        
        let prevIndex = currentIndex - 1;
        
        // If at the beginning and in repeat all mode, go to last song
        if (prevIndex < 0 && repeatMode === 'all') {
            prevIndex = queue.length - 1;
        }
        
        return prevIndex >= 0 ? prevIndex : null;
    },
    
    playNext: () => {
        const { queue } = get();
        
        if (queue.length === 0) return;
        
        const nextIndex = get().getNextIndex();
        
        if (nextIndex !== null) {
            const nextSong = queue[nextIndex];
            set({
                currentSong: nextSong,
                currentIndex: nextIndex,
                isPlaying: true,
            });
        } else {
            // Stop playback if no next song and not in repeat mode
            set({ 
                isPlaying: false,
            });
        }
    },
    
    playPrevious: () => {
        const { queue } = get();
        
        if (queue.length === 0) return;
        
        const prevIndex = get().getPreviousIndex();
        
        if (prevIndex !== null) {
            const prevSong = queue[prevIndex];
            set({
                currentSong: prevSong,
                currentIndex: prevIndex,
                isPlaying: true,
            });
        } else {
            // Stop at the beginning if not in repeat all mode
            set({ 
                isPlaying: false,
            });
        }
    },
}));