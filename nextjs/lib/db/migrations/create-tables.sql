CREATE TABLE IF NOT EXISTS game_stats (
  id INTEGER PRIMARY KEY NOT NULL,
  user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  completed_at INTEGER NOT NULL DEFAULT (unixepoch('now')),
  duration_seconds INTEGER NOT NULL CHECK (duration_seconds >= 0),
  word_attempts INTEGER NOT NULL CHECK (word_attempts >= 1 AND word_attempts <= 7),
  is_win TINYINT NOT NULL CHECK (is_win IN (0, 1)),
  target_word CHAR(6) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_game_stats_user_date
ON game_stats(user_id, completed_at DESC);