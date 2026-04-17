interface SolimouwLogoProps {
  className?: string;
}

export default function SolimouwLogo({ className }: SolimouwLogoProps) {
  return (
    <img
      src="/figma-assets/logo.png"
      alt="SoliMouv'"
      className={className ?? "h-14 w-auto"}
    />
  );
}
