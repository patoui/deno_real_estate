import { client } from "./db.ts"

const migrationsTableExists = await client.queryArray`
SELECT EXISTS(
    SELECT FROM pg_tables
        WHERE schemaname = 'public'
        AND tablename = 'migrations'
);
`

// migration table does not exist, create it
if (!(migrationsTableExists.rows[0][0] || false)) {
    await client.queryArray`
    CREATE TABLE IF NOT EXISTS migrations (
        id   SERIAL PRIMARY KEY NOT NULL,
        name TEXT               NOT NULL
    )
    `;
}

const transaction = client.createTransaction("migration_transaction");
await transaction.begin();

for await (const dirEntry of Deno.readDir('../migrations')) {
    if (dirEntry.isFile) {
        const hasAlreadyMigrated = await transaction.queryArray(
            "SELECT EXISTS(SELECT FROM migrations WHERE name = $1)",
            dirEntry.name
        );

        // file has not migrated yet, process it.
        if (!(hasAlreadyMigrated.rows[0][0] || false)) {
            const fileContent = await Deno.readTextFile("../migrations/" + dirEntry.name);

            console.log('STARTING MIGRATION: ' + dirEntry.name);

            await transaction.queryArray(fileContent);
            await transaction.queryArray(
                "INSERT INTO migrations (name) VALUES ($1)",
                dirEntry.name
            );

            console.log('FINISHED MIGRATION: ' + dirEntry.name);
        }
    }

}

await transaction.commit();
