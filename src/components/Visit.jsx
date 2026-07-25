import { hours, shop } from '../data/site.js'
import { Arrow, Button, Reveal, SectionHeading } from './ui.jsx'

// Sunday = 0 in JS; our list starts at Monday.
const todayIndex = (new Date().getDay() + 6) % 7

export default function Visit() {
  return (
    <section id="visit" className="relative py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              index="04"
              kicker="Visit"
              title={
                <>
                  Come through.
                  <br />
                  Kettle's on.
                </>
              }
              lead="Book ahead if you want a specific barber or time. Walk in if you're feeling lucky — we'll always try to fit you."
            />

            <Reveal delay={0.15}>
              <div className="mt-10 space-y-8">
                <div>
                  <p className="kicker">Address</p>
                  <address className="mt-2.5 font-display text-lg leading-snug not-italic">
                    {shop.address.line1}
                    <br />
                    {shop.address.line2}
                  </address>
                </div>

                <div className="flex flex-wrap gap-x-12 gap-y-8">
                  <div>
                    <p className="kicker">Phone</p>
                    <a
                      href={`tel:${shop.phone.replace(/[^+\d]/g, '')}`}
                      className="mt-2.5 block font-display text-lg transition-colors duration-300 hover:text-flame"
                    >
                      {shop.phone}
                    </a>
                  </div>
                  <div>
                    <p className="kicker">Email</p>
                    <a
                      href={`mailto:${shop.email}`}
                      className="mt-2.5 block font-display text-lg transition-colors duration-300 hover:text-flame"
                    >
                      {shop.email}
                    </a>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Button href={shop.bookingUrl} variant="flame">
                    Book a chair <Arrow />
                  </Button>
                  <Button href={shop.instagram} target="_blank" rel="noopener noreferrer" variant="ghost">
                    Instagram
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="hud relative border border-line bg-ink-2/70 p-7 backdrop-blur-sm sm:p-9">
              <div className="flex items-center justify-between">
                <p className="kicker">Opening hours</p>
                <span className="flex items-center gap-2 font-mono text-[0.55rem] tracking-[0.16em] text-mute-2 uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-flame" aria-hidden="true" />
                  Local time
                </span>
              </div>

              <dl className="mt-7">
                {hours.map((h, i) => {
                  const isToday = i === todayIndex
                  return (
                    <div
                      key={h.day}
                      className={`flex items-baseline justify-between gap-4 border-b border-line py-4 last:border-b-0 ${
                        isToday ? 'text-bone' : 'text-mute'
                      }`}
                    >
                      <dt className="flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.16em] uppercase">
                        {isToday && (
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-flame" aria-hidden="true" />
                        )}
                        <span className={isToday ? '' : 'pl-[1.125rem]'}>{h.day}</span>
                        {isToday && <span className="sr-only">(today)</span>}
                      </dt>
                      <dd
                        className={`font-display tracking-tight tabular-nums ${
                          h.closed ? 'text-mute-2' : isToday ? 'text-flame' : ''
                        }`}
                      >
                        {h.time}
                      </dd>
                    </div>
                  )
                })}
              </dl>

              <p className="mt-7 border-t border-line pt-6 text-xs leading-relaxed text-mute-2">
                Last booking is 45 minutes before close. Running late? Call the shop — we'd rather move you
                than rush the cut.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
