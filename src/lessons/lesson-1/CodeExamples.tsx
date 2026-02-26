const vanillaCode = `// 1. Scene — the container
const scene = new THREE.Scene()

// 2. Camera — your eyes
const camera = new THREE.PerspectiveCamera(
  75,     // FOV: field of view (degrees)
  w / h,  // Aspect ratio
  0.1,    // Near clipping plane
  1000    // Far clipping plane
)
camera.position.z = 3

// 3. Renderer — the painter
const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)

// 4. Light — so we can see
const light = new THREE.DirectionalLight('#fff', 1.5)
scene.add(light)

// 5. Mesh = Geometry + Material
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 1.5, 1.5),
  new THREE.MeshStandardMaterial({ color: 'purple' })
)
scene.add(cube)

// 6. Animate — render loop
function animate() {
  requestAnimationFrame(animate)
  cube.rotation.y += 0.01
  renderer.render(scene, camera)
}
animate()`;

const r3fCode = `import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'

function SpinningBox() {
  const ref = useRef()
  // useFrame runs every frame (~60fps)
  useFrame(() => {
    ref.current.rotation.y += 0.01
  })
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="purple" />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas>  {/* ← Creates Scene + Camera + Renderer */}
      <directionalLight position={[2, 3, 4]} />
      <ambientLight intensity={0.4} />
      <SpinningBox />
    </Canvas>
  )
}`;

export default function CodeExamples() {
  return (
    <>
      {/* Vanilla Three.js */}
      <div className="mt-6 p-5 bg-[#12121a] border border-[#2a2a3a] rounded-xl text-[13px] leading-relaxed">
        <div className="font-bold text-[#e8e6f0] mb-3 text-[15px]">
          The Code — Vanilla Three.js (6 steps)
        </div>
        <pre className="bg-[#0d0d14] rounded-lg p-4 overflow-x-auto text-[#c8c6e0] font-mono text-xs leading-loose border border-[#1a1a26]">
          {vanillaCode}
        </pre>
      </div>

      {/* R3F equivalent */}
      <div className="mt-6 p-5 bg-[#12121a] border border-[#6c5ce733] rounded-xl text-[13px] leading-relaxed">
        <div className="font-bold text-[#6c5ce7] mb-3 text-[15px]">
          Same thing in R3F — So Much Simpler!
        </div>
        <pre className="bg-[#0d0d14] rounded-lg p-4 overflow-x-auto text-[#c8c6e0] font-mono text-xs leading-loose border border-[#1a1a26]">
          {r3fCode}
        </pre>
        <div className="mt-3.5 px-3.5 py-2.5 bg-[rgba(108,92,231,0.08)] rounded-lg text-[13px] text-[#a29bfe] leading-relaxed">
          Notice: <strong>No manual scene/camera/renderer setup.</strong> The{" "}
          {"<Canvas>"} handles all of that. Each Three.js class becomes a
          lowercase JSX tag. Constructor args become the <code>args</code> prop.
        </div>
      </div>
    </>
  );
}
