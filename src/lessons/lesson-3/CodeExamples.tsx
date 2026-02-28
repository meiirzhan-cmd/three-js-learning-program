export default function CodeExamples() {
  return (
    <div className="mt-5 px-5 py-4 bg-[#12121a] border border-[#6c5ce733] rounded-[10px] text-[13px] leading-loose">
      <div className="font-bold text-[#6c5ce7] mb-2 text-sm">
        R3F + Drei makes lines easy:
      </div>
      <pre className="bg-[#0d0d14] rounded-lg p-3.5 overflow-x-auto text-[#c8c6e0] font-mono text-xs leading-loose border border-[#1a1a26]">
        {`import { Line } from '@react-three/drei'

// Simple — just pass points as an array!
<Line
  points={[[-2, -1, 0], [0, 1.5, 0], [2, -1, 0]]}
  color="#6c5ce7"
  lineWidth={3}    // ← works! (drei uses special shader)
/>

// Dashed version
<Line
  points={points}
  color="yellow"
  lineWidth={2}
  dashed
  dashSize={0.2}
  gapSize={0.1}
/>`}
      </pre>
    </div>
  );
}
