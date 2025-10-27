import AppSidebar from '@/components/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Sidebar } from 'lucide-react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '@/components/Footer'
import Topbar from '@/components/Topbar'

const Layout = () => {
  return (
    <SidebarProvider>
        <Topbar />
        <AppSidebar />
      <main>
        <Outlet />
        <Footer />
      </main>
    </SidebarProvider>

  )
}

export default Layout