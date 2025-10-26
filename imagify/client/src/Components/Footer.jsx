import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="py-8 px-5">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
        <img src={assets.logo} alt="Logo" className="w-32 h-auto" />

        <p className="text-lg text-center md:text-left text-black">
          © {new Date().getFullYear()} Sid || All rights reserved.
        </p>

        <div className="flex space-x-8">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={assets.facebook_icon}
              alt="Facebook"
              className="w-8 h-8"
            />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={assets.twitter_icon} alt="Twitter" className="w-8 h-8" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={assets.instagram_icon}
              alt="Instagram"
              className="w-8 h-8"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
