const terms = [
  ["Scene", "A container holding all objects, lights, and cameras"],
  ["Camera", "Defines the viewpoint — what part of the scene you see"],
  ["Renderer", "Converts 3D scene into 2D pixels on a <canvas>"],
  ["Geometry", "The shape/form of an object (box, sphere, torus, etc.)"],
  ["Material", "The surface appearance (color, shininess, texture)"],
  ["Mesh", "Geometry + Material = a visible 3D object"],
  ["FOV", "Field of View — how wide the camera sees (in degrees)"],
  ["useFrame", "R3F hook that runs a function every animation frame"],
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
