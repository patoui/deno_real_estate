import { Client, config } from "../../deps.ts"

const cfg = config();
export const client = new Client({
  user: cfg.DB_USER,
  password: cfg.DB_PASS,
  database: cfg.DB_NAME,
  hostname: cfg.DB_HOST,
  port: cfg.DB_PORT,
  tls: {
      enforce: false
  }
});

await client.connect();