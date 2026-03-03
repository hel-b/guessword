import "dotenv/config";
import Database from "better-sqlite3-multiple-ciphers";
import path from "path";

export type dbName = "dictionary" | "users";

export interface DbConfig {
  file: string;
  options?: Database.Options;
  key?: string; // Encryption key (users.db)
  pragmas?: string[]; // Optional PRAGMA list
}

const instances = new Map<dbName, Database.Database>();

const defaults: Record<dbName, DbConfig> = {
  dictionary: {
    file:
      process.env.DICTIONARY_DB_PATH ??
      path.join(process.cwd(), "data", "dictionary.db"),
    options: { readonly: true },
    // No WAL needed; read-only and static
    pragmas: [],
  },
  users: {
    file:
      process.env.USERS_DB_PATH ?? path.join(process.cwd(), "data", "users.db"),
    options: { readonly: false },
    key: process.env.USERS_DB_ENCRYPT_KEY || "", // set in env for encryption
    pragmas: ["foreign_keys=ON", "journal_mode=WAL"], // WAL helps concurrent writes
  },
};

export function getDB(
  name: dbName,
  override?: Partial<DbConfig>,
): Database.Database {
  if (!instances.has(name)) {
    const cfg = { ...defaults[name], ...override };
    const options: Record<string, unknown> = {
      fileMustExist: !!cfg.options?.readonly,
      readonly: !!cfg.options?.readonly,
    };

    // Create the database connection
    const db = new Database(cfg.file, options);

    // Build pragmas array, including encryption key if present
    // Encryption key pragma must be first if used
    const pragmas: string[] = cfg.key
      ? [`key='${cfg.key}'`, ...(cfg.pragmas ?? [])]
      : (cfg.pragmas ?? []);

    // Apply PRAGMAs after opening
    for (const pragma of pragmas) {
      db.pragma(pragma);
    }

    instances.set(name, db);
  }
  return instances.get(name)!;
}

export function closeDB(name?: dbName) {
  if (name) {
    const db = instances.get(name);
    if (db) {
      db.close();
      instances.delete(name);
    }
    return;
  }
}

export function closeAllDBs() {
  for (const [n, db] of instances) {
    db.close();
    instances.delete(n);
  }
}
