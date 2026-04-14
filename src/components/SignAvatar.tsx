"use client";

import { useEffect, useState } from "react";
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

export default function SignAvatar({ currentSign }: SignAvatarProps) {
  const [animPhase, setAnimPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimPhase(p => (p + 1) % 60);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Scale factors — make movements much more visible
  const SCALE_X = 180;
  const SCALE_Y = 280;
  const CENTER_X = 200;
  const BASE_Y = 320; // lower base so hands can reach head

  const getArmPositions = () => {
    if (currentSign.type === "idle") {
      const breathOffset = Math.sin(animPhase * 0.1) * 2;
      return {
        rightShoulderX: 230, rightShoulderY: 195,
        rightElbowX: 265, rightElbowY: 250 + breathOffset,
        rightHandX: 255, rightHandY: 310 + breathOffset,
        leftShoulderX: 170, leftShoulderY: 195,
        leftElbowX: 135, leftElbowY: 250 + breathOffset,
        leftHandX: 145, leftHandY: 310 + breathOffset,
        rightFingers: [0, 0, 0, 0, 0] as number[],
        leftFingers: [0, 0, 0, 0, 0] as number[],
        rotation: 0,
      };
    }

    if (currentSign.type === "fingerspell" && currentSign.pose) {
      const pose = currentSign.pose;
      const handX = CENTER_X + pose.armX * SCALE_X;
      const handY = BASE_Y - pose.armY * SCALE_Y;
      const elbowX = 230 + (handX - 230) * 0.45;
      const elbowY = 195 + (handY - 195) * 0.5;
      return {
        rightShoulderX: 230, rightShoulderY: 195,
        rightElbowX: elbowX, rightElbowY: elbowY,
        rightHandX: handX, rightHandY: handY,
        leftShoulderX: 170, leftShoulderY: 195,
        leftElbowX: 135, leftElbowY: 250,
        leftHandX: 145, leftHandY: 310,
        rightFingers: [pose.thumb, pose.index, pose.middle, pose.ring, pose.pinky],
        leftFingers: [0, 0, 0, 0, 0] as number[],
        rotation: pose.rotation,
      };
    }

    if (currentSign.type === "word" && currentSign.wordSign) {
      const ws = currentSign.wordSign;
      const rHandX = CENTER_X + ws.rightArmX * SCALE_X;
      const rHandY = BASE_Y - ws.rightArmY * SCALE_Y;
      const lHandX = CENTER_X + ws.leftArmX * SCALE_X;
      const lHandY = BASE_Y - ws.leftArmY * SCALE_Y;
      return {
        rightShoulderX: 230, rightShoulderY: 195,
        rightElbowX: 230 + (rHandX - 230) * 0.45, rightElbowY: 195 + (rHandY - 195) * 0.5,
        rightHandX: rHandX, rightHandY: rHandY,
        leftShoulderX: 170, leftShoulderY: 195,
        leftElbowX: 170 + (lHandX - 170) * 0.45, leftElbowY: 195 + (lHandY - 195) * 0.5,
        leftHandX: lHandX, leftHandY: lHandY,
        rightFingers: ws.rightFingers,
        leftFingers: ws.leftFingers,
        rotation: ws.rotation,
      };
    }

    return {
      rightShoulderX: 230, rightShoulderY: 195,
      rightElbowX: 265, rightElbowY: 250,
      rightHandX: 255, rightHandY: 310,
      leftShoulderX: 170, leftShoulderY: 195,
      leftElbowX: 135, leftElbowY: 250,
      leftHandX: 145, leftHandY: 310,
      rightFingers: [0, 0, 0, 0, 0] as number[],
      leftFingers: [0, 0, 0, 0, 0] as number[],
      rotation: 0,
    };
  };

  const pos = getArmPositions();

  const renderHand = (x: number, y: number, fingers: number[], rotation: number, mirror: boolean) => {
    const dir = mirror ? -1 : 1;
    const extended = fingers.filter(f => f === 1).length;
    const rot = mirror ? -rotation : rotation;

    if (extended === 0) {
      return (
        <g transform={`rotate(${rot}, ${x}, ${y})`}>
          <circle cx={x} cy={y} r={14} fill="#d4b896" stroke="#b89870" strokeWidth={1.5} />
          {/* Knuckle lines for fist */}
          <line x1={x - 6} y1={y - 2} x2={x - 6} y2={y + 2} stroke="#b89870" strokeWidth={1} />
          <line x1={x - 1} y1={y - 3} x2={x - 1} y2={y + 3} stroke="#b89870" strokeWidth={1} />
          <line x1={x + 4} y1={y - 2} x2={x + 4} y2={y + 2} stroke="#b89870" strokeWidth={1} />
        </g>
      );
    }

    // Finger start angles spread wider, thumb separate
    const fingerData = [
      { spread: -60, len: 16 },  // thumb — more angled out
      { spread: -25, len: 22 },  // index
      { spread: -5, len: 24 },   // middle (longest)
      { spread: 15, len: 21 },   // ring
      { spread: 35, len: 18 },   // pinky (shortest)
    ];

    return (
      <g transform={`rotate(${rot}, ${x}, ${y})`}>
        {/* Palm */}
        <ellipse cx={x} cy={y} rx={12} ry={14} fill="#d4b896" stroke="#b89870" strokeWidth={1.5} />
        {/* Fingers */}
        {fingers.map((f, i) => {
          if (f === 0) return null;
          const angle = (fingerData[i].spread * dir * Math.PI) / 180 - Math.PI / 2;
          const len = fingerData[i].len;
          const endX = x + Math.cos(angle) * len;
          const endY = y + Math.sin(angle) * len;
          // Two-segment finger for more realism
          const midX = x + Math.cos(angle) * (len * 0.55);
          const midY = y + Math.sin(angle) * (len * 0.55);
          return (
            <g key={i}>
              <line x1={x} y1={y} x2={midX} y2={midY}
                stroke="#d4b896" strokeWidth={i === 0 ? 4 : 3.5} strokeLinecap="round" />
              <line x1={midX} y1={midY} x2={endX} y2={endY}
                stroke="#d4b896" strokeWidth={i === 0 ? 3 : 2.5} strokeLinecap="round" />
              {/* Fingertip */}
              <circle cx={endX} cy={endY} r={i === 0 ? 2 : 1.8} fill="#dcc4a8" />
            </g>
          );
        })}
      </g>
    );
  };

  const transition = "all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)";

  return (
    <div className="relative w-full max-w-[320px] mx-auto">
      <svg viewBox="0 0 400 450" className="w-full h-auto">
        <defs>
          <radialGradient id="bodyGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="rgba(59,130,246,0.08)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="shirtGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>

        <ellipse cx="200" cy="220" rx="170" ry="200" fill="url(#bodyGlow)" />

        {/* Body / Torso */}
        <path
          d="M 155 210 Q 140 380 200 390 Q 260 380 245 210"
          fill="url(#shirtGrad)"
          stroke="#1e40af"
          strokeWidth={1}
        />

        {/* Neck */}
        <rect x="188" y="165" width="24" height="32" rx="6" fill="#d4b896" />

        {/* Head */}
        <ellipse cx="200" cy="135" rx="44" ry="50" fill="#d4b896" stroke="#b89870" strokeWidth={1} />

        {/* Hair */}
        <ellipse cx="200" cy="100" rx="46" ry="28" fill="#3a2a1a" />
        <ellipse cx="160" cy="118" rx="14" ry="22" fill="#3a2a1a" />
        <ellipse cx="240" cy="118" rx="14" ry="22" fill="#3a2a1a" />

        {/* Eyes */}
        <ellipse cx="183" cy="132" rx="5" ry="4.5" fill="#2a2a2a" />
        <ellipse cx="217" cy="132" rx="5" ry="4.5" fill="#2a2a2a" />
        {/* Eye highlights */}
        <circle cx="185" cy="131" r="1.5" fill="white" opacity={0.6} />
        <circle cx="219" cy="131" r="1.5" fill="white" opacity={0.6} />

        {/* Eyebrows — react to sign type */}
        <line x1="175" y1={currentSign.type === "idle" ? 122 : 120} x2="191" y2={currentSign.type === "idle" ? 121 : 118}
          stroke="#3a2a1a" strokeWidth={2} strokeLinecap="round"
          style={{ transition }} />
        <line x1="209" y1={currentSign.type === "idle" ? 121 : 118} x2="225" y2={currentSign.type === "idle" ? 122 : 120}
          stroke="#3a2a1a" strokeWidth={2} strokeLinecap="round"
          style={{ transition }} />

        {/* Mouth */}
        {currentSign.type === "idle" ? (
          <path d="M 190 150 Q 200 156 210 150" fill="none" stroke="#9a7a6a" strokeWidth={1.5} strokeLinecap="round" />
        ) : (
          <ellipse cx="200" cy="152" rx="8" ry="5" fill="#9a7a6a" opacity={0.7} />
        )}

        {/* Right arm — upper (shirt) */}
        <line
          x1={pos.rightShoulderX} y1={pos.rightShoulderY}
          x2={pos.rightElbowX} y2={pos.rightElbowY}
          stroke="#2563eb" strokeWidth={16} strokeLinecap="round"
          style={{ transition }}
        />
        {/* Right arm — forearm (skin) */}
        <line
          x1={pos.rightElbowX} y1={pos.rightElbowY}
          x2={pos.rightHandX} y2={pos.rightHandY}
          stroke="#d4b896" strokeWidth={11} strokeLinecap="round"
          style={{ transition }}
        />

        {/* Left arm — upper (shirt) */}
        <line
          x1={pos.leftShoulderX} y1={pos.leftShoulderY}
          x2={pos.leftElbowX} y2={pos.leftElbowY}
          stroke="#2563eb" strokeWidth={16} strokeLinecap="round"
          style={{ transition }}
        />
        {/* Left arm — forearm (skin) */}
        <line
          x1={pos.leftElbowX} y1={pos.leftElbowY}
          x2={pos.leftHandX} y2={pos.leftHandY}
          stroke="#d4b896" strokeWidth={11} strokeLinecap="round"
          style={{ transition }}
        />

        {/* Hands */}
        <g style={{ transition }}>
          {renderHand(pos.rightHandX, pos.rightHandY, pos.rightFingers, pos.rotation, false)}
        </g>
        <g style={{ transition }}>
          {renderHand(pos.leftHandX, pos.leftHandY, pos.leftFingers, pos.rotation, true)}
        </g>
      </svg>

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
