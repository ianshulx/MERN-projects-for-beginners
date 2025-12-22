import { useMusicStore } from '@/store/useMusicStore'
import FeaturedGridSkeleton from '@/components/skeletons/FeaturedGridSkeleton'
import PlayButton from './PlayButton'


const FeaturedSection = () => {
	const { isLoading, featuredSongs, error } = useMusicStore()
    // console.log(featuredSongs);
    
    if (isLoading) return <FeaturedGridSkeleton />
    if (error) return <p className='text-red-600 mb-4 text-2xl'>{error}</p>
    return (
        <div className='grid grid-cols-1 max-sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-8'>
			{featuredSongs.map((song) => (
				<div
					key={song._id}
					className='flex items-center bg-white/10 backdrop-blur-xl  rounded-md overflow-hidden
         hover:bg-zinc-700/50 transition-colors group cursor-pointer relative'
				>
					<img
						src={song.imageUrl}
						alt={song.title}
						className='w-14 max-sm:w-20 h-14 max-sm:h-20 object-cover flex-shrink-0'
					/>
					<div className='flex-1 p-4'>
						<p className='font-medium truncate'>{song.title}</p>
						{/* <p className='text-sm text-zinc-400 truncate'>{song.artist}</p> */}
					</div>
					<div className=''>
						<PlayButton  song={song}/>
					</div>
				</div>
			))}
		</div>
    )
}

export default FeaturedSection