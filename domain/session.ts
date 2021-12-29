import { User } from "./user.ts";

export interface SessionRepositoryInterface {
    generateSessionId(user: User): Promise<string>;
    doesSessionExists(sessionId: string): Promise<boolean>;
    createSession(sessionId: string, user: User): Promise<boolean>;
}

export interface CookieStoreInterface {
    // deno-lint-ignore no-explicit-any ban-types
    set(key: string, value: any, config?: object): void;
    get(key: string): Promise<unknown>;
}
