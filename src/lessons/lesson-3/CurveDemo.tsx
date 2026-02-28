import { useState, useRef } from "react";
import * as THREE from "three";

interface SceneState {
  scene?: THREE.Scene;
  camera?: THREE.PerspectiveCamera;
  renderer?: THREE.WebGLRenderer;
  lineObj?: THREE.Line;
}

const curves = [
  { id: "sine", label: "Sine Wave" },
  { id: "helix", label: "Helix (3D)" },
  { id: "lissajous", label: "Lissajous" },
  { id: "spiral", label: "Spiral" },
];

export default function CurveDemo() {
  const stateRef = useRef<SceneState>({});
  const [curveType, setCurveType] = useState("sine");

  const buildCurve = (scene: THREE.Scene, type: string) => {
    if (stateRef.current.lineObj) {
      scene.remove(stateRef.current.lineObj);
      stateRef.current.lineObj.geometry.dispose();
    }

    const points: THREE.Vector3[] = [];
    const count = 200;

    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 4;
      const x = (i / count) * 6 - 3;

      switch (type) {
        case "helix": {
          const angle = t * 2;
          points.push(
            new THREE.Vector3(Math.cos(angle) * 1.5, x, Math.sin(angle) * 1.5),
          );
          continue;
        }
        case "lissajous":
          points.push(
            new THREE.Vector3(Math.sin(t * 1) * 2, Math.sin(t * 1.5) * 1.5, 0),
          );
          continue;
        case "spiral": {
          const r = (i / count) * 2;
          points.push(new THREE.Vector3(Math.cos(t) * r, Math.sin(t) * r, 0));
          continue;
        }
        default:
          points.push(new THREE.Vector3(x, Math.sin(t), 0));
          continue;
      }
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: "#a29bfe" });
    const line = new THREE.Line(geometry, material);
    scene.add(line);
    stateRef.current.lineObj = line;
  };

  const init = (canvas: HTMLCanvasElement | null) => {
    if (!canvas || stateRef.current.renderer) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#1a1a2e");

    const camera = new THREE.PerspectiveCamera(75, 500 / 300, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(500, 300);
    renderer.setPixelRatio(window.devicePixelRatio);

    stateRef.current = { ...stateRef.current, scene, camera, renderer };
    buildCurve(scene, "sine");

    function animate() {
      requestAnimationFrame(animate);
      if (stateRef.current.lineObj) {
        stateRef.current.lineObj.rotation.y += 0.005;
      }
      renderer.render(scene, camera);
    }
    animate();
  };

  const changeCurve = (type: string) => {
    setCurveType(type);
    if (stateRef.current.scene) {
      buildCurve(stateRef.current.scene, type);
    }
  };

  return (
    <div>
      <div className="rounded-xl overflow-hidden border border-[#2a2a3a]">
        <canvas
          ref={init}
          width={500}
          height={300}
          className="block w-full h-auto"
        />
      </div>
      <div className="flex gap-1.5 mt-3 flex-wrap">
        {curves.map((c) => (
          <button
            key={c.id}
            onClick={() => changeCurve(c.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs cursor-pointer border transition-colors ${
              curveType === c.id
                ? "border-[#a29bfe] bg-[#6c5ce722] text-[#a29bfe] font-semibold"
                : "border-[#2a2a3a] bg-[#12121a] text-[#8888a8] font-normal"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
