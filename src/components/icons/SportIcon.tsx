import React from "react";

export type SportName = "Bowling" | "Basket" | "Rugby" | "Badminton" | "Baseball" | "Tennis";

interface SportIconProps {
  sport: SportName;
  className?: string;
}

function BowlingIcon({ className }: { className?: string }) {
  return (
    <div className={className ?? "h-[142px] w-[109px]"} style={{ position: "relative", overflow: "clip" }}>
      <div className="absolute flex items-center justify-center" style={{ inset: "0 4.65% 26.85% -0.01%", containerType: "size" }}>
        <div style={{ transform: "rotate(-45deg)", flexShrink: 0, height: "hypot(50cqw,50cqh)", width: "hypot(50cqw,-50cqh)" }}>
          <img alt="" src="/figma-assets/bowling-v0.svg" className="absolute inset-0 block size-full max-w-none" />
        </div>
      </div>
      <img alt="" src="/figma-assets/bowling-v1.svg" className="absolute block max-w-none size-full" style={{ inset: "0 11.62% 66.46% 3.95%" }} />
      <img alt="" src="/figma-assets/bowling-v2.svg" className="absolute block max-w-none size-full" style={{ inset: "15.57% 55.68% 75.1% 28.11%" }} />
      <img alt="" src="/figma-assets/bowling-v3.svg" className="absolute block max-w-none size-full" style={{ inset: "17.33% 57.25% 77.46% 35.96%" }} />
      <img alt="" src="/figma-assets/bowling-v4.svg" className="absolute block max-w-none size-full" style={{ inset: "15.57% 36.11% 75.1% 47.69%" }} />
      <img alt="" src="/figma-assets/bowling-v5.svg" className="absolute block max-w-none size-full" style={{ inset: "17.33% 37.67% 77.46% 55.54%" }} />
      <img alt="" src="/figma-assets/bowling-pin.svg" className="absolute block max-w-none size-full" style={{ inset: "26.78% 0 0.01% 62.33%" }} />
    </div>
  );
}

function BasketIcon({ className }: { className?: string }) {
  return (
    <div className={className ?? "h-[116px] w-[114px]"} style={{ position: "relative", overflow: "clip" }}>
      <img alt="" src="/figma-assets/basket-v0.svg" className="absolute block max-w-none size-full" style={{ inset: "30.2% 20.84% 2.47% 10.72%" }} />
      <img alt="" src="/figma-assets/basket-v1.svg" className="absolute block max-w-none size-full" style={{ inset: "0 0 21.08% 11.75%" }} />
      <img alt="" src="/figma-assets/basket-v2.svg" className="absolute block max-w-none size-full" style={{ inset: "15.19% 44.11% 67.61% 44.94%" }} />
      <img alt="" src="/figma-assets/basket-v3.svg" className="absolute block max-w-none size-full" style={{ inset: "23.8% 47.78% 69.81% 45.71%" }} />
      <img alt="" src="/figma-assets/basket-v4.svg" className="absolute block max-w-none size-full" style={{ inset: "15.19% 27.73% 67.61% 61.31%" }} />
      <img alt="" src="/figma-assets/basket-v5.svg" className="absolute block max-w-none size-full" style={{ inset: "23.8% 31.4% 69.81% 62.09%" }} />
      <img alt="" src="/figma-assets/basket-group.svg" className="absolute block max-w-none size-full" style={{ inset: "57.84% 60.49% 0 0" }} />
    </div>
  );
}

function RugbyIcon({ className }: { className?: string }) {
  return (
    <div className={className ?? "h-[158px] w-[171px]"} style={{ position: "relative", overflow: "clip" }}>
      <img alt="" src="/figma-assets/rugby-v0.svg" className="absolute block max-w-none size-full" style={{ inset: "36.06% 46.28% 33.88% 0" }} />
      <div className="absolute flex items-center justify-center" style={{ inset: "-2.61% 41.82% 43.32% 3.31%", containerType: "size" }}>
        <div style={{ flexShrink: 0, height: "hypot(26.41cqw,73.59cqh)", transform: "rotate(-19.74deg)", width: "hypot(73.59cqw,-26.41cqh)" }}>
          <img alt="" src="/figma-assets/rugby-v1.svg" className="absolute inset-0 block size-full max-w-none" />
        </div>
      </div>
      <img alt="" src="/figma-assets/rugby-v2.svg" className="absolute block max-w-none size-full" style={{ inset: "24.28% 57.34% 65.97% 34.29%" }} />
      <img alt="" src="/figma-assets/rugby-v3.svg" className="absolute block max-w-none size-full" style={{ inset: "24.61% 71.61% 66.2% 19.82%" }} />
      <img alt="" src="/figma-assets/rugby-v4.svg" className="absolute block max-w-none size-full" style={{ inset: "29.02% 72.95% 66.79% 23.19%" }} />
      <img alt="" src="/figma-assets/rugby-v5.svg" className="absolute block max-w-none size-full" style={{ inset: "29.61% 58.51% 66.19% 37.62%" }} />
      <img alt="" src="/figma-assets/rugby-group.svg" className="absolute block max-w-none size-full" style={{ inset: "56.35% 0.01% 0 26.85%" }} />
    </div>
  );
}

