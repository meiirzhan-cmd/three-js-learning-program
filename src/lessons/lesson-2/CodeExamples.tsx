const codeSnippets = [
  `// In R3F, use drei's <Html> component:
import { Html } from '@react-three/drei'

<mesh position={[0, 1, 0]}>
  <boxGeometry />
  <meshStandardMaterial />
  <Html center>   {/* ← attached to the mesh! */}
    <div className="label">Hello!</div>
  </Html>
</mesh>

// The <Html> component tracks the 3D object's
// position and projects it to 2D screen coords.`,

  `// The trick: draw on a 2D canvas, use as texture
const canvas2D = document.createElement('canvas')
const ctx = canvas2D.getContext('2d')
ctx.font = 'bold 52px Arial'
ctx.fillText('Hello!', 256, 128)

// Turn it into a Three.js texture
const texture = new THREE.CanvasTexture(canvas2D)

// Apply to a material
<meshStandardMaterial map={texture} />

// In R3F with drei, just use <Text>:
import { Text } from '@react-three/drei'
<Text fontSize={1} color="white">
  Hello 3D!
</Text>`,

  `// In R3F with drei — super easy:
import { Text3D, Center } from '@react-three/drei'

<Center>
  <Text3D
    font="/fonts/helvetiker_regular.typeface.json"
    size={1.5}
    height={0.3}      // depth of extrusion
    bevelEnabled
    bevelSize={0.02}
  >
    Hello!
    <meshStandardMaterial color="purple" />
  </Text3D>
</Center>`,
];

export default function CodeExamples({ activeTab }: { activeTab: number }) {
  return (
    <pre className="mt-3.5 bg-[#0d0d14] rounded-lg p-3.5 overflow-x-auto text-[#c8c6e0] font-mono text-xs leading-loose border border-[#1a1a26]">
      {codeSnippets[activeTab]}
    </pre>
  );
}
