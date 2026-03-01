import { useState, useRef } from "react";
import * as THREE from "three";

interface SceneState {
  scene?: THREE.Scene;
  camera?: THREE.PerspectiveCamera;
  renderer?: THREE.WebGLRenderer;
  box?: THREE.Mesh;
  canvas?: HTMLCanvasElement;
  animId?: number;
}

const problems = [
  {
    id: "working",
    label: "Working",
    color: "#55efc4",
    desc: "Everything correct: light, camera at z=3, object at origin.",
  },
  {
    id: "no-light",
    label: "No Light",
    color: "#ff7675",
    desc: "MeshStandardMaterial needs light! Add a DirectionalLight or use MeshBasicMaterial instead.",
  },
  {
    id: "inside",
    label: "Camera Inside",
    color: "#ff7675",
    desc: "Camera at (0,0,0) = inside the box. Move it back with camera.position.z = 3",
  },
  {
    id: "too-far",
    label: "Too Far",
    color: "#ff7675",
    desc: "Object at z=-100 but camera.far=5. Increase far or move object closer.",
  },
  {
    id: "wrong-way",
    label: "Wrong Way",
    color: "#ff7675",
    desc: "Camera looks at (0,0,100) instead of (0,0,0). Use camera.lookAt(0,0,0)",
  },
];

export default function BlackScreenDemo() {
  const stateRef = useRef<SceneState>({});
  const [problem, setProblem] = useState("working");

  const setupScene = (canvas: HTMLCanvasElement, mode: string) => {
    if (stateRef.current.renderer) {
      stateRef.current.renderer.dispose();
    }
    if (stateRef.current.animId) {
      cancelAnimationFrame(stateRef.current.animId);
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#1a1a2e");

    const camera = new THREE.PerspectiveCamera(75, 500 / 300, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(500, 300);
    renderer.setPixelRatio(window.devicePixelRatio);

    const box = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 1.2, 1.2),
      new THREE.MeshStandardMaterial({ color: "#6c5ce7" }),
    );

    switch (mode) {
      case "no-light":
        camera.position.z = 3;
        scene.add(box);
        break;
      case "inside":
        camera.position.set(0, 0, 0);
        scene.add(new THREE.DirectionalLight("#fff", 1.5));
        scene.add(new THREE.AmbientLight("#fff", 0.4));
        scene.add(box);
        break;
      case "too-far":
        camera.position.z = 3;
        camera.far = 5;
        camera.updateProjectionMatrix();
        box.position.z = -100;
        scene.add(new THREE.DirectionalLight("#fff", 1.5));
        scene.add(new THREE.AmbientLight("#fff", 0.4));
        scene.add(box);
        break;
      case "wrong-way":
        camera.position.z = 3;
        camera.lookAt(0, 0, 100);
        scene.add(new THREE.DirectionalLight("#fff", 1.5));
        scene.add(new THREE.AmbientLight("#fff", 0.4));
        scene.add(box);
        break;
      default: {
        camera.position.z = 3;
        const dl = new THREE.DirectionalLight("#fff", 1.5);
        dl.position.set(2, 3, 4);
        scene.add(dl);
        scene.add(new THREE.AmbientLight("#fff", 0.4));
        scene.add(box);
      }
    }

    stateRef.current = { scene, camera, renderer, box, canvas };

    function animate() {
      stateRef.current.animId = requestAnimationFrame(animate);
      box.rotation.x += 0.008;
      box.rotation.y += 0.012;
      renderer.render(scene, camera);
    }
    animate();
  };

  const canvasCallback = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    stateRef.current.canvas = canvas;
    setupScene(canvas, "working");
  };

  const changeProblem = (mode: string) => {
    setProblem(mode);
    if (stateRef.current.canvas) {
      setupScene(stateRef.current.canvas, mode);
    }
  };

  const active = problems.find((p) => p.id === problem);

  return (
    <div>
      <div className="rounded-xl overflow-hidden border border-[#2a2a3a]">
        <canvas
          ref={canvasCallback}
          width={500}
          height={300}
          className="block w-full h-auto"
        />
      </div>
      <div className="flex gap-1.5 mt-3 flex-wrap">
        {problems.map((p) => (
          <button
            key={p.id}
            onClick={() => changeProblem(p.id)}
            className={`px-3 py-1.5 rounded-lg text-[11px] cursor-pointer border transition-colors ${
              problem === p.id
                ? "font-semibold"
                : "border-[#2a2a3a] bg-[#12121a] text-[#8888a8] font-normal"
            }`}
            style={
              problem === p.id
                ? { borderColor: p.color, background: p.color + "22", color: p.color }
                : undefined
            }
          >
            {p.label}
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
