import { client } from "./db.ts"
import { MigrationRepository, Migrate } from "../../infrastructure/migrate.ts"
import { Client } from "https://deno.land/x/postgres@v0.14.2/client.ts";
import { Transaction } from "https://deno.land/x/postgres@v0.14.2/query/transaction.ts";

class PostgresMigrationRepository implements MigrationRepository
{
    client: Client;
    transaction?: Transaction

    constructor(client: Client) {
        this.client = client;
    }

    doesMigrationTableExists = async (): Promise<boolean> => {
        const migrationsTableExists = await this.client.queryArray`
        SELECT EXISTS(
            SELECT FROM pg_tables
                WHERE schemaname = 'public'
                AND tablename = 'migrations'
        );
        `

        return Boolean(migrationsTableExists.rows[0][0] ?? false).valueOf();
    }

    createMigrationTable = async (): Promise<boolean> => {
        await this.client.queryArray`
        CREATE TABLE IF NOT EXISTS migrations (
            id     SERIAL PRIMARY KEY NOT NULL,
            name   TEXT               NOT NULL,
            ran_at TIMESTAMP          NOT NULL DEFAULT NOW()
        )
        `;

        return true;
    }

    startTransaction = async (): Promise<boolean> => {
        const newTransaction = this.client.createTransaction("migration_transaction");
        await newTransaction.begin();
        this.transaction = newTransaction;

        return true;
    }

    commitTransaction = async (): Promise<boolean> => {
        if (this.transaction) {
            await this.transaction.commit();
        }

        return true;
    }

    hasMigrationRan = async (migrationName: string): Promise<boolean> => {
        const hasAlreadyMigrated = await this.getExecutor().queryArray(
            "SELECT EXISTS(SELECT FROM migrations WHERE name = $1)",
            [migrationName]
        );

        return Boolean(hasAlreadyMigrated.rows[0][0] ?? false).valueOf();
    }

    executeStatement = async (sql: string): Promise<boolean> => {
        await this.getExecutor().queryArray(sql);

        return true;
    }

    markMigrationAsRun = async (migrationName: string): Promise<boolean> => {
        await this.getExecutor().queryArray(
            "INSERT INTO migrations (name) VALUES ($1)",
            [migrationName]
        );

        return true;
    }

    private getExecutor = () => {
        return this.transaction ?? this.client;
    }
}

const migrator = new Migrate('./application/database/migrations', new PostgresMigrationRepository(client));

migrator.run();
