"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, MapPin, Accessibility, Users, Shield } from "lucide-react";
import { FreeBadge } from "@/components/shared/FreeBadge";
import { SafeBadge } from "@/components/shared/SafeBadge";
import Link from "next/link";

// Simple t() shim — hardcoded French
const t = (key: string) => ({
  "results.register": "S'inscrire à cette activité",
}[key] ?? key);

interface Zone {
  id: string;
  name: string;
  emoji: string;
  color: string;
  textColor: string;
  x: number;
  y: number;
  w: number;
  h: number;
  rx: number;
  description: string;
  activities: {
    name: string;
    time: string;
    association: string;
    tags: string[];
    badges: string[];
    accessibility: string;
  }[];
  path?: string;
}

const ZONES: Zone[] = [
  {
    id: "bienetre",
    name: "Zone Bien-être",
    emoji: "🧘",
    color: "#A8D5BA",
    textColor: "#1a4a2e",
    x: 50, y: 60, w: 260, h: 200, rx: 32,
    description: "Espace calme dédié au yoga, à la méditation et au stretching. Accessible PMR, sol souple.",
    activities: [
      { name: "Yoga doux en famille", time: "9h-10h", association: "YogaSoli", tags: ["Famille", "Calme"], badges: ["free", "pmr"], accessibility: "Tapis adaptés, espace fauteuil roulant, interprète LSF sur demande" },
      { name: "Méditation & mouvement", time: "16h-17h", association: "ZenMouv", tags: ["Tous niveaux"], badges: ["free"], accessibility: "Guidée en audio, accessible handicap invisible" },
    ],
  },
  {
    id: "terrainA",
    name: "Terrain A",
    emoji: "⚽",
    color: "#7BC47F",
    textColor: "#1a4a2e",
    x: 350, y: 40, w: 280, h: 190, rx: 24,
    description: "Grand terrain multisport pour les activités collectives. Surface synthétique, tribunes accessibles.",
    activities: [
      { name: "Football inclusif", time: "10h-11h30", association: "Sport Pour Tou·tes", tags: ["Collectif", "Mixte"], badges: ["free"], accessibility: "Tribunes PMR, casques anti-bruit dispo" },
      { name: "Basket fauteuil", time: "14h-15h30", association: "Handi'Sport 93", tags: ["PMR", "Inclusif"], badges: ["free", "pmr"], accessibility: "Fauteuils fournis, surface plane" },
    ],
  },
  {
    id: "salle1",
    name: "Salle 1",
    emoji: "✨",
    color: "#C4A8E0",
    textColor: "#3a1a5e",
    x: 670, y: 60, w: 240, h: 180, rx: 28,
    description: "Salle intérieure climatisée, espace safe LGBTQIA+. Personne référente identifiable.",
    activities: [
      { name: "Voguing workshop", time: "15h-16h30", association: "BallroomParis", tags: ["LGBTQIA+", "Danse"], badges: ["free", "safe"], accessibility: "Espace safe, vestiaires non-genrés, référent·e safe présent·e" },
    ],
  },
  {
    id: "salle2",
    name: "Salle 2",
    emoji: "🥊",
    color: "#E0A8B8",
    textColor: "#5e1a3a",
    x: 50, y: 310, w: 250, h: 180, rx: 26,
    description: "Salle fermée pour ateliers en comité réduit. Espace réservé femmes & personnes non-binaires.",
    activities: [
      { name: "Self-défense féministe", time: "10h30-12h", association: "BoxHer", tags: ["Femmes/NB", "Espace safe"], badges: ["free", "safe"], accessibility: "Espace réservé, vestiaires safe, référent·e anti-violence" },
    ],
  },
  {
    id: "scene",
    name: "Scène principale",
    emoji: "💃",
    color: "#F5C842",
    textColor: "#4a3a00",
    x: 340, y: 280, w: 290, h: 200, rx: 30,
    description: "Grande scène en plein air pour les démonstrations, workshops danse et célébrations collectives.",
    activities: [
      { name: "Danse afro-contemporaine", time: "11h-12h", association: "DanseToi", tags: ["Expression", "Tous niveaux"], badges: ["free"], accessibility: "Zone assise PMR devant scène, boucle magnétique" },
      { name: "Run Pride SoliMouv'", time: "17h-18h", association: "FièreSport", tags: ["LGBTQIA+", "Course"], badges: ["free", "safe"], accessibility: "Parcours balisé, rythme libre, accompagnant·es bienvenu·es" },
    ],
  },
  {
    id: "famille",
    name: "Zone Famille",
    emoji: "👨‍👩‍👧‍👦",
    color: "#F5A862",
    textColor: "#4a2800",
    x: 670, y: 290, w: 250, h: 200, rx: 34,
    description: "Espace dédié aux familles avec enfants. Poussettes bienvenues, espace change, coin calme.",
    activities: [
      { name: "Capoeira kids & adultes", time: "14h-15h", association: "CapoFamille", tags: ["Famille", "Tous âges"], badges: ["free"], accessibility: "Accès poussettes, espace ombragé, point d'eau" },
      { name: "Parcours aventure familial", time: "13h-15h", association: "FamilAction", tags: ["Enfants 3+", "Plein air"], badges: ["free"], accessibility: "Parcours adapté par tranche d'âge, encadrement pro" },
    ],
  },
  {
    id: "entree",
    name: "Entrée & Accueil",
    emoji: "🏠",
    color: "#E8E8E8",
    textColor: "#333",
    x: 340, y: 530, w: 290, h: 100, rx: 20,
    description: "Point d'accueil, inscription, information accessibilité, brassards référent·es safe.",
    activities: [],
  },
  {
    id: "nature",
    name: "Départ Rando",
    emoji: "🌿",
    color: "#8FBF9F",
    textColor: "#1a4a2e",
    x: 50, y: 530, w: 240, h: 100, rx: 22,
    description: "Point de départ des randonnées urbaines. Parcours adapté poussettes et PMR.",
    activities: [
      { name: "Randonnée urbaine", time: "9h30-11h30", association: "MarcheCité", tags: ["Plein air", "Famille"], badges: ["free"], accessibility: "Parcours plat, adapté poussettes, pauses régulières" },
    ],
  },
  {
    id: "aventure",
    name: "Zone Aventure",
    emoji: "🏔️",
    color: "#D4A86A",
    textColor: "#3a2800",
    x: 670, y: 530, w: 250, h: 100, rx: 22,
    description: "Parcours d'obstacles ludiques et escalade. Accessible à partir de 3 ans accompagné.",
    activities: [
      { name: "Escalade initiation", time: "11h-12h30", association: "GrimpLib", tags: ["Débutant·e"], badges: ["free"], accessibility: "Voies adaptées, encadrement formé handicap" },
    ],
  },
];

