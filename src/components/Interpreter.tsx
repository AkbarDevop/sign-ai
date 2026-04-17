"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SignAvatar from "./SignAvatar";
import { RSL_ALPHABET, RSL_COMMON_SIGNS, RSL_VIDEOS, textToGloss } from "@/lib/rsl-alphabet";
import type { HandPose, WordSign } from "@/lib/rsl-alphabet";

type SignState = {
  type: "word" | "fingerspell" | "idle";
  label: string;
  gloss?: string;
  pose?: HandPose;
  wordSign?: WordSign;
};

export default function Interpreter() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimText, setInterimText] = useState("");
  const [currentSign, setCurrentSign] = useState<SignState>({ type: "idle", label: "" });
  const [signQueue, setSignQueue] = useState<SignState[]>([]);
  const [language, setLanguage] = useState<"ru-RU" | "uz-UZ">("ru-RU");
  const [textInput, setTextInput] = useState("");
  const [mode, setMode] = useState<"mic" | "text">("mic");
  const [error, setError] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isListeningRef = useRef(false);
  const queueProcessingRef = useRef(false);
  const signTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Get video duration in ms
  const getVideoDuration = (url: string): Promise<number> => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        resolve(video.duration * 1000);
        video.remove();
      };
      video.onerror = () => {
        resolve(1200);
        video.remove();
      };
      video.src = url;
    });
  };

  // Process sign queue - show each sign for a duration
  const processQueue = useCallback(async (queue: SignState[]) => {
    if (queue.length === 0) {
      queueProcessingRef.current = false;
      setCurrentSign({ type: "idle", label: "" });
      setTimeout(() => setActiveVideo(null), 2000);
      return;
    }

    queueProcessingRef.current = true;
    const [nextSign, ...rest] = queue;
    setCurrentSign(nextSign);
    setSignQueue(rest);

    // Show video if available for this word
    const videoUrl = nextSign.type === "word" ? RSL_VIDEOS[nextSign.label] : null;
    if (videoUrl) {
      setActiveVideo(videoUrl);
    }

    // Calculate duration: use the longest of avatar animation vs video
    const avatarDuration = nextSign.type === "fingerspell" ? 600 : 1200;
    let duration = avatarDuration;

    if (videoUrl) {
      const videoDuration = await getVideoDuration(videoUrl);
      duration = Math.max(avatarDuration, videoDuration);
    }

    signTimeoutRef.current = setTimeout(() => {
      processQueue(rest);
    }, duration);
  }, []);

  // Convert text to signs and add to queue
  const processText = useCallback((text: string) => {
    const glossTokens = textToGloss(text);
    const newSigns: SignState[] = [];

    for (const token of glossTokens) {
      if (token.type === "word" && token.sign) {
        newSigns.push({
          type: "word",
          label: token.value,
          gloss: token.sign.gloss,
          wordSign: token.sign,
        });
      } else if (token.type === "fingerspell" && token.letters) {
        // Add each letter as a separate sign
        for (const letter of token.letters) {
          const pose = RSL_ALPHABET[letter];
          if (pose) {
            newSigns.push({
              type: "fingerspell",
              label: letter,
              pose,
            });
          }
        }
      }
    }

    if (newSigns.length > 0) {
      setSignQueue(prev => {
        const combined = [...prev, ...newSigns];
        if (!queueProcessingRef.current) {
          processQueue(combined);
        }
        return combined;
      });
    }
  }, [processQueue]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Распознавание речи не поддерживается. Используйте Chrome или Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = "";
      let newFinal = "";

      // Only process results from resultIndex onward (new results)
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          newFinal += result[0].transcript + " ";
        } else {
          interim += result[0].transcript;
        }
      }

      if (newFinal) {
        setTranscript(prev => prev + newFinal);
        setInterimText("");
        processText(newFinal.trim());
      }

      if (interim) {
        setInterimText(interim);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === "not-allowed") {
        setError("Доступ к микрофону запрещён. Разрешите доступ в настройках браузера.");
      } else if (event.error !== "no-speech") {
        console.error("Speech recognition error:", event.error);
      }
    };

    recognition.onend = () => {
      if (isListeningRef.current) {
        // Restart if we're supposed to be listening
        try { recognition.start(); } catch {}
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
      if (signTimeoutRef.current) clearTimeout(signTimeoutRef.current);
    };
  }, [language, processText]);

  // Update language on recognition when it changes
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = language;
    }
  }, [language]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      isListeningRef.current = false;
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript("");
      setInterimText("");
      setError(null);
      try {
        recognitionRef.current.start();
        isListeningRef.current = true;
        setIsListening(true);
      } catch {
        setError("Не удалось запустить распознавание речи. Попробуйте снова.");
      }
    }
  };

  const handleTextSubmit = () => {
    if (!textInput.trim()) return;
    setTranscript(textInput);
    processText(textInput);
    setTextInput("");
  };

  const stopAll = () => {
    if (signTimeoutRef.current) clearTimeout(signTimeoutRef.current);
    queueProcessingRef.current = false;
    setSignQueue([]);
    setCurrentSign({ type: "idle", label: "" });
    setActiveVideo(null);
    setTranscript("");
    setInterimText("");
    if (isListening && recognitionRef.current) {
      isListeningRef.current = false;
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-screen">
      {/* Header */}
      <header className="glass flex items-center justify-between px-6 py-3 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-500/20">
            S
          </div>
          <div>
            <h1 className="text-base font-semibold tracking-tight">SignAI</h1>
            <p className="text-[11px] text-zinc-500">RSL Interpreter</p>
          </div>
        </div>

        {/* Language selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLanguage("ru-RU")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              language === "ru-RU"
                ? "bg-blue-600 text-white"
                : "bg-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            RU
          </button>
          <button
            onClick={() => setLanguage("uz-UZ")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              language === "uz-UZ"
                ? "bg-blue-600 text-white"
                : "bg-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            UZ
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Sign language display area */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 relative">
          {/* Status indicator */}
          {isListening && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-red-500/20 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs text-red-400 font-medium">Слушаю...</span>
            </div>
          )}

          {/* Avatar + Reference Video + Static Photo side by side */}
          <div className="flex-1 flex items-center justify-center w-full max-w-5xl gap-4">
            {/* 1. Avatar animation */}
            <div className="flex-1 flex flex-col items-center max-w-xs">
              <p className="text-xs text-zinc-500 mb-2">{activeVideo ? "3D Аватар" : "\u00A0"}</p>
              <SignAvatar currentSign={currentSign} />
            </div>

            {/* 2. Reference video */}
            {activeVideo && (
              <div className="flex-1 flex flex-col items-center max-w-xs sign-enter">
                <p className="text-xs text-zinc-500 mb-2">Видео</p>
                <div className="rounded-xl overflow-hidden border border-white/10 bg-zinc-900 shadow-lg">
                  <video
                    key={activeVideo}
                    src={activeVideo}
                    autoPlay
                    muted
                    playsInline
                    className="w-full max-h-[280px] object-contain"
                  />
                </div>
                <p className="text-xs text-zinc-600 mt-1">spreadthesign.com</p>
              </div>
            )}

            {/* 3. Static photo (mid-frame from video) */}
            {activeVideo && (
              <div className="flex-1 flex flex-col items-center max-w-xs sign-enter">
                <p className="text-xs text-zinc-500 mb-2">Фото</p>
                <div className="rounded-xl overflow-hidden border border-white/10 bg-zinc-900 shadow-lg">
                  <video
                    key={activeVideo + "-static"}
                    src={activeVideo}
                    muted
                    playsInline
                    className="w-full max-h-[280px] object-contain"
                    ref={(el) => {
                      if (el) {
                        el.onloadedmetadata = () => {
                          el.currentTime = el.duration * 0.45;
                        };
                      }
                    }}
                  />
                </div>
                <p className="text-xs text-zinc-600 mt-1">стоп-кадр</p>
              </div>
            )}
          </div>

          {/* Sign description */}
          {currentSign.type !== "idle" && currentSign.type === "word" && currentSign.wordSign && (
            <p className="text-xs text-zinc-500 mt-2 text-center sign-enter">
              {currentSign.wordSign.description}
            </p>
          )}
          {currentSign.type === "fingerspell" && currentSign.pose && (
            <p className="text-xs text-zinc-500 mt-2 text-center sign-enter">
              {currentSign.pose.description}
            </p>
          )}
        </div>

        {/* Stop button */}
        {(currentSign.type !== "idle" || activeVideo || isListening) && (
          <div className="flex justify-center py-2">
            <button
              onClick={stopAll}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-red-600 border border-zinc-700 hover:border-red-500 rounded-lg text-sm text-zinc-300 hover:text-white transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
              Stop
            </button>
          </div>
        )}

        {/* Subtitle area */}
        <div className="px-5 py-3 min-h-[80px] border-t border-white/5">
          {(transcript || interimText) && (
            <div className="max-w-xl mx-auto">
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Субтитры</p>
              <p className="text-base leading-relaxed subtitle-enter">
                <span className="text-white">{transcript}</span>
                {interimText && (
                  <span className="text-zinc-500 italic">{interimText}</span>
                )}
              </p>
            </div>
          )}
          {!transcript && !interimText && !isListening && (
            <p className="text-sm text-zinc-600 text-center">
              {mode === "mic"
                ? "Нажмите на микрофон чтобы начать"
                : "Введите текст для перевода на жестовый язык"}
            </p>
          )}
        </div>

        {/* Error display */}
        {error && (
          <div className="px-5 pb-2">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2 text-sm text-red-400 text-center">
              {error}
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="px-5 py-5 border-t border-white/10">
          {/* Mode tabs */}
          <div className="flex justify-center gap-1 mb-4">
            <button
              onClick={() => setMode("mic")}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                mode === "mic" ? "bg-zinc-700 text-white" : "text-zinc-500 hover:text-white"
              }`}
            >
              Микрофон
            </button>
            <button
              onClick={() => setMode("text")}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                mode === "text" ? "bg-zinc-700 text-white" : "text-zinc-500 hover:text-white"
              }`}
            >
              Текст
            </button>
          </div>

          {mode === "mic" ? (
            <div className="flex justify-center">
              <button
                onClick={toggleListening}
                className="relative group"
              >
                {/* Pulse ring when active */}
                {isListening && (
                  <>
                    <span className="absolute inset-0 rounded-full bg-red-500/30 pulse-ring" />
                    <span className="absolute inset-0 rounded-full bg-red-500/20 pulse-ring" style={{ animationDelay: "0.5s" }} />
                  </>
                )}

                <div
                  className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isListening
                      ? "bg-red-500 shadow-lg shadow-red-500/30"
                      : "bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30"
                  }`}
                >
                  {isListening ? (
                    // Stop icon
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <rect x="6" y="6" width="12" height="12" rx="2" />
                    </svg>
                  ) : (
                    // Mic icon
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" x2="12" y1="19" y2="22" />
                    </svg>
                  )}
                </div>
              </button>
            </div>
          ) : (
            <div className="flex gap-2 max-w-xl mx-auto">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTextSubmit()}
                placeholder="Введите текст на русском или узбекском..."
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                onClick={handleTextSubmit}
                className="bg-blue-600 hover:bg-blue-500 rounded-xl px-5 py-3 text-sm font-medium transition-colors"
              >
                Перевести
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-5 py-2 border-t border-white/5 text-center">
        <p className="text-[11px] text-zinc-600">
          SignAI — AI-переводчик на русский жестовый язык
        </p>
      </footer>
    </div>
  );
}
