import { Home, LayoutDashboard, Search } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserAvatar, UserButton } from '@clerk/clerk-react'
import { TiHome } from "react-icons/ti";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { useAuthStore } from '@/store/useAuthStore'

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { cn } from "@/lib/utils"
import SignInOAuth from '../../ui/SignInOAuth'
import { Button, buttonVariants } from '../../ui/button'
import { Link } from 'react-router-dom';


const TopHeader = () => {
    // const isAdmin = false;
    const { isAdmin } = useAuthStore()
    return (
        <div className='w-full flex justify-between items-center px-4 pb-0 pt-2 sticky top-0 bg-black backdrop-blur-md z-10'>
            <div className='flex gap-2 items-center'>
                <img src="./spotify.png" alt="" className="w-8" />
            </div>
            <div className='flex items-center gap-2'>

                <Link to={"/"}>
                    <Button variant={""} size={"icon-lg"} className='size-10 bg-zinc-900 hover:bg-zinc-800  rounded-full '>
                        <TiHome className='size-5.5' />
                    </Button>
                </Link>

                <div className=' flex gap-4 w-[400px] border border-zinc-950 px-4 py-2.5 rounded-full bg-zinc-900 '>
                    <Search />
                    <input type="text" className='w-full border-none outline-none ' placeholder='What do you want to play ?' />
                </div>
                {/* <Button variant={""} size={"icon-lg"} className='size-10 bg-zinc-900 hover:bg-zinc-800  rounded-full '>
                        <TiHome className='size-5.5'/>
                </Button> */}
            </div>

            <div className='flex  gap-10'>
                <div className='flex gap-2'>
                    {/* <Button className='rounded-full bg-white text-black hover:bg-zinc-800 hover:text-white transition-all duration-300 ease-in-out cursor-pointer'>
                        Explore More
                    </Button> */}
                    <Tooltip>
                        <TooltipTrigger>
                            <Button variant={"ghost"} className='rounded-full'>
                                Invite Friends
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Invite More Friends</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger>
                            <Link to="/chat">
                                <Button variant={"ghost"} size={"icon-lg"} className='size-10   rounded-full '>
                                    <IoIosPeople className='size-5.5' />
                                </Button>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Chat With Friends</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <div className='flex items-center gap-2'>
                    {
                        isAdmin && (
                            <Link to={'/admin'} className={cn(
                                buttonVariants({ variant: "outline" })
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
        </div>
    )
}

export default TopHeader