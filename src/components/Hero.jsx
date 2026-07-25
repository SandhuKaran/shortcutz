import { motion } from 'motion/react'
import { shop, stats } from '../data/site.js'
import { Arrow, Button } from './ui.jsx'

const EASE = [0.16, 1, 0.3, 1]

const rise = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: 0.15 + i * 0.09, ease: EASE },
  }),
}

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 sm:pt-32">
      {/* fine grid + a low, warm bloom behind the type */}
      <div className="grid-field pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-24 -left-40 h-[36rem] w-[36rem] rounded-full opacity-60 blur-[110px]"
        style={{ background: 'radial-gradient(circle, rgba(239,76,43,0.16), transparent 68%)' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          {/* <motion.div variants={rise} initial="hidden" animate="show" custom={0}>
            <img
              src="/assets/logo-light.png"
              alt={`${shop.name} logo`}
              width={357}
              height={247}
              className="h-auto w-36 sm:w-44"
            />
          </motion.div> */}

          <motion.div
            variants={rise}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-8 flex items-center gap-3"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flame opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-flame" />
            </span>
            <span className="kicker">Walk-ins welcome · Tue — Sun</span>
          </motion.div>

          <h1 className="mt-5 font-display text-[3.25rem] leading-[0.88] font-semibold tracking-[-0.04em] uppercase sm:text-7xl lg:text-8xl">
            <motion.span variants={rise} initial="hidden" animate="show" custom={2} className="block">
              Sharp lines.
            </motion.span>
            <motion.span
              variants={rise}
              initial="hidden"
              animate="show"
              custom={3}
              className="block text-transparent"
              style={{ WebkitTextStroke: '1px rgba(244,244,242,0.42)' }}
            >
              Clean fades.
            </motion.span>
          </h1>

          <motion.p
            variants={rise}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-7 max-w-lg text-base leading-relaxed text-mute sm:text-lg"
          >
            A two-chair shop built on precision. Shivank and Ninder take one client at a time — no
            conveyor belt, no guessing, no bad angles.
          </motion.p>

          <motion.div
            variants={rise}
            initial="hidden"
            animate="show"
            custom={5}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Button href={shop.bookingUrl} variant="flame">
              Book a chair <Arrow />
            </Button>
            <Button href="#work" variant="ghost">
              See the work
            </Button>
          </motion.div>

          <motion.dl
            variants={rise}
            initial="hidden"
            animate="show"
            custom={6}
            className="mt-14 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-8"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{s.value}</dd>
                <dd className="mt-1.5 font-mono text-[0.6rem] tracking-[0.16em] text-mute-2 uppercase">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="pointer-events-none absolute inset-x-0 bottom-7 hidden justify-center lg:flex"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-2.5">
          <span className="font-mono text-[0.55rem] tracking-[0.24em] text-mute-2 uppercase">Scroll</span>
          <span className="relative block h-11 w-px overflow-hidden bg-line-2">
            <motion.span
              className="absolute inset-x-0 top-0 h-4 bg-flame"
              animate={{ y: ['-100%', '380%'] }}
              transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </div>
      </motion.div>
    </section>
  )
}
