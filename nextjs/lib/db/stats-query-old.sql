-- Returns one row with all stats + percent changes for a user
-- Params: :userId
WITH bounds AS (
  SELECT
    unixepoch('now') AS now_ts,                 -- current timestamp (seconds)
    unixepoch('now', '-7 days') AS last_week_start,
    unixepoch('now', '-14 days') AS prev_week_start
),
all_time AS (
  SELECT
    COUNT(*) AS totalGames,                     -- total games ever
    SUM(CASE WHEN is_win = 0 THEN 1 ELSE 0 END) AS totalLosses,
    AVG(duration_seconds) AS averageCompletionTime,
    AVG(word_attempts) AS averageAttempts
  FROM game_stats
  WHERE user_id = :userId
),
last_week AS (
  SELECT
    COUNT(*) AS gamesLastWeek,                  -- games in last 7 days
    SUM(CASE WHEN is_win = 0 THEN 1 ELSE 0 END) AS lossesLastWeek,
    AVG(duration_seconds) AS avgTimeLastWeek,   -- avg time last 7 days
    AVG(word_attempts) AS avgAttemptsLastWeek   -- avg attempts last 7 days
  FROM game_stats, bounds
  WHERE user_id = :userId
    AND completed_at >= bounds.last_week_start
    AND completed_at < bounds.now_ts
),
prev_week AS (
  SELECT
    COUNT(*) AS gamesPrevWeek,                  -- games 7–14 days ago
    SUM(CASE WHEN is_win = 0 THEN 1 ELSE 0 END) AS lossesPrevWeek,
    AVG(duration_seconds) AS avgTimePrevWeek,   -- avg time 7–14 days ago
    AVG(word_attempts) AS avgAttemptsPrevWeek   -- avg attempts 7–14 days ago
  FROM game_stats, bounds
  WHERE user_id = :userId
    AND completed_at >= bounds.prev_week_start
    AND completed_at < bounds.last_week_start
)
SELECT
  COALESCE(all_time.totalGames, 0) AS totalGames,
  COALESCE(last_week.gamesLastWeek, 0) AS gamesLastWeek,

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

  -- Week‑over‑week absolute diffs (last 7 days vs previous 7 days)
  COALESCE(last_week.gamesLastWeek, 0) - COALESCE(prev_week.gamesPrevWeek, 0) AS gamesPlayedDiff,
  ROUND(
    COALESCE(last_week.avgTimeLastWeek, 0) - COALESCE(prev_week.avgTimePrevWeek, 0)
  ) AS weeklyTimeDiff,
  ROUND(
    COALESCE(last_week.avgAttemptsLastWeek, 0) - COALESCE(prev_week.avgAttemptsPrevWeek, 0),
    2
  ) AS attemptDiff,

  -- Week‑over‑week percent diffs (NULL when no baseline)
  ROUND(
    CASE
      WHEN prev_week.gamesPrevWeek IS NULL OR prev_week.gamesPrevWeek = 0
        THEN NULL
      ELSE (last_week.gamesLastWeek - prev_week.gamesPrevWeek)
           / prev_week.gamesPrevWeek * 100.0
    END,
    1
  ) AS gamesPlayedDiffPct,

  ROUND(
    CASE
      WHEN prev_week.avgTimePrevWeek IS NULL OR prev_week.avgTimePrevWeek = 0
        THEN NULL
      ELSE (last_week.avgTimeLastWeek - prev_week.avgTimePrevWeek)
           / prev_week.avgTimePrevWeek * 100.0
    END,
    1
  ) AS weeklyTimeDiffPct,

  ROUND(
    CASE
      WHEN prev_week.avgAttemptsPrevWeek IS NULL OR prev_week.avgAttemptsPrevWeek = 0
        THEN NULL
      ELSE (last_week.avgAttemptsLastWeek - prev_week.avgAttemptsPrevWeek)
           / prev_week.avgAttemptsPrevWeek * 100.0
    END,
    1
  ) AS attemptDiffPct,

  -- Week‑over‑week loss percent diff (percentage points)
  ROUND(
    CASE
      WHEN last_week.gamesLastWeek = 0 OR prev_week.gamesPrevWeek = 0
        THEN NULL
      ELSE (
        (last_week.lossesLastWeek * 100.0) / last_week.gamesLastWeek
        - (prev_week.lossesPrevWeek * 100.0) / prev_week.gamesPrevWeek
      )
    END,
    1
  ) AS weeklyPercentLossDiff
FROM all_time
CROSS JOIN last_week
CROSS JOIN prev_week;