"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SignAvatar from "./SignAvatar";
import { RSL_ALPHABET, RSL_COMMON_SIGNS, textToGloss } from "@/lib/rsl-alphabet";
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

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const queueProcessingRef = useRef(false);
  const signTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Process sign queue - show each sign for a duration
  const processQueue = useCallback((queue: SignState[]) => {
    if (queue.length === 0) {
      queueProcessingRef.current = false;
      setCurrentSign({ type: "idle", label: "" });
      return;
    }

    queueProcessingRef.current = true;
    const [nextSign, ...rest] = queue;
    setCurrentSign(nextSign);
    setSignQueue(rest);

    const duration = nextSign.type === "fingerspell" ? 600 : 1200;
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
      setError("Speech recognition not supported. Use Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;

    let lastProcessedLength = 0;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = "";
      let final = "";

      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          final += result[0].transcript + " ";
        } else {
          interim += result[0].transcript;
        }
      }

      if (final) {
        setTranscript(prev => prev + final);
        setInterimText("");

        // Only process the new part
        const newText = final.slice(lastProcessedLength);
        if (newText.trim()) {
          processText(newText);
        }
        lastProcessedLength = 0; // Reset since final results accumulate differently
      }

      if (interim) {
        setInterimText(interim);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === "not-allowed") {
        setError("Microphone access denied. Please allow microphone permission.");
      } else if (event.error !== "no-speech") {
        console.error("Speech recognition error:", event.error);
      }
    };

    recognition.onend = () => {
      if (isListening) {
        // Restart if we're supposed to be listening
        try { recognition.start(); } catch {}
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
      if (signTimeoutRef.current) clearTimeout(signTimeoutRef.current);
    };
  }, [language, isListening, processText]);

  // Update language on recognition when it changes
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = language;
    }
  }, [language]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript("");
      setInterimText("");
      setError(null);
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setError("Could not start speech recognition. Please try again.");
      }
    }
  };

  const handleTextSubmit = () => {
    if (!textInput.trim()) return;
    setTranscript(textInput);
    processText(textInput);
    setTextInput("");
  };

  return (
    <div className="flex flex-col h-full min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-sm">
            S
          </div>
          <div>
            <h1 className="text-base font-semibold">SignAI</h1>
            <p className="text-xs text-zinc-500">AI Sign Language Interpreter</p>
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
              <span className="text-xs text-red-400 font-medium">Listening...</span>
            </div>
          )}

          {/* Avatar */}
          <div className="flex-1 flex items-center justify-center w-full max-w-md">
            <SignAvatar currentSign={currentSign} />
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

        {/* Subtitle area */}
        <div className="px-5 py-3 min-h-[80px] border-t border-white/5">
          {(transcript || interimText) && (
            <div className="max-w-xl mx-auto">
              <p className="text-sm text-zinc-400 mb-1">Subtitles</p>
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
                ? "Tap the microphone to start speaking"
                : "Type text to translate to sign language"}
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
              Microphone
            </button>
            <button
              onClick={() => setMode("text")}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                mode === "text" ? "bg-zinc-700 text-white" : "text-zinc-500 hover:text-white"
              }`}
            >
              Text Input
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
                placeholder="Type in Russian or Uzbek..."
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                onClick={handleTextSubmit}
                className="bg-blue-600 hover:bg-blue-500 rounded-xl px-5 py-3 text-sm font-medium transition-colors"
              >
                Translate
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-5 py-3 border-t border-white/5 text-center">
        <p className="text-xs text-zinc-600">
          SignAI MVP - AI-powered RSL interpreter
        </p>
      </footer>
    </div>
  );
}
