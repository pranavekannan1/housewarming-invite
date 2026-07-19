"use client";

import { useEffect, useRef, useState } from "react";

type EventDetails = {
  date: string;
  time: string;
  venue: string;
};

function ScratchCard({
  details,
  onReveal,
}: {
  details: EventDetails;
  onReveal: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPoint = useRef({ x: 0, y: 0 });
  const moveCount = useRef(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;

    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;

    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    const gradient = context.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#d9a441");
    gradient.addColorStop(0.5, "#f1c967");
    gradient.addColorStop(1, "#bc6c4b");

    context.fillStyle = gradient;
    context.fillRect(0, 0, rect.width, rect.height);

    context.strokeStyle = "rgba(255,255,255,0.35)";
    context.lineWidth = 1;

    for (let line = -rect.height; line < rect.width; line += 14) {
      context.beginPath();
      context.moveTo(line, 0);
      context.lineTo(line + rect.height, rect.height);
      context.stroke();
    }

    context.fillStyle = "#22323a";
    context.font = "bold 16px Arial";
    context.textAlign = "center";
    context.fillText("SCRATCH TO REVEAL", rect.width / 2, rect.height / 2);
  }, []);

  function getPoint(event: React.PointerEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  function checkReveal() {
    const canvas = canvasRef.current;
    if (!canvas) return false;

    const context = canvas.getContext("2d");
    if (!context) return false;

    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let clearPixels = 0;
    let totalPixels = 0;

    for (let index = 3; index < pixels.length; index += 80) {
      totalPixels += 1;

      if (pixels[index] < 20) {
        clearPixels += 1;
      }
    }

    return clearPixels / totalPixels > 0.32;
  }

  function scratch(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!isDrawing.current || revealed) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const point = getPoint(event);

    context.globalCompositeOperation = "destination-out";
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = 48;

    context.beginPath();
    context.moveTo(lastPoint.current.x, lastPoint.current.y);
    context.lineTo(point.x, point.y);
    context.stroke();

    lastPoint.current = point;
    moveCount.current += 1;

    if (moveCount.current % 8 === 0 && checkReveal()) {
      setRevealed(true);

      window.setTimeout(() => {
        onReveal();
      }, 500);
    }
  }

  return (
    <article className="relative mx-auto flex min-h-[24rem] w-full max-w-sm flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#22323a] via-[#2f4550] to-[#324b54] shadow-[0_20px_45px_rgba(34,50,58,0.18)] sm:min-h-[28rem]">
      <div className="flex flex-col justify-center p-8 text-white sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#d9a441]">
          Event Details
        </p>

        {revealed && (
          <div className="mt-6 space-y-5">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d9a441]">Date</p>
              <p className="mt-2 text-xl font-semibold leading-tight">{details.date}</p>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d9a441]">Time</p>
              <p className="mt-2 text-xl font-semibold leading-tight">{details.time}</p>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d9a441]">Venue</p>
              <p className="mt-2 text-xl font-semibold leading-tight">{details.venue}</p>
            </div>
          </div>
        )}

        {!revealed && (
          <p className="mt-6 text-2xl font-semibold leading-tight">Hidden</p>
        )}
      </div>

      <canvas
        ref={canvasRef}
        onPointerDown={(event) => {
          isDrawing.current = true;
          lastPoint.current = getPoint(event);
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={scratch}
        onPointerUp={() => {
          isDrawing.current = false;
        }}
        onPointerCancel={() => {
          isDrawing.current = false;
        }}
        className={`absolute inset-0 h-full w-full touch-none transition-opacity duration-500 ${
          revealed ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        aria-label="Scratch to reveal event details"
      />
    </article>
  );
}

export default function ScratchDetails({
  date,
  time,
  venue,
}: {
  date: string;
  time: string;
  venue: string;
}) {
  const [revealed, setRevealed] = useState(false);

  const eventDetails: EventDetails = {
    date,
    time,
    venue,
  };

  const confetti = Array.from({ length: 28 }, (_, index) => index);

  return (
    <>
      <div className="mt-12 flex justify-center">
        <ScratchCard
          details={eventDetails}
          onReveal={() => setRevealed(true)}
        />
      </div>

      {revealed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#22323a]/75 px-5 py-8 backdrop-blur-sm"
          onClick={() => setRevealed(false)}
        >
          {confetti.map((item) => (
            <span
              key={item}
              className="absolute h-3 w-2 rounded-sm bg-[#d9a441]"
              style={{
                left: `${(item * 37) % 100}%`,
                top: `${(item * 19) % 70}%`,
                backgroundColor:
                  item % 3 === 0
                    ? "#d9a441"
                    : item % 3 === 1
                    ? "#bc6c4b"
                    : "#ffffff",
                animation: `celebration-pop ${0.7 + (item % 4) * 0.15}s ease-out forwards`,
              }}
            />
          ))}

          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-md rounded-[2rem] bg-[#f8f2e9] p-8 text-center shadow-2xl sm:p-10"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#bc6c4b]">
              All details revealed
            </p>

            <div className="mt-8 space-y-6 text-left">
              <div className="border-b border-[#22323a]/10 pb-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#bc6c4b]">
                  Date
                </p>
                <p className="mt-3 text-2xl font-semibold text-[#22323a]">
                  {date}
                </p>
              </div>

              <div className="border-b border-[#22323a]/10 pb-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#bc6c4b]">
                  Time
                </p>
                <p className="mt-3 text-2xl font-semibold text-[#22323a]">
                  {time}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#bc6c4b]">
                  Venue
                </p>
                <p className="mt-3 text-2xl font-semibold text-[#22323a]">
                  {venue}
                </p>
              </div>
            </div>

            <button
              onClick={() => setRevealed(false)}
              className="mt-8 rounded-full bg-[#22323a] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#bc6c4b]"
            >
              Continue celebrating
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes celebration-pop {
          0% {
            opacity: 0;
            transform: translateY(40px) rotate(0deg) scale(0);
          }
          25% {
            opacity: 1;
            transform: translateY(-30px) rotate(160deg) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(180px) rotate(420deg) scale(0.7);
          }
        }
      `}</style>
    </>
  );
}