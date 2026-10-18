import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const COLORS = { PASS: "#3ee6c4", FAIL: "#ff6b6b", MANUAL: "#b8a6ff" } as const;
const CYCLE = ["PASS", "FAIL", "MANUAL"] as const;
// Four input lanes (requirements, contracts, checks, evidence) converge on the core.
const LANES = [
  new THREE.Vector3(-3.2, 1.8, 0),
  new THREE.Vector3(-3.2, 0.6, 0),
  new THREE.Vector3(-3.2, -0.6, 0),
  new THREE.Vector3(-3.2, -1.8, 0),
];
const CORE = new THREE.Vector3(0, 0, 0);

function Lane({ from, index, running }: { from: THREE.Vector3; index: number; running: boolean }) {
  const pulse = useRef<THREE.Mesh>(null);
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3([from, new THREE.Vector3(-1.6, from.y * 0.5, 0.2), new THREE.Vector3(-0.9, 0, 0)]),
    [from],
  );
  const line = useMemo(() => new THREE.BufferGeometry().setFromPoints(curve.getPoints(40)), [curve]);
  useFrame(({ clock }) => {
    if (!pulse.current || !running) return;
    const t = ((clock.elapsedTime * 0.25 + index * 0.25) % 1 + 1) % 1;
    pulse.current.position.copy(curve.getPoint(t));
  });
  return (
    <group>
      <mesh position={from}>
        <boxGeometry args={[0.45, 0.3, 0.1]} />
        <meshBasicMaterial color="#232a36" />
      </mesh>
      <line>
        <primitive object={line} attach="geometry" />
        <lineBasicMaterial color="#3ee6c4" transparent opacity={0.4} />
      </line>
      <mesh ref={pulse} position={from}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color="#3ee6c4" />
      </mesh>
    </group>
  );
}

function Core({ running }: { running: boolean }) {
  const ring = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  const shell = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!running) return;
    const t = clock.elapsedTime;
    if (shell.current) shell.current.rotation.y = t * 0.15;
    const i = Math.floor(t / 3) % CYCLE.length;
    mat.current?.color.set(COLORS[CYCLE[i]!]);
    if (ring.current) ring.current.scale.setScalar(1 + 0.04 * Math.sin(t * 2));
  });
  return (
    <group position={CORE}>
      <mesh ref={shell}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshBasicMaterial color="#3ee6c4" wireframe transparent opacity={0.35} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial color="#0f1218" transparent opacity={0.85} />
      </mesh>
      <mesh ref={ring} position={[2.2, 0, 0]}>
        <torusGeometry args={[0.45, 0.04, 12, 48]} />
        <meshBasicMaterial ref={mat} color={COLORS.PASS} />
      </mesh>
      <line>
        <bufferGeometry onUpdate={(g) => g.setFromPoints([new THREE.Vector3(0.9, 0, 0), new THREE.Vector3(1.75, 0, 0)])} />
        <lineBasicMaterial color="#3ee6c4" transparent opacity={0.5} />
      </line>
    </group>
  );
}

function Rig({ running }: { running: boolean }) {
  useFrame(({ camera, pointer }) => {
    if (!running) return;
    camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 0.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene({ running, lowPower }: { running: boolean; lowPower: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={lowPower ? 1 : [1, 1.75]}
      frameloop={running ? "always" : "demand"}
      gl={{ antialias: !lowPower, powerPreference: "low-power" }}
      aria-hidden="true"
    >
      <Rig running={running} />
      {LANES.map((p, i) => (
        <Lane key={i} from={p} index={i} running={running} />
      ))}
      <Core running={running} />
    </Canvas>
  );
}
