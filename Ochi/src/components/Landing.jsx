import { motion } from "framer-motion";
import React from "react";
import { FaArrowUpLong } from "react-icons/fa6";

function Landing() {

  return (
    <div data-scroll data-scroll-section data-scroll-speed="-.5" className="w-full h-screen text-white pt-1">
      <div className="textstruct mt-48 px-20">
        {["we create", "eye opening", "presentations"].map((item, index) => {
          return (
            <div className="masker ">
              <div className="w-fit flex items-end overflow-hidden">
                {index == 1 && (
                  <motion.div initial={{width:0}} animate={{width: "9vw"}} transition={{ease: [0.76, 0, 0.24, 1], duration: 1}}  className="mr-[1vw] w-[9vw] h-[5.7vw] rounded-md relative -top-[1.2vw]  bg-red-500 "></motion.div>
                )}
                <h1 className="pt-[2vw] -mb-[1vw] font-['Founders_Grotesk_X_Condensed'] leading-[.75] uppercase text-[9vw] font-bold">
                  {item}
                </h1>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t-[1px] border-zinc-800 mt-20 flex justify-between items-center px-20 py-5">
        {[
          "For public and private companies",
          "From the first pitch to IPO",
        ].map((item, index) => (
          <p className="text-md font-light tracking-tight leading-none">
            {item}
          </p>
        ))}

        <div className="start flex items-center gap-5">
          <div className="px-5 py-2 border-[1px] rounded-full border-zinc-400 font-light text-sm uppercase">
            Start the project
          </div>
          <div className="arrow w-10 h-10 flex justify-center items-center border-[1px] rounded-full border-zinc-400 ">
            <span className="rotate-[45deg]">
              <FaArrowUpLong />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
