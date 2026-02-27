import { useRef } from "react";
import * as THREE from "three";

export default function Text3DDemo() {
  const stateRef = useRef<Record<string, unknown>>({});

  const init = (canvas: HTMLCanvasElement | null) => {
    if (!canvas || stateRef.current.renderer) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#1a1a2e");

    const camera = new THREE.PerspectiveCamera(75, 500 / 300, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(500, 300);
    renderer.setPixelRatio(window.devicePixelRatio);

    const light = new THREE.DirectionalLight("#fff", 1.5);
    light.position.set(3, 3, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight("#fff", 0.4));

    // Simulate 3D text using boxes as "pixels"
    const letters = [
      // H
      [
        [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
        [1, 2],
        [2, 0], [2, 1], [2, 2], [2, 3], [2, 4],
      ],
      // I
      [
        [4, 0], [4, 1], [4, 2], [4, 3], [4, 4],
      ],
      // !
      [
        [6, 0],
        [6, 2], [6, 3], [6, 4],
      ],
    ];

    const group = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: "#6c5ce7" });

    letters.forEach((letter) => {
      letter.forEach(([x, y]) => {
        const box = new THREE.Mesh(
          new THREE.BoxGeometry(0.28, 0.28, 0.28),
          mat,
        );
        box.position.set(x * 0.35 - 1.2, y * 0.35 - 0.7, 0);
        group.add(box);
      });
    });

    scene.add(group);
    stateRef.current = { scene, camera, renderer, group };

    function animate() {
      requestAnimationFrame(animate);
      (group as THREE.Group).rotation.y = Math.sin(Date.now() * 0.0008) * 0.5;
      (group as THREE.Group).rotation.x = Math.sin(Date.now() * 0.0006) * 0.15;
      renderer.render(scene, camera);
    }
    animate();
  };

  return (
    <div className="rounded-xl overflow-hidden border border-[#2a2a3a]">
      <canvas
        ref={init}
        width={500}
        height={300}
        className="block w-full h-auto"
      />
    </div>
  );
}
