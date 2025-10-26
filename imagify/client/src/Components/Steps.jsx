import React from "react";
import { stepsData } from "../assets/assets";

const Steps = () => {
  return (
    <div className="mx-auto w-fit">
      <h1 className="text-3xl font-semibold mb-3">How it Works</h1>
      <h1 className="text-xl text-gray-800 font-regular mb-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </h1>
      <div className="">
        {stepsData.map((step, index) => (
          <div key={index} className="flex items-center mb-6 shadow-xl border py-7 rounded-lg px-5">
            <img src={step.icon} alt="step icon" className="w-16 h-16 mr-10 transition-all hover:scale-110 cursor-pointer duration-300" />
            <div>
              <h1 className="text-2xl font-semibold">{step.title}</h1>
              <p className="text-gray-800 text-lg">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
