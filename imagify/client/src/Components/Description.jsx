import React from "react";
import { assets } from "../assets/assets";

const Description = () => {
  const fullText =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi mollitia eius consequuntur architecto veniam deserunt doloribus nemo voluptas, atque delectus molestias, quam fuga odit! Vero est itaque velit blanditiis architecto.";
  const mobileText = fullText.slice(0, 100) + "...";

  return (
    <div className="flex flex-col items-center justify-center p-6 mt-10">
      <h1 className="text-3xl text-center font-bold mb-3">Create AI images</h1>
      <p className="text-xl text-center text-gray-800 mb-8">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      </p>
      <div className="flex flex-col lg:flex-row gap-10 items-center justify-center mt-10 lg:mt-20">
        <img
          className="w-full sm:w-80 lg:w-96 rounded-lg"
          src={assets.sample_img_1}
          alt=""
        />
        <div className="w-full sm:w-3/4 lg:w-1/3">
          <h2 className="text-2xl capitalize font-bold mb-5 lg:mb-10">
            Introducing the AI powered text to image generator
          </h2>
          <p className="text-lg text-gray-800 block lg:hidden">{mobileText}</p>
          <p className="text-lg text-gray-800 hidden lg:block">{fullText}</p>
        </div>
      </div>
    </div>
  );
};

export default Description;
