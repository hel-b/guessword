import "server-only";
import { readFileSync } from "node:fs";
import path from "node:path";
import { getDB } from "./connection";
import type Database from "better-sqlite3-multiple-ciphers";

// Lazy-loaded prepared statements
let insertGameStatsStmt: Database.Statement | null = null;
let getUserStatsStmt: Database.Statement | null = null;

const STATS_QUERY = readFileSync(
  path.resolve(process.cwd(), "lib/db/stats-query.sql"),
  "utf8",
);
function prepStmts() {
  const db = getDB("users");

  if (!insertGameStatsStmt) {
    insertGameStatsStmt = db.prepare(
      "INSERT INTO game_stats (user_id, duration_seconds, word_attempts, is_win, target_word) VALUES (?, ?, ?, ?, ?)",
    );
  }
  if (!getUserStatsStmt) {
    getUserStatsStmt = db.prepare(STATS_QUERY);
  }

  return { insertGameStatsStmt, getUserStatsStmt };
}

export function insertGameStats({
  userID,
  durationSeconds,
  wordAttempts,
  isWin,
  targetWord,
}: {
  userID: string;
  durationSeconds: number;
  wordAttempts: number;
  isWin: boolean;
  targetWord: string;
}): Database.RunResult {
  const { insertGameStatsStmt } = prepStmts();
  const res = insertGameStatsStmt.run(
    userID,
    durationSeconds,
    wordAttempts,
    isWin ? 1 : 0,
    targetWord,
  );
  return res;
}
// export type UserStats = {
//   totalGames: number;
//   gamesLastWeek: number;
//   averageCompletionTime: number;
//   averageAttempts: number;
//   totalPercentLosses: number | null;
//   gamesPlayedDiff: number;
//   gamesPlayedDiffPct: number | null;
//   weeklyTimeDiff: number;
//   weeklyTimeDiffPct: number | null;
//   attemptDiff: number;
//   attemptDiffPct: number | null;
//   weeklyPercentLossDiff: number | null;
// };
export type UserStats = {
  totalGames: number;
  gamesLast7Days: number;

  averageCompletionTime: number;
  averageAttempts: number;

  totalPercentLosses: number | null;

  gamesPlayedDiff: number | null;
  gamesPlayedDiffPct: number | null;

  timeDiff: number | null;
  timeDiffPct: number | null;

  attemptDiff: number | null;
  attemptDiffPct: number | null;

  percentLossDiff: number | null;
};

export function getUserStats(userID: string): UserStats | undefined {
  const { getUserStatsStmt } = prepStmts();
  const stats = getUserStatsStmt.get({ userId: userID });
  return stats as UserStats | undefined;
}
