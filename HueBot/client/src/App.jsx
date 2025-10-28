import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import Auth from "./components/Auth";
import PaletteGenerator from "./components/PaletteGenerator";
import SavedPalettes from "./components/SavedPalettes";
import "./App.css";

function App() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showMyHues, setShowMyHues] = useState(false);

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
          <button
            onClick={() => setShowMyHues(!showMyHues)}
            className="my-hues-btn"
          >
            {showMyHues ? "Generate" : "My Hues"}
          </button>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
      {showMyHues ? (
        <SavedPalettes refreshTrigger={refreshTrigger} userName={user?.name} />
      ) : (
        <PaletteGenerator onPaletteSaved={triggerRefresh} />
      )}
    </div>
  );
}

export default App;