function BadmintonIcon({ className }: { className?: string }) {
  return (
    <div className={className ?? "h-[132px] w-[150px]"} style={{ position: "relative", overflow: "clip" }}>
      <img alt="" src="/figma-assets/badminton-v0.svg" className="absolute block max-w-none size-full" style={{ inset: "41.21% 48.03% 0 0" }} />
      <div className="absolute flex items-center justify-center" style={{ inset: "0 37.29% 29.05% 0", containerType: "size" }}>
        <div style={{ flexShrink: 0, height: "hypot(26.41cqw,73.59cqh)", transform: "rotate(-19.74deg)", width: "hypot(73.59cqw,-26.41cqh)" }}>
          <img alt="" src="/figma-assets/badminton-v1.svg" className="absolute inset-0 block size-full max-w-none" />
        </div>
      </div>
      <img alt="" src="/figma-assets/badminton-v2.svg" className="absolute block max-w-none size-full" style={{ inset: "26.22% 58.92% 60.45% 32.23%" }} />
      <img alt="" src="/figma-assets/badminton-v3.svg" className="absolute block max-w-none size-full" style={{ inset: "26.22% 72.29% 60.45% 18.87%" }} />
      <img alt="" src="/figma-assets/badminton-v4.svg" className="absolute block max-w-none size-full" style={{ inset: "32.68% 73.96% 61.73% 21.11%" }} />
      <img alt="" src="/figma-assets/badminton-v5.svg" className="absolute block max-w-none size-full" style={{ inset: "31.71% 60.89% 62.7% 34.17%" }} />
      <img alt="" src="/figma-assets/badminton-group.svg" className="absolute block max-w-none size-full" style={{ inset: "20.88% 0 44.33% 60.11%" }} />
    </div>
  );
}

function BaseballIcon({ className }: { className?: string }) {
  return (
    <div className={className ?? "h-[123px] w-[179px]"} style={{ position: "relative", overflow: "clip" }}>
      <img alt="" src="/figma-assets/baseball-v0.svg" className="absolute block max-w-none size-full" style={{ inset: "50.94% 57.94% 11.26% 0" }} />
      <img alt="" src="/figma-assets/baseball-v1.svg" className="absolute block max-w-none size-full" style={{ inset: "21.14% 48.97% 34.72% 9.15%" }} />
      <img alt="" src="/figma-assets/baseball-v2.svg" className="absolute block max-w-none size-full" style={{ inset: "42.06% 60.87% 49.07% 30.17%" }} />
      <img alt="" src="/figma-assets/baseball-v3.svg" className="absolute block max-w-none size-full" style={{ inset: "36.73% 72.74% 54.4% 18.3%" }} />
      <img alt="" src="/figma-assets/baseball-v4.svg" className="absolute block max-w-none size-full" style={{ inset: "39.08% 75.01% 55.54% 19.55%" }} />
      <img alt="" src="/figma-assets/baseball-v5.svg" className="absolute block max-w-none size-full" style={{ inset: "44.46% 62.64% 50.15% 31.93%" }} />
      <img alt="" src="/figma-assets/baseball-v6.svg" className="absolute block max-w-none size-full" style={{ inset: "65.39% 56.18% 0 20.05%" }} />
      <img alt="" src="/figma-assets/baseball-v7.svg" className="absolute block max-w-none size-full" style={{ inset: "0 0 12.45% 31.93%" }} />
    </div>
  );
}

function TennisIcon({ className }: { className?: string }) {
  return (
    <div className={className ?? "h-[95px] w-[154px]"} style={{ position: "relative", overflow: "clip" }}>
      <img alt="" src="/figma-assets/tennis-v0.svg" className="absolute block max-w-none size-full" style={{ inset: "62.25% 11.77% 0.22% 46.18%" }} />
      <img alt="" src="/figma-assets/tennis-v1.svg" className="absolute block max-w-none size-full" style={{ inset: "0 12.34% 27.4% 42.1%" }} />
      <img alt="" src="/figma-assets/tennis-v2.svg" className="absolute block max-w-none size-full" style={{ inset: "45.55% 42.53% 43.09% 47.76%" }} />
      <img alt="" src="/figma-assets/tennis-v3.svg" className="absolute block max-w-none size-full" style={{ inset: "44.03% 29.52% 43.93% 60.74%" }} />
      <img alt="" src="/figma-assets/tennis-v4.svg" className="absolute block max-w-none size-full" style={{ inset: "22.63% 11.77% 55.1% 41.13%" }} />
      <img alt="" src="/figma-assets/tennis-v5.svg" className="absolute block max-w-none size-full" style={{ inset: "24.6% 0 61.24% 88.23%" }} />
      <img alt="" src="/figma-assets/tennis-v6.svg" className="absolute block max-w-none size-full" style={{ inset: "40.53% 0.32% 30.64% 87.66%" }} />
      <img alt="" src="/figma-assets/tennis-v7.svg" className="absolute block max-w-none size-full" style={{ inset: "50.51% 47.5% 45.06% 49.78%" }} />
      <img alt="" src="/figma-assets/tennis-v8.svg" className="absolute block max-w-none size-full" style={{ inset: "49.13% 35.97% 46.43% 61.3%" }} />
      <img alt="" src="/figma-assets/tennis-group.svg" className="absolute block max-w-none size-full" style={{ inset: "-1.29% 40.19% 7.84% -4.87%" }} />
      <img alt="" src="/figma-assets/tennis-v9.svg" className="absolute block max-w-none size-full" style={{ inset: "76.32% 43.33% -0.01% 42.12%" }} />
    </div>
  );
}

const icons: Record<SportName, (p: { className?: string }) => React.ReactElement> = {
  Bowling: BowlingIcon,
  Basket: BasketIcon,
  Rugby: RugbyIcon,
  Badminton: BadmintonIcon,
  Baseball: BaseballIcon,
  Tennis: TennisIcon,
};

export default function SportIcon({ sport, className }: SportIconProps) {
  const Icon = icons[sport];
  return <Icon className={className} />;
}
