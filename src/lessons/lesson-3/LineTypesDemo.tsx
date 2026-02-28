import { useState, useRef } from "react";
import * as THREE from "three";

interface SceneState {
  scene?: THREE.Scene;
  camera?: THREE.PerspectiveCamera;
  renderer?: THREE.WebGLRenderer;
  lineObj?: THREE.Line | THREE.LineSegments | THREE.LineLoop;
}

const lineTypes = [
  {
    id: "line",
    label: "Line",
    color: "#6c5ce7",
    desc: "Connects all points in order: P0\u2192P1\u2192P2\u2192P3\u2192P4",
  },
  {
    id: "segments",
    label: "LineSegments",
    color: "#fd79a8",
    desc: "Connects pairs only: P0\u2192P1, P2\u2192P3 (P4 alone)",
  },
  {
    id: "loop",
    label: "LineLoop",
    color: "#55efc4",
    desc: "Like Line but also connects P4 back to P0",
  },
  {
    id: "dashed",
    label: "Dashed",
    color: "#fdcb6e",
    desc: "Same as Line but with dashes (needs computeLineDistances)",
  },
];

const linePoints = [
  new THREE.Vector3(-2, -1, 0),
  new THREE.Vector3(-0.5, 1.5, 0),
  new THREE.Vector3(0.5, -0.5, 0),
  new THREE.Vector3(1.5, 1, 0),
  new THREE.Vector3(2.5, -1, 0),
];

export default function LineTypesDemo() {
  const stateRef = useRef<SceneState>({});
  const [lineType, setLineType] = useState("line");

  const buildLine = (scene: THREE.Scene, type: string) => {
    if (stateRef.current.lineObj) {
      scene.remove(stateRef.current.lineObj);
      stateRef.current.lineObj.geometry.dispose();
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(linePoints);

    let lineObj: THREE.Line | THREE.LineSegments | THREE.LineLoop;
    switch (type) {
      case "segments":
        lineObj = new THREE.LineSegments(
          geometry,
          new THREE.LineBasicMaterial({ color: "#fd79a8", linewidth: 2 }),
        );
        break;
      case "loop":
        lineObj = new THREE.LineLoop(
          geometry,
          new THREE.LineBasicMaterial({ color: "#55efc4", linewidth: 2 }),
        );
        break;
      case "dashed": {
        const dashedMat = new THREE.LineDashedMaterial({
          color: "#fdcb6e",
          dashSize: 0.2,
          gapSize: 0.1,
        });
        lineObj = new THREE.Line(geometry, dashedMat);
        lineObj.computeLineDistances();
        break;
      }
      default:
        lineObj = new THREE.Line(
          geometry,
          new THREE.LineBasicMaterial({ color: "#6c5ce7", linewidth: 2 }),
        );
    }

    scene.add(lineObj);
    stateRef.current.lineObj = lineObj;
  };

  const init = (canvas: HTMLCanvasElement | null) => {
    if (!canvas || stateRef.current.renderer) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#1a1a2e");

    const camera = new THREE.PerspectiveCamera(75, 500 / 300, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(500, 300);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Dot markers at each point
    const dotGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const dotMat = new THREE.MeshBasicMaterial({ color: "#ffffff" });
    const pts: [number, number][] = [
      [-2, -1], [-0.5, 1.5], [0.5, -0.5], [1.5, 1], [2.5, -1],
    ];
    pts.forEach(([x, y]) => {
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(x, y, 0);
      scene.add(dot);
    });

    // Point labels
    pts.forEach(([x, y], i) => {
      const canvas2D = document.createElement("canvas");
      canvas2D.width = 64;
      canvas2D.height = 32;
      const ctx = canvas2D.getContext("2d")!;
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = "bold 18px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`P${i}`, 32, 22);
      const tex = new THREE.CanvasTexture(canvas2D);
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex }));
      sprite.position.set(x, y + 0.3, 0);
      sprite.scale.set(0.5, 0.25, 1);
      scene.add(sprite);
    });

    stateRef.current = { ...stateRef.current, scene, camera, renderer };
    buildLine(scene, "line");

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
  };

  const changeType = (type: string) => {
    setLineType(type);
    if (stateRef.current.scene) {
      buildLine(stateRef.current.scene, type);
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

      <div className="flex gap-1.5 mt-3.5 flex-wrap">
        {lineTypes.map((t) => (
          <button
            key={t.id}
            onClick={() => changeType(t.id)}
            className={`px-3.5 py-2 rounded-lg text-xs cursor-pointer border transition-colors ${
              lineType === t.id
                ? "font-semibold"
                : "border-[#2a2a3a] bg-[#12121a] text-[#8888a8] font-normal"
            }`}
            style={
              lineType === t.id
                ? { borderColor: t.color, background: t.color + "22", color: t.color }
                : undefined
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-2.5 px-3.5 py-2.5 bg-[#12121a] rounded-lg text-[13px] text-[#aaa8c0] leading-relaxed border border-[#2a2a3a]">
        {lineTypes.find((t) => t.id === lineType)?.desc}
      </div>
    </div>
  );
}
