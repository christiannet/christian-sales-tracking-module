import { Promoter } from '../../domain/entities/Promoter';
import { IPromoterRepository } from '../../domain/repositories/IPromoterRepository';
import { getDatabase } from '../database/Database';
import { verifyPassword } from '../crypto/password';

interface PromoterRow {
  id: number;
  name: string;
  email: string;
  password: string;
  monthly_goal: number;
  created_at: string;
}

/** SQLite-backed implementation of {@link IPromoterRepository}. */
export class SQLitePromoterRepository implements IPromoterRepository {
  /**
   * Maps a raw SQLite row to a domain {@link Promoter} entity.
   *
   * @param row - Raw row as returned by better-sqlite3.
   * @returns The mapped {@link Promoter} entity.
   */
  private toEntity(row: PromoterRow): Promoter {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      monthlyGoal: row.monthly_goal,
      createdAt: new Date(row.created_at),
    };
  }

  /**
   * Finds a promoter by their primary key.
   *
   * @param id - Numeric promoter ID.
   * @returns The matching {@link Promoter} or `null` if not found.
   */
  public findById(id: number): Promoter | null {
    const row = getDatabase()
      .prepare('SELECT * FROM promoters WHERE id = ?')
      .get(id) as PromoterRow | undefined;
    return row ? this.toEntity(row) : null;
  }

  /**
   * Finds a promoter by their unique email address.
   *
   * @param email - Email to look up.
   * @returns The matching {@link Promoter} or `null` if not found.
   */
  public findByEmail(email: string): Promoter | null {
    const row = getDatabase()
      .prepare('SELECT * FROM promoters WHERE email = ?')
      .get(email) as PromoterRow | undefined;
    return row ? this.toEntity(row) : null;
  }

  public findByEmailAndPassword(email: string, password: string): Promoter | null {
    const row = getDatabase()
      .prepare('SELECT * FROM promoters WHERE email = ?')
      .get(email) as PromoterRow | undefined;
    if (!row || !verifyPassword(password, row.password)) return null;
    return this.toEntity(row);
  }

  /**
   * Returns all promoters sorted alphabetically by name.
   *
   * @returns An array of all {@link Promoter} entities.
   */
  public findAll(): Promoter[] {
    const rows = getDatabase()
      .prepare('SELECT * FROM promoters ORDER BY name ASC')
      .all() as PromoterRow[];
    return rows.map((r) => this.toEntity(r));
  }

  /**
   * Inserts a new promoter record and returns the persisted entity.
   *
   * @param data - Promoter data without auto-generated `id` or `createdAt`.
   * @returns The newly created {@link Promoter} entity.
   */
  public create(data: Omit<Promoter, 'id' | 'createdAt'>): Promoter {
    const result = getDatabase()
      .prepare('INSERT INTO promoters (name, email, monthly_goal) VALUES (?, ?, ?)')
      .run(data.name, data.email, data.monthlyGoal);
    return this.findById(result.lastInsertRowid as number)!;
  }
}
