import { client } from "./db.ts"

// TODO: add fetching all files from `migrations` directory
// TODO: add/create `migrations` table, check if migration has already been run, if not run it
// TODO: add output to show when a migration starts and ends

const fileContent = await Deno.readTextFile("../migrations/create_people_table.sql");

console.log('STARTING MIGRATION');

const transaction = client.createTransaction("migration_transaction");
await transaction.begin();

await transaction.queryArray(fileContent);

await transaction.commit();

console.log('FINISHED MIGRATION');