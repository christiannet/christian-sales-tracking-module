import BetterSqlite3 from 'better-sqlite3';
import path from 'path';
import { hashPassword } from '../crypto/password';

const DB_PATH = process.env.DB_PATH ?? path.join(process.cwd(), 'sales-tracking.db');

let db: BetterSqlite3.Database;

/**
 * Returns the singleton SQLite database instance, creating and initialising
 * it on the first call (WAL mode, foreign keys, schema, and seed data).
 *
 * @returns The shared {@link BetterSqlite3.Database} instance.
 */
export function getDatabase(): BetterSqlite3.Database {
  if (!db) {
    db = new BetterSqlite3(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initializeSchema(db);
    seedDemoData(db);
  }
  return db;
}

/**
 * Creates the `promoters` and `sales` tables if they do not already exist.
 *
 * @param db - The active database connection.
 */
function initializeSchema(db: BetterSqlite3.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS promoters (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      name         TEXT    NOT NULL,
      email        TEXT    NOT NULL UNIQUE,
      password     TEXT    NOT NULL DEFAULT '1234',
      monthly_goal REAL    NOT NULL DEFAULT 10000,
      created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS sales (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      promoter_id  INTEGER NOT NULL,
      amount       REAL    NOT NULL,
      description  TEXT    NOT NULL,
      sale_date    DATETIME NOT NULL,
      created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (promoter_id) REFERENCES promoters(id)
    );
  `);

  // Migrate existing databases that don't have the password column yet
  const cols = db.prepare("PRAGMA table_info(promoters)").all() as { name: string }[];
  if (!cols.some(c => c.name === 'password')) {
    db.exec("ALTER TABLE promoters ADD COLUMN password TEXT NOT NULL DEFAULT '1234'");
  }
}

/**
 * Inserts three demo promoters when the database is first initialised
 * (i.e., when the `promoters` table is empty).
 *
 * @param db - The active database connection.
 */
function seedDemoData(db: BetterSqlite3.Database): void {
  const { count } = db
    .prepare('SELECT COUNT(*) AS count FROM promoters')
    .get() as { count: number };

  if (count > 0) return;

  const insert = db.prepare(
    'INSERT INTO promoters (name, email, password, monthly_goal) VALUES (?, ?, ?, ?)',
  );
  insert.run('Alice Rivera', 'alice.rivera@company.com',  hashPassword('alice123'),  50000);
  insert.run('Brian Torres', 'brian.torres@company.com',  hashPassword('brian123'),  45000);
  insert.run('Carmen López', 'carmen.lopez@company.com',  hashPassword('carmen123'), 40000);
}
