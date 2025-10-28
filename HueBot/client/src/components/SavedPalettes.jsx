import { useState, useEffect } from "react";
import { paletteAPI } from "../services/api";
import "./SavedPalettes.css";

const SavedPalettes = ({ refreshTrigger }) => {
  const [palettes, setPalettes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedColor, setCopiedColor] = useState(null);

  useEffect(() => {
    fetchPalettes();
  }, [refreshTrigger]);

  const fetchPalettes = async () => {
    try {
      setLoading(true);
      const data = await paletteAPI.getAll();
      if (data.success) {
        setPalettes(data.palettes);
      } else {
        setError(data.message);
      }
    } catch {
      setError("Failed to fetch palettes");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (paletteId) => {
    if (!window.confirm("Are you sure you want to delete this palette?")) {
      return;
    }

    try {
      const data = await paletteAPI.delete(paletteId);
      if (data.success) {
        setPalettes(palettes.filter((p) => p._id !== paletteId));
      } else {
        setError(data.message);
      }
    } catch {
      setError("Failed to delete palette");
    }
  };

  const copyToClipboard = (color, paletteId) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(`${paletteId}-${color}`);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  if (loading) {
    return (
      <div className="saved-palettes-loading">Loading your palettes...</div>
    );
  }

  if (error) {
    return <div className="saved-palettes-error">{error}</div>;
  }

  if (palettes.length === 0) {
    return (
      <div className="saved-palettes-empty">
        <p>No saved palettes yet!</p>
        <p>Generate and save some beautiful colour combinations above.</p>
      </div>
    );
  }

  return (
    <div className="saved-palettes">
      <h2>Your Saved Palettes</h2>
      <div className="palettes-grid">
        {palettes.map((palette) => (
          <div key={palette._id} className="palette-card">
            <div className="palette-card-header">
              <h3>{palette.name}</h3>
              <button
                onClick={() => handleDelete(palette._id)}
                className="delete-btn"
                title="Delete palette"
              >
                ×
              </button>
            </div>
            <div className="palette-colours">
              {palette.colors.map((color, index) => (
                <div
                  key={index}
                  className="colour-box-small"
                  style={{ backgroundColor: color }}
                  onClick={() => copyToClipboard(color, palette._id)}
                  title={`Click to copy ${color}`}
                >
                  <span className="hex-code-small">{color}</span>
                  {copiedColor === `${palette._id}-${color}` && (
                    <span className="copied-badge-small">Copied!</span>
                  )}
                </div>
              ))}
            </div>
            <div className="palette-date">
              {new Date(palette.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedPalettes;
