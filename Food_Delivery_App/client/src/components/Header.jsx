import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const Header = () => {
  const currentUser = useSelector((state) => state.user?.currentUser);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold">Template for Mern</h1>
        </Link>
        <ul className="flex gap-4 font-bold">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={
                  imgError || !currentUser.profilePicture
                    ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    : currentUser.profilePicture
                }
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <Link to="/signin">
                <li>SignIn</li>
              </Link>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
