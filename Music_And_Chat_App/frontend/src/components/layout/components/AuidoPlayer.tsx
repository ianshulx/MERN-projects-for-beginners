import { usePlayerStore } from '@/store/usePlayerStore';
import { useChatStore } from '@/store/useChatStore';
import { useUser } from '@clerk/clerk-react';
import { useEffect, useRef } from 'react'

const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const prevSongRef = useRef<string | null>(null);

    const { currentSong, isPlaying, playNext, repeatMode } = usePlayerStore()
    const { socket } = useChatStore();
    const { user } = useUser();

    // Handle play/pause logic
    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play().catch(error => {
                console.error('Error playing audio:', error);
            });
        } else {
            audioRef.current?.pause();
        }
    }, [isPlaying]);

    // Handle song ended event with repeat logic
    useEffect(() => {
        const audio = audioRef.current;
        
        const handleEnded = () => {
            if (repeatMode === 'one') {
                // For repeat one mode, restart the same song
                if (audio) {
                    audio.currentTime = 0;
                    audio.play().catch(console.error);
                }
            } else {
                // For other modes, go to next song
                playNext();
            }
        };
        
        audio?.addEventListener('ended', handleEnded);

        return () => {
            audio?.removeEventListener("ended", handleEnded);
        };
    }, [playNext, repeatMode]);

    // Handle song change
    useEffect(() => {
        if (!audioRef.current || !currentSong) return;
        
        const audio = audioRef.current;
        const isSongChange = prevSongRef.current !== currentSong?.audioUrl;
        
        if (isSongChange) {
            audio.src = currentSong?.audioUrl;
            // Reset the playback position
            audio.currentTime = 0;
            prevSongRef.current = currentSong?.audioUrl;

            // Auto-play if needed
            if (isPlaying) {
                audio.play().catch(error => {
                    console.error('Error playing new song:', error);
                });
            }
        }

    }, [currentSong, isPlaying]);

    // Emit activity update when song changes or play/pause state changes
    useEffect(() => {
        if (!socket || !user) return;

        if (currentSong && isPlaying) {
            const activityMessage = `Playing ${currentSong.title} by ${currentSong.artist}`;
            console.log('Emitting activity:', activityMessage);
            socket.emit('update_activity', { userId: user.id, activity: activityMessage });
        } else if (!isPlaying || !currentSong) {
            console.log('Emitting idle activity');
            socket.emit('update_activity', { userId: user.id, activity: 'Idle' });
        }
    }, [currentSong, isPlaying, socket, user]);

    return (
        <audio 
            ref={audioRef} 
            // Optional: Add these for better error handling
            onError={(e) => console.error('Audio error:', e)}
            onCanPlay={() => console.log('Audio can play')}
            onLoadStart={() => console.log('Audio loading started')}
        />
    )
}

export default AudioPlayer;