import { useState, useEffect } from "react";
import { paletteAPI } from "../services/api";
import "./SavedPalettes.css";

const SavedPalettes = ({ refreshTrigger, userName }) => {
  const [palettes, setPalettes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedColor, setCopiedColor] = useState(null);
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    palette: null,
  });

  const firstName = userName ? userName.split(" ")[0] : null;

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
    try {
      const data = await paletteAPI.delete(paletteId);
      if (data.success) {
        setPalettes(palettes.filter((p) => p._id !== paletteId));
        setDeleteModal({ show: false, palette: null });
      } else {
        setError(data.message);
      }
    } catch {
      setError("Failed to delete palette");
    }
  };

  const openDeleteModal = (palette) => {
    setDeleteModal({ show: true, palette });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ show: false, palette: null });
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
        <p>
          Oops! You haven't saved any hues {firstName ? ` ${firstName}` : ""}!
        </p>
        <p>Generate and save beautiful combinations.</p>
      </div>
    );
  }

  return (
    <div className="saved-palettes">
      <div className="saved-palettes-header">
        <h2>
          {firstName ? `${firstName}'s Hue Collection` : "Your Saved Palettes"}
        </h2>
        <p className="palette-count">
          {palettes.length} {palettes.length === 1 ? "palette" : "palettes"}{" "}
          saved
        </p>
      </div>
      <div className="palettes-grid">
        {palettes.map((palette) => (
          <div key={palette._id} className="palette-card">
            <div className="palette-card-header">
              <h3>{palette.name}</h3>
              <button
                onClick={() => openDeleteModal(palette)}
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

      {deleteModal.show && (
        <div className="delete-modal-overlay" onClick={closeDeleteModal}>
          <div
            className="delete-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Delete Palette</h3>
            <p>Are you sure you want to delete</p>
            <p className="delete-warning">{deleteModal.palette?.name}?</p>
            <div className="delete-modal-actions">
              <button onClick={closeDeleteModal} className="cancel-btn">
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModal.palette._id)}
                className="confirm-delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedPalettes;
