import type { Config } from "tailwindcss";

// ← DA : modifiez uniquement cette section "colors" pour appliquer votre charte
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Palette festival — extrait de la direction DA (screenshot 16/04)
          // DA : ajustez librement ces valeurs pour coller au livrable Figma
          primary:   "#FF2D9B", // Fuchsia/magenta — énergie, inclusivité
          secondary: "#CDFF00", // Vert citron (Citric) — jeunesse, nature
          blue:      "#2828FF", // Klein Blue — profondeur, confiance
          orange:    "#FF6B1A", // Tangerine — sport, chaleur
          dark:      "#050303", // Near-black (Freepik palette)
          light:     "#F5F5F0", // Off-white
        },
      },
      fontFamily: {
        // DA : Chunko Bold (Zarma Type) pour les titres — placeholder Google Font
        // Remplacez "Fredoka" par Chunko Bold une fois le fichier dispo
        heading: ["var(--font-heading)", "sans-serif"],
        body:    ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
