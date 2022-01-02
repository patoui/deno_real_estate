import { User } from "./user.ts";

export interface SessionRepositoryInterface {
    generateSessionId(user: User): Promise<string>;
    doesSessionExists(sessionId: string): Promise<boolean>;
    createSession(sessionId: string, user: User): Promise<boolean>;
    destroySession(sessionId: string): Promise<boolean>;
}

export interface CookieStoreInterface {
    // deno-lint-ignore no-explicit-any
    set(key: string, value: any, config?: { [key: string]: unknown }): void;
    get(key: string): Promise<string>;
    destroy(key: string): Promise<boolean>;
}
