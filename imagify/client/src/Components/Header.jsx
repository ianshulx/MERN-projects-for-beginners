import React from "react";
import { assets } from "../assets/assets";
import GenerateButton from "./GenerateButton";

const Header = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center my-20">
      <div className="text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500">
        <p>Best Text to image Generator</p>
        <img src={assets.star_icon} alt="" />
      </div>
      <h1 className="text-7xl max-w-[590px] mt-10 mx-auto text-center">
        Turn text to <span className="text-blue-500">image</span>,in seconds
      </h1>
      <p className="text-2xl text-center max-w-xl mx-auto mt-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, deleniti?
        repudiandae rerum!
      </p>
      <GenerateButton />

      <div className="flex flex-wrap justify-center gap-3 mt-12">
        {Array(6)
          .fill("")
          .map((item, index) => (
            <img
              key={index}
              src={index % 2 === 0 ? assets.sample_img_1 : assets.sample_img_2}
              alt=""
              className="w-28 rounded hover:scale-105 transition-all duration-300 cursor-pointer"
            />
          ))}
      </div>
      <p className="mt-5 text-neutral-600 text-2xl">Generate images from imagify</p>
    </div>
  );
};

export default Header;
