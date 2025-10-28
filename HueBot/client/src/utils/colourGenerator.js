// Generate a random hex colour
const randomColour = () => {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
};

// Convert hex to HSL
const hexToHSL = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
};

// Convert HSL to hex
const hslToHex = (h, s, l) => {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  const toHex = (n) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// Generate a random palette (5 colours)
export const generateRandomPalette = () => {
  return Array.from({ length: 5 }, () => randomColour());
};

// Generate complementary palette
export const generateComplementaryPalette = () => {
  const baseColour = randomColour();
  const hsl = hexToHSL(baseColour);

  return [
    baseColour,
    hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
    hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 20, 90)),
    hslToHex((hsl.h + 180) % 360, hsl.s, Math.min(hsl.l + 20, 90)),
    hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 20, 10)),
  ];
};

// Generate analogous palette
export const generateAnalogousPalette = () => {
  const baseColour = randomColour();
  const hsl = hexToHSL(baseColour);

  return [
    hslToHex((hsl.h - 30) % 360, hsl.s, hsl.l),
    hslToHex((hsl.h - 15) % 360, hsl.s, hsl.l),
    baseColour,
    hslToHex((hsl.h + 15) % 360, hsl.s, hsl.l),
    hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l),
  ];
};

// Generate monochromatic palette
export const generateMonochromaticPalette = () => {
  const baseColour = randomColour();
  const hsl = hexToHSL(baseColour);

  return [
    hslToHex(hsl.h, hsl.s, 20),
    hslToHex(hsl.h, hsl.s, 40),
    hslToHex(hsl.h, hsl.s, 60),
    hslToHex(hsl.h, hsl.s, 80),
    hslToHex(hsl.h, hsl.s, 90),
  ];
};

// Generate triadic palette
export const generateTriadicPalette = () => {
  const baseColour = randomColour();
  const hsl = hexToHSL(baseColour);

  return [
    baseColour,
    hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
    hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l),
    hslToHex(hsl.h, Math.max(hsl.s - 20, 20), hsl.l),
    hslToHex((hsl.h + 120) % 360, Math.max(hsl.s - 20, 20), hsl.l),
  ];
};
