"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { HandPose, WordSign } from "@/lib/rsl-alphabet";

interface SignAvatarProps {
  currentSign: {
    type: "word" | "fingerspell" | "idle";
    label: string;
    gloss?: string;
    pose?: HandPose;
    wordSign?: WordSign;
  };
}

function LimbSegment({ start, end, radius, color }: {
  start: [number, number, number];
  end: [number, number, number];
  radius: number;
  color: string;
}) {
  const cylRef = useRef<THREE.Mesh>(null);
  const jointRef = useRef<THREE.Mesh>(null);
  const targetEnd = useMemo(() => new THREE.Vector3(...end), [end]);
  const currentEnd = useRef(new THREE.Vector3(...end));
  const geomRef = useRef<THREE.CylinderGeometry | null>(null);

  useFrame(() => {
    if (!cylRef.current) return;
    currentEnd.current.lerp(targetEnd, 0.12);

    const s = new THREE.Vector3(...start);
    const e = currentEnd.current;
    const mid = s.clone().add(e).multiplyScalar(0.5);
    const len = s.distanceTo(e);

    // Position at midpoint
    cylRef.current.position.copy(mid);

    // Orient: rotate from Y-up to the direction vector
    const dir = new THREE.Vector3().subVectors(e, s).normalize();
    const quat = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0), dir
    );
    cylRef.current.quaternion.copy(quat);
    cylRef.current.scale.set(1, len, 1);

    // Joint sphere at the end
    if (jointRef.current) {
      jointRef.current.position.copy(e);
    }
  });

  return (
    <>
      <mesh ref={cylRef}>
        <cylinderGeometry args={[radius, radius, 1, 10]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      <mesh ref={jointRef}>
        <sphereGeometry args={[radius * 1.1, 8, 8]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
    </>
  );
}

function FingerBone({ parentPos, angle, length, width, extended, dir }: {
  parentPos: THREE.Vector3;
  angle: number;
  length: number;
  width: number;
  extended: boolean;
  dir: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const targetRot = extended ? angle : angle * 0.2 + Math.PI * 0.35;

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, targetRot, 0.15);
  });

  return (
    <group ref={ref} rotation={[0, 0, 0]}>
      <mesh position={[0, length / 2, 0]}>
        <capsuleGeometry args={[width, length * 0.6, 6, 8]} />
        <meshStandardMaterial color="#d4a574" roughness={0.6} />
      </mesh>
      {/* Fingertip segment */}
      <group position={[0, length * 0.8, 0]} rotation={[0, 0, extended ? 0 : 0.4]}>
        <mesh position={[0, length * 0.3, 0]}>
          <capsuleGeometry args={[width * 0.8, length * 0.35, 6, 8]} />
          <meshStandardMaterial color="#d4a574" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}

function Hand3D({ position, fingers, rotation, mirror }: {
  position: [number, number, number];
  fingers: number[];
  rotation: number;
  mirror: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const targetPos = useMemo(() => new THREE.Vector3(...position), [position]);
  const rot = (mirror ? -rotation : rotation) * Math.PI / 180;
  const dir = mirror ? -1 : 1;

  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.lerp(targetPos, 0.12);
    ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, rot, 0.12);
  });

  const ext = fingers.map(f => f === 1);

  return (
    <group ref={ref} position={position}>
      {/* Palm — rounded */}
      <mesh>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial color="#d4a574" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.04, 0]}>
        <sphereGeometry args={[0.065, 12, 10]} />
        <meshStandardMaterial color="#d4a574" roughness={0.6} />
      </mesh>

      {/* Thumb */}
      <group position={[dir * 0.07, 0, 0.01]} rotation={[0, 0, dir * -1]}>
        <FingerBone parentPos={new THREE.Vector3()} angle={dir * -0.5} length={0.1} width={0.022} extended={ext[0]} dir={dir} />
      </group>
      {/* Index */}
      <group position={[dir * 0.04, 0.09, 0]} rotation={[0, 0, dir * -0.15]}>
        <FingerBone parentPos={new THREE.Vector3()} angle={0} length={0.12} width={0.018} extended={ext[1]} dir={dir} />
      </group>
      {/* Middle */}
      <group position={[dir * 0.013, 0.095, 0]} rotation={[0, 0, 0]}>
        <FingerBone parentPos={new THREE.Vector3()} angle={0} length={0.13} width={0.018} extended={ext[2]} dir={dir} />
      </group>
      {/* Ring */}
      <group position={[dir * -0.015, 0.09, 0]} rotation={[0, 0, dir * 0.12]}>
        <FingerBone parentPos={new THREE.Vector3()} angle={0} length={0.11} width={0.017} extended={ext[3]} dir={dir} />
      </group>
      {/* Pinky */}
      <group position={[dir * -0.04, 0.08, 0]} rotation={[0, 0, dir * 0.25]}>
        <FingerBone parentPos={new THREE.Vector3()} angle={0} length={0.09} width={0.015} extended={ext[4]} dir={dir} />
      </group>
    </group>
  );
}

