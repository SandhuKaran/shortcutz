import { services, shop } from '../data/site.js'
import { Arrow, Button, Reveal, SectionHeading } from './ui.jsx'

function ServiceCard({ service, index }) {
  const { id, name, price, duration, blurb, featured } = service

  return (
    <Reveal delay={index * 0.06}>
      {/* No border here on purpose — the parent grid's `gap-px` over a
          line-coloured background draws the hairlines between cards. */}
      <article
        className={`hud group relative flex h-full flex-col bg-ink-2/80 p-7 backdrop-blur-sm transition-colors duration-500 hover:bg-ink-3/80 sm:p-8 ${
          featured ? 'ring-1 ring-flame/30 ring-inset' : ''
        }`}
      >
        {featured && (
          <span className="absolute -top-px right-6 bg-flame px-2.5 py-1 font-mono text-[0.55rem] tracking-[0.16em] text-ink uppercase">
            Most booked
          </span>
        )}

        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-[0.62rem] tracking-[0.18em] text-mute-2">{id}</span>
          <span className="font-mono text-[0.62rem] tracking-[0.14em] text-mute-2 uppercase">{duration}</span>
        </div>

        <h3 className="mt-7 font-display text-2xl font-semibold tracking-[-0.02em] uppercase sm:text-[1.7rem]">
          {name}
        </h3>

        <p className="mt-3 grow text-sm leading-relaxed text-mute">{blurb}</p>

        <div className="mt-8 flex items-end justify-between border-t border-line pt-5">
          <span className="font-display text-3xl font-semibold tracking-tight">
            <span className="align-super text-base text-mute-2">$</span>
            {price}
          </span>
          <a
            href={shop.bookingUrl}
            className="group/link flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.16em] text-mute uppercase transition-colors duration-300 hover:text-flame"
            aria-label={`Book ${name}`}
          >
            Book
            <Arrow className="group-hover/link:translate-x-1" />
          </a>
        </div>
      </article>
    </Reveal>
  )
}

export default function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            index="02"
            kicker="The menu"
            title={
              <>
                Priced plain.
                <br />
                No surprises at the till.
              </>
            }
          />
          <Reveal delay={0.15}>
            <p className="max-w-xs font-mono text-[0.68rem] leading-loose tracking-[0.1em] text-mute-2 uppercase">
              Every cut includes a consult, hot towel and a finish. Cash and card both fine.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-mute">
              Not sure what you want? Book the Signature Cut — we'll work it out in the chair.
            </p>
            <Button href={shop.bookingUrl} variant="ghost" className="shrink-0">
              Check availability <Arrow />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
