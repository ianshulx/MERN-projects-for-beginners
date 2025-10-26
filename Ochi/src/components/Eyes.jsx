import React, { useEffect, useState } from "react";

function Eyes() {

    const [rotate, SetRotate] = useState(0);

    useEffect(()=>{
        window.addEventListener("mousemove", (e)=>{
            let mouseX=e.clientX;
            let mouseY=e.clientY;

            let deltaX=mouseX - window.innerWidth/2;
            let deltaY=mouseY - window.innerHeight/2;

            var angle =Math.atan2(deltaY, deltaX) * (180/Math.PI);

            SetRotate(angle-180);
        })
    })

  return (
    <div className="w-full h-screen overflow-hidden">
      <div data-scroll data-scroll-speed="-.7" className="relative w-full h-full bg-cover bg-center bg-[url(../../1.jpg)]">
        <div className="absolute flex top-1/2 left-1/2 gap-10 -translate-x-[50%] -translate-y-[50%] ">
          <div className="flex items-center justify-center w-[15vw] h-[15vw] rounded-full bg-zinc-100 ">
            <div className="w-2/3 relative h-2/3  rounded-full bg-zinc-900 ">
              <div style={{transform : `translate(-50%,-50%) rotate(${rotate}deg)` }} className="line absolute flex top-1/2 left-1/2 gap-10 -translate-x-[50%] -translate-y-[50%]  w-full h-10 ">
                <div className="w-10 h-10  rounded-full bg-zinc-100 "></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center w-[15vw] h-[15vw] rounded-full bg-zinc-100 ">
            <div className=" relative w-2/3 h-2/3  rounded-full bg-zinc-900 ">
            <div style={{transform : `translate(-50%,-50%) rotate(${rotate}deg)` }} className="line absolute flex top-1/2 left-1/2 gap-10 -translate-x-[50%] -translate-y-[50%]  w-full h-10 ">
                <div className="w-10 h-10  rounded-full bg-zinc-100 "></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Eyes;
