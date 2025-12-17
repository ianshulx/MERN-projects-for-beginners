import { Button } from '@/components/ui/button';
import { usePlayerStore } from '@/store/usePlayerStore'
import type { Song } from '@/types'
import { Pause, Play } from 'lucide-react';

const PlayButton = ({ song }: { song: Song }) => {
    const { togglePlay, isPlaying, setCurrentSong, currentSong } = usePlayerStore();
    const isCurrentSong = currentSong?._id === song._id


    const handlePlay = () => {
        if(isCurrentSong) togglePlay();
        else setCurrentSong(song)
    }
    return (
       <Button
			size={"icon"}
			onClick={handlePlay}
			className={`absolute bottom-5 rounded-full right-2 bg-green-500 hover:bg-green-400 hover:scale-105 transition-all 
				opacity-0 translate-y-2  ${
					isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"
				}`}
		>
			{isCurrentSong && isPlaying ? (
				<Pause className='size-5 text-black' />
			) : (
				<Play className='size-5 text-black' />
			)}
		</Button>
    )
}

export default PlayButton