// ─────────────────────────────────────────────
// src/components/MenuSection.tsx
// a *real* second section so scrolling works
// ─────────────────────────────────────────────
import { useTheme } from "./ThemeContext";

export default function MenuSection() {
  const { theme } = useTheme();
  const bgClass = theme === 'bagel' ? 'bg-skyline-blue' : 'bg-black';
  const textClass = theme === 'bagel' ? 'text-skyline-yellow' : 'text-white';
  const cardBg = theme === 'bagel' ? 'bg-white text-skyline-blue' : 'bg-[#222] text-white';
  return (
    <div className={`min-h-screen snap-start flex flex-col items-center pt-32 pb-24 px-4 text-center ${bgClass}`}>
      {/* headline */}
      <h2 className={`hero-title mb-10 ${textClass}`}>MENU</h2>
      {/*  simple grid of demo cards  */}
      <div className="grid gap-10 w-full max-w-5xl sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`rounded-lg overflow-hidden shadow-lg ${cardBg}`}
          >
            <div className="h-40 w-full bg-skyline-yellow/40" />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">Menu Item {i + 1}</h3>
              <p className="text-sm">
                Replace this whole <code>&lt;MenuSection&gt;</code> component
                with your actual menu markup.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}