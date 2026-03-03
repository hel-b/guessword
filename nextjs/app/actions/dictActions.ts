"use server";

import { getRandomWord, isValidWord } from "@/lib/db/dictionary";

export async function getRandomWordAction() {
  try {
    const word = getRandomWord();
    return { word };
  } catch (error) {
    console.error("Failed to get random word:", error);
    return { error: "Failed to retrieve word" };
  }
}

export async function validateWordAction(word: string) {
  try {
    const isValid = isValidWord(word);
    return { isValid };
  } catch (error) {
    console.error("Failed to validate word:", error);
    return { error: "Failed to validate word" };
  }
}
