import { motion } from 'framer-motion'
import React from 'react'

function Marque() {
  return (
    <div data-scroll data-scroll-section data-scroll-speed=".1" className='w-full py-20 rounded-tl-3xl rounded-tr-3xl bg-[#004D43] '>
        <div className="text border-t-2 border-b-2  border-zinc-300 flex whitespace-nowrap overflow-hidden ">
            <motion.h1 initial={{x:0}} animate={{x:"-100%"}} transition={{ease: "linear" , repeat: Infinity , duration: 7}} className="pr-10 text-[24vw] uppercase leading-none font-['Founders_Grotesk_X_Condensed'] pt-7 -mb-[7vw] font-bold">We are ochi</motion.h1>
            <motion.h1 initial={{x:0}} animate={{x:"-100%"}} transition={{ease: "linear" , repeat: Infinity , duration: 7}} className="pr-10 text-[24vw] uppercase leading-none font-['Founders_Grotesk_X_Condensed'] pt-7 -mb-[7vw] x font-bold">We are ochi</motion.h1>
            <motion.h1 initial={{x:0}} animate={{x:"-100%"}} transition={{ease: "linear" , repeat: Infinity , duration: 7}} className="pr-10 text-[24vw] uppercase leading-none font-['Founders_Grotesk_X_Condensed'] pt-7 -mb-[7vw] x font-bold">We are ochi</motion.h1>

        </div>
    </div>
  )
}

export default Marque