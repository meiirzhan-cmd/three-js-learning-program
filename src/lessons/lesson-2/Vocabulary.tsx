const terms = [
  ["HTML Overlay", "Regular HTML/CSS positioned on top of a 3D canvas"],
  ["CanvasTexture", "A Three.js texture created from a 2D <canvas> element"],
  ["TextGeometry", "Actual 3D geometry shaped like text, with depth/extrusion"],
  ["fillText()", "Canvas 2D API method to draw text on an offscreen canvas"],
  ["needsUpdate", "Flag that tells Three.js a material or texture has changed"],
  ["<Html>", "drei component that attaches HTML to a 3D object's position"],
  ["<Text>", "drei component using SDF rendering for crisp text in 3D space"],
  ["<Text3D>", "drei component for extruded 3D letter geometry from font data"],
];

export default function Vocabulary() {
  return (
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
          <span className="text-[#6c5ce7] font-semibold min-w-[100px]">
            {term}
          </span>
          <span className="text-[#8888a8]">{def}</span>
        </div>
      ))}
    </div>
  );
}
