const faqs = [
  {
    q: "What units does Three.js use?",
    a: "No specific units. 1 = whatever you decide (meters, cm, etc). Just be consistent. Most people use 1 = 1 meter.",
  },
  {
    q: "How do I orbit around objects?",
    a: "Use OrbitControls (vanilla) or drei's <OrbitControls /> component (R3F). Lets you drag to rotate, scroll to zoom.",
  },
  {
    q: "Can I mix HTML and 3D?",
    a: "Yes! In R3F, drei's <Html> component lets you place HTML elements that track 3D positions.",
  },
  {
    q: "How do I resize the canvas with the window?",
    a: "In R3F, <Canvas> handles this automatically. In vanilla, listen for 'resize' events and update camera.aspect + renderer.setSize().",
  },
  {
    q: "What's the performance cost of Three.js?",
    a: "WebGL uses the GPU, so it's fast. Bottlenecks: too many draw calls (objects), too many vertices, heavy shaders, or large textures.",
  },
];

export default function Vocabulary() {
  return (
    <div className="mt-8 px-5 py-4.5 bg-[#12121a] border border-[#2a2a3a] rounded-xl">
      <div className="font-bold text-[#e8e6f0] mb-3.5 text-[15px]">
        More Quick Answers
      </div>
      {faqs.map((item, i) => (
        <div
          key={i}
          className={`py-2.5 ${i < faqs.length - 1 ? "border-b border-[#1a1a26]" : ""}`}
        >
          <div className="text-[13px] font-semibold text-[#a29bfe] mb-1">
            {item.q}
          </div>
          <div className="text-[13px] text-[#8888a8] leading-relaxed">
            {item.a}
          </div>
        </div>
      ))}
    </div>
  );
}
