@AGENTS.md

# SignAI — AI Sign Language Interpreter

## Read First

**Before doing ANY work, read `CONTEXT.md`** — it contains the full project context,
conversation transcript, research, architecture decisions, and roadmap. It was written
so that any new developer or AI agent can understand exactly what this project is,
why it exists, who is building it, and what to do next.

## Project

- **What:** Mobile-first web app that converts audio/text to Russian Sign Language (RSL) animation
- **Who:** Akbar (AkbarDevop) + Samandar (SamnorFlutter)
- **Why:** Replace expensive human sign language interpreters with AI (like sol-gos.ru but AI-powered)
- **Stack:** Next.js 16 + TypeScript + Tailwind CSS 4 + Web Speech API
- **Deploy:** Netlify (never Vercel)

## Architecture

```
Audio Input (Web Speech API) → Real-time STT → Text
Text Input → Text
                ↓
        Text-to-RSL Gloss (dictionary lookup, future: Claude API)
                ↓
        Sign Animation (SVG avatar with CSS transitions)
        + Subtitles displayed simultaneously
```

## Key Files

| File | What it does |
|------|-------------|
| `src/components/Interpreter.tsx` | Main client component — speech recognition, text input, sign queue processing |
| `src/components/SignAvatar.tsx` | SVG avatar that animates arm/hand positions for each sign |
| `src/lib/rsl-alphabet.ts` | RSL dactyl alphabet (33 letters) + common word signs (25+) + text-to-gloss converter |
| `src/types/speech.d.ts` | TypeScript declarations for Web Speech API |

## Rules

- Branch from main, PR to main
- Never use Vercel — deploy to Netlify
- Mobile-first design (375px minimum)
- Keep the dark theme (bg #0a0a0a)
- Sign animations must be smooth (use CSS transitions, 0.35s cubic-bezier)
- Unknown words must fall back to fingerspelling (letter-by-letter)
