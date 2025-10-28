import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import Auth from "./components/Auth";
import PaletteGenerator from "./components/PaletteGenerator";
import SavedPalettes from "./components/SavedPalettes";
import "./App.css";

function App() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <div className="app">
      <div className="header">
        <h1>HueBot</h1>
        <div className="user-info">
          <span>Hello, {user?.name}!</span>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
      <PaletteGenerator onPaletteSaved={triggerRefresh} />
      <SavedPalettes refreshTrigger={refreshTrigger} />
    </div>
  );
}

export default App;
