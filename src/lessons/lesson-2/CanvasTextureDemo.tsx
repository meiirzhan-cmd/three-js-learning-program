import { useState, useRef } from "react";
import * as THREE from "three";

export default function CanvasTextureDemo() {
  const stateRef = useRef<Record<string, unknown>>({});
  const [text, setText] = useState("Hello 3D!");

  const createTextTexture = (str: string) => {
    const canvas2D = document.createElement("canvas");
    canvas2D.width = 512;
    canvas2D.height = 256;
    const ctx = canvas2D.getContext("2d")!;

    ctx.fillStyle = "#2d1b69";
    ctx.fillRect(0, 0, 512, 256);

    ctx.strokeStyle = "#6c5ce7";
    ctx.lineWidth = 4;
    ctx.strokeRect(8, 8, 496, 240);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 52px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(str, 256, 128);

    return new THREE.CanvasTexture(canvas2D);
  };

  const init = (canvas: HTMLCanvasElement | null) => {
    if (!canvas || stateRef.current.renderer) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#1a1a2e");

    const camera = new THREE.PerspectiveCamera(75, 500 / 300, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(500, 300);
    renderer.setPixelRatio(window.devicePixelRatio);

    const light = new THREE.DirectionalLight("#fff", 1);
    light.position.set(0, 0, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight("#fff", 0.8));

    const texture = createTextTexture("Hello 3D!");
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 1.5),
      new THREE.MeshStandardMaterial({ map: texture }),
    );
    scene.add(mesh);

    stateRef.current = { scene, camera, renderer, mesh };

    function animate() {
      requestAnimationFrame(animate);
      (mesh as THREE.Mesh).rotation.y = Math.sin(Date.now() * 0.001) * 0.3;
      renderer.render(scene, camera);
    }
    animate();
  };

  const updateText = (newText: string) => {
    setText(newText);
    const mesh = stateRef.current.mesh as THREE.Mesh | undefined;
    if (mesh) {
      const material = mesh.material as THREE.MeshStandardMaterial;
      const newTexture = createTextTexture(newText);
      material.map?.dispose();
      material.map = newTexture;
      material.needsUpdate = true;
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
      <div className="mt-2.5 flex gap-2 items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => updateText(e.target.value)}
          placeholder="Type something..."
          className="flex-1 px-3.5 py-2 rounded-lg border border-[#2a2a3a] bg-[#12121a] text-[#e8e6f0] text-sm font-[inherit] outline-none"
        />
      </div>
    </div>
  );
}
