import { useAuthStore } from '@/store/useAuthStore'
import { useEffect } from 'react'
import Header from './components/Header';
import DashboardStats from './components/DashboardStats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Album, Music } from 'lucide-react';
import SongsTabContent from './components/SongsTabContent';
import AlbumsTabContent from './components/AlbumsTabContent';
import { useMusicStore } from '@/store/useMusicStore';

const AdminPage = () => {

    const { isAdmin, isLoading } = useAuthStore();
    const { fetchStats, fetchSongs, fetchAlbums } = useMusicStore();
    useEffect(() => {
        fetchStats();
        fetchSongs();
        fetchAlbums();
    }, [fetchStats, fetchSongs, fetchAlbums]);

    if (isLoading) return <div>Loading...</div>
    if (!isAdmin) return <div className=''>Unauthorized</div>
    return (
        <div className='min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900
   to-black text-zinc-100 p-8'>
            <Header />
            <DashboardStats />
            <div>
                <Tabs defaultValue='songs' className='space-y-6'>
                    <TabsList className='p-1 bg-zinc-800/50'>
                        <TabsTrigger value='songs' className='data-[state=active]:bg-zinc-700'>
                            <Music className='mr-2 size-4' />
                            Songs
                        </TabsTrigger>
                        <TabsTrigger value='albums' className='data-[state=active]:bg-zinc-700'>
                            <Album className='mr-2 size-4' />
                            Albums
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value='songs'>
                        <SongsTabContent />
                    </TabsContent>
                    <TabsContent value='albums'>
                        <AlbumsTabContent />
                    </TabsContent>

                </Tabs>
            </div>
        </div>
    )
}

export default AdminPage