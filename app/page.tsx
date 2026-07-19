import Image from 'next/image';
import Countdown from './components/countdown';
import SecretWelcome from '@/app/components/secretwelcome';
import ScratchDetails from '@/app/components/scratchreveal';
import Lamp from '@/app/components/lamp';


const event = {
  hosts: "Satheesh Kumar and Sreelekha",
  date: "Thursday, 20 August 2026",
  time: "12:00 PM onwards",
  eventDateTime: "2026-08-20T12:00:00+05:30",
  venue: "Kalabhavanam Panthaplavu Pattazhy",
  address: "Kalabhavanam Panthaplavu P.O. Pattazhy, Kollam, Kerala 691522",
  latitude: 9.0769399,
  longitude: 76.8248472,
  whatsappNumber: "919961356278",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m30!1m8!1m3!1d984.9640938651964!2d76.8250705!3d9.0768463!3m2!1i1024!2i768!4f13.1!4m19!3e9!4m3!3m2!1d8.4948324!2d76.99590479999999!4m5!1s0x3b060df5674649b1%3A0x7c4d3f75ba90ec88!2sPanthaplavu%20aruvi%20point%20(Irappinchaal)%2C%203RC8%2B93R%2C%20Pattazhy%2C%20Kerala%20691522!3m2!1d9.0709816!2d76.81514059999999!4m3!3m2!1d9.0769696!2d76.82474739999999!4m3!3m2!1d9.0769399!2d76.8248472!5e0!3m2!1sen!2sin!4v1784444426728!5m2!1sen!2sin", 
};