// Decorative path elements for the map (roads/paths between zones)
function MapPaths() {
  return (
    <g stroke="#d4c9b0" strokeWidth="6" strokeLinecap="round" strokeDasharray="12 8" fill="none" opacity="0.5">
      {/* Horizontal paths */}
      <path d="M 310 160 L 350 130" />
      <path d="M 630 150 L 670 140" />
      <path d="M 300 400 L 340 380" />
      <path d="M 630 380 L 670 390" />
      {/* Vertical paths */}
      <path d="M 180 260 L 175 310" />
      <path d="M 485 240 L 485 280" />
      <path d="M 795 260 L 795 290" />
      {/* To entrance */}
      <path d="M 170 490 L 340 560" />
      <path d="M 485 480 L 485 530" />
      <path d="M 795 490 L 670 560" />
    </g>
  );
}

// Decorative trees/bushes
function MapDecorations() {
  const trees = [
    { x: 330, y: 20 }, { x: 640, y: 30 }, { x: 930, y: 80 },
    { x: 20, y: 280 }, { x: 940, y: 270 },
    { x: 20, y: 520 }, { x: 940, y: 520 },
    { x: 640, y: 510 }, { x: 330, y: 510 },
  ];
  return (
    <g>
      {trees.map((t, i) => (
        <g key={i}>
          <circle cx={t.x} cy={t.y} r="8" fill="#7BC47F" opacity="0.4" />
          <circle cx={t.x + 10} cy={t.y + 5} r="6" fill="#A8D5BA" opacity="0.35" />
          <circle cx={t.x + 5} cy={t.y - 4} r="5" fill="#7BC47F" opacity="0.3" />
        </g>
      ))}
    </g>
  );
}

