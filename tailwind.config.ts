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
          // Palette officielle — extraite du Figma SoliMouv (17/04/2026)
          primary:   "#D81D61", // Rose — couleur principale, CTAs
          secondary: "#474194", // Violet — navbar, états sélectionnés, UI
          blue:      "#1F74BB", // Bleu — tags, badges informatifs
          red:       "#C11720", // Rouge — alertes, tags "Senior"
          green:     "#2E7E33", // Vert — succès, tags "Débutant"
          dark:      "#050505", // Noir — textes, bouton Primary
          light:     "#FFFFFF", // Blanc — fonds, surfaces
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
