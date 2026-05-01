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
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPhase(p => (p + 1) % 200), 35);
    return () => clearInterval(id);
  }, []);

  const breath = Math.sin(phase * 0.06) * 1.2;
  const isActive = currentSign.type !== "idle";
  // Gentle movement when showing a sign
  const signMove = isActive ? Math.sin(phase * 0.08) * 4 : 0;

  // --- Position mapping ---
  const mapHand = (ax: number, ay: number) => ({
    x: 200 + ax * 230,
    y: 390 - ay * 360,
  });

  const calcElbow = (sx: number, hx: number, hy: number, right: boolean) => {
    const side = right ? 1 : -1;
    return {
      x: sx + (hx - sx) * 0.4 + side * 28,
      y: 195 + (hy - 195) * 0.45 + 20,
    };
  };

  let rHand = { x: 265, y: 345 + breath };
  let lHand = { x: 135, y: 345 + breath };
  let rFingers = [0,0,0,0,0];
  let lFingers = [0,0,0,0,0];
  let rot = 0;

  if (currentSign.type === "fingerspell" && currentSign.pose) {
    const p = currentSign.pose;
    rHand = mapHand(p.armX, p.armY);
    rHand.x += signMove;
    rHand.y += signMove * 0.5;
    rFingers = [p.thumb, p.index, p.middle, p.ring, p.pinky];
    rot = p.rotation;
  } else if (currentSign.type === "word" && currentSign.wordSign) {
    const ws = currentSign.wordSign;
    rHand = mapHand(ws.rightArmX, ws.rightArmY);
    lHand = mapHand(ws.leftArmX, ws.leftArmY);
    rHand.x += signMove; rHand.y += signMove * 0.4;
    lHand.x -= signMove; lHand.y += signMove * 0.4;
    rFingers = ws.rightFingers;
    lFingers = ws.leftFingers;
    rot = ws.rotation;
  }

  const rElbow = calcElbow(238, rHand.x, rHand.y, true);
  const lElbow = calcElbow(162, lHand.x, lHand.y, false);

  // --- Hand rendering ---
  const renderHand = (hx: number, hy: number, fingers: number[], rotation: number, mirror: boolean) => {
    const r = mirror ? -rotation : rotation;
    const sc = mirror ? -1.5 : 1.5; // scale — BIG hands
    const key = fingers.join("");

    // Finger as a nice curved shape
    const finger = (bx: number, by: number, tipX: number, tipY: number, w: number) => {
      // Curved finger with rounded tip
      const mx = (bx + tipX) / 2 + (tipY - by) * 0.08;
      const my = (by + tipY) / 2;
      return `M${bx - w},${by} Q${mx - w},${my} ${tipX - w * 0.7},${tipY}
              A${w * 0.7},${w * 0.7} 0 1 0 ${tipX + w * 0.7},${tipY}
              Q${mx + w},${my} ${bx + w},${by}`;
    };

    const getShape = () => {
      const parts: string[] = [];

      // Palm base — always present, rounded rectangle shape
      parts.push(`M-10,12 C-13,6 -13,-4 -10,-10 C-6,-14 6,-14 10,-10 C13,-4 13,6 10,12 C6,16 -6,16 -10,12 Z`);

      // Thumb
      if (fingers[0]) {
        parts.push(finger(-12, -2, -22, -18, 3.5));
      } else {
        parts.push(`M-12,-2 Q-15,-6 -14,-10 Q-13,-12 -11,-10 Q-10,-6 -10,-2`);
      }

      // Index
      if (fingers[1]) {
        parts.push(finger(-6, -12, -8, -38, 3));
      } else {
        parts.push(`M-6,-12 Q-7,-16 -5,-18 Q-3,-18 -3,-14`);
      }

      // Middle
      if (fingers[2]) {
        parts.push(finger(-1, -13, -1, -40, 3));
      } else {
        parts.push(`M-1,-13 Q-1,-17 0,-19 Q2,-19 2,-15`);
      }

      // Ring
      if (fingers[3]) {
        parts.push(finger(4, -12, 5, -37, 2.8));
      } else {
        parts.push(`M4,-12 Q5,-16 6,-18 Q8,-17 6,-14`);
      }

      // Pinky
      if (fingers[4]) {
        parts.push(finger(8, -10, 11, -32, 2.5));
      } else {
        parts.push(`M8,-10 Q10,-13 11,-15 Q12,-14 10,-10`);
      }

      return parts;
    };

    const parts = getShape();

    return (
      <g transform={`translate(${hx},${hy}) rotate(${r}) scale(${sc},${Math.abs(sc)})`}
         style={{ transition: "transform 0.45s cubic-bezier(0.33,0,0.2,1)" }}>
        {/* Shadow */}
        <g transform="translate(1.5,1.5)" opacity={0.15}>
          {parts.map((d, i) => <path key={`s${i}`} d={d} fill="#000" />)}
        </g>
        {/* Hand fill */}
        {parts.map((d, i) => (
          <path key={`f${i}`} d={d} fill={i === 0 ? "#e8c9a0" : "#f0d4b0"}
            stroke="#a08060" strokeWidth={0.8} strokeLinejoin="round" />
        ))}
        {/* Palm lines for fist */}
        {key === "00000" && (
          <g stroke="#c4a882" strokeWidth={0.6} opacity={0.5}>
            <path d="M-6,-4 Q0,-8 6,-4" fill="none" />
            <path d="M-5,0 Q0,-3 5,0" fill="none" />
            <path d="M-4,4 Q0,2 4,4" fill="none" />
          </g>
        )}
        {/* Nail highlights on extended fingers */}
        {fingers[1] === 1 && <ellipse cx={-8} cy={-36} rx={1.8} ry={1.2} fill="#f8e8d4" opacity={0.7} />}
        {fingers[2] === 1 && <ellipse cx={-1} cy={-38} rx={1.8} ry={1.2} fill="#f8e8d4" opacity={0.7} />}
        {fingers[3] === 1 && <ellipse cx={5} cy={-35} rx={1.8} ry={1.2} fill="#f8e8d4" opacity={0.7} />}
        {fingers[4] === 1 && <ellipse cx={11} cy={-30} rx={1.5} ry={1} fill="#f8e8d4" opacity={0.7} />}
        {fingers[0] === 1 && <ellipse cx={-22} cy={-16} rx={1.5} ry={2} fill="#f8e8d4" opacity={0.7} transform="rotate(-30,-22,-16)" />}
      </g>
    );
  };

  const tr = "all 0.45s cubic-bezier(0.33,0,0.2,1)";

  return (
    <div className="relative w-full max-w-[320px] mx-auto">
      <svg viewBox="0 0 400 480" className="w-full h-auto">
        <defs>
          <radialGradient id="bg" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="rgba(59,130,246,0.04)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="shirt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
          <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8c9a0" />
            <stop offset="100%" stopColor="#d4b896" />
          </linearGradient>
        </defs>

        <ellipse cx="200" cy="240" rx="180" ry="210" fill="url(#bg)" />

        {/* Body */}
        <path d="M 152 208 Q 138 415 200 425 Q 262 415 248 208"
          fill="url(#shirt)" stroke="#1e3a8a" strokeWidth={1} />
        {/* Collar */}
        <path d="M 178 208 Q 200 220 222 208" fill="none" stroke="#1e3a8a" strokeWidth={1.5} />

        {/* Neck */}
        <rect x="189" y="168" width="22" height="30" rx="5" fill="url(#skin)" />

        {/* Head */}
        <ellipse cx="200" cy="132" rx="44" ry="50" fill="url(#skin)" stroke="#b89870" strokeWidth={0.8} />

        {/* Hair */}
        <ellipse cx="200" cy="97" rx="47" ry="30" fill="#2a1a0e" />
        <ellipse cx="158" cy="114" rx="15" ry="24" fill="#2a1a0e" />
        <ellipse cx="242" cy="114" rx="15" ry="24" fill="#2a1a0e" />

        {/* Ears */}
        <ellipse cx="154" cy="135" rx="6" ry="10" fill="#d4b896" stroke="#b89870" strokeWidth={0.5} />
        <ellipse cx="246" cy="135" rx="6" ry="10" fill="#d4b896" stroke="#b89870" strokeWidth={0.5} />

        {/* Eyes */}
        <g style={{ transition: "transform 0.3s" }}>
          {/* Left eye */}
          <ellipse cx="182" cy="132" rx="8" ry="6" fill="white" />
          <ellipse cx="182" cy="132" rx="4" ry={isActive ? 5 : 4} fill="#2a2a2a"
            style={{ transition: "ry 0.3s" }} />
          <circle cx="184" cy="131" r="1.5" fill="white" opacity={0.6} />
          {/* Right eye */}
          <ellipse cx="218" cy="132" rx="8" ry="6" fill="white" />
          <ellipse cx="218" cy="132" rx="4" ry={isActive ? 5 : 4} fill="#2a2a2a"
            style={{ transition: "ry 0.3s" }} />
          <circle cx="220" cy="131" r="1.5" fill="white" opacity={0.6} />
        </g>

        {/* Eyebrows */}
        <path d={`M174,${isActive ? 119 : 122} Q183,${isActive ? 116 : 120} 192,${isActive ? 118 : 121}`}
          fill="none" stroke="#2a1a0e" strokeWidth={2.5} strokeLinecap="round" style={{ transition: tr }} />
        <path d={`M208,${isActive ? 118 : 121} Q217,${isActive ? 116 : 120} 226,${isActive ? 119 : 122}`}
          fill="none" stroke="#2a1a0e" strokeWidth={2.5} strokeLinecap="round" style={{ transition: tr }} />

        {/* Nose */}
        <path d="M198,140 Q200,146 202,140" fill="none" stroke="#b89870" strokeWidth={1.2} strokeLinecap="round" />

        {/* Mouth */}
        {isActive ? (
          <ellipse cx="200" cy="152" rx="6" ry="4.5" fill="#b87a6a" opacity={0.6}
            style={{ transition: tr }} />
        ) : (
          <path d="M192,150 Q200,155 208,150" fill="none" stroke="#a08070" strokeWidth={1.5} strokeLinecap="round" />
        )}

        {/* === ARMS === */}
        {/* Left arm - upper */}
        <line x1={162} y1={195} x2={lElbow.x} y2={lElbow.y}
          stroke="#1d4ed8" strokeWidth={17} strokeLinecap="round" style={{ transition: tr }} />
        {/* Left arm - forearm */}
        <line x1={lElbow.x} y1={lElbow.y} x2={lHand.x} y2={lHand.y}
          stroke="#d4b896" strokeWidth={13} strokeLinecap="round" style={{ transition: tr }} />
        {/* Left elbow */}
        <circle cx={lElbow.x} cy={lElbow.y} r={8} fill="#bfa882" style={{ transition: tr }} />
        {/* Left hand */}
        <g style={{ transition: tr }}>
          {renderHand(lHand.x, lHand.y, lFingers, rot, true)}
        </g>

        {/* Right arm - upper */}
        <line x1={238} y1={195} x2={rElbow.x} y2={rElbow.y}
          stroke="#2563eb" strokeWidth={17} strokeLinecap="round" style={{ transition: tr }} />
        {/* Right arm - forearm */}
        <line x1={rElbow.x} y1={rElbow.y} x2={rHand.x} y2={rHand.y}
          stroke="#d4b896" strokeWidth={13} strokeLinecap="round" style={{ transition: tr }} />
        {/* Right elbow */}
        <circle cx={rElbow.x} cy={rElbow.y} r={8} fill="#bfa882" style={{ transition: tr }} />
        {/* Right hand */}
        <g style={{ transition: tr }}>
          {renderHand(rHand.x, rHand.y, rFingers, rot, false)}
        </g>
      </svg>

      {/* Sign label */}
      {isActive && (
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
