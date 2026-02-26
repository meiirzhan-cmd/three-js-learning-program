import ThreeScene from "./ThreeScene";
import Explanation from "./Explanation";
import CodeExamples from "./CodeExamples";
import Vocabulary from "./Vocabulary";

export default function Lesson1() {
  return (
    <>
      <div className="text-[11px] font-bold tracking-widest text-[#6c5ce7] uppercase mb-2">
        Lesson 1 — Getting Started
      </div>
      <h1 className="text-[26px] font-extrabold m-0 mb-1.5 tracking-tight">
        Creating a Scene
      </h1>
      <p className="text-sm text-[#8888a8] m-0 mb-7 leading-relaxed">
        The absolute foundation of Three.js — a Scene, Camera, and Renderer.
      </p>

      <ThreeScene />
      <Explanation />
      <CodeExamples />
      <Vocabulary />

      <div className="mt-7 text-center text-[13px] text-[#555570] pb-8">
        Next up — Lesson 2!
      </div>
    </>
  );
}
