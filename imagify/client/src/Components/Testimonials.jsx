import React from "react";
import { assets, testimonialsData } from "../assets/assets";
import GenerateButton from "./GenerateButton";

const Testimonials = () => {
  return (
    <div className="w-full py-20 flex flex-col items-center justify-center ">
      <h1 className="text-3xl text-center font-bold mb-3 capitalize">
        Custom Testimonials
      </h1>
      <p className="text-xl text-center text-gray-800 mb-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <div className="w-full max-w-6xl px-5 space-y-10">
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-8 flex items-center gap-8 transform transition-transform duration-300 hover:scale-105"
          >
            <img
              className="w-32 h-32 rounded-full border-4 border-blue-500 transition-transform duration-300 hover:scale-110"
              src={testimonial.image}
              alt={testimonial.name}
            />
            <div className="flex-1">
              <h2 className="text-2xl capitalize font-bold mb-2">
                {testimonial.name}
              </h2>
              <p className="text-sm text-gray-500 mb-2">{testimonial.role}</p>
              <p className="text-lg text-gray-800 mb-4">{testimonial.text}</p>
              <div className="flex space-x-1">
                {[...Array(testimonial.stars)].map((star, idx) => (
                  <span key={idx} className="text-yellow-500">
                    &#9733;
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-4xl text-center max-w-xl mx-auto mt-40">
        See the Magic
      </p>
      <GenerateButton />
    </div>
  );
};

export default Testimonials;
