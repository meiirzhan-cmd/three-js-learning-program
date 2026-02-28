export default function Explanation() {
  return (
    <div className="mt-4 px-5 py-4 bg-[#12121a] border border-[#2a2a3a] rounded-[10px] text-[13px] leading-loose text-[#aaa8c0]">
      <div className="font-bold text-[#e8e6f0] mb-2">
        The recipe for any line:
      </div>
      <pre className="bg-[#0d0d14] rounded-lg p-3.5 overflow-x-auto text-[#c8c6e0] font-mono text-xs leading-loose border border-[#1a1a26]">
        {`// Step 1: Define points
const points = [
  new THREE.Vector3(-2, -1, 0),  // x, y, z
  new THREE.Vector3(0, 1.5, 0),
  new THREE.Vector3(2, -1, 0),
]

// Step 2: Create geometry from points
const geometry = new THREE.BufferGeometry()
  .setFromPoints(points)

// Step 3: Create material (color, style)
const material = new THREE.LineBasicMaterial({
  color: '#6c5ce7'
})

// Step 4: Create the line object
const line = new THREE.Line(geometry, material)
scene.add(line)

// In R3F:
<line>
  <bufferGeometry>
    <bufferAttribute
      attach="attributes-position"
      array={new Float32Array([-2,-1,0, 0,1.5,0, 2,-1,0])}
      count={3}
      itemSize={3}
    />
  </bufferGeometry>
  <lineBasicMaterial color="#6c5ce7" />
</line>`}
      </pre>
    </div>
  );
}
