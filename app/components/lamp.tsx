"use client";

import { useState } from "react";

export default function LampGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [stage, setStage] = useState<"closed" | "opening" | "open">("closed");

  function lightLamp() {
    setStage("opening");

    window.setTimeout(() => {
      setStage("open");
    }, 900);
  }

  if (stage === "open") {
    return <>{children}</>;
  }

  const isLit = stage === "opening";

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#1d292d] px-5 text-center transition duration-700 ${
        isLit ? "scale-110 opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#d9a441]/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#bc6c4b]/20 blur-3xl" />

      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d9a441]">
          A new beginning
        </p>

        <h1 className="mt-5 font-serif text-4xl italic text-[#f8f2e9] sm:text-5xl">
          Light the Nilavilakku
        </h1>

        <p className="mx-auto mt-5 max-w-md leading-7 text-white/65">
          Light this traditional Kerala lamp to open the housewarming
          invitation.
        </p>

        <svg
          viewBox="0 0 200 280"
          className="mx-auto my-8 h-72 w-56 drop-shadow-2xl"
          aria-label="Kerala traditional lamp"
        >
          {isLit && (
            <>
              <path
                d="M100 12 C75 43 85 72 100 82 C115 72 125 43 100 12"
                fill="#ffd56a"
              />
              <path
                d="M100 29 C90 50 95 63 100 68 C105 63 110 50 100 29"
                fill="#fff8d8"
              />
            </>
          )}

          <ellipse cx="100" cy="90" rx="50" ry="18" fill="#d9a441" />
          <ellipse cx="100" cy="85" rx="38" ry="10" fill="#f7c85a" />
          <rect x="94" y="89" width="12" height="95" rx="6" fill="#d9a441" />
          <path d="M72 180 H128 L145 210 H55 Z" fill="#d9a441" />
          <ellipse cx="100" cy="214" rx="58" ry="17" fill="#b87821" />
          <ellipse cx="100" cy="210" rx="48" ry="12" fill="#d9a441" />
          <circle cx="100" cy="93" r="6" fill="#352b18" />
        </svg>

        <button
          onClick={lightLamp}
          disabled={isLit}
          className="rounded-full bg-[#d9a441] px-8 py-4 text-sm font-bold text-[#22323a] transition hover:-translate-y-1 hover:bg-[#f7c85a] disabled:cursor-wait"
        >
          {isLit ? "Blessings are lighting the way..." : "Light the lamp"}
        </button>
      </div>
    </div>
  );
}