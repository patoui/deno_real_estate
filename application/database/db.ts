import { Client } from "../../deps.ts"

export const client = new Client({
  user: Deno.env.get("DB_USER"),
  password: Deno.env.get("DB_PASS"),
  database: Deno.env.get("DB_NAME"),
  hostname: Deno.env.get("DB_HOST"),
  port: parseInt(Deno.env.get("DB_PORT") ?? "8080"),
  tls: {
      enforce: false
  }
});

await client.connect();
