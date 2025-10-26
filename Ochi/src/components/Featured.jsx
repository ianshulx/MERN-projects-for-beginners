import { motion } from "framer-motion";
import React, { useState } from "react";

function Featured() {
  const [hoverStates, setHoverStates] = useState({
    card1: false,
    card2: false,
    card3: false,
    card4: false,
  });

  const handleMouseEnter = (card) => {
    setHoverStates((prev) => ({ ...prev, [card]: true }));
  };

  const handleMouseLeave = (card) => {
    setHoverStates((prev) => ({ ...prev, [card]: false }));
  };

  return (
    <div className="w-full py-10">
      <div className="w-full px-20 border-b-[1px] pb-20 border-zinc-700">
        <h1 className="text-7xl font-['Neue_Montreal'] tracking-tight text-[#CDEA6]">
          Featured projects
        </h1>
      </div>
      <div className="px-20">
        <div className="cards flex gap-5 w-full mt-10">
          {[
            { key: "card1", title: "FYDE", img: "/2.png" },
            { key: "card2", title: "VISE", img: "/3.jpg" },
          ].map((card) => (
            <div
              key={card.key}
              onMouseEnter={() => handleMouseEnter(card.key)}
              onMouseLeave={() => handleMouseLeave(card.key)}
              className="cardcontainer relative w-1/2 h-[75vh]"
            >
              <h1
                className={`text-[#CDEA68] font-semibold flex absolute top-1/2 ${
                  card.key === "card1" ? "-translate-x-1/2 left-full" : "translate-x-1/2 right-full"
                } -translate-y-1/2 overflow-hidden z-[9] text-8xl text-[#CDEA6]`}
              >
                {card.title.split("").map((item, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: "100%" }}
                    animate={hoverStates[card.key] ? { y: "0" } : { y: "100%" }}
                    transition={{ ease: [0.22, 1, 0.36, 1], delay: index * 0.02 }}
                    className="inline-block translate-y-full"
                  >
                    {item}
                  </motion.span>
                ))}
              </h1>
              <div className="card w-full h-full rounded-lg overflow-hidden bg-green-500">
                <img
                  className="w-full h-full bg-cover"
                  src={card.img}
                  alt={`${card.title} project`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 px-20">
        <div className="cards flex gap-5 w-full mt-10">
          {[
            { key: "card3", title: "TRAWA", img: "/card3.jpg" },
            { key: "card4", title: "PREMIUM BLEND", img: "/card4.png" },
          ].map((card) => (
            <div
              key={card.key}
              onMouseEnter={() => handleMouseEnter(card.key)}
              onMouseLeave={() => handleMouseLeave(card.key)}
              className="cardcontainer relative w-1/2 h-[75vh]"
            >
              <h1
                className={`text-[#CDEA68] font-semibold flex absolute top-1/2 ${
                  card.key === "card3" ? "-translate-x-1/2 left-full" : "translate-x-1/2 right-full"
                } -translate-y-1/2 overflow-hidden z-[9] text-8xl text-[#CDEA6]`}
              >
                {card.title.split("").map((item, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: "100%" }}
                    animate={hoverStates[card.key] ? { y: "0" } : { y: "100%" }}
                    transition={{ ease: [0.22, 1, 0.36, 1], delay: index * 0.02 }}
                    className="inline-block translate-y-full"
                  >
                    {item}
                  </motion.span>
                ))}
              </h1>
              <div className="card w-full h-full rounded-lg overflow-hidden bg-green-500">
                <img
                  className="w-full h-full bg-cover"
                  src={card.img}
                  alt={`${card.title} project`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Featured;
