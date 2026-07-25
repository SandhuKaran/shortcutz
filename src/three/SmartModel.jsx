import { Component, Suspense, useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { fallbacks } from './fallbacks.jsx'
import { models } from './modelConfig.js'

/* ------------------------------------------------------------------
   Catches a failed .glb (missing file, bad path, corrupt asset) and
   renders the hand-built stand-in instead of blanking the scene.
------------------------------------------------------------------- */
class ModelBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    console.warn(`[shortcutz] 3D model failed to load, using stand-in:`, error?.message ?? error)
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

/* ------------------------------------------------------------------
   Loads a .glb, then centres it on the origin and scales it so its
   longest axis measures `size` world units. Without this the three
   models are unusable together — they came from different sources with
   different units and origins (the chair's pivot is a metre below it).
------------------------------------------------------------------- */
function Gltf({ url, size, axisFix }) {
  const { scene } = useGLTF(url)
  const inner = useRef()

  // clone so the same asset could be mounted twice without fighting
  const model = useMemo(() => scene.clone(true), [scene])

  useLayoutEffect(() => {
    model.traverse((o) => {
      if (!o.isMesh) return
      o.castShadow = true
      o.receiveShadow = true
      const mats = Array.isArray(o.material) ? o.material : [o.material]
      mats.forEach((m) => {
        if (!m) return
        // Let the Lightformer rig actually show up in the metals.
        m.envMapIntensity = 2.2
        m.needsUpdate = true
      })
    })
  }, [model])

  const { scale, offset } = useMemo(() => {
    // Measured in world space, so this survives whatever node transforms
    // and mesh quantization the exporter baked in.
    const box = new THREE.Box3().setFromObject(model)
    const dim = box.getSize(new THREE.Vector3())
    const mid = box.getCenter(new THREE.Vector3())
    const longest = Math.max(dim.x, dim.y, dim.z) || 1

    if (import.meta.env.DEV) {
      // Handy when re-staging the scene: tells you which way a model is
      // actually facing, so axisFix is a measurement not a guess.
      const axis = dim.x > dim.y && dim.x > dim.z ? 'X' : dim.y > dim.z ? 'Y' : 'Z'
      console.info(
        `[shortcutz:3d] ${url.split('/').pop()} — raw size ` +
          `X=${dim.x.toFixed(2)} Y=${dim.y.toFixed(2)} Z=${dim.z.toFixed(2)} ` +
          `| longest=${axis} | fit-scale=${(size / longest).toExponential(2)}`,
      )
    }

    return { scale: size / longest, offset: mid }
  }, [model, size, url])

  return (
    <group ref={inner} rotation={axisFix} scale={scale}>
      <primitive object={model} position={[-offset.x, -offset.y, -offset.z]} />
    </group>
  )
}

/* Wraps the stand-in with the same axisFix/size contract so a fallback
   lands in roughly the same place as the real model would. */
function Standin({ name, size }) {
  const Fallback = fallbacks[name]
  if (!Fallback) return null
  // Stand-ins are authored ~3 units across, Y-up, facing +Z.
  return (
    <group scale={size / 3}>
      <Fallback />
    </group>
  )
}

export default function SmartModel({ name, config, reducedMotion }) {
  const outer = useRef()
  const {
    url,
    axisFix = [0, 0, 0],
    rotation = [0, 0, 0],
    size = 3,
    position = [0, 0, 0],
    spin = [0, 0, 0],
    sway = null,
    float = 0,
  } = config

  const seed = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state, delta) => {
    if (!outer.current || reducedMotion) return
    const d = Math.min(delta, 0.1) // clamp after a tab-switch stall

    if (sway) {
      // Oscillate around the configured rest angle rather than spinning.
      const t = state.clock.elapsedTime
      const base = { x: rotation[0], y: rotation[1], z: rotation[2] }[sway.axis]
      outer.current.rotation[sway.axis] = base + Math.sin(t * sway.speed + seed) * sway.amp
    } else {
      outer.current.rotation.x += spin[0] * d
      outer.current.rotation.y += spin[1] * d
      outer.current.rotation.z += spin[2] * d
    }

    if (float) {
      // Local offset only — the parent group already carries `position`.
      const t = state.clock.elapsedTime
      outer.current.position.y = Math.sin(t * 0.6 + seed) * 0.11 * float
    }
  })

  const standin = <Standin name={name} size={size} />

  return (
    <group position={position}>
      <group ref={outer} rotation={rotation}>
        <ModelBoundary fallback={standin}>
          <Suspense fallback={standin}>
            {url ? <Gltf url={url} size={size} axisFix={axisFix} /> : standin}
          </Suspense>
        </ModelBoundary>
      </group>
    </group>
  )
}

// Warm the cache so models are ready before the user scrolls to them.
Object.values(models).forEach((m) => m.url && useGLTF.preload(m.url))
