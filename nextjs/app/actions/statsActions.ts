"use server";

import { insertGameStats, getUserStats } from "@/lib/db/stats";
import { getServerSession } from "@/lib/authHelpers";
import { AddStatsSchema } from "@/lib/schemas";
import { flattenErrors } from "@/lib/errors";

export async function insertStatsAction({
  durationSeconds,
  wordAttempts,
  isWin,
  targetWord,
}: {
  durationSeconds: number;
  wordAttempts: number;
  isWin: boolean;
  targetWord: string;
}) {
  // get userID from session or auth context
  const session = await getServerSession();
  const userID = session?.user?.id;
  if (!userID) {
    return {
      success: false,
      error: { form: ["User not authenticated"] },
    };
  }
  const validatedFields = AddStatsSchema.safeParse({
    durationSeconds,
    wordAttempts,
    isWin,
    targetWord,
  });
  if (!validatedFields.success) {
    return {
      success: false,
      error: flattenErrors(validatedFields.error),
    };
  }
  try {
    insertGameStats({
      userID,
      ...validatedFields.data,
    });

    return { success: true };
  } catch (error) {
    console.error("Error inserting game stats::", JSON.stringify(error));

    return {
      success: false,
      error: {
        form: [(error as Error).message || "Failed to insert game stats"],
      },
    };
  }
}

export async function getStatsAction() {
  const session = await getServerSession();
  const userID = session?.user?.id;
  if (!userID) {
    return {
      success: false,
      error: { form: ["User not authenticated"] },
    };
  }
  try {
    const stats = getUserStats(userID);
    return { success: true, stats };
  } catch (error) {
    console.error("Error fetching user stats:", JSON.stringify(error));
    return {
      success: false,
      error: {
        form: [(error as Error).message || "Failed to fetch user stats"],
      },
    };
  }
}