function DetailCard({
  label,
  value,
  number,
}: {
  label: string;
  value: string;
  number: string;
}) {
  return (
    <article className="group rounded-3xl border border-[#22323a]/10 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <p className="text-4xl font-serif italic text-[#d9a441]">{number}</p>
      <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-[#bc6c4b]">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold leading-7 text-[#22323a]">
        {value}
      </p>
    </article>
  );
}

function SectionTitle({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#bc6c4b]">
        {label}
      </p>

      <div className="mx-auto mt-3 flex items-center justify-center gap-3">
        <span className="text-2xl text-[#d9a441]">ॐ</span>
        <div className="h-0.5 flex-1 rounded-full bg-gradient-to-r from-[#d9a441] via-[#bc6c4b] to-[#d9a441]" />
        <span className="text-2xl text-[#d9a441]">ॐ</span>
      </div>

      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#22323a] sm:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-base leading-7 text-[#5e6b70] sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  const whatsappMessage = encodeURIComponent(
    `Thank you for your invitation ${event.hosts}! Congratulations on your new home and blessings for future happiness.`
  );

 const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${event.latitude},${event.longitude}`;
  const calendarText = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:20260720T053000Z
DTEND:20260720T093000Z
SUMMARY:Housewarming Celebration
LOCATION:${event.address}
DESCRIPTION:Housewarming celebration at ${event.hosts}' new home.
END:VEVENT
END:VCALENDAR`;

 const startDate = new Date(event.eventDateTime);
const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000);

const googleDate = (date: Date) =>
  date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z/, "Z");

const googleCalendarLink =
  `https://calendar.google.com/calendar/render?action=TEMPLATE` +
  `&text=${encodeURIComponent(`Housewarming - ${event.hosts}`)}` +
  `&dates=${googleDate(startDate)}/${googleDate(endDate)}` +
  `&details=${encodeURIComponent("Please join us for our housewarming celebration.")}` +
  `&location=${encodeURIComponent(event.address)}`;
return (
  <Lamp>
    <main className="overflow-hidden bg-[#f8f2e9] text-[#22323a]">
      <section className="relative min-h-screen overflow-hidden px-5 py-6 sm:px-8">
        <div className="absolute -left-32 -top-28 h-80 w-80 rounded-full bg-[#d9a441]/25 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[#bc6c4b]/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d9a441]/30" />

        <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col rounded-[2rem] border border-[#f3d29b]/40 bg-gradient-to-br from-[#fff7e1] via-[#fff1d0] to-[#f7e0b9] px-6 py-8 shadow-2xl backdrop-blur-sm sm:px-12 sm:py-10">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-[#b3731e]">
              <span className="text-3xl leading-none">ॐ</span>
              <span className="text-xs font-bold uppercase tracking-[0.28em] text-[#bc6c4b]">
                श्री गणेशाय नमः
              </span>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#bc6c4b]">
                New Beginnings
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-[#b3731e]">
                शुभ गृह प्रवेश
              </p>
            </div>
          </header>

          <div className="my-auto py-16 text-center">
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.32em] text-[#bc6c4b]">
              You are warmly invited
            </p>

            <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              We&apos;re opening
              <span className="mt-3 block font-serif italic text-[#bc6c4b]">
                our doors
              </span>
            </h1>

            <p className="mx-auto mt-9 max-w-xl text-base leading-7 text-[#5e6b70] sm:text-lg">
              A fresh chapter, a new beginning, and a home waiting to be filled
              with beautiful memories. Please join us as we celebrate.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="/invitation-card.jpeg"
                download="Housewarming-Invitation.jpeg"
                className="rounded-full border border-[#d9a441]/20 bg-gradient-to-r from-[#fff7e1] to-[#f5e0b5] px-7 py-4 text-sm font-bold uppercase tracking-[0.1em] text-[#b3731e] shadow-sm transition duration-300 hover:border-[#bc6c4b] hover:text-[#bc6c4b]"
              >
                View Invitation Card
              </a>

              <a
                href={`https://wa.me/${event.whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[#d9a441]/20 bg-gradient-to-r from-[#fff7e1] to-[#f5e0b5] px-7 py-4 text-sm font-bold uppercase tracking-[0.1em] text-[#b3731e] shadow-sm transition duration-300 hover:border-[#bc6c4b] hover:text-[#bc6c4b]"
              >
                Share Wishes on WhatsApp
              </a>
            </div>
          </div>

          <div className="mt-8 text-center text-sm font-semibold uppercase tracking-[0.32em] text-[#7b6b5a]">
            <a href="#details" className="inline-flex items-center gap-2 text-[#7b6b5a] transition hover:text-[#b3731e]">
              <span className="font-serif text-lg">Scroll down</span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#d9a441]/20 bg-[#fff0d4]/90 text-[#b3731e] shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
                <span className="animate-bounce">↓</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2">
          <div className="mx-auto w-full max-w-md rounded-[2.5rem] bg-[#22323a] p-4 shadow-2xl ring-1 ring-[#d9a441]/15">
            <div className="relative overflow-hidden rounded-[2rem] border border-[#d9a441]/40 bg-[#14212a] shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/house-pic.jpeg"
                  alt="New home image"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 rounded-b-[2rem] bg-gradient-to-t from-black/60 to-transparent p-4 text-center text-xs uppercase tracking-[0.24em] text-[#f8f2e9]">
                Welcome to our new home
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#bc6c4b]">
              A small celebration
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
              Our story has a new beginning.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#5e6b70] sm:text-lg">
              We are excited to welcome you into our new space. Your laughter,
              stories, blessings, and company will make this day even more
              special.
            </p>

            <p className="mt-7 font-serif text-2xl italic text-[#bc6c4b]">
              With love, {event.hosts}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#e9ded0] px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <SectionTitle
            label="Counting down"
            title="The doors open in"
            description="Every second brings us closer to celebrating together."
          />

          <div className="mt-12">
            <Countdown targetDate={event.eventDateTime} />
          </div>
        </div>
      </section>

      <section id="details" className="px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            label="Mark your calendar"
            title="The celebration details"
            description="We would be delighted to have you with us for food, conversations, and many things."
          />

          <ScratchDetails
  date={event.date}
  time={event.time}
  venue={event.venue}
/>

          <div className="mt-10 text-center">
            <a
  href={googleCalendarLink}
  target="_blank"
  rel="noreferrer"
  className="inline-flex rounded-full border border-[#22323a]/20 bg-white px-6 py-4 text-sm font-bold transition hover:border-[#bc6c4b] hover:text-[#bc6c4b]"
>
  Add to Google Calendar
</a>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#bc6c4b] shadow-xl">
          <div className="grid md:grid-cols-2">
            <div className="p-8 text-white sm:p-14">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#ffe1a6]">
                Find us
              </p>

              <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
                Event Location
              </h2>

              <p className="mt-6 text-lg leading-8 text-white/85">
                {event.address}
              </p>

              <a
               href={directionsLink}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex rounded-full bg-white px-6 py-4 text-sm font-bold text-[#bc6c4b] transition hover:-translate-y-1 hover:shadow-lg"
              >
                Get directions
              </a>
            </div>

       <iframe
  title="Housewarming location map"
  src={event.mapEmbedUrl}
  className="min-h-80 w-full border-0 md:min-h-full"
  loading="lazy"
/>
          </div>
        </div>
      </section>

      <section className="px-5 pb-10 pt-6 text-center sm:px-8 sm:pb-16">
        <SectionTitle
          label="Save the date"
          title="Will you join us?"
          description="We cannot wait to welcome you home."
        />

        <a
          href={`https://wa.me/${event.whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex rounded-full bg-[#22323a] px-8 py-5 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#bc6c4b] hover:shadow-xl"
        >
          Share wishes on WhatsApp
        </a>
      </section>

      <SecretWelcome />

      <footer className="border-t border-[#22323a]/10 bg-[#f8f2e9] px-5 py-8 text-center sm:px-8">
        <p className="font-serif text-xl italic text-[#bc6c4b]">
          With love, Adithyan and Abhirami
        </p>

        <p className="mt-2 text-sm text-[#6f7a7d]">
          We look forward to have you in the event together.
        </p>
      </footer>

      <div className="border-t border-[#22323a]/10 bg-[#22323a] px-5 py-3 text-center">
        <p className="text-xs font-medium tracking-wide text-white/70">
          2026 All Rights Reserved | Developed by{""} &nbsp;
          <span className="font-bold text-[#d9a441]">MAHI</span>
        </p>
      </div>
    </main>
  </Lamp>
  );
}
