import { useMemo } from 'react'
import * as THREE from 'three'
import { RoundedBox } from '@react-three/drei'

/* ------------------------------------------------------------------
   Hand-built stand-in models. These render until you point
   modelConfig.js at your real .glb files (and act as the safety net if
   one ever fails to load). Built from primitives — cheap on mobile.
------------------------------------------------------------------- */

const STEEL = { color: '#c7c9ce', metalness: 1, roughness: 0.22 }
const DARK_STEEL = { color: '#4a4c53', metalness: 0.95, roughness: 0.35 }
const MATTE = { color: '#141418', metalness: 0.4, roughness: 0.62 }
const LEATHER = { color: '#0e0e11', metalness: 0.15, roughness: 0.85 }
const FLAME = { color: '#ef4c2b', metalness: 0.3, roughness: 0.4, emissive: '#ef4c2b', emissiveIntensity: 0.75 }

/* ---------------------------------- SCISSORS ---------------------- */

/* Blade profile is symmetric about X on purpose: the two halves are the
   same mesh rotated ±open, so we never mirror with a negative scale
   (which would invert face winding and break the lighting). */
function useBladeGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(0, -0.088)
    s.lineTo(1.55, -0.016)
    s.lineTo(1.78, 0)
    s.lineTo(1.55, 0.016)
    s.lineTo(0, 0.088)
    s.closePath()
    return new THREE.ExtrudeGeometry(s, {
      depth: 0.045,
      bevelEnabled: true,
      bevelSize: 0.008,
      bevelThickness: 0.008,
      bevelSegments: 2,
    })
  }, [])
}

function ScissorHalf({ geometry, flip = false, open = 0.17 }) {
  const dir = flip ? -1 : 1

  return (
    <group rotation={[0, 0, dir * open]}>
      {/* blade */}
      <mesh geometry={geometry} position={[0, 0, flip ? 0.024 : -0.024]}>
        <meshStandardMaterial {...STEEL} />
      </mesh>

      {/* shank running back to the handle */}
      <mesh position={[-0.52, dir * -0.09, flip ? 0.024 : -0.024]} rotation={[0, 0, dir * 0.16]}>
        <boxGeometry args={[1.05, 0.085, 0.05]} />
        <meshStandardMaterial {...DARK_STEEL} />
      </mesh>

      {/* finger ring */}
      <mesh position={[-1.22, dir * -0.26, flip ? 0.024 : -0.024]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.26, 0.045, 12, 32]} />
        <meshStandardMaterial {...DARK_STEEL} />
      </mesh>
    </group>
  )
}

export function ScissorsFallback() {
  const blade = useBladeGeometry()

  return (
    <group rotation={[0, 0, Math.PI * 0.06]} scale={0.92}>
      <ScissorHalf geometry={blade} />
      <ScissorHalf geometry={blade} flip />

      {/* pivot screw — the one flame accent in the scene */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.088, 0.088, 0.16, 20]} />
        <meshStandardMaterial {...FLAME} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[0.13, 0.022, 8, 24]} />
        <meshStandardMaterial {...STEEL} />
      </mesh>
    </group>
  )
}

/* ---------------------------------- CHAIR ------------------------- */

