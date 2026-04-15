"use client";

import { useEffect, useRef, useState } from "react";
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
  const [motionOffset, setMotionOffset] = useState(0);
  const activeRef = useRef(currentSign.type !== "idle");

  useEffect(() => {
    activeRef.current = currentSign.type !== "idle";
  }, [currentSign.type]);

  // Breathing animation
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimPhase(p => (p + 1) % 60);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Motion animation — oscillate hands for active signs
  useEffect(() => {
    if (currentSign.type === "idle") {
      setMotionOffset(0);
      return;
    }
    let frame: number;
    let start: number | null = null;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      // Oscillate: smooth sine wave, ~1.5 cycles per second
      setMotionOffset(Math.sin(elapsed * 0.009) * 1);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [currentSign]);

  const BODY_CX = 200;
  const SHOULDER_Y = 200;
  const R_SHOULDER_X = 235;
  const L_SHOULDER_X = 165;

  const mapArm = (armX: number, armY: number, shoulderX: number) => {
    // Map normalized coords to SVG space with large range
    const handX = BODY_CX + armX * 200;
    const handY = 360 - armY * 320;
    const elbowX = shoulderX + (handX - shoulderX) * 0.5;
    const elbowY = SHOULDER_Y + (handY - SHOULDER_Y) * 0.45;
    return { handX, handY, elbowX, elbowY };
  };

  const getPositions = () => {
    const breath = Math.sin(animPhase * 0.1) * 2;
    const mo = motionOffset;

    if (currentSign.type === "idle") {
      return {
        rElbowX: 270, rElbowY: 260 + breath,
        rHandX: 260, rHandY: 330 + breath,
        lElbowX: 130, lElbowY: 260 + breath,
        lHandX: 140, lHandY: 330 + breath,
        rFingers: [0,0,0,0,0] as number[],
        lFingers: [0,0,0,0,0] as number[],
        rotation: 0,
      };
    }

    if (currentSign.type === "fingerspell" && currentSign.pose) {
      const p = currentSign.pose;
      const r = mapArm(p.armX, p.armY, R_SHOULDER_X);
      return {
        rElbowX: r.elbowX, rElbowY: r.elbowY,
        rHandX: r.handX + mo * 8, rHandY: r.handY + mo * 5,
        lElbowX: 130, lElbowY: 260,
        lHandX: 140, lHandY: 330,
        rFingers: [p.thumb, p.index, p.middle, p.ring, p.pinky],
        lFingers: [0,0,0,0,0] as number[],
        rotation: p.rotation,
      };
    }

    if (currentSign.type === "word" && currentSign.wordSign) {
      const ws = currentSign.wordSign;
      const r = mapArm(ws.rightArmX, ws.rightArmY, R_SHOULDER_X);
      const l = mapArm(ws.leftArmX, ws.leftArmY, L_SHOULDER_X);
      // Add motion offset for dynamic feel
      const moX = mo * 12;
      const moY = mo * 8;
      return {
        rElbowX: r.elbowX, rElbowY: r.elbowY,
        rHandX: r.handX + moX, rHandY: r.handY + moY,
        lElbowX: l.elbowX, lElbowY: l.elbowY,
        lHandX: l.handX - moX, lHandY: l.handY + moY,
        rFingers: ws.rightFingers,
        lFingers: ws.leftFingers,
        rotation: ws.rotation,
      };
    }

    return {
      rElbowX: 270, rElbowY: 260,
      rHandX: 260, rHandY: 330,
      lElbowX: 130, lElbowY: 260,
      lHandX: 140, lHandY: 330,
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
    const palmR = 18;

    if (extended === 0) {
      // Fist — large, visible
      return (
        <g transform={`rotate(${rot}, ${x}, ${y})`}>
          <circle cx={x} cy={y} r={palmR} fill="#d4b896" stroke="#b89870" strokeWidth={2} />
          {/* Knuckle details */}
          <line x1={x - 8} y1={y - 3} x2={x - 8} y2={y + 3} stroke="#c4a070" strokeWidth={1.5} strokeLinecap="round" />
          <line x1={x - 2} y1={y - 4} x2={x - 2} y2={y + 4} stroke="#c4a070" strokeWidth={1.5} strokeLinecap="round" />
          <line x1={x + 4} y1={y - 3} x2={x + 4} y2={y + 3} stroke="#c4a070" strokeWidth={1.5} strokeLinecap="round" />
          <line x1={x + 9} y1={y - 2} x2={x + 9} y2={y + 2} stroke="#c4a070" strokeWidth={1.5} strokeLinecap="round" />
        </g>
      );
    }

    const fingerData = [
      { spread: -65, len: 22, width: 5.5 },  // thumb
      { spread: -28, len: 32, width: 5 },     // index
      { spread: -6, len: 34, width: 5 },      // middle
      { spread: 16, len: 30, width: 4.5 },    // ring
      { spread: 36, len: 25, width: 4 },      // pinky
    ];

    return (
      <g transform={`rotate(${rot}, ${x}, ${y})`}>
        {/* Palm */}
        <ellipse cx={x} cy={y} rx={16} ry={palmR} fill="#d4b896" stroke="#b89870" strokeWidth={2} />
        {/* Fingers */}
        {fingers.map((f, i) => {
          if (f === 0) {
            // Curled finger — small bump
            const angle = (fingerData[i].spread * dir * Math.PI) / 180 - Math.PI / 2;
            const bumpLen = 8;
            return (
              <line key={i}
                x1={x + Math.cos(angle) * 8} y1={y + Math.sin(angle) * 8}
                x2={x + Math.cos(angle) * (8 + bumpLen)} y2={y + Math.sin(angle) * (8 + bumpLen)}
                stroke="#c4a882" strokeWidth={fingerData[i].width - 1} strokeLinecap="round" opacity={0.5}
              />
            );
          }
          const angle = (fingerData[i].spread * dir * Math.PI) / 180 - Math.PI / 2;
          const len = fingerData[i].len;
          const w = fingerData[i].width;
          // Two segments
          const mid1X = x + Math.cos(angle) * (len * 0.5);
          const mid1Y = y + Math.sin(angle) * (len * 0.5);
          const endX = x + Math.cos(angle) * len;
          const endY = y + Math.sin(angle) * len;
          return (
            <g key={i}>
              {/* Base segment */}
              <line x1={x} y1={y} x2={mid1X} y2={mid1Y}
                stroke="#d4b896" strokeWidth={w} strokeLinecap="round" />
              {/* Tip segment */}
              <line x1={mid1X} y1={mid1Y} x2={endX} y2={endY}
                stroke="#dcc4a8" strokeWidth={w - 1} strokeLinecap="round" />
              {/* Fingertip */}
              <circle cx={endX} cy={endY} r={w * 0.4} fill="#e4d0b8" />
              {/* Joint dot */}
              <circle cx={mid1X} cy={mid1Y} r={1.2} fill="#b89870" />
            </g>
          );
        })}
      </g>
    );
  };

  const t = "all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)";

  return (
    <div className="relative w-full max-w-[300px] mx-auto">
      <svg viewBox="0 0 400 480" className="w-full h-auto">
        <defs>
          <radialGradient id="bodyGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="rgba(59,130,246,0.06)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="shirtGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>

        <ellipse cx="200" cy="230" rx="180" ry="210" fill="url(#bodyGlow)" />

        {/* Body — compact */}
        <path d="M 155 215 Q 140 400 200 410 Q 260 400 245 215"
          fill="url(#shirtGrad)" stroke="#1e40af" strokeWidth={1} />

        {/* Neck */}
        <rect x="188" y="170" width="24" height="28" rx="6" fill="#d4b896" />

        {/* Head — smaller to emphasize hands */}
        <ellipse cx="200" cy="140" rx="40" ry="45" fill="#d4b896" stroke="#b89870" strokeWidth={1} />

        {/* Hair */}
        <ellipse cx="200" cy="108" rx="43" ry="26" fill="#3a2a1a" />
        <ellipse cx="162" cy="122" rx="13" ry="20" fill="#3a2a1a" />
        <ellipse cx="238" cy="122" rx="13" ry="20" fill="#3a2a1a" />

        {/* Eyes */}
        <ellipse cx="184" cy="137" rx="4.5" ry={currentSign.type !== "idle" ? 5 : 4} fill="#2a2a2a" />
        <ellipse cx="216" cy="137" rx="4.5" ry={currentSign.type !== "idle" ? 5 : 4} fill="#2a2a2a" />
        <circle cx="186" cy="136" r="1.5" fill="white" opacity={0.5} />
        <circle cx="218" cy="136" r="1.5" fill="white" opacity={0.5} />

        {/* Eyebrows */}
        <line x1="176" y1={currentSign.type === "idle" ? 128 : 125} x2="192" y2={currentSign.type === "idle" ? 127 : 123}
          stroke="#3a2a1a" strokeWidth={2.5} strokeLinecap="round" style={{ transition: t }} />
        <line x1="208" y1={currentSign.type === "idle" ? 127 : 123} x2="224" y2={currentSign.type === "idle" ? 128 : 125}
          stroke="#3a2a1a" strokeWidth={2.5} strokeLinecap="round" style={{ transition: t }} />

        {/* Mouth */}
        {currentSign.type === "idle" ? (
          <path d="M 191 152 Q 200 158 209 152" fill="none" stroke="#9a7a6a" strokeWidth={1.5} strokeLinecap="round" />
        ) : (
          <ellipse cx="200" cy="154" rx="7" ry="4.5" fill="#9a7a6a" opacity={0.7} />
        )}

        {/* LEFT ARM — upper (behind body) */}
        <line x1={L_SHOULDER_X} y1={SHOULDER_Y}
          x2={pos.lElbowX} y2={pos.lElbowY}
          stroke="#1d4ed8" strokeWidth={18} strokeLinecap="round"
          style={{ transition: t }} />
        <line x1={pos.lElbowX} y1={pos.lElbowY}
          x2={pos.lHandX} y2={pos.lHandY}
          stroke="#d4b896" strokeWidth={13} strokeLinecap="round"
          style={{ transition: t }} />

        {/* Left hand */}
        <g style={{ transition: t }}>
          {renderHand(pos.lHandX, pos.lHandY, pos.lFingers, pos.rotation, true)}
        </g>

        {/* RIGHT ARM — upper */}
        <line x1={R_SHOULDER_X} y1={SHOULDER_Y}
          x2={pos.rElbowX} y2={pos.rElbowY}
          stroke="#2563eb" strokeWidth={18} strokeLinecap="round"
          style={{ transition: t }} />
        <line x1={pos.rElbowX} y1={pos.rElbowY}
          x2={pos.rHandX} y2={pos.rHandY}
          stroke="#d4b896" strokeWidth={13} strokeLinecap="round"
          style={{ transition: t }} />

        {/* Right hand */}
        <g style={{ transition: t }}>
          {renderHand(pos.rHandX, pos.rHandY, pos.rFingers, pos.rotation, false)}
        </g>

        {/* Motion arrows when signing */}
        {currentSign.type !== "idle" && currentSign.type === "word" && currentSign.wordSign && (
          <g opacity={0.4 + motionOffset * 0.3}>
            {/* Right hand motion arrow */}
            {currentSign.wordSign.rightArmY > 0.6 && (
              <path
                d={`M ${pos.rHandX + 25} ${pos.rHandY - 5} l 8 -12 l -5 2 l 0 -10 l -6 0 l 0 10 l -5 -2 Z`}
                fill="#60a5fa" opacity={0.6}
                style={{ transition: t }}
              />
            )}
            {/* Left hand motion arrow (if active) */}
            {currentSign.wordSign.leftFingers.some(f => f === 1) && (
              <path
                d={`M ${pos.lHandX - 25} ${pos.lHandY - 5} l -8 -12 l 5 2 l 0 -10 l 6 0 l 0 10 l 5 -2 Z`}
                fill="#60a5fa" opacity={0.6}
                style={{ transition: t }}
              />
            )}
          </g>
        )}
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
