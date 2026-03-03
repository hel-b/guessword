import { UserStats } from "../../lib/db/stats";

const diffDescText = (
  diff?: number | null,
  diffPct?: number | null,
  units?: string,
) => {
  if (diff === undefined || diff === null) {
    return `N/A vs previous 5 games`;
  }
  const diffPctText =
    diffPct !== undefined && diffPct !== null
      ? ` (${diffPct < 0 ? `-` : `+`}${diffPct}%)`
      : "";
  const diffText = `${diff < 0 ? `↘︎` : `↗`} ${Math.abs(diff)}${units ? units : ""}`;
  return `${diffText}${diffPctText} vs previous 5 games`;
};

export default function StatsCard({ stats }: Readonly<{ stats?: UserStats }>) {
  return (
    <div className="card prose w-full min-w-xs items-center bg-base-100 shadow-2xl md:min-w-fit">
      <div className="card-body w-fit">
        <div className="stats w-fit stats-vertical sm:stats-horizontal sm:max-lg:grid-cols-2 sm:max-lg:grid-rows-2">
          <div className="stat">
            <div className="stat-title">Total Games Played</div>
            <div className="stat-value">{stats?.totalGames ?? "N/A"}</div>
            <div className="stat-desc">
              ↗ {stats?.gamesLast7Days ?? "N/A"} in the last 7 days
            </div>
          </div>
          <div className="stat">
            <div className="stat-title">Total Percent Losses</div>
            <div className="stat-value">
              {stats?.totalPercentLosses ?? "N/A"}
              {stats?.totalPercentLosses && "%"}
            </div>
            <div className="stat-desc">
              {diffDescText(stats?.percentLossDiff, undefined, "%")}
            </div>
          </div>
          <div className="stat max-lg:border-r-0">
            <div className="stat-title">Average Completion Time</div>
            <div className="stat-value">
              {stats?.averageCompletionTime ?? "N/A"}
              {stats?.averageCompletionTime && "s"}
            </div>
            <div className="stat-desc">
              {diffDescText(stats?.timeDiff, stats?.timeDiffPct, "s")}
            </div>
          </div>
          <div className="stat">
            <div className="stat-title">Average Word Attempts</div>
            <div className="stat-value">{stats?.averageAttempts ?? "N/A"}</div>
            <div className="stat-desc">
              {diffDescText(stats?.attemptDiff, stats?.attemptDiffPct)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
