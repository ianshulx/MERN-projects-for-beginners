import React from "react";

export default function Cards() {
  return (
    <div data-scroll data-scroll-speed=".8" data-scroll-section className="w-full flex items-center px-32 gap-5 h-screen bg-zinc-900">
      <div className="cardcontainer h-[60vh] w-1/2 ">
        <div className=" relative card w-full rounded-xl h-full flex items-center justify-center bg-[#004D43]">
          <img
            className="w-32"
            src="https://ochi.design/wp-content/uploads/2022/04/logo001.svg"
            alt=""
          />
          <button className="absolute px-5 py-1 border-2 rounded-full left-10 bottom-10">
            &copy;2019-2022
          </button>
        </div>
      </div>
      <div className="cardcontainer h-[60vh] w-1/2 ">
        <div className="card flex gap-5 w-full  h-full ">
          <div className="relative flex items-center justify-center card w-1/2 rounded-xl  h-full bg-[#727776]">
            <img
              className="w-32"
              src="/logo2.svg"
              alt=""
            />
            <button className="absolute px-5 py-1 border-2 rounded-full left-10 bottom-10">
              RATING 5.0 ON CLUTCH
            </button>
          </div>
          <div className="relative flex items-center justify-center card w-1/2 rounded-xl h-full bg-[#3c514e]">
            <img
              className="w-32"
              src="/logo3.png"
              alt=""
            />
            <button className="absolute px-2 py-1 border-2 rounded-full left-10 bottom-10">
              BUSINESS BOOTCAMP ALUMNI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
