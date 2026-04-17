"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
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

// Skin material
const skinMat = new THREE.MeshStandardMaterial({ color: "#d4a574", roughness: 0.7, metalness: 0.05 });
const shirtMat = new THREE.MeshStandardMaterial({ color: "#2563eb", roughness: 0.5, metalness: 0.1 });
const hairMat = new THREE.MeshStandardMaterial({ color: "#2a1a0e", roughness: 0.9 });
const eyeMat = new THREE.MeshStandardMaterial({ color: "#1a1a2e" });
const mouthMat = new THREE.MeshStandardMaterial({ color: "#8a5a4a" });

function Finger({ length, width, extended, angle, position, rotation: rot }: {
  length: number; width: number; extended: boolean;
  angle: number; position: [number, number, number]; rotation?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const targetAngle = extended ? angle : angle * 0.3 + Math.PI * 0.4;

  useFrame(() => {
    if (!groupRef.current) return;
    const current = groupRef.current.rotation.z;
    groupRef.current.rotation.z = THREE.MathUtils.lerp(current, targetAngle, 0.12);
  });

  return (
    <group ref={groupRef} position={position} rotation={[0, 0, rot || 0]}>
      {/* Base segment */}
      <mesh position={[0, length * 0.3, 0]} material={skinMat}>
        <capsuleGeometry args={[width, length * 0.55, 8, 8]} />
      </mesh>
      {/* Tip segment */}
      <group position={[0, length * 0.55, 0]} rotation={[0, 0, extended ? 0 : 0.3]}>
        <mesh position={[0, length * 0.25, 0]} material={skinMat}>
          <capsuleGeometry args={[width * 0.85, length * 0.4, 8, 8]} />
        </mesh>
      </group>
    </group>
  );
}

function Hand({ position, fingers, rotation, mirror }: {
  position: [number, number, number];
  fingers: number[];
  rotation: number;
  mirror: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const dir = mirror ? -1 : 1;
  const targetPos = useMemo(() => new THREE.Vector3(...position), [position]);
  const targetRot = (mirror ? -rotation : rotation) * Math.PI / 180;

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.lerp(targetPos, 0.1);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRot, 0.1);
  });

  const extended = fingers.map(f => f === 1);
  const palmW = 0.12;
  const palmH = 0.14;

  return (
    <group ref={groupRef} position={position}>
      {/* Palm */}
      <mesh material={skinMat}>
        <boxGeometry args={[palmW * 2, palmH * 2, 0.06]} />
      </mesh>
      {/* Thumb */}
      <Finger length={0.18} width={0.035} extended={extended[0]}
        angle={dir * -1.2} position={[dir * 0.12, 0.02, 0]} rotation={dir * -0.3} />
      {/* Index */}
      <Finger length={0.22} width={0.028} extended={extended[1]}
        angle={dir * -0.3} position={[dir * 0.06, palmH, 0]} />
      {/* Middle */}
      <Finger length={0.24} width={0.028} extended={extended[2]}
        angle={0} position={[dir * 0.02, palmH + 0.01, 0]} />
      {/* Ring */}
      <Finger length={0.21} width={0.026} extended={extended[3]}
        angle={dir * 0.2} position={[dir * -0.03, palmH, 0]} />
      {/* Pinky */}
      <Finger length={0.17} width={0.024} extended={extended[4]}
        angle={dir * 0.45} position={[dir * -0.08, palmH - 0.02, 0]} />
    </group>
  );
}

