import { useState } from "react";
import "./PaletteGenerator.css";
import {
  generateRandomPalette,
  generateComplementaryPalette,
  generateAnalogousPalette,
  generateMonochromaticPalette,
  generateTriadicPalette,
} from "../utils/colourGenerator";

const PaletteGenerator = () => {
  const [palette, setPalette] = useState(generateRandomPalette());
  const [paletteType, setPaletteType] = useState("random");

  const handleGenerate = (type) => {
    setPaletteType(type);
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

  const copyToClipboard = (colour) => {
    navigator.clipboard.writeText(colour);
    // TODO: Add toast notification
  };

  return (
    <div className="palette-generator">
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
            onClick={() => copyToClipboard(colour)}
          >
            <span className="colour-code">{colour}</span>
          </div>
        ))}
      </div>

      <button
        className="generate-btn"
        onClick={() => handleGenerate(paletteType)}
      >
        Generate New Palette
      </button>
    </div>
  );
};

export default PaletteGenerator;
