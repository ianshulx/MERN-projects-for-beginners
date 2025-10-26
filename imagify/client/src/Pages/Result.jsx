import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");

  const { generateImage } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (input) {
      try {
        const generatedImage = await generateImage(input);

        if (generatedImage) {
          setImage(generatedImage);
          setIsImageLoaded(true);
        } else {
          console.error("Image generation failed, no image returned.");
        }
      } catch (error) {
        console.error("Error generating image:", error);
      }
    }

    setIsLoading(false);
  };

  return (
    <form
      onSubmit={(e) => onSubmitHandler(e)}
      className="bg-white p-8 rounded-xl shadow-lg max-w-xl mx-auto space-y-6"
    >
      <div className="relative">
        <div className="overflow-hidden rounded-lg shadow-md">
          <img
            src={image}
            alt="Generated Preview"
            className="w-full h-auto rounded-lg"
          />
          <span
            className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
              isLoading ? "w-0" : "w-full"
            }`}
          ></span>
        </div>
        <p
          className={`text-center text-gray-500 mt-2 ${
            isLoading ? "" : "hidden"
          }`}
        >
          Loading...
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <label htmlFor="description" className="sr-only">
          Image Description
        </label>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          id="description"
          placeholder="Describe the image to generate"
          className="flex-1 bg-gray-100 border border-gray-300 rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition w-full"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition"
      >
        Generate Image
      </button>

      {isImageLoaded && (
        <div className="flex gap-5">
          <button
            onClick={() => {
              setInput("")
              setImage(assets.sample_img_1)
              setIsImageLoaded(false);
            }}
            type="button"
            className="w-1/2 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-full font-semibold shadow-lg hover:from-green-600 hover:to-teal-700 transition"
          >
            Generate Another Image
          </button>

          <a
            href={image}
            download
            className="w-1/2 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-center text-white rounded-full font-semibold shadow-lg hover:from-purple-600 hover:to-pink-700 transition"
          >
            Download
          </a>
        </div>
      )}
    </form>
  );
};

export default Result;
