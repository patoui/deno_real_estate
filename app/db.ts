// import { RouteHandler } from "../routes.ts"
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

// export const client;

// const arrayResult = await client.queryArray("SELECT ID, NAME FROM PEOPLE");
// console.log(arrayResult.rows); // [[1, 'Carlos'], [2, 'John'], ...]

// const objectResult = await client.queryObject("SELECT ID, NAME FROM PEOPLE");
// console.log(objectResult.rows); // [{id: 1, name: 'Carlos'}, {id: 2, name: 'John'}, ...]

// await client.end();

// export default class DbHandler implements RouteHandler {
//     handle(request: Request): Response {
//         return new Response("DB page!", { status: 200 });
//     }
// }
