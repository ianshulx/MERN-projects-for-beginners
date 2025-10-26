import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const GenerateButton = () => {
  const Navigate = useNavigate();
  return (
    <button
      onClick={() => Navigate("/result")}
      className="text-white bg-black w-auto mt-8 px-12 py-3 flex items-center gap-2 rounded-full hover:scale-110 duration-300 transition-all"
    >
      Generate Images <img className="h-6 " src={assets.star_group} alt="" />
    </button>
  );
};

export default GenerateButton;
