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
      setAnimPhase(p => (p + 1) % 120);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const BODY_CX = 200;
  const R_SHOULDER_X = 238;
  const L_SHOULDER_X = 162;
  const SHOULDER_Y = 195;

  // Map dictionary coords to SVG space
  const mapHand = (armX: number, armY: number) => {
    const handX = BODY_CX + armX * 220;
    const handY = 380 - armY * 340;
    return { handX, handY };
  };

  // Natural elbow: goes outward and stays lower than hand when hand is raised
  const calcElbow = (shoulderX: number, handX: number, handY: number, isRight: boolean) => {
    const side = isRight ? 1 : -1;
    const dx = handX - shoulderX;
    const dy = handY - SHOULDER_Y;
    // Elbow goes outward from body and sits between shoulder and hand height
    const elbowX = shoulderX + dx * 0.4 + side * 25;
    const elbowY = SHOULDER_Y + dy * 0.5 + 15;
    return { elbowX, elbowY };
  };

  const getPositions = () => {
    const breath = Math.sin(animPhase * 0.08) * 1.5;

    if (currentSign.type === "idle") {
      return {
        rElbowX: 272, rElbowY: 260 + breath,
        rHandX: 260, rHandY: 340 + breath,
        lElbowX: 128, lElbowY: 260 + breath,
        lHandX: 140, lHandY: 340 + breath,
        rFingers: [0,0,0,0,0] as number[],
        lFingers: [0,0,0,0,0] as number[],
        rotation: 0,
      };
    }

    if (currentSign.type === "fingerspell" && currentSign.pose) {
      const p = currentSign.pose;
      const { handX, handY } = mapHand(p.armX, p.armY);
      const elbow = calcElbow(R_SHOULDER_X, handX, handY, true);
      return {
        rElbowX: elbow.elbowX, rElbowY: elbow.elbowY,
        rHandX: handX, rHandY: handY,
        lElbowX: 128, lElbowY: 260,
        lHandX: 140, lHandY: 340,
        rFingers: [p.thumb, p.index, p.middle, p.ring, p.pinky],
        lFingers: [0,0,0,0,0] as number[],
        rotation: p.rotation,
      };
    }

    if (currentSign.type === "word" && currentSign.wordSign) {
      const ws = currentSign.wordSign;
      const r = mapHand(ws.rightArmX, ws.rightArmY);
      const l = mapHand(ws.leftArmX, ws.leftArmY);
      const rElbow = calcElbow(R_SHOULDER_X, r.handX, r.handY, true);
      const lElbow = calcElbow(L_SHOULDER_X, l.handX, l.handY, false);
      return {
        rElbowX: rElbow.elbowX, rElbowY: rElbow.elbowY,
        rHandX: r.handX, rHandY: r.handY,
        lElbowX: lElbow.elbowX, lElbowY: lElbow.elbowY,
        lHandX: l.handX, lHandY: l.handY,
        rFingers: ws.rightFingers,
        lFingers: ws.leftFingers,
        rotation: ws.rotation,
      };
    }

    return {
      rElbowX: 272, rElbowY: 260,
      rHandX: 260, rHandY: 340,
      lElbowX: 128, lElbowY: 260,
      lHandX: 140, lHandY: 340,
      rFingers: [0,0,0,0,0] as number[],
      lFingers: [0,0,0,0,0] as number[],
      rotation: 0,
    };
  };

  const pos = getPositions();

  // Pre-drawn hand SVG shapes — looks like real hands, not sticks
  const renderHand = (x: number, y: number, fingers: number[], rotation: number, mirror: boolean) => {
    const rot = mirror ? -rotation : rotation;
    const sx = mirror ? -1 : 1;
    const key = fingers.join("");
    const s = 1.1; // scale

    // Pick hand shape based on finger pattern
    // Each path is drawn at origin (0,0), centered on wrist, pointing up
    const getHandPath = (): string => {
      switch (key) {
        case "00000": // Fist
          return `M${-12*sx},8 C${-14*sx},-2 ${-10*sx},-14 ${-4*sx},-16 C${2*sx},-18 ${10*sx},-14 ${14*sx},-6 C${16*sx},0 ${14*sx},10 ${10*sx},14 C${4*sx},18 ${-6*sx},18 ${-12*sx},8 Z`;
        case "11111": // Open palm — all fingers spread
          return `M${-4*sx},-2 L${-12*sx},-38 L${-8*sx},-38 L${-3*sx},-14 L${-5*sx},-42 L${-1*sx},-42 L${1*sx},-14 L${1*sx},-44 L${5*sx},-44 L${5*sx},-14 L${6*sx},-40 L${10*sx},-40 L${8*sx},-12 L${12*sx},-32 L${15*sx},-30 L${10*sx},-6 C${14*sx},2 ${14*sx},12 ${8*sx},16 C${2*sx},20 ${-6*sx},18 ${-12*sx},10 C${-14*sx},4 ${-10*sx},-2 ${-4*sx},-2 Z`;
        case "01000": // Index finger pointing
          return `M${-4*sx},-2 C${-6*sx},-4 ${-4*sx},-10 ${-2*sx},-14 L${-1*sx},-44 L${3*sx},-44 L${3*sx},-14 C${6*sx},-10 ${10*sx},-8 ${12*sx},-2 C${14*sx},4 ${12*sx},12 ${8*sx},16 C${2*sx},20 ${-6*sx},18 ${-12*sx},10 C${-14*sx},4 ${-10*sx},-2 ${-4*sx},-2 Z`;
        case "01100": // V sign — two fingers
          return `M${-4*sx},-2 C${-6*sx},-4 ${-4*sx},-10 ${-3*sx},-14 L${-5*sx},-44 L${-1*sx},-44 L${0*sx},-14 L${3*sx},-44 L${7*sx},-44 L${5*sx},-14 C${8*sx},-8 ${12*sx},-4 ${12*sx},2 C${14*sx},8 ${12*sx},14 ${8*sx},16 C${2*sx},20 ${-6*sx},18 ${-12*sx},10 C${-14*sx},4 ${-10*sx},-2 ${-4*sx},-2 Z`;
        case "01110": // Three fingers
          return `M${-4*sx},-2 L${-5*sx},-42 L${-1*sx},-42 L${-1*sx},-14 L${1*sx},-44 L${5*sx},-44 L${4*sx},-14 L${7*sx},-40 L${11*sx},-40 L${7*sx},-10 C${12*sx},-4 ${14*sx},4 ${10*sx},14 C${6*sx},18 ${-4*sx},18 ${-12*sx},10 C${-14*sx},4 ${-10*sx},-2 ${-4*sx},-2 Z`;
        case "01111": // Four fingers
          return `M${-4*sx},-2 L${-6*sx},-38 L${-2*sx},-38 L${-2*sx},-14 L${-1*sx},-42 L${3*sx},-42 L${3*sx},-14 L${5*sx},-40 L${9*sx},-40 L${7*sx},-12 L${10*sx},-34 L${13*sx},-33 L${10*sx},-6 C${14*sx},2 ${12*sx},12 ${8*sx},16 C${2*sx},20 ${-6*sx},18 ${-12*sx},10 C${-14*sx},4 ${-10*sx},-2 ${-4*sx},-2 Z`;
        case "10000": // Thumb up
          return `M${-4*sx},-2 L${-14*sx},-28 L${-10*sx},-30 L${-4*sx},-10 C${0*sx},-14 ${6*sx},-12 ${10*sx},-8 C${14*sx},-2 ${14*sx},8 ${10*sx},14 C${4*sx},18 ${-6*sx},18 ${-12*sx},10 C${-14*sx},4 ${-10*sx},-2 ${-4*sx},-2 Z`;
        case "10001": // Y shape — phone
          return `M${-4*sx},-2 L${-14*sx},-30 L${-10*sx},-32 L${-4*sx},-10 C${0*sx},-14 ${4*sx},-12 ${6*sx},-8 L${10*sx},-34 L${14*sx},-32 L${10*sx},-4 C${14*sx},4 ${12*sx},12 ${8*sx},16 C${2*sx},20 ${-6*sx},18 ${-12*sx},10 C${-14*sx},4 ${-10*sx},-2 ${-4*sx},-2 Z`;
        case "11000": // Thumb + index
          return `M${-4*sx},-2 L${-14*sx},-26 L${-10*sx},-28 L${-4*sx},-10 L${-1*sx},-44 L${3*sx},-44 L${3*sx},-12 C${8*sx},-8 ${12*sx},-2 ${12*sx},6 C${12*sx},12 ${8*sx},16 C${2*sx},20 ${-6*sx},18 ${-12*sx},10 C${-14*sx},4 ${-10*sx},-2 ${-4*sx},-2 Z`;
        case "11100": // Thumb + index + middle
          return `M${-4*sx},-2 L${-14*sx},-26 L${-10*sx},-28 L${-4*sx},-10 L${-3*sx},-42 L${1*sx},-42 L${1*sx},-14 L${3*sx},-44 L${7*sx},-44 L${5*sx},-12 C${10*sx},-6 ${14*sx},2 ${10*sx},14 C${6*sx},18 ${-4*sx},18 ${-12*sx},10 C${-14*sx},4 ${-10*sx},-2 ${-4*sx},-2 Z`;
        case "00100": // Middle finger only (rare but possible)
          return `M${-4*sx},-2 C${-6*sx},-6 ${-2*sx},-12 ${0*sx},-14 L${1*sx},-44 L${5*sx},-44 L${4*sx},-14 C${8*sx},-10 ${12*sx},-4 ${12*sx},4 C${12*sx},12 ${8*sx},16 C${2*sx},20 ${-6*sx},18 ${-12*sx},10 C${-14*sx},4 ${-10*sx},-2 ${-4*sx},-2 Z`;
        default: // Fallback — use open palm for any other combo
          return `M${-4*sx},-2 L${-12*sx},-38 L${-8*sx},-38 L${-3*sx},-14 L${-5*sx},-42 L${-1*sx},-42 L${1*sx},-14 L${1*sx},-44 L${5*sx},-44 L${5*sx},-14 L${6*sx},-40 L${10*sx},-40 L${8*sx},-12 L${12*sx},-32 L${15*sx},-30 L${10*sx},-6 C${14*sx},2 ${14*sx},12 ${8*sx},16 C${2*sx},20 ${-6*sx},18 ${-12*sx},10 C${-14*sx},4 ${-10*sx},-2 ${-4*sx},-2 Z`;
      }
    };

    return (
      <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
        {/* Shadow */}
        <path d={getHandPath()} fill="rgba(0,0,0,0.1)" transform="translate(2,2)" />
        {/* Hand shape */}
        <path d={getHandPath()} fill="#e8c9a0" stroke="#a08060" strokeWidth={1.8} strokeLinejoin="round" />
      </g>
    );
  };

  const t = "all 0.45s cubic-bezier(0.33, 0, 0.2, 1)";

  return (
    <div className="relative w-full max-w-[300px] mx-auto">
      <svg viewBox="0 0 400 480" className="w-full h-auto">
        <defs>
          <radialGradient id="bodyGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="rgba(59,130,246,0.05)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="shirtGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>

        <ellipse cx="200" cy="230" rx="180" ry="210" fill="url(#bodyGlow)" />

        {/* Body */}
        <path d="M 155 210 Q 140 410 200 420 Q 260 410 245 210"
          fill="url(#shirtGrad)" stroke="#1e40af" strokeWidth={1} />

        {/* Neck */}
        <rect x="189" y="168" width="22" height="28" rx="5" fill="#d4b896" />

        {/* Head */}
        <ellipse cx="200" cy="135" rx="42" ry="48" fill="#d4b896" stroke="#b89870" strokeWidth={1} />

        {/* Hair */}
        <ellipse cx="200" cy="102" rx="45" ry="28" fill="#3a2a1a" />
        <ellipse cx="160" cy="118" rx="14" ry="22" fill="#3a2a1a" />
        <ellipse cx="240" cy="118" rx="14" ry="22" fill="#3a2a1a" />

        {/* Eyes */}
        <ellipse cx="184" cy="133" rx="4.5" ry={currentSign.type !== "idle" ? 5 : 3.5} fill="#2a2a2a"
          style={{ transition: "ry 0.3s" }} />
        <ellipse cx="216" cy="133" rx="4.5" ry={currentSign.type !== "idle" ? 5 : 3.5} fill="#2a2a2a"
          style={{ transition: "ry 0.3s" }} />
        <circle cx="186" cy="132" r="1.3" fill="white" opacity={0.4} />
        <circle cx="218" cy="132" r="1.3" fill="white" opacity={0.4} />

        {/* Eyebrows */}
        <line x1="176" y1={currentSign.type === "idle" ? 124 : 121} x2="192" y2={currentSign.type === "idle" ? 123 : 119}
          stroke="#3a2a1a" strokeWidth={2.5} strokeLinecap="round" style={{ transition: t }} />
        <line x1="208" y1={currentSign.type === "idle" ? 123 : 119} x2="224" y2={currentSign.type === "idle" ? 124 : 121}
          stroke="#3a2a1a" strokeWidth={2.5} strokeLinecap="round" style={{ transition: t }} />

        {/* Mouth */}
        {currentSign.type === "idle" ? (
          <path d="M 191 150 Q 200 155 209 150" fill="none" stroke="#9a7a6a" strokeWidth={1.5} strokeLinecap="round" />
        ) : (
          <ellipse cx="200" cy="151" rx="6" ry="4" fill="#9a7a6a" opacity={0.6} />
        )}

        {/* LEFT ARM */}
        <line x1={L_SHOULDER_X} y1={SHOULDER_Y} x2={pos.lElbowX} y2={pos.lElbowY}
          stroke="#1d4ed8" strokeWidth={16} strokeLinecap="round" style={{ transition: t }} />
        <line x1={pos.lElbowX} y1={pos.lElbowY} x2={pos.lHandX} y2={pos.lHandY}
          stroke="#d4b896" strokeWidth={12} strokeLinecap="round" style={{ transition: t }} />
        {/* Elbow joint */}
        <circle cx={pos.lElbowX} cy={pos.lElbowY} r={7} fill="#c4a882"
          style={{ transition: t }} />
        {/* Left hand */}
        <g style={{ transition: t }}>
          {renderHand(pos.lHandX, pos.lHandY, pos.lFingers, pos.rotation, true)}
        </g>

        {/* RIGHT ARM */}
        <line x1={R_SHOULDER_X} y1={SHOULDER_Y} x2={pos.rElbowX} y2={pos.rElbowY}
          stroke="#2563eb" strokeWidth={16} strokeLinecap="round" style={{ transition: t }} />
        <line x1={pos.rElbowX} y1={pos.rElbowY} x2={pos.rHandX} y2={pos.rHandY}
          stroke="#d4b896" strokeWidth={12} strokeLinecap="round" style={{ transition: t }} />
        {/* Elbow joint */}
        <circle cx={pos.rElbowX} cy={pos.rElbowY} r={7} fill="#c4a882"
          style={{ transition: t }} />
        {/* Right hand */}
        <g style={{ transition: t }}>
          {renderHand(pos.rHandX, pos.rHandY, pos.rFingers, pos.rotation, false)}
        </g>
      </svg>

      {/* Sign label */}
      {currentSign.type !== "idle" && (
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 sign-enter">
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
