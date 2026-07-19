"use client";

import { useState } from "react";

export default function SecretWelcome() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#d9a441]/40 bg-[#fffaf3] p-8 text-center shadow-sm sm:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#bc6c4b]">
          A Letter with a warm welcome
        </p>

        <h2 className="mt-4 text-3xl font-semibold text-[#22323a] sm:text-4xl">
         Your Presence Is Our Greatest Gift
        </h2>

        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="mt-7 rounded-full bg-[#d9a441] px-7 py-4 text-sm font-bold text-[#22323a] transition hover:-translate-y-1 hover:bg-[#bc6c4b] hover:text-white"
          >
            Welcome note
          </button>
        ) : (
          <div className="mt-8 rounded-2xl bg-white p-7 text-left shadow-inner">
            <p className="font-serif text-2xl italic leading-relaxed text-[#bc6c4b]">
             Every home becomes special because of the people who walk through its doors.
Join us for a day filled with warmth, delicious food, joyful conversations, and unforgettable memories as we celebrate our new home together.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#5e6b70]">
              Come as you are, bring your smiles, and help us fill this new
              home with blessings and happy memories.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}