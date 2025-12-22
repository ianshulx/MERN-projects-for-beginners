import React from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserAvatar, UserButton } from '@clerk/clerk-react'
import SignInOAuth from './SignInOAuth'
import { useAuthStore } from '@/store/useAuthStore'
import { buttonVariants } from './button'
import {cn} from "@/lib/utils"


const Topbar = () => {
    // const isAdmin = false;
    const { isAdmin } = useAuthStore()
    // console.log(isAdmin);
    return (
        <div className='w-full flex justify-between items-center px-4 py-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10'>
            <div className='flex gap-2 items-center'>
              <img src="./spotify.png" alt="" className="w-8"/>
            </div>
            <div className='flex items-center gap-2'>
                {
                    isAdmin && (
                        <Link to={'/admin'} className={cn(
                            buttonVariants({variant:"outline"})
                        )}>
                            <LayoutDashboard />
                            Admin Dashboard
                        </Link>
                    )
                }
                {/* <SignedIn>
                    <SignOutButton />
                </SignedIn> */}

                <SignedOut>
                    <SignInOAuth />
                </SignedOut>
                <UserButton />
            </div>
        </div>
    )
}

export default Topbar