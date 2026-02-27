import { useRef } from "react";
import * as THREE from "three";

export default function HTMLOverlayDemo() {
  const stateRef = useRef<Record<string, unknown>>({});

  const init = (canvas: HTMLCanvasElement | null) => {
    if (!canvas || stateRef.current.renderer) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#1a1a2e");

    const camera = new THREE.PerspectiveCamera(75, 500 / 300, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(500, 300);
    renderer.setPixelRatio(window.devicePixelRatio);

    const light = new THREE.DirectionalLight("#fff", 1.5);
    light.position.set(2, 3, 4);
    scene.add(light);
    scene.add(new THREE.AmbientLight("#fff", 0.4));

    const mesh = new THREE.Mesh(
      new THREE.TorusGeometry(0.8, 0.35, 16, 48),
      new THREE.MeshStandardMaterial({ color: "#6c5ce7" }),
    );
    scene.add(mesh);

    stateRef.current = { scene, camera, renderer, mesh };

    function animate() {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.008;
      mesh.rotation.y += 0.012;
      renderer.render(scene, camera);
    }
    animate();
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-[#2a2a3a]">
      <canvas
        ref={init}
        width={500}
        height={300}
        className="block w-full h-auto"
      />
      <div className="absolute top-5 left-0 right-0 text-center text-[22px] font-extrabold text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.7)] tracking-wide pointer-events-none">
        HTML Overlay Text
      </div>
      <div className="absolute bottom-5 left-0 right-0 text-center text-xs text-white/60 pointer-events-none">
        This text is regular HTML positioned on top of the canvas
      </div>
    </div>
  );
}
