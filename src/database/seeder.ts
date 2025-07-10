import { Pool } from 'pg';
import { dbConfig } from './db.config';

async function seed() {
  const pool = new Pool(dbConfig);
  try {
    const sql = `
            INSERT INTO todos (title, description, is_done)
            VALUES
                ('Learn NestJS', 'Study the basics of NestJS framework', false),
                ('Build a Todo App', 'Create a simple Todo application using NestJS', false),
                ('Write Tests', 'Add unit tests for the Todo application', false);
        `;
    await pool.query(sql);
    console.log('Seeding completed successfully.');
  } catch (error: unknown) {
    console.error('Seeding failed:', error);
  } finally {
    await pool.end();
  }
}

seed();
