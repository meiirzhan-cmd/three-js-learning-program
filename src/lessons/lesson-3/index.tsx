import LineTypesDemo from "./LineTypesDemo";
import DrawingDemo from "./DrawingDemo";
import CurveDemo from "./CurveDemo";
import Explanation from "./Explanation";
import CodeExamples from "./CodeExamples";
import Vocabulary from "./Vocabulary";

export default function Lesson3() {
  return (
    <>
      <div className="text-[11px] font-bold tracking-widest text-[#6c5ce7] uppercase mb-2">
        Lesson 3 — Lines
      </div>
      <h1 className="text-[26px] font-extrabold m-0 mb-1.5 tracking-tight">
        Drawing Lines
      </h1>
      <p className="text-sm text-[#8888a8] m-0 mb-7 leading-relaxed">
        Lines connect points with strokes instead of filled surfaces.
      </p>

      {/* Part 1 */}
      <div className="text-[17px] font-bold text-[#e8e6f0] mb-3.5 flex items-center gap-2">
        <span className="text-[#6c5ce7]">01</span> Four Types of Lines
      </div>
      <LineTypesDemo />
      <Explanation />

      {/* Part 2 */}
      <div className="text-[17px] font-bold text-[#e8e6f0] mt-8 mb-3.5 flex items-center gap-2">
        <span className="text-[#6c5ce7]">02</span> Interactive: Draw Your Own Lines
      </div>
      <p className="text-sm text-[#8888a8] m-0 mb-3.5 leading-relaxed">
        Click on the canvas to place points. A line connects them in order.
      </p>
      <DrawingDemo />

      {/* Part 3 */}
      <div className="text-[17px] font-bold text-[#e8e6f0] mt-8 mb-3.5 flex items-center gap-2">
        <span className="text-[#6c5ce7]">03</span> Lines from Math: Curves
      </div>
      <p className="text-sm text-[#8888a8] m-0 mb-3.5 leading-relaxed">
        Generate hundreds of points from mathematical functions to create smooth
        curves. Try the Helix — it's a 3D spiral rotating in space!
      </p>
      <CurveDemo />

      <Vocabulary />
      <CodeExamples />

      <div className="mt-7 text-center text-[13px] text-[#555570] pb-8">
        Next up — Lesson 4!
      </div>
    </>
  );
}
