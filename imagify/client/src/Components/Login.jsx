import React, { useContext, useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Login = () => {
  const { ShowLogin, setShowLogin, backendUrl, settoken, setUser } = useContext(AppContext);
  const [state, setState] = useState("Sign Up");

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const toggleState = () => {
    setState(state === "Login" ? "Sign Up" : "Login");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Basic validation
    if (state !== "Login" && name.trim() === "") {
      toast.error("Name is required for sign-up");
      return;
    }
    if (email.trim() === "" || password.trim() === "") {
      toast.error("Email and password are required");
      return;
    }

    try {
      if (state === "Login") {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password });

        if (data.success) {
          settoken(data.token);
          setUser(data.user);
          localStorage.setItem('token', data.token);  // Fixed localStorage to set the token
          setShowLogin(false);
          toast.success("Logged in successfully");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });

        if (data.success) {
          settoken(data.token);
          setUser(data.user);
          localStorage.setItem('token', data.token);  // Fixed localStorage to set the token
          setShowLogin(false);
          toast.success("Account created successfully");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error("An error occurred, please try again.");
      console.log(error);
    }
  };

  return (
    ShowLogin && (
      <div className="absolute top-0 left-0 bg-zinc-800/50 flex justify-center items-center w-full h-screen">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
          <img
            src={assets.cross_icon}
            alt="Close"
            className="absolute right-10 w-5 cursor-pointer"
            onClick={() => setShowLogin(false)}
          />

          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">
            {state}
          </h1>
          <p className="text-center text-gray-500 mb-8">
            {state !== "Login"
              ? "Welcome! Please sign up to continue"
              : "Welcome back! Please sign in to continue "}
          </p>

          <form onSubmit={onSubmitHandler} className="space-y-6">
            {state !== "Login" && (
              <div className="flex items-center border-b-2 border-gray-300 py-2">
                <img
                  src={assets.profile_icon}
                  alt="Profile Icon"
                  className="w-6 h-6 mr-3"
                />
                <input
                  type="text"
                  name="name"
                  onChange={(e) => setname(e.target.value)}
                  value={name}
                  placeholder="Enter your name"
                  className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
            )}

            <div className="flex items-center border-b-2 border-gray-300 py-2">
              <img
                src={assets.email_icon}
                alt="Email Icon"
                className="w-6 h-6 mr-3"
              />
              <input
                type="email"
                name="email"
                onChange={(e) => setemail(e.target.value)}
                value={email}
                placeholder="Enter your email id"
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
              />
            </div>

            <div className="flex items-center border-b-2 border-gray-300 py-2">
              <img
                src={assets.lock_icon}
                alt="Lock Icon"
                className="w-6 h-6 mr-3"
              />
              <input
                type="password"
                name="password"
                onChange={(e) => setpassword(e.target.value)}
                value={password}
                placeholder="Enter your password"
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
            >
              {state === "Login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-gray-500 mt-4">
            {state === "Login" ? (
              <>
                Don't have an account?{" "}
                <span
                  className="text-blue-600 hover:text-blue-700 cursor-pointer"
                  onClick={toggleState}
                >
                  Sign up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  className="text-blue-600 hover:text-blue-700 cursor-pointer"
                  onClick={toggleState}
                >
                  Login
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    )
  );
};

export default Login;
