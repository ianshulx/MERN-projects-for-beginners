import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import LeftSidebar from './components/LeftSidebar'
import FriendsActivity from './components/FriendsActivity'
import AuidoPlayer from './components/AuidoPlayer'
import PlaybackControls from './components/PlaybackControls'
import TopHeader from './components/TopHeader'
import Topbar from '../ui/Topbar'

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);


  return (
    <div className='h-screen flex flex-col overflow-hidden bg-black'>
      <TopHeader />
      {/* <Topbar /> */}

      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 flex min-h-0 overflow-hidden p-2" // Changed from min-h-full to min-h-0
      >
        <AuidoPlayer />

        {/* LSB */}
        <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30}>
          <LeftSidebar />
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

        {/* Main */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <div className="h-full overflow-auto"> {/* Added container with controlled scrolling */}
            <Outlet />
          </div>
        </ResizablePanel>

        {
          !isMobile && (
            <>
              <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />
              {/* Right Hand Side */}
              <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
                <FriendsActivity />
              </ResizablePanel>
            </>
          )
        }
      </ResizablePanelGroup>

      <PlaybackControls />
    </div>
  )
}

export default MainLayout