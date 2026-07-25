import { tickerWords } from '../data/site.js'

function Row() {
  // Duplicated once so the -50% translate lands exactly on a repeat.
  const run = [...tickerWords, ...tickerWords]
  return (
    <div className="animate-marquee flex w-max shrink-0 items-center gap-8 pr-8">
      {run.map((word, i) => (
        <span key={i} className="flex items-center gap-8">
          <span className="font-display text-2xl font-medium tracking-[-0.01em] whitespace-nowrap uppercase sm:text-3xl">
            {word}
          </span>
          <span className="text-flame" aria-hidden="true">
            ✳
          </span>
        </span>
      ))}
    </div>
  )
}

export default function Ticker() {
  return (
    <div
      className="relative overflow-hidden border-y border-line bg-ink-2/70 py-5 backdrop-blur-sm"
      aria-hidden="true"
    >
      <div
        className="flex"
        style={{
          maskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
        }}
      >
        <Row />
      </div>
    </div>
  )
}
