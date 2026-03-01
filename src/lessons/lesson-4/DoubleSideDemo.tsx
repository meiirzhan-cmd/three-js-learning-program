import { useState, useRef } from "react";
import * as THREE from "three";

interface SceneState {
  scene?: THREE.Scene;
  camera?: THREE.PerspectiveCamera;
  renderer?: THREE.WebGLRenderer;
  plane?: THREE.Mesh;
}

export default function DoubleSideDemo() {
  const stateRef = useRef<SceneState>({});
  const [doubleSide, setDoubleSide] = useState(false);

  const init = (canvas: HTMLCanvasElement | null) => {
    if (!canvas || stateRef.current.renderer) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#1a1a2e");

    const camera = new THREE.PerspectiveCamera(50, 500 / 250, 0.1, 1000);
    camera.position.set(0, 0.5, 3);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(500, 250);
    renderer.setPixelRatio(window.devicePixelRatio);

    const dl = new THREE.DirectionalLight("#fff", 1.5);
    dl.position.set(2, 3, 4);
    scene.add(dl);
    scene.add(new THREE.AmbientLight("#fff", 0.3));

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.MeshStandardMaterial({ color: "#6c5ce7", side: THREE.FrontSide }),
    );
    scene.add(plane);

    stateRef.current = { scene, camera, renderer, plane };

    function animate() {
      requestAnimationFrame(animate);
      plane.rotation.y += 0.015;
      renderer.render(scene, camera);
    }
    animate();
  };

  const toggle = () => {
    const next = !doubleSide;
    setDoubleSide(next);
    const { plane } = stateRef.current;
    if (plane) {
      const mat = plane.material as THREE.MeshStandardMaterial;
      mat.side = next ? THREE.DoubleSide : THREE.FrontSide;
      mat.needsUpdate = true;
    }
  };

  return (
    <div>
      <div className="rounded-xl overflow-hidden border border-[#2a2a3a]">
        <canvas
          ref={init}
          width={500}
          height={250}
          className="block w-full h-auto"
        />
      </div>
      <div className="flex items-center gap-2.5 mt-3">
        <button
          onClick={toggle}
          className={`px-4 py-2 rounded-lg text-[13px] cursor-pointer font-semibold border ${
            doubleSide
              ? "border-[#55efc4] bg-[#55efc422] text-[#55efc4]"
              : "border-[#ff7675] bg-[#ff767522] text-[#ff7675]"
          }`}
        >
          {doubleSide ? "DoubleSide ON" : "FrontSide only"}
        </button>
        <span className="text-xs text-[#555570]">
          Watch the plane disappear when facing away
        </span>
      </div>
    </div>
  );
}
