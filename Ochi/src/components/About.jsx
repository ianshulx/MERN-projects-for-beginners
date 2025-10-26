import React from "react";

function About() {
  return (
    <div className="w-full p-20 bg-[#CDEA68] rounded-tl-3xl rounded-tr-3xl text-black">
      <h1 className="font-['Neue_Montreal'] text-[4vw] leading-[4.5vw] tracking-tight ">
        Ochi is a strategic presentation agency for forward-thinking businesses
        that need to raise funds, sell products, explain complex ideas, and hire
        great people.
      </h1>

      <div className="w-full border-t-[1px] pt-10 mt-20 flex gap-5 border-[#a1b562]">
        <div className="w-1/2 ">
          <h1 className="text-[4vw] ">Our approach:</h1>
          <button className="flex gap-10 items-center px-10 py-5 bg-zinc-900 mt-10 rounded-full text-white">
            Read More
            <div className="w-2 h-2 bg-zinc-100 rounded-full"></div>
          </button>
        </div>

        <div className="w-1/2 h-[65vh] rounded-3xl bg-cover overflow-hidden flex items-center justify-center">
        <img src="/about.jpg" className="" alt="" /></div>
      </div>
    </div>
  );
}

export default About;
