import React, { useEffect } from 'react'
import Topbar from '../../../components/ui/Topbar'
import { useMusicStore } from '../../../store/useMusicStore'
import FeaturedSection from '../components/FeaturedSection'
import { ScrollArea } from '@/components/ui/scroll-area';
import SectionGrid from '../components/SectionGrid'
import { usePlayerStore } from '@/store/usePlayerStore'
import { Button } from '../../../components/ui/button';



const HomePage = () => {
  const { isLoading, fetchFeaturedSongs, featuredSongs, fetchMadeForYou, fetchTrendingSongs, madeForYouSongs, trendingSongs } = useMusicStore()

  useEffect(() => {
    fetchFeaturedSongs()
    fetchMadeForYou()
    fetchTrendingSongs()
    // console.log(featuredSongs)
  }, []);

  const { initializeQueue, } = usePlayerStore();




  useEffect(() => {
    if (madeForYouSongs.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0) {
      const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
      initializeQueue(allSongs)
    }
  }, [initializeQueue, madeForYouSongs, trendingSongs, featuredSongs]);

  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-950 to-zinc-900">
      {/* <Topbar /> */}
       {/* <Button
          onClick={() => {
            throw new Error('This is your first error!');
          }}
        >
          Break the world
        </Button> */}
      <ScrollArea className='h-[calc(100vh-180px)]'>
        <div className='p-4 sm:p-6'>
          {/* <h1 className='text-2xl sm:text-3xl font-bold mb-6'>Good After noon</h1> */}
          <div className='flex gap-3 mb-4'>
            <Button className='rounded-full bg-white text-black hover:bg-white hover:text-black'>All</Button>
            <Button className='rounded-full bg-white/10 backdrop-blur-xl  text-white hover:bg-white hover:text-black'>Music</Button>
          </div>
          <FeaturedSection />
          

          <div className='space-y-8'>

            <SectionGrid title="Made For You" songs={madeForYouSongs} isLoading={isLoading} />
            <SectionGrid title="Trending" songs={trendingSongs} isLoading={isLoading} />

          </div>

        </div>
      </ScrollArea>
    </main>
  )
}

export default HomePage