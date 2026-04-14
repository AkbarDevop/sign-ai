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

  // Calculate avatar pose from current sign
  const getArmPositions = () => {
    if (currentSign.type === "idle") {
      // Resting position with subtle breathing animation
      const breathOffset = Math.sin(animPhase * 0.1) * 2;
      return {
        rightShoulderX: 220, rightShoulderY: 180,
        rightElbowX: 250, rightElbowY: 230 + breathOffset,
        rightHandX: 240, rightHandY: 280 + breathOffset,
        leftShoulderX: 180, leftShoulderY: 180,
        leftElbowX: 150, leftElbowY: 230 + breathOffset,
        leftHandX: 160, leftHandY: 280 + breathOffset,
        rightFingers: [0, 0, 0, 0, 0] as number[],
        leftFingers: [0, 0, 0, 0, 0] as number[],
      };
    }

    if (currentSign.type === "fingerspell" && currentSign.pose) {
      const pose = currentSign.pose;
      const handX = 200 + pose.armX * 120;
      const handY = 300 - pose.armY * 200;
      return {
        rightShoulderX: 220, rightShoulderY: 180,
        rightElbowX: 220 + (handX - 220) * 0.5, rightElbowY: 180 + (handY - 180) * 0.4,
        rightHandX: handX, rightHandY: handY,
        leftShoulderX: 180, leftShoulderY: 180,
        leftElbowX: 150, leftElbowY: 230,
        leftHandX: 160, leftHandY: 280,
        rightFingers: [pose.thumb, pose.index, pose.middle, pose.ring, pose.pinky],
        leftFingers: [0, 0, 0, 0, 0] as number[],
      };
    }

    if (currentSign.type === "word" && currentSign.wordSign) {
      const ws = currentSign.wordSign;
      const rHandX = 200 + ws.rightArmX * 120;
      const rHandY = 300 - ws.rightArmY * 200;
      const lHandX = 200 + ws.leftArmX * 120;
      const lHandY = 300 - ws.leftArmY * 200;
      return {
        rightShoulderX: 220, rightShoulderY: 180,
        rightElbowX: 220 + (rHandX - 220) * 0.5, rightElbowY: 180 + (rHandY - 180) * 0.4,
        rightHandX: rHandX, rightHandY: rHandY,
        leftShoulderX: 180, leftShoulderY: 180,
        leftElbowX: 180 + (lHandX - 180) * 0.5, leftElbowY: 180 + (lHandY - 180) * 0.4,
        leftHandX: lHandX, leftHandY: lHandY,
        rightFingers: ws.rightFingers,
        leftFingers: ws.leftFingers,
      };
    }

    // Default
    return {
      rightShoulderX: 220, rightShoulderY: 180,
      rightElbowX: 250, rightElbowY: 230,
      rightHandX: 240, rightHandY: 280,
      leftShoulderX: 180, leftShoulderY: 180,
      leftElbowX: 150, leftElbowY: 230,
      leftHandX: 160, leftHandY: 280,
      rightFingers: [0, 0, 0, 0, 0] as number[],
      leftFingers: [0, 0, 0, 0, 0] as number[],
    };
  };

  const pos = getArmPositions();

  const renderHand = (x: number, y: number, fingers: number[], mirror: boolean) => {
    const dir = mirror ? -1 : 1;
    const extended = fingers.filter(f => f === 1).length;

    if (extended === 0) {
      // Fist
      return (
        <circle cx={x} cy={y} r={12} fill="#c4a882" stroke="#a08060" strokeWidth={1.5} />
      );
    }

    // Draw fingers
    const fingerAngles = [-40, -20, 0, 20, 40];
    return (
      <g>
        <circle cx={x} cy={y} r={10} fill="#c4a882" stroke="#a08060" strokeWidth={1.5} />
        {fingers.map((f, i) => {
          if (f === 0) return null;
          const angle = (fingerAngles[i] * dir * Math.PI) / 180 - Math.PI / 2;
          const len = i === 0 ? 14 : 18; // thumb shorter
          return (
            <line
              key={i}
              x1={x}
              y1={y}
              x2={x + Math.cos(angle) * len}
              y2={y + Math.sin(angle) * len}
              stroke="#c4a882"
              strokeWidth={3}
              strokeLinecap="round"
            />
          );
        })}
      </g>
    );
  };

  return (
    <div className="relative w-full max-w-[320px] mx-auto">
      <svg viewBox="0 0 400 420" className="w-full h-auto">
        {/* Background glow */}
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

        <ellipse cx="200" cy="200" rx="160" ry="180" fill="url(#bodyGlow)" />

        {/* Body / Torso */}
        <path
          d="M 160 200 Q 160 340 200 350 Q 240 340 240 200"
          fill="url(#shirtGrad)"
          stroke="#1e40af"
          strokeWidth={1}
        />

        {/* Neck */}
        <rect x="190" y="155" width="20" height="30" rx="5" fill="#c4a882" />

        {/* Head */}
        <ellipse cx="200" cy="130" rx="40" ry="45" fill="#c4a882" stroke="#a08060" strokeWidth={1} />

        {/* Hair */}
        <ellipse cx="200" cy="100" rx="42" ry="25" fill="#3a2a1a" />
        <ellipse cx="165" cy="115" rx="12" ry="20" fill="#3a2a1a" />
        <ellipse cx="235" cy="115" rx="12" ry="20" fill="#3a2a1a" />

        {/* Eyes */}
        <ellipse cx="185" cy="128" rx="5" ry="4" fill="#2a2a2a" />
        <ellipse cx="215" cy="128" rx="5" ry="4" fill="#2a2a2a" />

        {/* Mouth - slight smile */}
        <path d="M 190 145 Q 200 152 210 145" fill="none" stroke="#8a6a5a" strokeWidth={1.5} strokeLinecap="round" />

        {/* Right arm */}
        <line
          x1={pos.rightShoulderX} y1={pos.rightShoulderY}
          x2={pos.rightElbowX} y2={pos.rightElbowY}
          stroke="#2563eb" strokeWidth={14} strokeLinecap="round"
          style={{ transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)" }}
        />
        <line
          x1={pos.rightElbowX} y1={pos.rightElbowY}
          x2={pos.rightHandX} y2={pos.rightHandY}
          stroke="#c4a882" strokeWidth={10} strokeLinecap="round"
          style={{ transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)" }}
        />

        {/* Left arm */}
        <line
          x1={pos.leftShoulderX} y1={pos.leftShoulderY}
          x2={pos.leftElbowX} y2={pos.leftElbowY}
          stroke="#2563eb" strokeWidth={14} strokeLinecap="round"
          style={{ transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)" }}
        />
        <line
          x1={pos.leftElbowX} y1={pos.leftElbowY}
          x2={pos.leftHandX} y2={pos.leftHandY}
          stroke="#c4a882" strokeWidth={10} strokeLinecap="round"
          style={{ transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)" }}
        />

        {/* Hands */}
        <g style={{ transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)" }}>
          {renderHand(pos.rightHandX, pos.rightHandY, pos.rightFingers, false)}
        </g>
        <g style={{ transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)" }}>
          {renderHand(pos.leftHandX, pos.leftHandY, pos.leftFingers, true)}
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
