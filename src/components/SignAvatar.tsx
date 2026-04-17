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

  const renderHand = (x: number, y: number, fingers: number[], rotation: number, mirror: boolean) => {
    const dir = mirror ? -1 : 1;
    const extended = fingers.filter(f => f === 1).length;
    const rot = mirror ? -rotation : rotation;

    if (extended === 0) {
      return (
        <g transform={`rotate(${rot}, ${x}, ${y})`}>
          <circle cx={x} cy={y} r={16} fill="#d4b896" stroke="#b89870" strokeWidth={1.5} />
          <line x1={x - 6} y1={y - 2} x2={x - 6} y2={y + 2} stroke="#c4a070" strokeWidth={1.2} strokeLinecap="round" />
          <line x1={x} y1={y - 3} x2={x} y2={y + 3} stroke="#c4a070" strokeWidth={1.2} strokeLinecap="round" />
          <line x1={x + 6} y1={y - 2} x2={x + 6} y2={y + 2} stroke="#c4a070" strokeWidth={1.2} strokeLinecap="round" />
        </g>
      );
    }

    const fingerData = [
      { spread: -60, len: 20, width: 5 },   // thumb
      { spread: -25, len: 30, width: 4.5 },  // index
      { spread: -5, len: 32, width: 4.5 },   // middle
      { spread: 15, len: 28, width: 4 },     // ring
      { spread: 33, len: 22, width: 3.5 },   // pinky
    ];

    return (
      <g transform={`rotate(${rot}, ${x}, ${y})`}>
        <ellipse cx={x} cy={y} rx={14} ry={16} fill="#d4b896" stroke="#b89870" strokeWidth={1.5} />
        {fingers.map((f, i) => {
          const angle = (fingerData[i].spread * dir * Math.PI) / 180 - Math.PI / 2;
          if (f === 0) {
            // Curled finger stub
            return (
              <line key={i}
                x1={x + Math.cos(angle) * 8} y1={y + Math.sin(angle) * 8}
                x2={x + Math.cos(angle) * 14} y2={y + Math.sin(angle) * 14}
                stroke="#c4a882" strokeWidth={fingerData[i].width - 1.5} strokeLinecap="round" opacity={0.35}
              />
            );
          }
          const len = fingerData[i].len;
          const w = fingerData[i].width;
          const midX = x + Math.cos(angle) * (len * 0.5);
          const midY = y + Math.sin(angle) * (len * 0.5);
          const endX = x + Math.cos(angle) * len;
          const endY = y + Math.sin(angle) * len;
          return (
            <g key={i}>
              <line x1={x} y1={y} x2={midX} y2={midY} stroke="#d4b896" strokeWidth={w} strokeLinecap="round" />
              <line x1={midX} y1={midY} x2={endX} y2={endY} stroke="#dcc4a8" strokeWidth={w - 0.8} strokeLinecap="round" />
              <circle cx={endX} cy={endY} r={w * 0.35} fill="#e4d0b8" />
            </g>
          );
        })}
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
