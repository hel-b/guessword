"use client";
import { useState } from "react";
import GameBoard from "@/components/game/gameBoard";
import GameForm from "@/components/game/gameForm";

export default function GameClient({ initialWord }: { initialWord: string }) {
  const [attempts, setAttempts] = useState<string[]>(() => []);
  const [word, setWord] = useState(() => initialWord);
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col text-center">
        <GameBoard word={word} attempts={attempts} />
        <GameForm
          word={word}
          setWord={setWord}
          attempts={attempts}
          setAttempts={setAttempts}
        />
      </div>
    </div>
  );
}
