export interface SessionRepositoryInterface {
    doesSessionExists(sessionId: string): Promise<boolean>;
    createSession(sessionId: string): Promise<boolean>;
}