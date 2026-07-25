import { useState } from 'react'
import { motion } from 'motion/react'

const EASE = [0.16, 1, 0.3, 1]

export function Reveal({ children, delay = 0, y = 26, className = '', once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-70px' }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export function Kicker({ index, children, className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="h-px w-8 bg-flame/70" aria-hidden="true" />
      {index && <span className="kicker text-flame">{index}</span>}
      <span className="kicker">{children}</span>
    </div>
  )
}

export function SectionHeading({ index, kicker, title, lead, align = 'left' }) {
  const centered = align === 'center'
  return (
    <div className={centered ? 'flex flex-col items-center text-center' : ''}>
      <Reveal>
        <Kicker index={index}>{kicker}</Kicker>
      </Reveal>
      <Reveal delay={0.06}>
        <h2
          className={`mt-5 font-display text-4xl leading-[0.95] font-semibold tracking-[-0.03em] text-balance uppercase sm:text-5xl lg:text-6xl ${
            centered ? 'max-w-3xl' : 'max-w-2xl'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.12}>
          <p className={`mt-5 max-w-xl text-base leading-relaxed text-mute sm:text-lg ${centered ? 'mx-auto' : ''}`}>
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------
   Button — `variant="flame"` is the single filled-orange element on
   any given screen. Keep it that way; the colour loses its punch the
   moment there are two.
------------------------------------------------------------------- */
export function Button({ as = 'a', variant = 'ghost', className = '', children, ...props }) {
  const Tag = as
  const base =
    'group relative inline-flex items-center justify-center gap-2.5 overflow-hidden px-7 py-3.5 font-mono text-[0.72rem] font-medium tracking-[0.16em] uppercase transition-colors duration-300'

  const styles = {
    flame: 'bg-flame text-ink hover:bg-bone',
    ghost: 'border border-line-2 text-bone hover:border-flame hover:text-flame',
    quiet: 'text-mute hover:text-bone',
  }

  return (
    <Tag className={`${base} ${styles[variant]} ${className}`} {...props}>
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
    </Tag>
  )
}

export function Arrow({ className = '' }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-3 w-3 transition-transform duration-300 group-hover:translate-x-1 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="square" />
    </svg>
  )
}

/* ------------------------------------------------------------------
   Figure — renders an image, and if the file isn't there yet (or fails)
   it degrades to an on-brand placeholder that names the file you need
   to drop in. Lets the site look finished before the photos land.
------------------------------------------------------------------- */
export function Figure({ src, alt, className = '', imgClassName = '', label }) {
  const [failed, setFailed] = useState(!src)

  if (failed) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-ink-2 ${className}`}
        role="img"
        aria-label={alt}
      >
        {/* diagonal hatch so an empty slot still reads as designed */}
        <div
          className="absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-45deg, transparent 0 9px, rgba(255,255,255,0.028) 9px 10px)',
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-linear-to-t from-flame/[0.07] to-transparent" aria-hidden="true" />
        <div className="relative flex flex-col items-center gap-2.5 px-5 text-center">
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-line-2" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
            <rect x="3" y="4" width="18" height="16" rx="1" />
            <circle cx="8.5" cy="9.5" r="1.6" />
            <path d="m3 16.5 5-4 4.5 3.5L17 12l4 3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="font-mono text-[0.6rem] leading-relaxed tracking-[0.14em] text-mute-2 uppercase">
            {label ?? 'Image pending'}
          </p>
          {src && (
            <code className="max-w-[15rem] font-mono text-[0.55rem] break-all text-line-2">{src}</code>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  )
}
