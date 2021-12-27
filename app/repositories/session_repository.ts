import { redis } from "../cache/redis.ts"
import { SessionRepositoryInterface } from '../../domain/session.ts';

export default class SessionRepository implements SessionRepositoryInterface {
    doesSessionExists = async (sessionId: string): Promise<boolean> => {
        const session = await redis.get(this.getSessionKey(sessionId));
        return Boolean(session?.toString()).valueOf();
    }

    createSession = async (sessionId: string): Promise<boolean> => {
        // TODO: determine appropriate values to set
        const sessionKey = this.getSessionKey(sessionId);
        // TODO: set expiry
        await redis.set(sessionKey, 1, {ex: 3600});
        return Boolean(await redis.get(sessionKey)).valueOf();
    }

    private getSessionKey = (sessionId: string): string => {
        return `user_${sessionId}`;
    }
}