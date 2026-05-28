import type { CSSProperties } from "react";

const bars = 24;

export function SoundWave({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-end justify-center gap-1 ${className}`}
      aria-hidden
    >
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className="sound-wave-bar w-1 rounded-full bg-gradient-to-t from-gold-dark to-gold-light"
          style={
            {
              "--sw-delay": `${i * 0.05}s`,
              "--sw-mid": `${12 + ((i * 7) % 28)}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
