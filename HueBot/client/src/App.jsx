import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Auth from "./components/Auth";
import "./App.css";

function App() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <div className="app">
      <div className="header">
        <h1>Welcome to HueBot 🎨</h1>
        <div className="user-info">
          <span>Hello, {user?.name}!</span>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
      <p>Generate a color palette now!</p>
    </div>
  );
}

export default App;
