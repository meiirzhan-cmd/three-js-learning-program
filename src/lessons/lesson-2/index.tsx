import { useState } from "react";
import HTMLOverlayDemo from "./HTMLOverlayDemo";
import CanvasTextureDemo from "./CanvasTextureDemo";
import Text3DDemo from "./Text3DDemo";
import Explanation from "./Explanation";
import CodeExamples from "./CodeExamples";
import Vocabulary from "./Vocabulary";

const tabs = [
  { label: "HTML Overlay", icon: "1" },
  { label: "Canvas Texture", icon: "2" },
  { label: "3D Geometry", icon: "3" },
];

const demos = [HTMLOverlayDemo, CanvasTextureDemo, Text3DDemo];

const summaryRows = [
  ["HTML Overlay", "UI labels, HUDs, tooltips, menus", "drei's <Html>"],
  ["Canvas Texture", "Dynamic text in 3D space, signs, billboards", "drei's <Text>"],
  ["3D Geometry", "Titles, logos, decorative 3D letters", "drei's <Text3D>"],
];

export default function Lesson2() {
  const [activeTab, setActiveTab] = useState(0);
  const ActiveDemo = demos[activeTab];

  return (
    <>
      <div className="text-[11px] font-bold tracking-widest text-[#6c5ce7] uppercase mb-2">
        Lesson 2 — Text
      </div>
      <h1 className="text-[26px] font-extrabold m-0 mb-1.5 tracking-tight">
        Creating Text
      </h1>
      <p className="text-sm text-[#8888a8] m-0 mb-7 leading-relaxed">
        Three ways to add text to your 3D scenes — each with different
        tradeoffs.
      </p>

      {/* Tabs */}
      <div className="flex gap-1.5 mb-5">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2 rounded-lg text-[13px] cursor-pointer border transition-colors ${
              activeTab === i
                ? "border-[#6c5ce7] bg-[#6c5ce722] text-[#a29bfe] font-semibold"
                : "border-[#2a2a3a] bg-[#12121a] text-[#8888a8] font-normal"
            }`}
          >
            {tab.icon}. {tab.label}
          </button>
        ))}
      </div>

      {/* Active demo + explanation + code */}
      <ActiveDemo />
      <Explanation activeTab={activeTab} />
      <CodeExamples activeTab={activeTab} />

      <Vocabulary />

      {/* Summary table */}
      <div className="mt-6 px-5 py-4.5 bg-[#12121a] border border-[#2a2a3a] rounded-xl">
        <div className="font-bold text-[#e8e6f0] mb-3.5 text-[15px]">
          When to use which?
        </div>
        {summaryRows.map(([method, useCase, r3f], i) => (
          <div
            key={i}
            className={`flex gap-3 py-2 text-[13px] items-baseline ${
              i < summaryRows.length - 1 ? "border-b border-[#1a1a26]" : ""
            }`}
          >
            <span className="text-[#6c5ce7] font-semibold min-w-[115px]">
              {method}
            </span>
            <span className="text-[#8888a8] flex-1">{useCase}</span>
            <span className="text-[#555570] text-[11px]">{r3f}</span>
          </div>
        ))}
      </div>

      <div className="mt-7 text-center text-[13px] text-[#555570] pb-8">
        Next up — Lesson 3!
      </div>
    </>
  );
}
