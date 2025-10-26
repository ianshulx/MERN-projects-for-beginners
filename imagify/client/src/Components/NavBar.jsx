import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
const NavBar = () => {
  const { User, setUser, ShowLogin, setShowLogin, logout, Credit } =
    useContext(AppContext);
  const Navigate = useNavigate();
  return (
    <div className="flex justify-between items-center py-4 ">
      <Link to="/">
        <img src={assets.logo} alt="" className="w-40" />
      </Link>

      {User ? (
        <div className="flex items-center gap-2">
          <button
            onClick={() => Navigate("/buy")}
            className="flex items-center gap-2 bg-blue-200 px-4 py-2 rounded-full hover:scale-105 transition-all duration-700"
          >
            <img className="w-5" src={assets.credit_star} alt="" />
            <p className="text-sm font-medium text-gray-600">
              Credits left:{Credit}
            </p>
          </button>
          <p className="text-gray-600 pl-4">Hi, {User.name}</p>
          <div className="relative group">
            <img
              src={assets.profile_icon}
              alt=""
              className="w-10 drop-shadow-sm"
            />
            <div className="absolute hidden  group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
              <ul className="list-none bg-white m-0 p-2 rounded-md border text-sm shadow-lg">
                <li onClick={() => logout()} className="text-lg cursor-pointer">
                  logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <p onClick={() => Navigate("/buy")} className="cursor-pointer">
            Pricing
          </p>
          <button
            onClick={() => setShowLogin((prev) => !prev)}
            className="bg-zinc-800 text-white px-7 py-2 text-sm rounded-full"
          >
            Log In
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
