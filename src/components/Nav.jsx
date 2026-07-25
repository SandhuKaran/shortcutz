import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { nav, shop } from '../data/site.js'
import { asset } from '../lib/asset.js'
import { Arrow, Button } from './ui.jsx'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock the page behind the mobile menu.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-flame focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-ink"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'border-b border-line bg-ink/80 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8 lg:px-12">
          <a href="#top" className="relative z-10 flex items-center" aria-label={`${shop.name} home`}>
            <img
              src={asset('/assets/logo-light.png')}
              alt={shop.name}
              width={357}
              height={247}
              className="h-9 w-auto sm:h-10"
            />
          </a>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative font-mono text-[0.7rem] tracking-[0.18em] text-mute uppercase transition-colors duration-300 hover:text-bone"
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-flame transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Wrapper does the hiding — putting `hidden` on the Button
                itself loses to the `inline-flex` in its base classes. */}
            <span className="hidden sm:block">
              <Button href={shop.bookingUrl} variant="flame">
                Book <Arrow />
              </Button>
            </span>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="relative z-10 -mr-2 flex h-10 w-10 items-center justify-center md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span className="flex flex-col gap-[5px]">
                <motion.span
                  animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="block h-px w-6 bg-bone"
                />
                <motion.span
                  animate={open ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="block h-px w-6 bg-bone"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="block h-px w-6 bg-bone"
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink/97 px-8 backdrop-blur-2xl md:hidden"
          >
            <div className="grid-field pointer-events-none absolute inset-0" aria-hidden="true" />
            <nav className="relative flex flex-col gap-1" aria-label="Mobile">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-baseline gap-4 border-b border-line py-5"
                >
                  <span className="font-mono text-[0.65rem] text-flame">0{i + 1}</span>
                  <span className="font-display text-4xl font-semibold tracking-tight uppercase">
                    {item.label}
                  </span>
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.5 }}
                className="mt-9"
              >
                <Button href={shop.bookingUrl} variant="flame" onClick={() => setOpen(false)} className="w-full">
                  Book a chair <Arrow />
                </Button>
                <a
                  href={`tel:${shop.phone.replace(/[^+\d]/g, '')}`}
                  className="mt-5 block text-center font-mono text-[0.7rem] tracking-[0.16em] text-mute uppercase"
                >
                  {shop.phone}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
