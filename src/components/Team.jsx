import { shop, team } from '../data/site.js'
import { Arrow, Figure, Reveal, SectionHeading } from './ui.jsx'

function Barber({ barber, index }) {
  const { name, role, image, years, specialties, bio, instagram } = barber

  return (
    <Reveal delay={index * 0.1}>
      <article className="hud group relative border border-line bg-ink-2/60 backdrop-blur-sm transition-colors duration-500 hover:border-line-2">
        <div className="relative overflow-hidden">
          {/* warm floor glow behind the cut-out portrait */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
            style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(239,76,43,0.16), transparent 70%)' }}
            aria-hidden="true"
          />
          <Figure
            src={image}
            alt={`${name}, ${role} at ${shop.name}`}
            label={`${name} — headshot`}
            className="aspect-4/5 w-full"
            imgClassName="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />

          <span className="absolute top-5 left-5 font-mono text-[0.55rem] tracking-[0.2em] text-flame">
            0{index + 1}
          </span>
          <span className="absolute top-5 right-5 font-mono text-[0.55rem] tracking-[0.16em] text-mute-2 uppercase">
            {years} yrs
          </span>
        </div>

        <div className="border-t border-line p-7 sm:p-8">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-3xl font-semibold tracking-[-0.03em] uppercase sm:text-4xl">
              {name}
            </h3>
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-mute transition-colors duration-300 hover:text-flame"
              aria-label={`${name} on Instagram`}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>

          <p className="mt-2 font-mono text-[0.62rem] tracking-[0.16em] text-flame uppercase">{role}</p>

          <p className="mt-5 text-sm leading-relaxed text-mute">{bio}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {specialties.map((s) => (
              <li
                key={s}
                className="border border-line px-3 py-1.5 font-mono text-[0.55rem] tracking-[0.14em] text-mute-2 uppercase"
              >
                {s}
              </li>
            ))}
          </ul>

          <a
            href={shop.bookingUrl}
            className="group/link mt-8 flex items-center gap-2.5 border-t border-line pt-5 font-mono text-[0.65rem] tracking-[0.16em] text-bone uppercase transition-colors duration-300 hover:text-flame"
          >
            Book with {name}
            <Arrow className="group-hover/link:translate-x-1" />
          </a>
        </div>
      </article>
    </Reveal>
  )
}

export default function Team() {
  return (
    <section id="team" className="relative py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          index="03"
          kicker="The team"
          title={
            <>
              Two chairs.
              <br />
              Two barbers who care.
            </>
          }
          lead="No rotating staff, no handing you off. You book a person, and that's who cuts your hair."
        />

        <div className="mt-14 grid gap-5 sm:gap-6 lg:grid-cols-2">
          {team.map((barber, i) => (
            <Barber key={barber.name} barber={barber} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
