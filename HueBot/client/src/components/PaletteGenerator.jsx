import { useState, useEffect } from "react";
import "./PaletteGenerator.css";
import {
  generateRandomPalette,
  generateComplementaryPalette,
  generateAnalogousPalette,
  generateMonochromaticPalette,
  generateTriadicPalette,
} from "../utils/colourGenerator";
import { paletteAPI } from "../services/api";

const PaletteGenerator = ({ onPaletteSaved }) => {
  const [palette, setPalette] = useState(generateRandomPalette());
  const [paletteType, setPaletteType] = useState("random");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [paletteName, setPaletteName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only trigger if spacebar is pressed and not in an input field
      if (e.code === "Space" && !showSaveModal) {
        e.preventDefault();
        handleGenerate(paletteType);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [paletteType, showSaveModal]);

  const handleGenerate = (type) => {
    setPaletteType(type);
    setCopiedIndex(null);
    switch (type) {
      case "random":
        setPalette(generateRandomPalette());
        break;
      case "complementary":
        setPalette(generateComplementaryPalette());
        break;
      case "analogous":
        setPalette(generateAnalogousPalette());
        break;
      case "monochromatic":
        setPalette(generateMonochromaticPalette());
        break;
      case "triadic":
        setPalette(generateTriadicPalette());
        break;
      default:
        setPalette(generateRandomPalette());
    }
  };

  const copyToClipboard = (colour, index) => {
    navigator.clipboard.writeText(colour);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const handleSave = async () => {
    if (!paletteName.trim()) {
      setMessage("Please enter a palette name");
      return;
    }

    setSaving(true);
    try {
      const response = await paletteAPI.save({
        name: paletteName,
        colors: palette,
      });

      if (response.palette) {
        setMessage("🎉 Palette saved successfully!");
        setPaletteName("");
        setShowSaveModal(false);
        setTimeout(() => setMessage(""), 3000);
        if (onPaletteSaved) {
          onPaletteSaved();
        }
      } else {
        setMessage(response.message || "Failed to save palette");
      }
    } catch {
      setMessage("Error saving palette");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="palette-generator">
      {message && <div className="message-toast">{message}</div>}

      <div className="palette-controls">
        <button
          onClick={() => handleGenerate("random")}
          className={paletteType === "random" ? "active" : ""}
        >
          Random
        </button>
        <button
          onClick={() => handleGenerate("complementary")}
          className={paletteType === "complementary" ? "active" : ""}
        >
          Complementary
        </button>
        <button
          onClick={() => handleGenerate("analogous")}
          className={paletteType === "analogous" ? "active" : ""}
        >
          Analogous
        </button>
        <button
          onClick={() => handleGenerate("monochromatic")}
          className={paletteType === "monochromatic" ? "active" : ""}
        >
          Monochromatic
        </button>
        <button
          onClick={() => handleGenerate("triadic")}
          className={paletteType === "triadic" ? "active" : ""}
        >
          Triadic
        </button>
      </div>

      <div className="palette-display">
        {palette.map((colour, index) => (
          <div
            key={index}
            className="colour-box"
            style={{ backgroundColor: colour }}
            onClick={() => copyToClipboard(colour, index)}
          >
            <span className="colour-code">
              {copiedIndex === index ? "Copied!" : colour}
            </span>
          </div>
        ))}
      </div>

      <div className="action-buttons">
        <button
          className="generate-btn"
          onClick={() => handleGenerate(paletteType)}
        >
          Generate New
        </button>
        <button className="save-btn" onClick={() => setShowSaveModal(true)}>
          Save Palette
        </button>
      </div>

      {showSaveModal && (
        <div className="modal-overlay" onClick={() => setShowSaveModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Save Palette</h3>
            <input
              type="text"
              placeholder="Enter palette name"
              value={paletteName}
              onChange={(e) => setPaletteName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSave()}
            />
            <div className="modal-actions">
              <button onClick={() => setShowSaveModal(false)}>Cancel</button>
              <button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaletteGenerator;
