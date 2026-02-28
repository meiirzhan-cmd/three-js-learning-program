const comparisons: [string, string, string][] = [
  ["Input", "Array of Vector3 points", "Triangulated faces/vertices"],
  ["Rendering", "Strokes (1px wide*)", "Filled surfaces"],
  ["Lighting", "Not affected by lights", "Reacts to lights & shadows"],
  ["Material", "LineBasicMaterial / LineDashedMaterial", "MeshStandard, MeshPhong, etc."],
  ["Use cases", "Wireframes, paths, graphs, debug visuals", "Solid objects, characters, worlds"],
];

const terms = [
  ["BufferGeometry", "Holds vertex data (points) that define a line's path"],
  ["setFromPoints()", "Converts an array of Vector3 into geometry position data"],
  ["LineBasicMaterial", "Simple solid-color material for lines"],
  ["LineDashedMaterial", "Dashed line material (requires computeLineDistances)"],
  ["Line", "Renders a polyline connecting points in order"],
  ["LineSegments", "Connects points in pairs: (0-1), (2-3), etc."],
  ["LineLoop", "Like Line but connects the last point back to the first"],
  ["computeLineDistances", "Calculates cumulative distances needed for dash rendering"],
];

export default function Vocabulary() {
  return (
    <>
      {/* Lines vs Meshes comparison */}
      <div className="mt-6 px-5 py-4 bg-[#12121a] border border-[#2a2a3a] rounded-[10px] text-sm leading-loose text-[#aaa8c0]">
        <div className="font-bold text-[#e8e6f0] mb-2">
          Lines vs Meshes — Key Differences
        </div>
        {comparisons.map(([aspect, line, mesh], i) => (
          <div
            key={i}
            className={`grid grid-cols-[80px_1fr_1fr] gap-2.5 py-1.5 text-xs ${
              i < comparisons.length - 1 ? "border-b border-[#1a1a26]" : ""
            }`}
          >
            <span className="text-[#6c5ce7] font-semibold">{aspect}</span>
            <span className="text-[#fdcb6e]">{line}</span>
            <span className="text-[#55efc4]">{mesh}</span>
          </div>
        ))}
        <div className="mt-2.5 text-xs text-[#555570] italic">
          * WebGL only supports 1px lines on most hardware. For thicker lines,
          use drei's {"<Line>"} component which uses a shader trick.
        </div>
      </div>

      {/* Key terms */}
      <div className="mt-6 p-5 bg-[#12121a] border border-[#2a2a3a] rounded-xl">
        <div className="font-bold text-[#e8e6f0] mb-3.5 text-[15px]">
          Key Vocabulary
        </div>
        {terms.map(([term, def], i) => (
          <div
            key={i}
            className={`flex gap-3 py-2 text-[13px] ${
              i < terms.length - 1 ? "border-b border-[#1a1a26]" : ""
            }`}
          >
            <span className="text-[#6c5ce7] font-semibold min-w-[155px]">
              {term}
            </span>
            <span className="text-[#8888a8]">{def}</span>
          </div>
        ))}
      </div>
    </>
  );
}
