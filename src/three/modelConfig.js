/* ==================================================================
   3D SCENE CONFIG — tweak the numbers here to re-stage the scene.

   Your three .glb files live in public/assets/3d/. They arrived in
   completely different units (the chair is ~1000 units tall, the
   scissors ~2), so every model is auto-centred on the origin and
   auto-scaled to `size` world units on its longest axis at load time.
   That means: change `size` to make something bigger, not `scale`.

   Two separate rotations, on purpose:
     axisFix  — corrects how the model was authored (e.g. the chair was
                exported Z-up, so it needs -90° on X to stand upright).
                Set this once and forget it.
     rotation — art direction. Safe to play with.

   If a .glb ever fails to load, a hand-built stand-in renders instead
   rather than the page breaking.
================================================================== */

import { asset } from '../lib/asset.js'

/* All three exports already land Y-up in three.js (measured in-browser:
   scissors 0.14×0.39×0.02, chair 720×1014×905, dryer 2.8×4.05×3.35 —
   longest axis is Y in every case), so no axis correction is needed.
   Run the dev server and check the console: every model logs its
   measured size, so `axisFix` stays a measurement, never a guess. */
export const models = {
  scissors: {
    url: asset('/assets/3d/scissors.glb'),
    axisFix: [0, 0, 0],
    rotation: [0, 0.2, -0.4],
    size: 3.2,
    position: [1.95, 0.05, 0], // right of frame, clear of the hero copy
    // The scissors are essentially flat (0.02 deep), so a continuous Y
    // spin would turn them invisible edge-on twice a revolution. Sway
    // instead — it never crosses the profile.
    sway: { axis: 'y', amp: 0.34, speed: 0.42 },
    float: 1.0,
    // A phone is portrait, so the frame is far narrower in world units —
    // x=1.95 would be off-screen entirely. Pull it back, shrink it and
    // bias it up-right so it sits behind the logo rather than across the
    // headline, where it was shredding legibility.
    mobile: { position: [0.9, 2.3, -4.4], size: 2.4 },
  },
  chair: {
    url: asset('/assets/3d/chair.glb'),
    axisFix: [0, 0, 0],
    rotation: [0, -0.55, 0],
    size: 3.6,
    position: [7.0, -0.5, -3.2], // far enough right to stay out of the hero
    spin: [0, 0.07, 0],
    float: 0.4,
    mobile: { size: 3.0 },
  },
  dryer: {
    url: asset('/assets/3d/hairdryer.glb'),
    axisFix: [0, 0, 0],
    rotation: [0.15, 0.85, -0.3],
    size: 2.6,
    // Sits well clear of the chair at x=7 — any closer and both models
    // are in frame at once over the Visit section, which reads as clutter.
    position: [15.0, 0.35, 0.4],
    spin: [0, -0.11, 0.02],
    float: 0.85,
    mobile: { size: 2.2 },
  },
}

/* Camera path. Each keyframe is reached at scroll progress `at`
   (0 = top of page, 1 = bottom). The camera eases between keyframes
   and always looks at `look`.

   Note the camera's fov is vertical, so a portrait phone sees a much
   narrower slice of the world than a laptop — hence the separate
   mobile path, which sits further back and stays centred. */
export const cameraPath = [
  { at: 0.0, pos: [0, 0.15, 5.3], look: [0, 0, 0] },
  { at: 0.26, pos: [1.3, 0.7, 4.2], look: [0.6, -0.1, 0] },
  // Looks *above* the chair on purpose: that pushes it into the lower
  // half of the frame, clear of the opaque service cards overhead.
  { at: 0.52, pos: [9.4, 1.7, 5.8], look: [7.0, 1.3, -3.2] },
  { at: 0.78, pos: [13.4, 1.1, 6.4], look: [15.0, 0.95, 0.4] },
  { at: 1.0, pos: [15.1, 0.9, 6.2], look: [15.0, 0.95, 0.4] },
]

export const cameraPathMobile = [
  { at: 0.0, pos: [0.5, 2.0, 2.2], look: [0.8, 2.0, -4.4] },
  { at: 0.26, pos: [0.8, 1.7, 1.8], look: [0.7, 1.7, -4.4] },
  { at: 0.52, pos: [9.0, 1.4, 5.8], look: [7.0, 0.9, -3.2] },
  { at: 0.78, pos: [14.0, 0.9, 6.0], look: [15.0, 0.8, 0.4] },
  { at: 1.0, pos: [15.1, 0.6, 5.6], look: [15.0, 0.8, 0.4] },
]
