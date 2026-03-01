import { useRef } from "react";
import * as THREE from "three";

export default function CoordinateDemo() {
  const stateRef = useRef<Record<string, unknown>>({});

  const init = (canvas: HTMLCanvasElement | null) => {
    if (!canvas || stateRef.current.renderer) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#1a1a2e");

    const camera = new THREE.PerspectiveCamera(50, 500 / 350, 0.1, 1000);
    camera.position.set(3, 2.5, 4);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(500, 350);
    renderer.setPixelRatio(window.devicePixelRatio);

    scene.add(new THREE.AmbientLight("#fff", 0.5));
    const dl = new THREE.DirectionalLight("#fff", 1);
    dl.position.set(3, 4, 5);
    scene.add(dl);

    // Origin sphere
    scene.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 16, 16),
        new THREE.MeshBasicMaterial({ color: "#ffffff" }),
      ),
    );

    // Axes — colored arrows with labels
    const makeAxis = (dir: THREE.Vector3, color: string, label: string) => {
      const points = [new THREE.Vector3(0, 0, 0), dir.clone().multiplyScalar(2.5)];
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      scene.add(new THREE.Line(geo, new THREE.LineBasicMaterial({ color })));

      // Arrow head
      const cone = new THREE.Mesh(
        new THREE.ConeGeometry(0.06, 0.2, 8),
        new THREE.MeshBasicMaterial({ color }),
      );
      cone.position.copy(dir.clone().multiplyScalar(2.5));
      if (dir.x > 0) cone.rotation.z = -Math.PI / 2;
      else if (dir.z > 0) cone.rotation.x = Math.PI / 2;
      scene.add(cone);

      // Label sprite
      const c2d = document.createElement("canvas");
      c2d.width = 64;
      c2d.height = 40;
      const ctx = c2d.getContext("2d")!;
      ctx.fillStyle = color;
      ctx.font = "bold 28px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(label, 32, 30);
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c2d) }),
      );
      sprite.position.copy(dir.clone().multiplyScalar(2.8));
      sprite.scale.set(0.5, 0.3, 1);
      scene.add(sprite);
    };

    makeAxis(new THREE.Vector3(1, 0, 0), "#ff6b6b", "X");
    makeAxis(new THREE.Vector3(0, 1, 0), "#55efc4", "Y");
    makeAxis(new THREE.Vector3(0, 0, 1), "#74b9ff", "Z");

    // Grid
    scene.add(new THREE.GridHelper(5, 10, "#2a2a3a", "#1f1f2f"));

    // Example box at (1,1,1)
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.4, 0.4),
      new THREE.MeshStandardMaterial({ color: "#6c5ce7" }),
    );
    box.position.set(1, 1, 1);
    scene.add(box);

    // Dashed lines from box to axes
    const makeDashed = (from: THREE.Vector3, to: THREE.Vector3, color: string) => {
      const geo = new THREE.BufferGeometry().setFromPoints([from, to]);
      const mat = new THREE.LineDashedMaterial({ color, dashSize: 0.1, gapSize: 0.05 });
      const line = new THREE.Line(geo, mat);
      line.computeLineDistances();
      scene.add(line);
    };
    makeDashed(new THREE.Vector3(1, 1, 1), new THREE.Vector3(1, 0, 1), "#ff6b6b55");
    makeDashed(new THREE.Vector3(1, 1, 1), new THREE.Vector3(0, 1, 1), "#55efc455");
    makeDashed(new THREE.Vector3(1, 1, 1), new THREE.Vector3(1, 1, 0), "#74b9ff55");

    // Position label
    const lc = document.createElement("canvas");
    lc.width = 200;
    lc.height = 40;
    const lctx = lc.getContext("2d")!;
    lctx.fillStyle = "#a29bfe";
    lctx.font = "bold 20px monospace";
    lctx.fillText("(1, 1, 1)", 20, 28);
    const lSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(lc) }),
    );
    lSprite.position.set(1, 1.5, 1);
    lSprite.scale.set(1.2, 0.25, 1);
    scene.add(lSprite);

    stateRef.current = { scene, camera, renderer };

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
  };

  return (
    <div className="rounded-xl overflow-hidden border border-[#2a2a3a]">
      <canvas
        ref={init}
        width={500}
        height={350}
        className="block w-full h-auto"
      />
    </div>
  );
}
