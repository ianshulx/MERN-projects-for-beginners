import React, { useContext } from "react";
import { plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const BuyCredit = () => {
  const { User, setUser } = useContext(AppContext);
  return (
    <div className="py-20 bg-gray-50">
      <h1 className="text-center text-3xl font-bold mb-8">Our Plans</h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg px-10 py-20 text-center hover:shadow-2xl hover:scale-105 hover:border-blue-600 border border-transparent transition-all duration-300 ease-in-out"
          >
            <h2 className="text-xl font-semibold text-gray-800">{plan.id}</h2>
            <p className="mt-4 text-gray-600">{plan.desc}</p>
            <p className="mt-6 text-4xl font-bold text-blue-600">
              ${plan.price}
            </p>
            <p className="mt-2 text-lg text-gray-500">{plan.credits} credits</p>
            <button className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition">
              {User ? "purchase" : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCredit;
