import { getDB } from "./connection";
import type Database from "better-sqlite3-multiple-ciphers";

// Lazy-loaded prepared statements
let getRandomWordStmt: Database.Statement | null = null;
let checkValidWordStmt: Database.Statement | null = null;

function prepStmts() {
  const db = getDB("dictionary");

  if (!getRandomWordStmt) {
    getRandomWordStmt = db.prepare(
      "SELECT word FROM commonwords ORDER BY RANDOM() LIMIT 1",
    );
  }
  if (!checkValidWordStmt) {
    checkValidWordStmt = db.prepare(
      "SELECT 1 FROM validwords WHERE word = ? LIMIT 1",
    );
  }

  return { getRandomWordStmt, checkValidWordStmt };
}

export function getRandomWord(): string {
  const { getRandomWordStmt } = prepStmts();
  const row = getRandomWordStmt.get() as { word: string } | undefined;
  if (!row) throw new Error("No words available in commonwords table");
  return row.word;
}

export function isValidWord(word: string): boolean {
  const normalized = word.trim().toUpperCase();
  if (normalized.length !== 6 || !/^[A-Z]{6}$/.test(normalized)) return false;
  const { checkValidWordStmt } = prepStmts();
  const hit = checkValidWordStmt.get(normalized);
  return !!hit;
}
