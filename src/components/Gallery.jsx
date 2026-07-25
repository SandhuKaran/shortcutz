import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { gallery } from '../data/site.js'
import { Figure, Reveal, SectionHeading } from './ui.jsx'

function Shot({ item, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Alternating drift — gives the grid a hand-set, non-uniform rhythm.
  const dir = index % 2 === 0 ? -1 : 1
  const y = useTransform(scrollYProgress, [0, 1], [40 * dir, -40 * dir])

  return (
    <Reveal delay={(index % 3) * 0.08} className="h-full">
      <motion.figure ref={ref} style={{ y }} className="group hud relative h-full border border-line bg-ink-2/60">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-flame/[0.05]" aria-hidden="true" />

        <Figure
          src={item.src}
          alt={`${item.label} — cut by SHORTCUTZ`}
          label={item.label}
          className="aspect-4/5 w-full"
          imgClassName="object-contain p-5 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        <figcaption className="flex items-center justify-between gap-3 border-t border-line px-5 py-4">
          <span className="font-display text-sm font-medium tracking-[-0.01em] uppercase">{item.label}</span>
          <span className="font-mono text-[0.55rem] tracking-[0.18em] text-flame">{item.tag}</span>
        </figcaption>
      </motion.figure>
    </Reveal>
  )
}

export default function Gallery() {
  return (
    <section id="work" className="relative py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          index="01"
          kicker="The work"
          title={
            <>
              Every angle
              <br />
              has to hold up.
            </>
          }
          lead="Side profiles, because that's where a fade lives or dies. These are real cuts, shot in the shop, no filters doing the heavy lifting."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item, i) => (
            <Shot key={item.src} item={item} index={i} />
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 font-mono text-[0.65rem] tracking-[0.14em] text-mute-2 uppercase">
            More on Instagram — updated after most shifts
          </p>
        </Reveal>
      </div>
    </section>
  )
}