function Avatar({ currentSign }: SignAvatarProps) {
  const bodyRef = useRef<THREE.Group>(null);
  const motionRef = useRef(0);

  useFrame(({ clock }) => {
    if (currentSign.type !== "idle") {
      motionRef.current = Math.sin(clock.elapsedTime * 3.5) * 0.025;
    } else {
      motionRef.current *= 0.9;
    }
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(clock.elapsedTime * 1.2) * 0.008;
    }
  });

  const getPositions = () => {
    const mo = motionRef.current;
    const rShoulder: [number, number, number] = [0.22, 0.45, 0.05];
    const lShoulder: [number, number, number] = [-0.22, 0.45, 0.05];

    if (currentSign.type === "idle") {
      return {
        rElbow: [0.3, 0.15, 0.12] as [number, number, number],
        rHand: [0.25, -0.1, 0.18] as [number, number, number],
        lElbow: [-0.3, 0.15, 0.12] as [number, number, number],
        lHand: [-0.25, -0.1, 0.18] as [number, number, number],
        rFingers: [0, 0, 0, 0, 0] as number[],
        lFingers: [0, 0, 0, 0, 0] as number[],
        rotation: 0, rShoulder, lShoulder,
      };
    }

    // Map dictionary coords to 3D space
    // armX: -0.5..0.5 → x: -0.4..0.4 (wide range)
    // armY: 0..1 → y: -0.15..0.85 (bottom of torso to top of head)
    const mapX = (v: number) => v * 0.8;
    const mapY = (v: number) => v * 1.0 - 0.15;

    if (currentSign.type === "fingerspell" && currentSign.pose) {
      const p = currentSign.pose;
      const hx = mapX(p.armX);
      const hy = mapY(p.armY);
      const elbowX = (hx + 0.22) / 2;
      const elbowY = (hy + 0.45) / 2;
      return {
        rElbow: [elbowX, elbowY, 0.15] as [number, number, number],
        rHand: [hx + mo, hy + mo * 0.5, 0.25] as [number, number, number],
        lElbow: [-0.3, 0.15, 0.12] as [number, number, number],
        lHand: [-0.25, -0.1, 0.18] as [number, number, number],
        rFingers: [p.thumb, p.index, p.middle, p.ring, p.pinky],
        lFingers: [0, 0, 0, 0, 0] as number[],
        rotation: p.rotation, rShoulder, lShoulder,
      };
    }

    if (currentSign.type === "word" && currentSign.wordSign) {
      const ws = currentSign.wordSign;
      const rx = mapX(ws.rightArmX);
      const ry = mapY(ws.rightArmY);
      const lx = mapX(ws.leftArmX);
      const ly = mapY(ws.leftArmY);
      return {
        rElbow: [(rx + 0.22) / 2, (ry + 0.45) / 2, 0.15] as [number, number, number],
        rHand: [rx + mo, ry + mo * 0.5, 0.25] as [number, number, number],
        lElbow: [(lx - 0.22) / 2, (ly + 0.45) / 2, 0.15] as [number, number, number],
        lHand: [lx - mo, ly + mo * 0.5, 0.25] as [number, number, number],
        rFingers: ws.rightFingers,
        lFingers: ws.leftFingers,
        rotation: ws.rotation, rShoulder, lShoulder,
      };
    }

    return {
      rElbow: [0.3, 0.15, 0.12] as [number, number, number],
      rHand: [0.25, -0.1, 0.18] as [number, number, number],
      lElbow: [-0.3, 0.15, 0.12] as [number, number, number],
      lHand: [-0.25, -0.1, 0.18] as [number, number, number],
      rFingers: [0, 0, 0, 0, 0] as number[],
      lFingers: [0, 0, 0, 0, 0] as number[],
      rotation: 0,
      rShoulder: [0.22, 0.45, 0.05] as [number, number, number],
      lShoulder: [-0.22, 0.45, 0.05] as [number, number, number],
    };
  };

  const pos = getPositions();

  return (
    <group ref={bodyRef}>
      {/* === BODY === */}
      {/* Torso */}
      <mesh position={[0, 0.1, 0]}>
        <capsuleGeometry args={[0.18, 0.45, 12, 16]} />
        <meshStandardMaterial color="#2563eb" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* Shoulders */}
      <mesh position={[0, 0.42, 0.02]}>
        <capsuleGeometry args={[0.08, 0.32, 8, 8]} />
        <meshStandardMaterial color="#2563eb" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* === NECK === */}
      <mesh position={[0, 0.53, 0]}>
        <cylinderGeometry args={[0.05, 0.06, 0.1, 12]} />
        <meshStandardMaterial color="#d4a574" roughness={0.6} />
      </mesh>

      {/* === HEAD === */}
      <mesh position={[0, 0.73, 0]}>
        <sphereGeometry args={[0.16, 20, 20]} />
        <meshStandardMaterial color="#d4a574" roughness={0.6} />
      </mesh>
      {/* Jaw */}
      <mesh position={[0, 0.65, 0.05]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color="#d4a574" roughness={0.6} />
      </mesh>

      {/* Hair top */}
      <mesh position={[0, 0.82, -0.01]}>
        <sphereGeometry args={[0.155, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshStandardMaterial color="#2a1a0e" roughness={0.9} />
      </mesh>
      {/* Hair sides */}
      <mesh position={[-0.14, 0.74, -0.03]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#2a1a0e" roughness={0.9} />
      </mesh>
      <mesh position={[0.14, 0.74, -0.03]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#2a1a0e" roughness={0.9} />
      </mesh>

      {/* Eyes — whites */}
      <mesh position={[-0.05, 0.74, 0.14]}>
        <sphereGeometry args={[0.028, 10, 10]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0.05, 0.74, 0.14]}>
        <sphereGeometry args={[0.028, 10, 10]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {/* Pupils */}
      <mesh position={[-0.05, 0.74, 0.165]}>
        <sphereGeometry args={[0.016, 8, 8]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      <mesh position={[0.05, 0.74, 0.165]}>
        <sphereGeometry args={[0.016, 8, 8]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>

      {/* Eyebrows */}
      <mesh position={[-0.05, 0.785, 0.13]} rotation={[0, 0, 0.12]}>
        <boxGeometry args={[0.045, 0.01, 0.012]} />
        <meshStandardMaterial color="#2a1a0e" />
      </mesh>
      <mesh position={[0.05, 0.785, 0.13]} rotation={[0, 0, -0.12]}>
        <boxGeometry args={[0.045, 0.01, 0.012]} />
        <meshStandardMaterial color="#2a1a0e" />
      </mesh>

      {/* Nose */}
      <mesh position={[0, 0.7, 0.15]}>
        <sphereGeometry args={[0.018, 8, 8]} />
        <meshStandardMaterial color="#c4956a" roughness={0.7} />
      </mesh>

      {/* Mouth */}
      <mesh position={[0, 0.645, 0.14]} scale={currentSign.type !== "idle" ? [1.2, 1.4, 1] : [1, 0.6, 1]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#a06050" />
      </mesh>

      {/* Ears */}
      <mesh position={[-0.155, 0.72, 0]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#c4956a" roughness={0.7} />
      </mesh>
      <mesh position={[0.155, 0.72, 0]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#c4956a" roughness={0.7} />
      </mesh>

      {/* === ARMS === */}
      {/* Shoulder joints */}
      <mesh position={pos.lShoulder}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#2563eb" roughness={0.5} />
      </mesh>
      <mesh position={pos.rShoulder}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#2563eb" roughness={0.5} />
      </mesh>

      {/* Left arm */}
      <LimbSegment start={pos.lShoulder} end={pos.lElbow} radius={0.05} color="#2563eb" />
      <LimbSegment start={pos.lElbow} end={pos.lHand} radius={0.038} color="#d4a574" />
      <Hand3D position={pos.lHand} fingers={pos.lFingers} rotation={pos.rotation} mirror={true} />

      {/* Right arm */}
      <LimbSegment start={pos.rShoulder} end={pos.rElbow} radius={0.05} color="#2563eb" />
      <LimbSegment start={pos.rElbow} end={pos.rHand} radius={0.038} color="#d4a574" />
      <Hand3D position={pos.rHand} fingers={pos.rFingers} rotation={pos.rotation} mirror={false} />
    </group>
  );
}

export default function SignAvatar3D({ currentSign }: SignAvatarProps) {
  return (
    <div className="relative w-full max-w-[350px] mx-auto" style={{ height: "400px" }}>
      <Canvas
        camera={{ position: [0, 0.5, 2.5], fov: 30 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 3]} intensity={1.2} />
        <directionalLight position={[-2, 3, 4]} intensity={0.6} />
        <pointLight position={[0, 1.5, 2.5]} intensity={0.4} />

        <Avatar currentSign={currentSign} />
      </Canvas>

      {/* Sign label */}
      {currentSign.type !== "idle" && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 sign-enter">
          <div className="bg-blue-600/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium text-white shadow-lg">
            {currentSign.type === "fingerspell" ? (
              <span className="tracking-widest">{currentSign.label}</span>
            ) : (
              <span>{currentSign.gloss || currentSign.label}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
