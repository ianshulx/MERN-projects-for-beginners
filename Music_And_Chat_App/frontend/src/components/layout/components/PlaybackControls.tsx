import { usePlayerStore } from '@/store/usePlayerStore'
import { useEffect, useRef, useState } from 'react'
import { Slider } from "@/components/ui/slider"
import { Button } from '@/components/ui/button';
import { Laptop2, ListMusic, Mic2, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume1 } from 'lucide-react';

const formatTime = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);
	return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};



const PlaybackControls = () => {
	const { currentSong, isPlaying, togglePlay, playNext, playPrevious, toggleRepeat, repeatMode, isShuffled, toggleShuffle } = usePlayerStore();

	const [volume, setVolume] = useState(75);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const audioRef = useRef<HTMLAudioElement | null>(null)

	useEffect(() => {
		audioRef.current = document.querySelector("audio");
		const audio = audioRef.current;
		if (!audio) return;

		const updateTime = () => setCurrentTime(audio.currentTime);
		const updateDuration = () => setDuration(audio.duration);


		audio.addEventListener('timeupdate', updateTime);
		audio.addEventListener('loadedmetadata', updateDuration);

		const handleEnded = () => {
			usePlayerStore.setState({ isPlaying: false });
		}
		audio.addEventListener('ended', handleEnded);

		return () => {
			audio.removeEventListener("timeupdate", updateTime);
			audio.removeEventListener("loadedmetadata", updateDuration);
			audio.removeEventListener("ended", handleEnded);
		}
	}, [currentSong]);


	const handleSeek = (value: number[]) => {
		if (audioRef.current) {
			audioRef.current.currentTime = value[0];
		}
	}
	return (
		<footer className='h-18 sm:h-18  px-4 py-2 bg-black'>
			<div className='flex justify-between items-center h-full max-w-[1800px] mx-auto bg-black'>
				{/* currently playing song */}
				<div className='hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] '>
					{currentSong && (
						<>
							<img
								src={currentSong.imageUrl}
								alt={currentSong.title}
								className='w-14 h-14 object-cover rounded-md'
							/>
							<div className='flex-1 min-w-0'>
								<div className='font-medium truncate hover:underline cursor-pointer'>
									{currentSong.title}
								</div>
								<div className='text-sm text-zinc-400 truncate hover:underline cursor-pointer'>
									{currentSong.artist}
								</div>
							</div>
						</>
					)}
				</div>

				{/* player controls*/}
				<div className='flex flex-col items-center gap-1 flex-1 max-w-full sm:max-w-[45%]'>
					<div className='flex items-center gap-4 sm:gap-6 -mt-2'>
						<Button
							onClick={toggleShuffle}
							size='icon'
							variant='ghost'
							className={`hidden sm:inline-flex hover:text-white ${isShuffled ? 'text-green-500' : 'text-zinc-400'
								}`}
							title={isShuffled ? 'Shuffle on' : 'Shuffle off'}
						>
							<Shuffle className='h-4 w-4' />
						</Button>

						<Button
							size='icon'
							variant='ghost'
							className='hover:text-white text-zinc-400'
							onClick={playPrevious}
							disabled={!currentSong}
						>
							<SkipBack className='h-4 w-4' />
						</Button>

						<Button
							size='icon'
							className='bg-white hover:bg-white/80 text-black rounded-full h-8 w-8'
							onClick={togglePlay}
							disabled={!currentSong}
						>
							{isPlaying ? <Pause className='h-5 w-5' /> : <Play className='h-5 w-5' />}
						</Button>
						<Button
							size='icon'
							variant='ghost'
							className='hover:text-white text-zinc-400'
							onClick={playNext}
							disabled={!currentSong}
						>
							<SkipForward className='h-4 w-4' />
						</Button>
						<Button
							onClick={toggleRepeat}
							size='icon'
							variant='ghost'
							className={`hidden sm:inline-flex hover:text-white ${repeatMode === 'off' ? 'text-zinc-400' : 'text-green-500'
								}`}
							title={
								repeatMode === 'off' ? 'Repeat off' :
									repeatMode === 'all' ? 'Repeat playlist' :
										'Repeat one song'
							}
						>
							{/* Show number 1 for repeat one mode */}
							{repeatMode === 'one' ? (
								<div className="relative">
									<Repeat className='h-4 w-4' />
									<span className="absolute -top-0.5 -right-1 text-[8px] font-bold text-green-500">
										1
									</span>
								</div>
							) : (
								<Repeat className='h-4 w-4' />
							)}
						</Button>
					</div>

					<div className='hidden sm:flex items-center gap-2 w-full '>
						<div className='text-xs text-zinc-400'>{formatTime(currentTime)}</div>
						<Slider
							value={[currentTime]}
							max={duration || 100}
							step={1}
							className='w-full  hover:cursor-grab active:cursor-grabbing'
							onValueChange={handleSeek}
						/>
						<div className='text-xs text-zinc-400'>{formatTime(duration)}</div>
					</div>
				</div>
				{/* volume controls */}
				<div className='hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end'>
					<div>
						<Button size='icon' variant='ghost' className='hover:text-green-600 text-zinc-400'>
							<Mic2 className='h-4 w-4' />
						</Button>
						<Button size='icon' variant='ghost' className='hover:text-white text-zinc-400'>
							<ListMusic className='h-4 w-4' />
						</Button>
						<Button size='icon' variant='ghost' className='hover:text-white text-zinc-400'>
							<Laptop2 className='h-4 w-4' />
						</Button>


					</div>

					<div className='flex items-center gap-2'>
						<Button size='icon' variant='ghost' className='hover:text-white text-zinc-400'>
							<Volume1 className='h-4 w-4' />
						</Button>

						<Slider
							value={[volume]}
							max={100}
							step={1}
							className='w-24 hover:cursor-grab active:cursor-grabbing'
							onValueChange={(value) => {
								setVolume(value[0]);
								if (audioRef.current) {
									audioRef.current.volume = value[0] / 100;
								}
							}}
						/>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default PlaybackControls