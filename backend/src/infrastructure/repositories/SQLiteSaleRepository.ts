import { Sale } from '../../domain/entities/Sale';
import { ISaleRepository } from '../../domain/repositories/ISaleRepository';
import { getDatabase } from '../database/Database';

interface SaleRow {
  id: number;
  promoter_id: number;
  amount: number;
  description: string;
  sale_date: string;
  created_at: string;
}

/** SQLite-backed implementation of {@link ISaleRepository}. */
export class SQLiteSaleRepository implements ISaleRepository {
  /**
   * Maps a raw SQLite row to a domain {@link Sale} entity.
   *
   * @param row - Raw row as returned by better-sqlite3.
   * @returns The mapped {@link Sale} entity.
   */
  private toEntity(row: SaleRow): Sale {
    return {
      id: row.id,
      promoterId: row.promoter_id,
      amount: row.amount,
      description: row.description,
      saleDate: new Date(row.sale_date),
      createdAt: new Date(row.created_at),
    };
  }

  /**
   * Finds a single sale by its primary key.
   *
   * @param id - Numeric sale ID.
   * @returns The matching {@link Sale} or `null` if not found.
   */
  private findById(id: number): Sale | null {
    const row = getDatabase()
      .prepare('SELECT * FROM sales WHERE id = ?')
      .get(id) as SaleRow | undefined;
    return row ? this.toEntity(row) : null;
  }

  /**
   * Inserts a new sale record and returns the persisted entity.
   *
   * @param data - Sale data without auto-generated `id` or `createdAt`.
   * @returns The newly created {@link Sale} entity.
   */
  public create(data: Omit<Sale, 'id' | 'createdAt'>): Sale {
    const result = getDatabase()
      .prepare(
        'INSERT INTO sales (promoter_id, amount, description, sale_date) VALUES (?, ?, ?, ?)',
      )
      .run(
        data.promoterId,
        data.amount,
        data.description,
        data.saleDate.toISOString(),
      );
    return this.findById(result.lastInsertRowid as number)!;
  }

  /**
   * Returns all sales for a given promoter, ordered by date descending.
   *
   * @param promoterId - ID of the promoter.
   * @returns An array of {@link Sale} entities.
   */
  public findByPromoterId(promoterId: number): Sale[] {
    const rows = getDatabase()
      .prepare(
        'SELECT * FROM sales WHERE promoter_id = ? ORDER BY sale_date DESC',
      )
      .all(promoterId) as SaleRow[];
    return rows.map((r) => this.toEntity(r));
  }

  /**
   * Returns sales for a given promoter within a specific calendar month.
   *
   * @param promoterId - ID of the promoter.
   * @param year       - Four-digit year.
   * @param month      - Month number, 1-based (January = 1).
   * @returns An array of {@link Sale} entities within the given month.
   */
  public findByPromoterIdAndMonth(
    promoterId: number,
    year: number,
    month: number,
  ): Sale[] {
    const start = new Date(year, month - 1, 1).toISOString();
    const end   = new Date(year, month,     0, 23, 59, 59, 999).toISOString();
    const rows = getDatabase()
      .prepare(
        `SELECT * FROM sales
         WHERE promoter_id = ?
           AND sale_date >= ?
           AND sale_date <= ?
         ORDER BY sale_date DESC`,
      )
      .all(promoterId, start, end) as SaleRow[];
    return rows.map((r) => this.toEntity(r));
  }

  /**
   * Returns all sales across all promoters, ordered by date descending.
   *
   * @returns An array of all {@link Sale} entities.
   */
  public findAll(): Sale[] {
    const rows = getDatabase()
      .prepare('SELECT * FROM sales ORDER BY sale_date DESC')
      .all() as SaleRow[];
    return rows.map((r) => this.toEntity(r));
  }
}
