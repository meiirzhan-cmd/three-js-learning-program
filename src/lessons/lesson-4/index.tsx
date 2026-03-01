import CoordinateDemo from "./CoordinateDemo";
import BlackScreenDemo from "./BlackScreenDemo";
import MaterialDemo from "./MaterialDemo";
import DoubleSideDemo from "./DoubleSideDemo";
import Vocabulary from "./Vocabulary";

const questions = [
  {
    id: "Q1",
    title: "How do coordinates work?",
    desc: (
      <>
        Three.js uses a right-hand coordinate system.{" "}
        <span className="text-[#ff6b6b]">X = right</span>,{" "}
        <span className="text-[#55efc4]">Y = up</span>,{" "}
        <span className="text-[#74b9ff]">Z = toward you</span>. The purple box
        sits at position (1, 1, 1).
      </>
    ),
    Demo: CoordinateDemo,
  },
  {
    id: "Q2",
    title: "Why is my screen black?",
    desc: "Toggle each problem to see what happens — and understand the fix.",
    Demo: BlackScreenDemo,
  },
  {
    id: "Q3",
    title: "What's the difference between materials?",
    desc: "Switch between them on the same sphere to see the visual difference.",
    Demo: MaterialDemo,
  },
  {
    id: "Q4",
    title: "Why does my object disappear from behind?",
    desc: "Backface culling: only the front face renders by default. Toggle DoubleSide to fix it.",
    Demo: DoubleSideDemo,
  },
];

export default function Lesson4() {
  return (
    <>
      <div className="text-[11px] font-bold tracking-widest text-[#6c5ce7] uppercase mb-2">
        Lesson 4 — FAQ
      </div>
      <h1 className="text-[26px] font-extrabold m-0 mb-1.5 tracking-tight">
        Common Questions Answered
      </h1>
      <p className="text-sm text-[#8888a8] m-0 mb-7 leading-relaxed">
        Visual answers to the questions every Three.js beginner asks.
      </p>

      {questions.map(({ id, title, desc, Demo }, i) => (
        <div key={id} className={i > 0 ? "mt-8" : undefined}>
          <div className="text-[17px] font-bold text-[#e8e6f0] mb-1.5 flex items-center gap-2">
            <span className="text-[#6c5ce7]">{id}</span> {title}
          </div>
          <p className="text-sm text-[#8888a8] m-0 mb-3.5 leading-relaxed">
            {desc}
          </p>
          <Demo />
        </div>
      ))}

      <Vocabulary />

      <div className="mt-7 text-center text-[13px] text-[#555570] pb-8">
        Next up — Lesson 5!
      </div>
    </>
  );
}
