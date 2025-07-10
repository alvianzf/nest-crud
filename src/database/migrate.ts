import { Pool } from "pg";
import { dbConfig } from "./db.config";
import * as fs from "fs";
import * as path from "path";

async function migrate() {
    const pool = new Pool(dbConfig);
    try {
        const migrationDir = path.resolve(__dirname, "../migrations");
        const files = fs.readdirSync(migrationDir).filter(file => file.endsWith(".sql"));

        for (const file of files) {
            const sql = fs.readFileSync(path.join(migrationDir, file), "utf-8");
            console.log(`Running migration: ${file}`);
            await pool.query(sql);
        }
        console.log("All migrations completed successfully.");
    } catch (error: unknown) {
        console.error("Migration failed:", error);
    } finally {
        await pool.end();
    }
}

migrate();