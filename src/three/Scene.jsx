import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, AdaptiveDpr, Preload } from '@react-three/drei'
import SmartModel from './SmartModel.jsx'
import { models, cameraPath, cameraPathMobile } from './modelConfig.js'

/* Scroll progress lives outside React — writing it to state every frame
   would re-render the whole tree 60×/sec. */
const scroll = { p: 0 }

function useScrollProgress() {
  useEffect(() => {
    const read = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scroll.p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0
    }
    read()
    window.addEventListener('scroll', read, { passive: true })
    window.addEventListener('resize', read)
    return () => {
      window.removeEventListener('scroll', read)
      window.removeEventListener('resize', read)
    }
  }, [])
}

const smoothstep = (t) => t * t * (3 - 2 * t)

/* Frame-rate independent damping. */
const damp = (cur, tgt, lambda, dt) => cur + (tgt - cur) * (1 - Math.exp(-lambda * dt))

function samplePath(p, outPos, outLook, mobile) {
  const path = mobile ? cameraPathMobile : cameraPath
  let i = 0
  while (i < path.length - 2 && p > path[i + 1].at) i++
  const a = path[i]
  const b = path[i + 1]
  const span = b.at - a.at || 1
  const t = smoothstep(Math.min(Math.max((p - a.at) / span, 0), 1))
  outPos.set(
    a.pos[0] + (b.pos[0] - a.pos[0]) * t,
    a.pos[1] + (b.pos[1] - a.pos[1]) * t,
    a.pos[2] + (b.pos[2] - a.pos[2]) * t,
  )
  outLook.set(
    a.look[0] + (b.look[0] - a.look[0]) * t,
    a.look[1] + (b.look[1] - a.look[1]) * t,
    a.look[2] + (b.look[2] - a.look[2]) * t,
  )
}

function CameraRig({ reducedMotion, mobile }) {
  const { camera } = useThree()
  const targetPos = useMemo(() => new THREE.Vector3(), [])
  const targetLook = useMemo(() => new THREE.Vector3(), [])
  const look = useRef(new THREE.Vector3(0, 0, 0))
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (reducedMotion) return
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reducedMotion])

  // Snap to the correct spot on mount so there's no fly-in on a deep link.
  useEffect(() => {
    samplePath(scroll.p, targetPos, targetLook, mobile)
    camera.position.copy(targetPos)
    look.current.copy(targetLook)
    camera.lookAt(look.current)
  }, [camera, targetPos, targetLook, mobile])

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1)
    samplePath(scroll.p, targetPos, targetLook, mobile)

    if (!reducedMotion) {
      // A touch of parallax so the scene feels alive when not scrolling.
      targetPos.x += pointer.current.x * 0.22
      targetPos.y += -pointer.current.y * 0.16
    }

    camera.position.x = damp(camera.position.x, targetPos.x, 3.2, dt)
    camera.position.y = damp(camera.position.y, targetPos.y, 3.2, dt)
    camera.position.z = damp(camera.position.z, targetPos.z, 3.2, dt)

    look.current.x = damp(look.current.x, targetLook.x, 3.8, dt)
    look.current.y = damp(look.current.y, targetLook.y, 3.8, dt)
    look.current.z = damp(look.current.z, targetLook.z, 3.8, dt)
    camera.lookAt(look.current)
  })

  return null
}

/* Studio lighting built from Lightformers rather than a downloaded HDRI
   — no network request, and it gives the metals something to reflect.
   The warm side panel is where the logo orange leaks into the 3D. */
function Rig() {
  return (
    <Environment resolution={256} frames={1}>
      <Lightformer form="rect" intensity={2.6} color="#ffffff" scale={[10, 5, 1]} position={[0, 4, -6]} rotation={[0.2, 0, 0]} />
      <Lightformer form="rect" intensity={1.5} color="#ef4c2b" scale={[8, 8, 1]} position={[-6, 0, 2]} rotation={[0, Math.PI / 2, 0]} />
      <Lightformer form="rect" intensity={1.1} color="#9fb6ff" scale={[8, 8, 1]} position={[6, 1, 1]} rotation={[0, -Math.PI / 2, 0]} />
      <Lightformer form="circle" intensity={2.2} color="#ffffff" scale={4} position={[2, 6, 3]} rotation={[-Math.PI / 2, 0, 0]} />
    </Environment>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[5, 7, 4]} intensity={2.1} color="#ffffff" />
      <directionalLight position={[-6, 2, -3]} intensity={0.9} color="#ef4c2b" />

      {/* Back rims. The chair is matte black leather on a near-black page
          — without an edge highlight it has no silhouette at all. Chrome
          like the scissors doesn't need this, but it doesn't hurt it. */}
      <directionalLight position={[-4, 5, -9]} intensity={2.6} color="#9fb6ff" />
      <directionalLight position={[5, 2, -8]} intensity={1.8} color="#ffd9cc" />

      <pointLight position={[0, -3, 4]} intensity={12} distance={16} color="#8ea6ff" />
    </>
  )
}

export default function Scene() {
  useScrollProgress()
  const [ready, setReady] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [dpr, setDpr] = useState(1.5)

  useEffect(() => {
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sizeMq = window.matchMedia('(max-width: 768px)')

    const apply = () => {
      setReducedMotion(motionMq.matches)
      setMobile(sizeMq.matches)
      // Keep the pixel budget sane on phones / low-end machines.
      setDpr(Math.min(window.devicePixelRatio || 1, sizeMq.matches ? 1.25 : 1.75))
    }
    apply()
    motionMq.addEventListener('change', apply)
    sizeMq.addEventListener('change', apply)

    // Mount after first paint so the 3D never blocks the hero text.
    const id = requestAnimationFrame(() => setReady(true))
    return () => {
      motionMq.removeEventListener('change', apply)
      sizeMq.removeEventListener('change', apply)
      cancelAnimationFrame(id)
    }
  }, [])

  if (!ready) return null

  return (
    <Canvas
      className="!fixed inset-0"
      dpr={dpr}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      camera={{ fov: 42, near: 0.1, far: 100, position: [0, 0.15, 5.3] }}
      style={{ pointerEvents: 'none' }}
    >
      <Lights />
      <Rig />
      <CameraRig reducedMotion={reducedMotion} mobile={mobile} />

      {Object.entries(models).map(([name, config]) => (
        <SmartModel
          key={name}
          name={name}
          config={mobile && config.mobile ? { ...config, ...config.mobile } : config}
          reducedMotion={reducedMotion}
        />
      ))}

      <AdaptiveDpr pixelated />
      <Preload all />
    </Canvas>
  )
}
