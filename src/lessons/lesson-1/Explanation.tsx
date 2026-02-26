export default function Explanation() {
  return (
    <div className="mt-7 p-5 bg-[#12121a] border border-[#2a2a3a] rounded-xl text-sm leading-loose text-[#aaa8c0]">
      <div className="font-bold text-[#e8e6f0] mb-2.5 text-[15px]">
        What's happening here?
      </div>
      <div className="mb-3">
        <strong className="text-[#6c5ce7]">Scene</strong> — an empty container
        where we add objects. Like a stage in a theater.
      </div>
      <div className="mb-3">
        <strong className="text-[#00cec9]">Camera</strong> — positioned at z=3,
        looking at the origin (0,0,0). It defines what we see.
      </div>
      <div className="mb-3">
        <strong className="text-[#fd79a8]">Renderer</strong> — takes the scene +
        camera and draws pixels onto the {"<canvas>"} element ~60 times per
        second.
      </div>
      <div className="mb-3">
        <strong className="text-[#fdcb6e]">Mesh</strong> — a visible object made
        of <em>Geometry</em> (the shape) + <em>Material</em> (the surface look).
        Try changing both above!
      </div>
      <div>
        <strong className="text-[#ffeaa7]">Light</strong> — without it, the
        MeshStandardMaterial would be black. We added a directional light (like
        the sun) and an ambient light (soft fill).
      </div>
    </div>
  );
}