function Arm({ shoulder, hand, isShirt }: {
  shoulder: [number, number, number];
  hand: [number, number, number];
  isShirt?: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const targetHand = useMemo(() => new THREE.Vector3(...hand), [hand]);
  const currentHand = useRef(new THREE.Vector3(...hand));

  useFrame(() => {
    if (!ref.current) return;
    currentHand.current.lerp(targetHand, 0.1);
    const s = new THREE.Vector3(...shoulder);
    const h = currentHand.current;
    const mid = new THREE.Vector3().addVectors(s, h).multiplyScalar(0.5);
    const dir = new THREE.Vector3().subVectors(h, s);
    const len = dir.length();

    ref.current.position.copy(mid);
    ref.current.scale.set(1, len / 2, 1);
    ref.current.lookAt(h);
    ref.current.rotateX(Math.PI / 2);
  });

  return (
    <mesh ref={ref} material={isShirt ? shirtMat : skinMat}>
      <capsuleGeometry args={[isShirt ? 0.08 : 0.06, 1, 8, 8]} />
    </mesh>
  );
}

function Avatar({ currentSign }: SignAvatarProps) {
  const bodyRef = useRef<THREE.Group>(null);
  const [motionOffset, setMotionOffset] = useState(0);

  // Oscillate for active signs
  useFrame(({ clock }) => {
    if (currentSign.type !== "idle") {
      setMotionOffset(Math.sin(clock.elapsedTime * 4) * 0.03);
    } else {
      setMotionOffset(0);
    }
    // Subtle breathing
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(clock.elapsedTime * 1.5) * 0.01;
    }
  });

  const getPositions = () => {
    const mo = motionOffset;
    const rShoulder: [number, number, number] = [0.25, 0.55, 0];
    const lShoulder: [number, number, number] = [-0.25, 0.55, 0];

    if (currentSign.type === "idle") {
      return {
        rElbow: [0.35, 0.2, 0.1] as [number, number, number],
        rHand: [0.3, -0.05, 0.15] as [number, number, number],
        lElbow: [-0.35, 0.2, 0.1] as [number, number, number],
        lHand: [-0.3, -0.05, 0.15] as [number, number, number],
        rFingers: [0, 0, 0, 0, 0] as number[],
        lFingers: [0, 0, 0, 0, 0] as number[],
        rotation: 0,
        rShoulder, lShoulder,
      };
    }

    if (currentSign.type === "fingerspell" && currentSign.pose) {
      const p = currentSign.pose;
      const hx = p.armX * 0.6;
      const hy = p.armY * 0.8 - 0.1;
      return {
        rElbow: [0.3, 0.35, 0.1] as [number, number, number],
        rHand: [hx + mo, hy + mo * 0.5, 0.2] as [number, number, number],
        lElbow: [-0.35, 0.2, 0.1] as [number, number, number],
        lHand: [-0.3, -0.05, 0.15] as [number, number, number],
        rFingers: [p.thumb, p.index, p.middle, p.ring, p.pinky],
        lFingers: [0, 0, 0, 0, 0] as number[],
        rotation: p.rotation,
        rShoulder, lShoulder,
      };
    }

    if (currentSign.type === "word" && currentSign.wordSign) {
      const ws = currentSign.wordSign;
      const rhx = ws.rightArmX * 0.6;
      const rhy = ws.rightArmY * 0.8 - 0.1;
      const lhx = ws.leftArmX * 0.6;
      const lhy = ws.leftArmY * 0.8 - 0.1;
      return {
        rElbow: [(rhx + 0.25) / 2, (rhy + 0.55) / 2, 0.12] as [number, number, number],
        rHand: [rhx + mo, rhy + mo * 0.5, 0.2] as [number, number, number],
        lElbow: [(lhx - 0.25) / 2, (lhy + 0.55) / 2, 0.12] as [number, number, number],
        lHand: [lhx - mo, lhy + mo * 0.5, 0.2] as [number, number, number],
        rFingers: ws.rightFingers,
        lFingers: ws.leftFingers,
        rotation: ws.rotation,
        rShoulder, lShoulder,
      };
    }

    return {
      rElbow: [0.35, 0.2, 0.1] as [number, number, number],
      rHand: [0.3, -0.05, 0.15] as [number, number, number],
      lElbow: [-0.35, 0.2, 0.1] as [number, number, number],
      lHand: [-0.3, -0.05, 0.15] as [number, number, number],
      rFingers: [0, 0, 0, 0, 0] as number[],
      lFingers: [0, 0, 0, 0, 0] as number[],
      rotation: 0,
      rShoulder: [0.25, 0.55, 0] as [number, number, number],
      lShoulder: [-0.25, 0.55, 0] as [number, number, number],
    };
  };

  const pos = getPositions();

  return (
    <group ref={bodyRef}>
      {/* Torso */}
      <mesh position={[0, 0.15, 0]} material={shirtMat}>
        <capsuleGeometry args={[0.22, 0.55, 12, 12]} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 0.58, 0]} material={skinMat}>
        <cylinderGeometry args={[0.06, 0.08, 0.12, 12]} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.78, 0]} material={skinMat}>
        <sphereGeometry args={[0.16, 16, 16]} />
      </mesh>

      {/* Hair */}
      <mesh position={[0, 0.87, -0.02]} material={hairMat}>
        <sphereGeometry args={[0.15, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.055, 0.79, 0.14]} material={eyeMat}>
        <sphereGeometry args={[0.022, 8, 8]} />
      </mesh>
      <mesh position={[0.055, 0.79, 0.14]} material={eyeMat}>
        <sphereGeometry args={[0.022, 8, 8]} />
      </mesh>

      {/* Eye whites */}
      <mesh position={[-0.055, 0.79, 0.13]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0.055, 0.79, 0.13]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Mouth */}
      <mesh position={[0, 0.71, 0.14]} material={mouthMat} scale={currentSign.type !== "idle" ? [1, 1.3, 1] : [1, 0.7, 1]}>
        <sphereGeometry args={[0.025, 8, 8]} />
      </mesh>

      {/* Right arm — upper (shirt) */}
      <Arm shoulder={pos.rShoulder} hand={pos.rElbow} isShirt />
      {/* Right arm — forearm */}
      <Arm shoulder={pos.rElbow} hand={pos.rHand} />

      {/* Left arm — upper (shirt) */}
      <Arm shoulder={pos.lShoulder} hand={pos.lElbow} isShirt />
      {/* Left arm — forearm */}
      <Arm shoulder={pos.lElbow} hand={pos.lHand} />

      {/* Hands */}
      <Hand position={pos.rHand} fingers={pos.rFingers} rotation={pos.rotation} mirror={false} />
      <Hand position={pos.lHand} fingers={pos.lFingers} rotation={pos.rotation} mirror={true} />
    </group>
  );
}

export default function SignAvatar3D({ currentSign }: SignAvatarProps) {
  return (
    <div className="relative w-full max-w-[350px] mx-auto" style={{ height: "380px" }}>
      <Canvas
        camera={{ position: [0, 0.4, 1.8], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 3, 2]} intensity={1} />
        <directionalLight position={[-1, 2, 3]} intensity={0.5} />
        <pointLight position={[0, 1, 2]} intensity={0.3} />

        <Avatar currentSign={currentSign} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI * 0.35}
          maxPolarAngle={Math.PI * 0.65}
          minAzimuthAngle={-Math.PI * 0.15}
          maxAzimuthAngle={Math.PI * 0.15}
        />
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
