import { useState, useRef } from "react";
import * as THREE from "three";

interface SceneState {
  scene?: THREE.Scene;
  camera?: THREE.PerspectiveCamera;
  renderer?: THREE.WebGLRenderer;
  sphere?: THREE.Mesh;
}

const materials = [
  {
    id: "basic",
    label: "Basic",
    color: "#ff7675",
    desc: "Flat color, completely ignores lighting. Fastest. Good for wireframes, debug, simple effects.",
    create: () => new THREE.MeshBasicMaterial({ color: "#6c5ce7" }),
  },
  {
    id: "lambert",
    label: "Lambert",
    color: "#fdcb6e",
    desc: "Simple diffuse shading (matte). No specular highlights. Cheap to compute, good for non-shiny objects.",
    create: () => new THREE.MeshLambertMaterial({ color: "#6c5ce7" }),
  },
  {
    id: "phong",
    label: "Phong",
    color: "#55efc4",
    desc: "Adds specular highlights (shininess). The shiny spot when light hits. Good for plastic, ceramic.",
    create: () => new THREE.MeshPhongMaterial({ color: "#6c5ce7", shininess: 100 }),
  },
  {
    id: "standard",
    label: "Standard (PBR)",
    color: "#6c5ce7",
    desc: "Physically Based Rendering. Uses roughness + metalness. Most realistic for real-world materials. The default choice.",
    create: () =>
      new THREE.MeshStandardMaterial({ color: "#6c5ce7", roughness: 0.4, metalness: 0.3 }),
  },
  {
    id: "normal",
    label: "Normal",
    color: "#a29bfe",
    desc: "Shows surface normals as colors (RGB = XYZ direction). Great for debugging geometry. No lighting needed.",
    create: () => new THREE.MeshNormalMaterial(),
  },
  {
    id: "wireframe",
    label: "Wireframe",
    color: "#74b9ff",
    desc: "Shows only the triangle edges. Useful for seeing the geometry structure underneath.",
    create: () => new THREE.MeshBasicMaterial({ color: "#6c5ce7", wireframe: true }),
  },
];

export default function MaterialDemo() {
  const stateRef = useRef<SceneState>({});
  const [activeMat, setActiveMat] = useState("standard");

  const init = (canvas: HTMLCanvasElement | null) => {
    if (!canvas || stateRef.current.renderer) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#1a1a2e");

    const camera = new THREE.PerspectiveCamera(50, 500 / 350, 0.1, 1000);
    camera.position.set(0, 0, 4);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(500, 350);
    renderer.setPixelRatio(window.devicePixelRatio);

    const dl = new THREE.DirectionalLight("#fff", 1.5);
    dl.position.set(3, 3, 5);
    scene.add(dl);
    scene.add(new THREE.AmbientLight("#fff", 0.3));

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 32, 32),
      materials.find((m) => m.id === "standard")!.create(),
    );
    scene.add(sphere);

    stateRef.current = { scene, camera, renderer, sphere };

    function animate() {
      requestAnimationFrame(animate);
      sphere.rotation.y += 0.005;
      renderer.render(scene, camera);
    }
    animate();
  };

  const changeMaterial = (id: string) => {
    setActiveMat(id);
    const { sphere } = stateRef.current;
    if (!sphere) return;
    (sphere.material as THREE.Material).dispose();
    sphere.material = materials.find((m) => m.id === id)!.create();
  };

  const active = materials.find((m) => m.id === activeMat);

  return (
    <div>
      <div className="rounded-xl overflow-hidden border border-[#2a2a3a]">
        <canvas
          ref={init}
          width={500}
          height={350}
          className="block w-full h-auto"
        />
      </div>
      <div className="flex gap-1.5 mt-3 flex-wrap">
        {materials.map((m) => (
          <button
            key={m.id}
            onClick={() => changeMaterial(m.id)}
            className={`px-3 py-1.5 rounded-lg text-[11px] cursor-pointer border transition-colors ${
              activeMat === m.id
                ? "font-semibold"
                : "border-[#2a2a3a] bg-[#12121a] text-[#8888a8] font-normal"
            }`}
            style={
              activeMat === m.id
                ? { borderColor: m.color, background: m.color + "22", color: m.color }
                : undefined
            }
          >
            {m.label}
          </button>
        ))}
      </div>
      <div
        className="mt-2.5 px-3.5 py-2.5 bg-[#12121a] rounded-lg text-[13px] text-[#aaa8c0] leading-relaxed border"
        style={{ borderColor: (active?.color || "#2a2a3a") + "33" }}
      >
        {active?.desc}
      </div>
    </div>
  );
}
