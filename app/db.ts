import { Client } from "https://deno.land/x/postgres/mod.ts";

export const client = new Client({
  user: "deno_test",
  password: "deno_test_pass",
  database: "deno_test_db",
  hostname: "database",
  port: 5432,
  tls: {
      enforce: false
  }
});

await client.connect();