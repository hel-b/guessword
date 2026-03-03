-- Returns one row with all stats + percent changes for a user
-- Baseline: last 5 games vs previous 5 games
-- Params: :userId
WITH ranked AS (
  SELECT
    duration_seconds,
    word_attempts,
    is_win,
    ROW_NUMBER() OVER (
      PARTITION BY user_id
      ORDER BY completed_at DESC
    ) AS rn
  FROM game_stats
  WHERE user_id = :userId
),
last_5 AS (
  SELECT
    COUNT(*) AS gamesLast5,                  -- games in last 5
    SUM(CASE WHEN is_win = 0 THEN 1 ELSE 0 END) AS lossesLast5,
    AVG(duration_seconds) AS avgTimeLast5,   -- avg time last 5
    AVG(word_attempts) AS avgAttemptsLast5   -- avg attempts last 5
  FROM ranked
  WHERE rn BETWEEN 1 AND 5
),
prev_5 AS (
  SELECT
    COUNT(*) AS gamesPrev5,                  -- games 6–10
    SUM(CASE WHEN is_win = 0 THEN 1 ELSE 0 END) AS lossesPrev5,
    AVG(duration_seconds) AS avgTimePrev5,   -- avg time 6–10
    AVG(word_attempts) AS avgAttemptsPrev5   -- avg attempts 6–10
  FROM ranked
  WHERE rn BETWEEN 6 AND 10
),
last_7_days AS (
  SELECT COUNT(*) AS gamesLast7Days
  FROM game_stats
  WHERE user_id = :userId
  AND completed_at >= unixepoch('now', '-7 days')
),
all_time AS (
  SELECT
    COUNT(*) AS totalGames,                     -- total games ever
    SUM(CASE WHEN is_win = 0 THEN 1 ELSE 0 END) AS totalLosses,
    AVG(duration_seconds) AS averageCompletionTime,
    AVG(word_attempts) AS averageAttempts
  FROM game_stats
  WHERE user_id = :userId
)
SELECT
  COALESCE(all_time.totalGames, 0) AS totalGames,
  COALESCE(last_7_days.gamesLast7Days, 0) AS gamesLast7Days,
  -- All‑time averages
  ROUND(COALESCE(all_time.averageCompletionTime, 0)) AS averageCompletionTime,
  ROUND(COALESCE(all_time.averageAttempts, 0), 2) AS averageAttempts,
  -- All‑time percent losses
  ROUND(
    CASE
      WHEN all_time.totalGames = 0 THEN NULL
      ELSE (all_time.totalLosses * 100.0) / all_time.totalGames
    END,
    1
  ) AS totalPercentLosses,
  -- Diffs: last 5 vs previous 5 (NULL when no baseline)
  CASE
    WHEN prev_5.gamesPrev5 IS NULL OR prev_5.gamesPrev5 = 0 THEN NULL
    ELSE last_5.gamesLast5 - prev_5.gamesPrev5
  END AS gamesPlayedDiff,
  ROUND(
    CASE
      WHEN prev_5.avgTimePrev5 IS NULL OR prev_5.avgTimePrev5 = 0 THEN NULL
      ELSE last_5.avgTimeLast5 - prev_5.avgTimePrev5
    END
  ) AS timeDiff,
  ROUND(
    CASE
      WHEN prev_5.avgAttemptsPrev5 IS NULL OR prev_5.avgAttemptsPrev5 = 0 THEN NULL
      ELSE last_5.avgAttemptsLast5 - prev_5.avgAttemptsPrev5
    END,
    2
  ) AS attemptDiff,
  -- Percent diffs: last 5 vs previous 5
  ROUND(
    CASE
      WHEN prev_5.gamesPrev5 IS NULL OR prev_5.gamesPrev5 = 0 THEN NULL
      ELSE (last_5.gamesLast5 - prev_5.gamesPrev5)
           / prev_5.gamesPrev5 * 100.0
    END,
    0
  ) AS gamesPlayedDiffPct,
  ROUND(
    CASE
      WHEN prev_5.avgTimePrev5 IS NULL OR prev_5.avgTimePrev5 = 0 THEN NULL
      ELSE (last_5.avgTimeLast5 - prev_5.avgTimePrev5)
           / prev_5.avgTimePrev5 * 100.0
    END,
    0
  ) AS timeDiffPct,
  ROUND(
    CASE
      WHEN prev_5.avgAttemptsPrev5 IS NULL OR prev_5.avgAttemptsPrev5 = 0 THEN NULL
      ELSE (last_5.avgAttemptsLast5 - prev_5.avgAttemptsPrev5)
           / prev_5.avgAttemptsPrev5 * 100.0
    END,
    0
  ) AS attemptDiffPct,
  -- Loss percent diff (percentage points) last 5 vs previous 5
  ROUND(
    CASE
      WHEN last_5.gamesLast5 = 0 OR prev_5.gamesPrev5 = 0 THEN NULL
      ELSE (
        (last_5.lossesLast5 * 100.0) / last_5.gamesLast5
        - (prev_5.lossesPrev5 * 100.0) / prev_5.gamesPrev5
      )
    END,
    0
  ) AS percentLossDiff
FROM all_time
CROSS JOIN last_5
CROSS JOIN prev_5
CROSS JOIN last_7_days;