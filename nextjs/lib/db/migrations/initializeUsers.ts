import fs from "fs";
// import "dotenv/config";
import path from "path";
import { getDB, closeAllDBs } from "../connection";
import { execSync } from "child_process";

initializeUsers();
initializeGameStats();
closeAllDBs();
function initializeGameStats() {
  const db = getDB("users");

  // Check if the game_stats table exists
  const tableExists = db
    .prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='game_stats';",
    )
    .get();

  if (!tableExists) {
    console.log("Creating game_stats table...");

    // Create the game_stats table
    const sqlPath = path.join(__dirname, "create-tables.sql");
    const sql = fs.readFileSync(sqlPath, "utf8");
    db.exec(sql);
    console.log("game_stats table created successfully.");
  } else {
    console.log("game_stats table already exists. No migration needed.");
  }
}

function initializeUsers() {
  // connect or create the users database
  const db = getDB("users");

  // Check if the users table exists
  const tableExists = db
    .prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='user';",
    )
    .get();

  if (!tableExists) {
    console.log("Creating better-auth tables...");
    try {
      execSync("npx @better-auth/cli@latest migrate --yes", {
        stdio: "inherit",
      });
      console.log("better-auth tables created successfully.");
    } catch (error) {
      console.error("Migration failed:", error);
      throw error;
    }
  }
}