interface ZoneDetailProps {
  zone: Zone;
  onClose: () => void;
}

function ZoneDetail({ zone, onClose }: ZoneDetailProps) {
  // t() shim défini en haut du fichier

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="absolute inset-x-4 bottom-4 z-30 max-h-[60vh] overflow-y-auto rounded-2xl border-2 bg-card shadow-2xl md:inset-x-auto md:right-4 md:bottom-4 md:left-auto md:w-[400px]"
      role="dialog"
      aria-label={zone.name}
    >
      {/* Header */}
      <div
        className="sticky top-0 flex items-center justify-between rounded-t-2xl p-5"
        style={{ backgroundColor: zone.color + "33" }}
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">{zone.emoji}</span>
          <div>
            <h3 className="font-heading text-xl font-bold" style={{ color: zone.textColor }}>
              {zone.name}
            </h3>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground transition-colors hover:bg-background"
          aria-label="Fermer"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-5 pt-3">
        {/* Description */}
        <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3 mb-4">
          <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
          <p className="text-sm text-muted-foreground">{zone.description}</p>
        </div>

        {/* Activities */}
        {zone.activities.length > 0 ? (
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Activités dans cette zone
            </h4>
            {zone.activities.map((activity, i) => (
              <div key={i} className="rounded-xl border border-border bg-background p-4">
                <h5 className="font-semibold text-foreground">{activity.name}</h5>
                <div className="flex items-center gap-3 mt-1.5 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {activity.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" /> {activity.association}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {activity.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {activity.badges.includes("free") && <FreeBadge />}
                  {activity.badges.includes("safe") && <SafeBadge />}
                  {activity.badges.includes("pmr") && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-800">
                      <Accessibility className="h-3 w-3" /> PMR
                    </span>
                  )}
                </div>

                {/* Accessibility details */}
                <div className="mt-3 rounded-lg bg-primary/5 p-2.5">
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <p className="text-xs text-foreground/80">{activity.accessibility}</p>
                  </div>
                </div>

                <Link href="/programme" className="btn-primary mt-3 block w-full text-center text-sm">
                  S&apos;inscrire à cette activité
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            Point d'information — pas d'activité sportive dans cette zone.
          </p>
        )}
      </div>
    </motion.div>
  );
}

export function FestivalMap() {
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  const mapWidth = 970;
  const mapHeight = 660;

  return (
    <section className="relative w-full" aria-label="Carte interactive du festival">
      <div className="relative overflow-hidden rounded-2xl border-2 border-border bg-[#f5f0e6]">
        {/* Map title overlay */}
        <div className="absolute top-4 left-4 z-20 rounded-xl bg-background/90 px-4 py-2 shadow-lg backdrop-blur-sm">
          <h2 className="font-heading text-lg font-bold text-foreground">
            🗺️ Plan du festival
          </h2>
          <p className="text-xs text-muted-foreground">Clique sur une zone pour voir les activités</p>
        </div>

        {/* Legend */}
        <div className="absolute top-4 right-4 z-20 hidden rounded-xl bg-background/90 p-3 shadow-lg backdrop-blur-sm md:block">
          <div className="flex flex-col gap-1.5 text-xs">
            <div className="flex items-center gap-2"><Accessibility className="h-3.5 w-3.5 text-blue-600" /> Accessible PMR</div>
            <div className="flex items-center gap-2"><Shield className="h-3.5 w-3.5 text-purple-600" /> Espace safe</div>
            <div className="flex items-center gap-2"><Users className="h-3.5 w-3.5 text-orange-600" /> Famille</div>
          </div>
        </div>

        {/* SVG Map */}
        <svg
          viewBox={`0 0 ${mapWidth} ${mapHeight}`}
          className="w-full h-auto"
          role="img"
          aria-label="Plan interactif du Festival SoliMouv'"
        >
          {/* Background pattern */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d4c9b0" strokeWidth="0.5" opacity="0.4" />
            </pattern>
            <filter id="zoneShadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.15" />
            </filter>
            <filter id="zoneGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodOpacity="0.3" />
            </filter>
          </defs>

          <rect width={mapWidth} height={mapHeight} fill="#f5f0e6" />
          <rect width={mapWidth} height={mapHeight} fill="url(#grid)" />

          <MapDecorations />
          <MapPaths />

          {/* Zone shapes */}
          {ZONES.map((zone) => {
            const isHovered = hoveredZone === zone.id;
            const isSelected = selectedZone?.id === zone.id;

            return (
              <g
                key={zone.id}
                onClick={() => setSelectedZone(isSelected ? null : zone)}
                onMouseEnter={() => setHoveredZone(zone.id)}
                onMouseLeave={() => setHoveredZone(null)}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`${zone.name}: ${zone.description}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedZone(isSelected ? null : zone);
                  }
                }}
              >
                {/* Zone background */}
                <rect
                  x={zone.x}
                  y={zone.y}
                  width={zone.w}
                  height={zone.h}
                  rx={zone.rx}
                  fill={zone.color}
                  stroke={isSelected ? zone.textColor : isHovered ? zone.textColor : "transparent"}
                  strokeWidth={isSelected ? 4 : 3}
                  filter={isHovered || isSelected ? "url(#zoneGlow)" : "url(#zoneShadow)"}
                  opacity={isHovered || isSelected ? 1 : 0.85}
                  style={{ transition: "all 0.2s ease" }}
                />

                {/* Inner pattern lines */}
                <g opacity="0.15" clipPath={`inset(${zone.y}px ${mapWidth - zone.x - zone.w}px ${mapHeight - zone.y - zone.h}px ${zone.x}px round ${zone.rx}px)`}>
                  {Array.from({ length: Math.floor(zone.h / 20) }, (_, i) => (
                    <line
                      key={i}
                      x1={zone.x + 10}
                      y1={zone.y + 15 + i * 20}
                      x2={zone.x + zone.w - 10}
                      y2={zone.y + 15 + i * 20}
                      stroke={zone.textColor}
                      strokeWidth="1"
                      strokeDasharray="3 5"
                    />
                  ))}
                </g>

                {/* Emoji */}
                <text
                  x={zone.x + zone.w / 2}
                  y={zone.y + zone.h / 2 - 12}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={isHovered || isSelected ? "32" : "28"}
                  style={{ transition: "font-size 0.2s ease" }}
                >
                  {zone.emoji}
                </text>

                {/* Label background */}
                <rect
                  x={zone.x + zone.w / 2 - (zone.name.length * 5.2 + 16) / 2}
                  y={zone.y + zone.h / 2 + 8}
                  width={zone.name.length * 5.2 + 16}
                  height={24}
                  rx={6}
                  fill="rgba(255,255,255,0.92)"
                  style={{ transition: "all 0.2s ease" }}
                />

                {/* Label text */}
                <text
                  x={zone.x + zone.w / 2}
                  y={zone.y + zone.h / 2 + 24}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="'Syne', sans-serif"
                  fill={zone.textColor}
                  style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
                >
                  {zone.name}
                </text>

                {/* Activity count bubble */}
                {zone.activities.length > 0 && (
                  <g>
                    <circle
                      cx={zone.x + zone.w - 16}
                      cy={zone.y + 16}
                      r="12"
                      fill={zone.textColor}
                      opacity="0.9"
                    />
                    <text
                      x={zone.x + zone.w - 16}
                      y={zone.y + 17}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="10"
                      fontWeight="700"
                      fill="white"
                    >
                      {zone.activities.length}
                    </text>
                  </g>
                )}

                {/* PMR / Safe icons */}
                {zone.activities.some((a) => a.badges.includes("pmr")) && (
                  <g>
                    <circle cx={zone.x + 20} cy={zone.y + zone.h - 20} r="10" fill="white" opacity="0.9" />
                    <text x={zone.x + 20} y={zone.y + zone.h - 17} textAnchor="middle" dominantBaseline="middle" fontSize="12">♿</text>
                  </g>
                )}
                {zone.activities.some((a) => a.badges.includes("safe")) && (
                  <g>
                    <circle cx={zone.x + 44} cy={zone.y + zone.h - 20} r="10" fill="white" opacity="0.9" />
                    <text x={zone.x + 44} y={zone.y + zone.h - 17} textAnchor="middle" dominantBaseline="middle" fontSize="12">🏳️‍🌈</text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Zone detail panel */}
        <AnimatePresence>
          {selectedZone && (
            <ZoneDetail zone={selectedZone} onClose={() => setSelectedZone(null)} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
