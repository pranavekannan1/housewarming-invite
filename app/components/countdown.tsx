"use client";

import { useEffect, useState } from "react";


type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  finished: boolean;
};

function getTimeLeft(targetDate: string): TimeLeft {
  const difference = new Date(targetDate).getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    finished: false,
  };
}

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft(targetDate));

    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return <div className="h-36 animate-pulse rounded-3xl bg-white/60" />;
  }

  if (timeLeft.finished) {
    return (
      <p className="text-center font-serif text-2xl italic text-[#bc6c4b]">
        The celebration day is here.
      </p>
    );
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="rounded-3xl border border-[#22323a]/10 bg-white px-4 py-6 text-center shadow-sm"
        >
          <p className="text-3xl font-semibold text-[#22323a] sm:text-4xl">
            {String(unit.value).padStart(2, "0")}
          </p>
          <p className="mt-2 text-xs font-bold uppercase tracking-widest text-[#bc6c4b]">
            {unit.label}
          </p>
        </div>
      ))}
    </div>
  );
}