# SHORTCUTZ

Marketing site for the SHORTCUTZ barbershop. Vite + React + Tailwind v4, with a
scroll-driven three.js scene running behind the page.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview  # serve the production build locally
```

Deploy: run `npm run build` and upload `dist/`. Netlify, Vercel, Cloudflare Pages
and GitHub Pages all work with zero config.

---

## Editing content

Almost everything you'll want to change lives in **`src/data/site.js`** — phone,
address, email, opening hours, the service menu and prices, the team bios, and
the gallery list. No component edits needed.

Things still on placeholders, marked `TODO` in that file:

| What | Where |
| --- | --- |
| Phone, email, address | `shop` |
| Booking link | `shop.bookingUrl` — point at Booksy / Fresha / Square / Calendly |
| Instagram | `shop.instagram` |
| Prices | `services` — currently `$`, change the symbol in `Services.jsx` if needed |
| Bios, years, specialties | `team` |

## Adding the photos

Two sets are still missing. Until a file exists, the site renders a designed
placeholder naming the file it wants — nothing looks broken, and the image
appears the moment you drop it in.

```
public/assets/cuts/cut-01.png … cut-06.png   ← side-profile cut shots
public/assets/team/shivank.png
public/assets/team/ninder.png
```

Transparent PNGs are ideal — the layout is built to sit cut-outs on the dark
panels with a warm glow behind them. Roughly 4:5 portrait, ~1200px tall. To use
different filenames, edit the `gallery` and `team` arrays in `src/data/site.js`.

## The logo

`public/assets/logo.png` is your original (black artwork, transparent
background). Because the site is near-black, that version is invisible on it, so
the build also ships **`logo-light.png`** — a bone-white knockout generated from
your file — and that's what the header, hero and footer use.

The white version deliberately drops the orange. Recolouring the artwork
two-tone made the whole lockup read *orange* at every size, which is far more
orange than the brand wants. The accent instead lives in the UI: the Book
button, section kickers, hairlines, hover states, the "today" row in the opening
hours, and the rim light on the 3D models.

The logo is 357×247, so it's only used at sizes where it stays crisp (max ~176px
wide). **If you can export an SVG or a 2–3× PNG, send it over** — it could then
headline the hero at full size instead of the type doing that job.

## The 3D scene

Your three models were 6.8 MB combined, which is a lot to push at someone on
mobile data. They're compressed to **1.6 MB** total (WebP textures, mesh
quantisation — both decode natively in the browser, no extra runtime library):

| | before | after |
| --- | --- | --- |
| `chair.glb` | 3.82 MB | 646 KB |
| `hairdryer.glb` | 1.66 MB | 801 KB |
| `scissors.glb` | 1.29 MB | 645 KB |

Your untouched originals are in **`models-src/`** (outside `public/`, so they
aren't shipped). To redo the compression after editing a model:

```bash
npx @gltf-transform/cli optimize models-src/chair.glb public/assets/3d/chair.glb \
  --texture-compress webp --texture-size 1024 --compress quantize
```

The scissors deliberately skip the `simplify` pass (add `--simplify false`) —
it's the hero object and simplification cost it 75% of its triangles.

### Re-staging the scene

**`src/three/modelConfig.js`** is the only file to touch. Every model is
auto-centred and auto-scaled at load, so the three assets cooperate despite
arriving in wildly different units (the chair measures ~1000 units tall, the
scissors ~0.4). Set `size` to make something bigger — not `scale`.

`cameraPath` / `cameraPathMobile` are keyframes along the scroll: `at` is scroll
progress (0 = top, 1 = bottom), `pos` is where the camera sits, `look` is what it
aims at. Aiming *above* a model pushes it down the frame — that's how the chair
and dryer are kept clear of the copy above them.

Phones get their own path and positions: the camera's field of view is vertical,
so a portrait screen sees a much narrower slice of the world and desktop
placements would sit off-screen.

In dev, every model logs its measured dimensions to the console, so if you swap
an asset you can read its real orientation instead of guessing at `axisFix`.

If a `.glb` ever fails to load, a hand-built stand-in model renders in its place
(`src/three/fallbacks.jsx`) rather than the page breaking.

## Accessibility and performance

- Respects `prefers-reduced-motion`: 3D idle motion, camera parallax and all CSS
  animation stop.
- three.js is code-split — the hero paints before the 3D bundle arrives.
- Device pixel ratio is capped (1.25 on phones, 1.75 elsewhere).
- Skip-to-content link, keyboard focus rings, labelled nav and social links.
- The 3D canvas is `aria-hidden` and ignores pointer events — it's decoration,
  and screen readers skip it.

## Layout

```
src/
├── data/site.js          all copy, prices, hours, team — edit here first
├── components/           Nav, Hero, Ticker, Gallery, Services, Team, Visit, Footer
│   └── ui.jsx            Reveal, SectionHeading, Button, Figure (placeholder logic)
├── three/
│   ├── Scene.jsx         canvas, lighting rig, scroll-driven camera
│   ├── modelConfig.js    ← staging: model transforms + camera keyframes
│   ├── SmartModel.jsx    GLB loading, auto-centre/scale, fallback boundary
│   └── fallbacks.jsx     procedural stand-in models
└── index.css             design tokens (colours, fonts, animations)
```
