import { useState, useRef } from "react";
import * as THREE from "three";

interface SceneState {
  scene?: THREE.Scene;
  camera?: THREE.OrthographicCamera;
  renderer?: THREE.WebGLRenderer;
  canvas?: HTMLCanvasElement;
  lineObj?: THREE.Line | null;
  dots: THREE.Mesh[];
}

const palette = ["#6c5ce7", "#00cec9", "#fd79a8", "#fdcb6e", "#ff7675", "#55efc4"];

export default function DrawingDemo() {
  const stateRef = useRef<SceneState>({ dots: [] });
  const pointsRef = useRef<THREE.Vector3[]>([]);
  const [pointCount, setPointCount] = useState(0);
  const [color, setColor] = useState("#6c5ce7");

  const rebuildLine = () => {
    const { scene } = stateRef.current;
    if (!scene) return;

    // Remove old line
    if (stateRef.current.lineObj) {
      scene.remove(stateRef.current.lineObj);
      stateRef.current.lineObj.geometry.dispose();
    }

    // Remove old dots
    stateRef.current.dots.forEach((d) => scene.remove(d));
    stateRef.current.dots = [];

    if (pointsRef.current.length === 0) return;

    // Draw dots at each point
    const dotGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const dotMat = new THREE.MeshBasicMaterial({ color: "#ffffff" });
    pointsRef.current.forEach((p) => {
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(p);
      scene.add(dot);
      stateRef.current.dots.push(dot);
    });

    // Draw line
    if (pointsRef.current.length >= 2) {
      const geometry = new THREE.BufferGeometry().setFromPoints(pointsRef.current);
      const material = new THREE.LineBasicMaterial({ color });
      const line = new THREE.Line(geometry, material);
      scene.add(line);
      stateRef.current.lineObj = line;
    }
  };

  const init = (canvas: HTMLCanvasElement | null) => {
    if (!canvas || stateRef.current.renderer) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#1a1a2e");

    const camera = new THREE.OrthographicCamera(-3, 3, 2, -2, 0.1, 10);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(500, 300);
    renderer.setPixelRatio(window.devicePixelRatio);

    const gridHelper = new THREE.GridHelper(6, 12, "#2a2a3a", "#1f1f2f");
    gridHelper.rotation.x = Math.PI / 2;
    scene.add(gridHelper);

    stateRef.current = { ...stateRef.current, scene, camera, renderer, canvas };

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    canvas.addEventListener("click", (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 6 - 3;
      const y = -((e.clientY - rect.top) / rect.height) * 4 + 2;

      pointsRef.current.push(new THREE.Vector3(x, y, 0));
      setPointCount(pointsRef.current.length);
      rebuildLine();
    });
  };

  const clear = () => {
    pointsRef.current = [];
    setPointCount(0);
    rebuildLine();
  };

  const changeColor = (c: string) => {
    setColor(c);
    setTimeout(rebuildLine, 0);
  };

  return (
    <div>
      <div className="rounded-xl overflow-hidden border border-[#2a2a3a] cursor-crosshair">
        <canvas
          ref={init}
          width={500}
          height={300}
          className="block w-full h-auto"
        />
      </div>
      <div className="flex gap-2.5 items-center mt-3 flex-wrap">
        <button
          onClick={clear}
          className="px-4 py-1.5 rounded-lg border border-[#ff7675] bg-transparent text-[#ff7675] text-xs cursor-pointer"
        >
          Clear
        </button>
        <span className="text-xs text-[#555570]">
          {pointCount} point{pointCount !== 1 ? "s" : ""} — click the canvas to draw
        </span>
        <div className="ml-auto flex gap-1.5">
          {palette.map((c) => (
            <button
              key={c}
              onClick={() => changeColor(c)}
              className="w-[22px] h-[22px] rounded-full cursor-pointer"
              style={{
                background: c,
                border: color === c ? "2px solid white" : "2px solid transparent",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
