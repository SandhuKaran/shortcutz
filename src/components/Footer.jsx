import { nav, shop } from '../data/site.js'
import { asset } from '../lib/asset.js'
import { Arrow, Button } from './ui.jsx'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-2/60 backdrop-blur-sm">
      <div className="grid-field pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* closing call to action */}
      <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-16 sm:px-8 sm:pt-28 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-10 border-b border-line pb-16 lg:flex-row lg:items-end">
          <h2 className="max-w-2xl font-display text-4xl leading-[0.95] font-semibold tracking-[-0.03em] text-balance uppercase sm:text-5xl lg:text-6xl">
            Stop putting off <span className="text-flame">the cut.</span>
          </h2>
          <Button href={shop.bookingUrl} variant="flame" className="shrink-0">
            Book a chair <Arrow />
          </Button>
        </div>

        <div className="grid gap-12 pt-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <img
              src={asset('/assets/logo-light.png')}
              alt={shop.name}
              width={357}
              height={247}
              className="h-auto w-32"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-mute">
              {shop.tagline}. Two chairs, no rush, and a fade that still looks right three weeks later.
            </p>
          </div>

          <div>
            <p className="kicker">Explore</p>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-mute transition-colors duration-300 hover:text-bone"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="kicker">Contact</p>
            <ul className="mt-5 space-y-3 text-sm text-mute">
              <li>
                <a href={`tel:${shop.phone.replace(/[^+\d]/g, '')}`} className="transition-colors duration-300 hover:text-bone">
                  {shop.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${shop.email}`} className="transition-colors duration-300 hover:text-bone">
                  {shop.email}
                </a>
              </li>
              <li>
                <a
                  href={shop.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-bone"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="kicker">Find us</p>
            <address className="mt-5 text-sm leading-relaxed text-mute not-italic">
              {shop.address.line1}
              <br />
              {shop.address.line2}
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.6rem] tracking-[0.14em] text-mute-2 uppercase">
            © {year} {shop.name} — All rights reserved
          </p>
          <p className="font-mono text-[0.6rem] tracking-[0.14em] text-mute-2 uppercase">
            Sharp since day one
          </p>
        </div>
      </div>
    </footer>
  )
}
