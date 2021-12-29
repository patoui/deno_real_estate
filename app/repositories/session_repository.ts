import { redis } from "../cache/redis.ts"
import { SessionRepositoryInterface } from '../../domain/session.ts';
import { User } from "../../domain/user.ts";
import Hasher from "../services/hasher.ts";
import { format } from "../../deps.ts";

export default class SessionRepository implements SessionRepositoryInterface {
    generateSessionId = async (user: User): Promise<string> => {
        return await (new Hasher()).hash(
            `${user.id}|${user.email}|` + format(new Date(), "yyyyMMddHHmmssSSS")
        );
    }

    findSession = async (sessionId: string): Promise<User|null> => {
        const userJson = await redis.get(sessionId);
        if (userJson) {
            const userObj = JSON.parse(userJson);
            return new User(
                userObj.id,
                userObj.name,
                userObj.email,
                userObj.created_at,
                userObj.last_accessed_at
            );
        }
        return null;
    }

    doesSessionExists = async (sessionId: string): Promise<boolean> => {
        const session = await redis.get(sessionId);
        return Boolean(session?.toString()).valueOf();
    }

    createSession = async (sessionId: string, user: User): Promise<boolean> => {
        await redis.set(sessionId, JSON.stringify(user), {ex: 3600});
        return Boolean(await redis.get(sessionId)).valueOf();
    }
}