export function ChairFallback() {
  return (
    <group scale={0.78}>
      {/* floor plate */}
      <mesh position={[0, -1.62, 0]}>
        <cylinderGeometry args={[0.92, 1.02, 0.14, 32]} />
        <meshStandardMaterial {...DARK_STEEL} />
      </mesh>
      <mesh position={[0, -1.5, 0]}>
        <torusGeometry args={[0.86, 0.05, 10, 40]} />
        <meshStandardMaterial {...FLAME} />
      </mesh>

      {/* hydraulic column */}
      <mesh position={[0, -1.05, 0]}>
        <cylinderGeometry args={[0.3, 0.36, 0.42, 24]} />
        <meshStandardMaterial {...MATTE} />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.17, 0.17, 0.62, 20]} />
        <meshStandardMaterial {...STEEL} />
      </mesh>

      {/* seat */}
      <RoundedBox args={[1.62, 0.3, 1.42]} radius={0.12} smoothness={4} position={[0, -0.2, 0]}>
        <meshStandardMaterial {...LEATHER} />
      </RoundedBox>

      {/* backrest */}
      <group position={[0, 0.62, -0.62]} rotation={[-0.16, 0, 0]}>
        <RoundedBox args={[1.5, 1.6, 0.3]} radius={0.13} smoothness={4}>
          <meshStandardMaterial {...LEATHER} />
        </RoundedBox>
        {/* stitched seam */}
        <mesh position={[0, 0, 0.17]}>
          <boxGeometry args={[1.32, 0.02, 0.01]} />
          <meshStandardMaterial {...DARK_STEEL} />
        </mesh>
      </group>

      {/* headrest */}
      <RoundedBox args={[0.66, 0.42, 0.26]} radius={0.1} smoothness={4} position={[0, 1.58, -0.78]} rotation={[-0.16, 0, 0]}>
        <meshStandardMaterial {...LEATHER} />
      </RoundedBox>

      {/* armrests */}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.94, 0.16, 0.02]}>
          <RoundedBox args={[0.2, 0.16, 1.24]} radius={0.07} smoothness={4}>
            <meshStandardMaterial {...LEATHER} />
          </RoundedBox>
          <mesh position={[0, -0.28, -0.42]}>
            <cylinderGeometry args={[0.05, 0.05, 0.46, 12]} />
            <meshStandardMaterial {...STEEL} />
          </mesh>
        </group>
      ))}

      {/* footrest */}
      <group position={[0, -1.06, 0.98]} rotation={[0.42, 0, 0]}>
        <RoundedBox args={[0.78, 0.09, 0.44]} radius={0.04} smoothness={3}>
          <meshStandardMaterial {...DARK_STEEL} />
        </RoundedBox>
      </group>
      <mesh position={[0, -1.2, 0.56]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.62, 12]} />
        <meshStandardMaterial {...STEEL} />
      </mesh>
    </group>
  )
}

/* ---------------------------------- HAIR DRYER -------------------- */

export function DryerFallback() {
  return (
    <group scale={1.05} rotation={[0, 0, -0.18]}>
      {/* barrel */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.38, 0.4, 1.15, 32]} />
        <meshStandardMaterial {...MATTE} />
      </mesh>

      {/* chrome collar */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0.5, 0, 0]}>
        <cylinderGeometry args={[0.39, 0.36, 0.12, 32]} />
        <meshStandardMaterial {...STEEL} />
      </mesh>

      {/* concentrator nozzle */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0.74, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.36, 0.4, 32]} />
        <meshStandardMaterial {...DARK_STEEL} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0.95, 0, 0]}>
        <torusGeometry args={[0.28, 0.028, 8, 28]} />
        <meshStandardMaterial {...FLAME} />
      </mesh>

      {/* rear intake grille */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.6, 0, 0]}>
        <cylinderGeometry args={[0.34, 0.3, 0.1, 28]} />
        <meshStandardMaterial {...DARK_STEEL} />
      </mesh>
      {[0.16, 0.26].map((r) => (
        <mesh key={r} rotation={[0, 0, Math.PI / 2]} position={[-0.66, 0, 0]}>
          <torusGeometry args={[r, 0.014, 6, 24]} />
          <meshStandardMaterial {...STEEL} />
        </mesh>
      ))}

      {/* handle */}
      <group position={[-0.16, -0.72, 0]} rotation={[0, 0, 0.14]}>
        <RoundedBox args={[0.34, 1.0, 0.3]} radius={0.11} smoothness={4}>
          <meshStandardMaterial {...MATTE} />
        </RoundedBox>
        {/* switch detail */}
        <mesh position={[0, 0.16, 0.16]}>
          <boxGeometry args={[0.16, 0.1, 0.03]} />
          <meshStandardMaterial {...STEEL} />
        </mesh>
        <mesh position={[0, -0.02, 0.16]}>
          <boxGeometry args={[0.16, 0.06, 0.03]} />
          <meshStandardMaterial {...DARK_STEEL} />
        </mesh>
      </group>

      {/* cord stub */}
      <mesh position={[-0.24, -1.28, 0]} rotation={[0, 0, 0.35]}>
        <cylinderGeometry args={[0.055, 0.055, 0.3, 12]} />
        <meshStandardMaterial {...MATTE} />
      </mesh>
    </group>
  )
}

export const fallbacks = {
  scissors: ScissorsFallback,
  chair: ChairFallback,
  dryer: DryerFallback,
}
