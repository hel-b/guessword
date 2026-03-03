"use client";

import { useRef, useState, useEffect } from "react";
import LabelIconInput from "@/components/ui/labelIconInput";
import {
  validateWordAction,
  getRandomWordAction,
} from "@/app/actions/dictActions";
import { insertStatsAction } from "@/app/actions/statsActions";

const VALIDATION_RULES = [
  {
    check: (guess: string) => guess.length !== 6,
    message: "Guess must be 6 letters long.",
  },
  {
    check: (guess: string, attempts: string[]) =>
      attempts.includes(guess.toUpperCase()),
    message: "You have already guessed that word.",
  },
  {
    check: (guess: string) => !/^[A-Za-z]{6}$/.test(guess),
    message: "Guess must only contain letters.",
  },
];
const validateGuess = (guess: string, attempts: string[]): string | null => {
  for (const rule of VALIDATION_RULES) {
    if (rule.check(guess, attempts)) {
      return rule.message;
    }
  }
  return null;
};

export default function GameForm({
  word,
  setWord,
  attempts,
  setAttempts,
}: {
  word: string;
  setWord: React.Dispatch<React.SetStateAction<string>>;
  attempts: string[];
  setAttempts: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const guessInputRef = useRef<HTMLInputElement>(null);
  const [warning, setWarning] = useState<string>(() => "");
  const [startTime, setStartTime] = useState<number>(() => Date.now());
  const [gameEnded, setGameEnded] = useState<boolean>(() => false);
  const [endTime, setEndTime] = useState<number>(() => Date.now());
  // Focus input on mount
  useEffect(() => {
    guessInputRef.current?.focus();
  }, []);
  //  submit stats when game ended
  useEffect(() => {
    if (!gameEnded) return;

    const isWin = attempts.includes(word);
    const durationSeconds = Math.floor((endTime - startTime) / 1000);

    const uploadStats = async () => {
      const result = await insertStatsAction({
        durationSeconds,
        wordAttempts: attempts.length,
        isWin,
        targetWord: word,
      });
      if (!result.success) {
        console.error(
          "Failed to upload game stats:",
          JSON.stringify(result.error),
        );
      }
    };

    uploadStats();
  }, [gameEnded]);

  useEffect(() => {
    setStartTime(Date.now());
  }, [word]);

  const onSubmit = async (e: React.FormEvent) => {
    // Prevent default form submission
    e.preventDefault();
    // get timestamp in case game ends
    const timeStamp = Date.now();
    // grab guess from input
    const guess = guessInputRef.current?.value || "";
    // Check if guess is valid
    const validationError = validateGuess(guess, attempts);
    if (validationError) {
      setWarning(validationError);
      return;
    }
    // Validate word against dictionary
    try {
      const result = await validateWordAction(guess.toUpperCase());
      if (!result.isValid) {
        setWarning("Guess is not a common dictionary word. Please try again.");
        return;
      }
    } catch (error) {
      setWarning("Error validating word. Please try again.");
      return;
    }
    // Add guess to attempts
    const curAttempts = [...attempts, guess.toUpperCase()];
    setAttempts(curAttempts);
    // Clear input
    if (guessInputRef.current) {
      guessInputRef.current.value = "";
    }
    // Check for game end
    if (curAttempts.includes(word) || curAttempts.length > 6) {
      setGameEnded(true);
      setEndTime(timeStamp);
    }
  };

  const newGame = async () => {
    setAttempts([]);
    setWarning("");
    setGameEnded(false);
    const result = await getRandomWordAction();
    if (result.word) {
      setWord(result.word);
    } else {
      alert("Error starting new game. Try refreshing the page.");
    }
  };
  const isWon = attempts.includes(word);
  if (gameEnded && isWon) {
    return (
      <>
        <div role="alert" className="alert line-clamp-2 alert-success">
          <span>Congratulations! You guessed the word {word}!</span>
        </div>
        <button className="btn btn-lg btn-primary" onClick={newGame}>
          New Game?
        </button>
      </>
    );
  }
  if (gameEnded && !isWon) {
    return (
      <>
        <div role="alert" className="alert line-clamp-2 alert-error">
          <span>
            Game Over! The word was {word}.<br />
            &nbsp;
          </span>
        </div>
        <button className="btn btn-lg btn-primary" onClick={newGame}>
          New Game?
        </button>
      </>
    );
  }
  return (
    <>
      <div
        role="alert"
        className={`alert line-clamp-2 alert-warning ${warning ? "" : "invisible"}`}
        aria-hidden={!warning}
      >
        <span>
          {warning || "&nbsp;"}
          <br />
          &nbsp;
        </span>
      </div>
      <form
        onSubmit={onSubmit}
        className="mt-4 flex flex-row items-center gap-2"
      >
        <LabelIconInput inputID="guess-input">
          <input
            ref={guessInputRef}
            type="text"
            name="guess-input"
            id="guess-input"
            maxLength={6}
            minLength={6}
            placeholder="Enter guess"
            className="grow uppercase"
            autoComplete="off"
            required
            autoFocus
          />
        </LabelIconInput>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
