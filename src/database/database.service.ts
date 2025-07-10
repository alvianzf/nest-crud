import { Injectable } from '@nestjs/common';
import { Pool, QueryResult, QueryResultRow } from 'pg';
import { dbConfig } from './db.config';

@Injectable()
export class DatabaseService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      ...dbConfig,
      max: 10,
    });
  }

  async query<T extends QueryResultRow = any>(
    sql: string,
    params: any[] = [],
  ): Promise<T[]> {
    try {
      const result: QueryResult<T> = await this.pool.query(sql, params);
      return result.rows;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('DB Query Error:', error.message);
        throw error;
      }
      console.error('Unknown DB Error:', error);
      throw new Error('Database query failed');
    }
  }
}
