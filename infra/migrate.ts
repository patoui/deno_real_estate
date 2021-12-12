export interface MigrationRepository {
    doesMigrationTableExists(): Promise<boolean>
    createMigrationTable(): Promise<boolean>
    startTransaction(): boolean
    commitTransaction(): Promise<boolean>
    hasMigrationRan(migrationName: string): Promise<boolean>
    executeStatement(sql: string): Promise<boolean>
    markMigrationAsRun(migrationName: string): Promise<boolean>
}

export class Migrate
{
    migrationsDirectoryPath: string;
    migrationRepository: MigrationRepository;

    constructor(migrationsDirectoryPath: string, migrationRepository: MigrationRepository) {
        this.migrationsDirectoryPath = migrationsDirectoryPath;
        this.migrationRepository = migrationRepository;
    }

    run = async () => {
        if (!await this.migrationRepository.doesMigrationTableExists()) {
            // migration table does not exist, create it
            await this.migrationRepository.createMigrationTable();
        }

        for await (const dirEntry of Deno.readDir(this.migrationsDirectoryPath)) {
            if (dirEntry.isFile) {
                const hasAlreadyMigrated = await this.migrationRepository.hasMigrationRan(dirEntry.name);

                // migration has not run, run it.
                if (!hasAlreadyMigrated) {
                    const fileContent = await Deno.readTextFile(`${this.migrationsDirectoryPath}/${dirEntry.name}`);

                    console.log('STARTING MIGRATION: ' + dirEntry.name);

                    await this.migrationRepository.executeStatement(fileContent);
                    await this.migrationRepository.markMigrationAsRun(dirEntry.name);

                    console.log('FINISHED MIGRATION: ' + dirEntry.name);
                }
            }
        }
    }
}
