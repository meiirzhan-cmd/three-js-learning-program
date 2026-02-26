import { useState, useRef } from "react";
import * as THREE from "three";

interface SceneState {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  cube: THREE.Mesh | null;
  mesh: THREE.Mesh | null;
  animId: number | null;
}

const colors = [
  { hex: "#6c5ce7", name: "Purple" },
  { hex: "#00cec9", name: "Teal" },
  { hex: "#fd79a8", name: "Pink" },
  { hex: "#fdcb6e", name: "Gold" },
  { hex: "#ff7675", name: "Red" },
  { hex: "#55efc4", name: "Mint" },
];

const shapes = [
  { id: "box", label: "Box" },
  { id: "sphere", label: "Sphere" },
  { id: "torus", label: "Torus" },
  { id: "cone", label: "Cone" },
  { id: "cylinder", label: "Cylinder" },
];

export default function ThreeScene({ width = 500, height = 400 }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef<SceneState>({
    scene: null,
    camera: null,
    renderer: null,
    cube: null,
    mesh: null,
    animId: null,
  });

  const [spinning, setSpinning] = useState(true);
  const [color, setColor] = useState("#6c5ce7");
  const [shape, setShape] = useState("box");
  const spinRef = useRef(true);

  const initScene = (canvas: HTMLCanvasElement | null) => {
    if (!canvas || stateRef.current.renderer) return;
    canvasRef.current = canvas;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#cfcfdd");

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    const light = new THREE.DirectionalLight("#ffffff", 1.5);
    light.position.set(2, 3, 4);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight("#ffffff", 0.4);
    scene.add(ambientLight);

    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const material = new THREE.MeshStandardMaterial({ color: "#6c5ce7" });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    stateRef.current = {
      scene,
      camera,
      renderer,
      cube,
      mesh: cube,
      animId: null,
    };

    function animate() {
      stateRef.current.animId = requestAnimationFrame(animate);
      const currentMesh = stateRef.current.mesh;
      if (spinRef.current && currentMesh) {
        currentMesh.rotation.x += 0.008;
        currentMesh.rotation.y += 0.012;
      }
      renderer.render(scene, camera);
    }
    animate();
  };

  const changeColor = (newColor: string) => {
    setColor(newColor);
    if (stateRef.current.mesh) {
      (
        stateRef.current.mesh.material as THREE.MeshStandardMaterial
      ).color.set(newColor);
    }
  };

  const changeShape = (newShape: string) => {
    setShape(newShape);
    const { scene, mesh } = stateRef.current;
    if (!scene || !mesh) return;

    scene.remove(mesh);
    mesh.geometry.dispose();

    let geometry;
    switch (newShape) {
      case "sphere":
        geometry = new THREE.SphereGeometry(1, 32, 32);
        break;
      case "torus":
        geometry = new THREE.TorusGeometry(0.8, 0.35, 16, 48);
        break;
      case "cone":
        geometry = new THREE.ConeGeometry(1, 2, 32);
        break;
      case "cylinder":
        geometry = new THREE.CylinderGeometry(0.7, 0.7, 2, 32);
        break;
      default:
        geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    }

    const newMesh = new THREE.Mesh(geometry, mesh.material);
    scene.add(newMesh);
    stateRef.current.mesh = newMesh;
    stateRef.current.cube = newMesh;
  };

  const toggleSpin = () => {
    spinRef.current = !spinRef.current;
    setSpinning(!spinning);
  };

  return (
    <div>
      {/* 3D Canvas */}
      <div className="rounded-xl overflow-hidden border border-[#2a2a3a] mb-4">
        <canvas
          ref={initScene}
          width={width}
          height={height}
          className="block w-full h-auto"
        />
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3">
        {/* Shapes */}
        <div className="flex-[1_1_200px] bg-[#12121a] border border-[#2a2a3a] rounded-[10px] p-3.5">
          <div className="text-[11px] font-bold text-[#888] tracking-wider mb-2 uppercase">
            Geometry (Shape)
          </div>
          <div className="flex flex-wrap gap-1.5">
            {shapes.map((s) => (
              <button
                key={s.id}
                onClick={() => changeShape(s.id)}
                className={`px-3 py-1.5 rounded-md text-xs cursor-pointer border ${
                  shape === s.id
                    ? "border-[#6c5ce7] bg-[#6c5ce722] text-[#a29bfe]"
                    : "border-[#2a2a3a] bg-[#0a0a0f] text-[#888]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="flex-[1_1_200px] bg-[#12121a] border border-[#2a2a3a] rounded-[10px] p-3.5">
          <div className="text-[11px] font-bold text-[#888] tracking-wider mb-2 uppercase">
            Material (Color)
          </div>
          <div className="flex gap-2 flex-wrap">
            {colors.map((c) => (
              <button
                key={c.hex}
                onClick={() => changeColor(c.hex)}
                title={c.name}
                className="w-7 h-7 rounded-full cursor-pointer"
                style={{
                  background: c.hex,
                  border:
                    color === c.hex
                      ? "2px solid white"
                      : "2px solid transparent",
                  boxShadow:
                    color === c.hex ? `0 0 10px ${c.hex}66` : "none",
                }}
              />
            ))}
          </div>
        </div>

        {/* Animation */}
        <div className="flex-none bg-[#12121a] border border-[#2a2a3a] rounded-[10px] p-3.5 flex items-center">
          <button
            onClick={toggleSpin}
            className={`px-4.5 py-2 rounded-lg border text-[13px] cursor-pointer font-semibold ${
              spinning
                ? "border-[#2a2a3a] bg-[#6c5ce722] text-[#a29bfe]"
                : "border-[#2a2a3a] bg-[#0a0a0f] text-[#888]"
            }`}
          >
            {spinning ? "Pause" : "Spin"}
          </button>
        </div>
      </div>
    </div>
  );
}
