import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SignedIn } from '@clerk/clerk-react'
import { HomeIcon, MessageCircle } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ScrollArea } from "@/components/ui/scroll-area"
import PlaylistSkeleton from '../../skeletons/PlaylistSkeleton.jsx'
import { useMusicStore } from '../../../store/useMusicStore.js'


// icons 
import { GoSidebarCollapse } from "react-icons/go";


const LeftSidebar = () => {
    // const isLoading = false;
    // const [playlists, SetPlaylists] = useState([]);

    // useMusicStore
    const { albums, isLoading, fetchAlbums } = useMusicStore();

    useEffect(() => {
        fetchAlbums();
        // console.log({ albums });

    }, []);


    // placeholder for collapse handler (kept for future use)
    // CollapseSidebar intentionally omitted (not used yet)


    return (
        <div className='h-full flex flex-col gap-2'>
            <div className='rounded-lg bg-zinc-900 p-4'>
                <div className='space-y-2'>
                    <Link to={'/'} className={cn(buttonVariants({
                        variant: "ghost",
                        className: "w-full justify-start text-white hover:bg-zinc-800 "
                    }))}>
                        <HomeIcon className='hidden md:inline' />
                        <span>Home</span>
                    </Link>

                    <SignedIn>
                        <Link to={'/chat'} className={cn(buttonVariants({
                            variant: "ghost",
                            className: "w-full justify-start text-white hover:bg-zinc-800 "
                        }))}>
                            <MessageCircle className='hidden md:inline' />
                            <span>Home</span>
                        </Link>
                    </SignedIn>
                </div>
            </div>


            <div className='flex-1 rounded-lg bg-zinc-900 p-4 group'>
                <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center text-white '>
                        <GoSidebarCollapse className='size-5 group-hover:mr-2 rotate-180 -translate-x-10  group-hover:block group-hover:translate-x-0 transition-all duration-300' />
                        <span className='font-bold hidden md:inline'>Playlists</span>
                    </div>
                </div>

                <ScrollArea className='h-[calc(100vh-300px)]'>
                    <div className='space-y-2'>
                        {
                            isLoading ? <PlaylistSkeleton /> : (
                                <>
                                    {
                                        albums.map((album) => (
                                            <Link
                                                to={`/albums/${album._id}`}
                                                key={album._id}
                                                className='p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer'
                                            >
                                                <img
                                                    src={album.imageUrl}
                                                    alt='Playlist img'
                                                    className='size-12 rounded-md flex-shrink-0 object-cover'
                                                />

                                                <div className='flex-1 min-w-0 hidden md:block'>
                                                    <p className='font-medium truncate'>{album.title}</p>
                                                    <p className='text-sm text-zinc-400 truncate'>Album • {album.artist}</p>
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </>
                            )
                        }
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}

export default LeftSidebar