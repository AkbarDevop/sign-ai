# SignAI

Real-time AI-powered sign language interpreter. Converts speech and text into Russian Sign Language (RSL) animations with live subtitles.

Built to replace expensive human sign language interpreters with an AI alternative that works 24/7.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green)

## How It Works

```
Audio/Text Input  -->  Speech-to-Text  -->  RSL Gloss  -->  Sign Language Avatar
                                                        -->  Live Subtitles
```

1. **Speak** into the microphone or **type** text in Russian/Uzbek
2. Speech is transcribed in real-time (Web Speech API)
3. Text is converted to RSL gloss notation (word signs + fingerspelling)
4. An animated avatar performs the signs while subtitles display below

## Features

- **Voice input** with real-time speech recognition (Russian, Uzbek)
- **Text input** for direct translation
- **Animated SVG avatar** with smooth CSS transitions between sign poses
- **25+ RSL word signs** — greetings, pronouns, questions, common nouns
- **Full RSL dactyl alphabet** (33 letters) for fingerspelling unknown words
- **Live subtitles** synchronized with sign animation
- **Mobile-first** responsive design

## Quick Start

```bash
git clone https://github.com/AkbarDevop/sign-ai.git
cd sign-ai
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in Chrome (required for speech recognition).

## Project Structure

```
src/
  app/
    page.tsx                  # App entry point
    layout.tsx                # Root layout with metadata
    globals.css               # Global styles + animations
  components/
    Interpreter.tsx           # Main UI — speech recognition, text input, sign queue
    SignAvatar.tsx             # SVG avatar with animated arm/hand positions
  lib/
    rsl-alphabet.ts           # RSL dactyl alphabet + word signs + text-to-gloss
  types/
    speech.d.ts               # Web Speech API type declarations
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Speech-to-Text | Web Speech API (browser-native) |
| Sign Animation | SVG + CSS transitions |
| Sign Data | Custom RSL dictionary + dactyl alphabet |

## Roadmap

- [ ] Claude API integration for context-aware gloss translation
- [ ] Expand RSL dictionary to 200+ signs
- [ ] 3D avatar with Three.js
- [ ] Sign speed control
- [ ] Uzbek Sign Language support
- [ ] Camera-based sign language recognition (reverse direction)
- [ ] QR code integration for public kiosks
- [ ] Deploy to Netlify

## Context

This project is an AI alternative to [SOL (Surdo-Online)](https://sol-gos.ru), a platform that connects deaf users with human sign language interpreters via video call. SOL operates in Russia, Kazakhstan, and Uzbekistan.

SignAI replaces the human interpreter with AI, making sign language interpretation available 24/7 at a fraction of the cost.

See [CONTEXT.md](CONTEXT.md) for the full project background, market research, and technical analysis.

## Contributing

Built by [Akbar](https://github.com/AkbarDevop) and [Samandar](https://github.com/SamnorFlutter).

```bash
# Branch from main, PR to main
git checkout -b feature/your-feature
# ... make changes ...
git push -u origin feature/your-feature
# Open PR on GitHub
```

## License

MIT
