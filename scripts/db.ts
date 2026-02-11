import "dotenv/config";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("Missing DATABASE_URL env var");
  process.exit(1);
}

const pool = new Pool({ connectionString: databaseUrl });

function readSql(relPath: string) {
  return readFileSync(resolve(process.cwd(), relPath), "utf8");
}

async function run(sql: string) {
  const client = await pool.connect();
  try {
    await client.query(sql);
  } finally {
    client.release();
  }
}

async function main() {
  const cmd = process.argv[2]; // "setup" | "reset" | "rebuild"
  if (!cmd) {
    console.error("Usage: ts-node scripts/db.ts <setup|reset|rebuild>");
    process.exit(1);
  }

  if (cmd === "reset") {
    await run(readSql("db/reset.sql"));
    console.log("DB reset OK");
    return;
  }

  if (cmd === "setup") {
    await run(readSql("db/schema.sql"));
    console.log("DB setup OK");
    return;
  }

  if (cmd === "rebuild") {
    await run(readSql("db/reset.sql"));
    await run(readSql("db/schema.sql"));
    console.log("DB rebuild OK");
    return;
  }

  console.error(`Unknown command: ${cmd}`);
  process.exit(1);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
  });
