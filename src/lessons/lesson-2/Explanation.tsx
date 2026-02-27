const explanations = [
  {
    title: "How it works",
    body: (
      <>
        <p className="m-0 mb-2.5">
          The simplest approach: just put HTML elements{" "}
          <strong className="text-[#6c5ce7]">on top of</strong> the 3D canvas
          using CSS <code className="text-[#a29bfe]">position: absolute</code>.
        </p>
        <p className="m-0 mb-2.5">
          <strong className="text-[#55efc4]">Pros:</strong> Easy, crisp text,
          supports all CSS styling, great for UI labels and HUDs.
        </p>
        <p className="m-0">
          <strong className="text-[#ff7675]">Cons:</strong> Text doesn't move
          with 3D objects, doesn't get occluded (hidden behind objects), not part
          of the 3D world.
        </p>
      </>
    ),
  },
  {
    title: "How it works",
    body: (
      <>
        <p className="m-0 mb-2.5">
          We draw text onto a{" "}
          <strong className="text-[#6c5ce7]">2D canvas</strong> (invisible),
          then use that canvas as a{" "}
          <strong className="text-[#fdcb6e]">texture</strong> on a 3D plane.
        </p>
        <p className="m-0 mb-2.5">
          <strong className="text-[#55efc4]">Pros:</strong> Text lives in 3D
          space, moves with objects, gets lit and shaded, can be dynamic (type
          above!).
        </p>
        <p className="m-0">
          <strong className="text-[#ff7675]">Cons:</strong> Flat (no depth), can
          look blurry if resolution is too low, more work to set up.
        </p>
      </>
    ),
  },
  {
    title: "How it works",
    body: (
      <>
        <p className="m-0 mb-2.5">
          <strong className="text-[#6c5ce7]">TextGeometry</strong> converts font
          data into actual 3D vertices — real geometry with depth, like extruded
          letters. The demo above simulates this with tiny cubes forming "HI!"
        </p>
        <p className="m-0 mb-2.5">
          <strong className="text-[#55efc4]">Pros:</strong> True 3D text with
          depth, casts shadows, catches light on edges, looks stunning.
        </p>
        <p className="m-0">
          <strong className="text-[#ff7675]">Cons:</strong> Needs a font file
          (JSON format), expensive to render (many vertices), not great for
          frequently changing text.
        </p>
      </>
    ),
  },
];

export default function Explanation({ activeTab }: { activeTab: number }) {
  const { title, body } = explanations[activeTab];

  return (
    <div className="mt-4 px-5 py-4 bg-[#12121a] border border-[#2a2a3a] rounded-[10px] text-sm leading-loose text-[#aaa8c0]">
      <div className="font-bold text-[#e8e6f0] mb-2">{title}</div>
      {body}
    </div>
  );
}
