import { client } from "../database/db.ts"
import { User, NewUser, UserRepositoryInterface } from '../../domain/user.ts';

// TODO: determine be way to fetch/use client, maybe pass into constructor?
export default class UserRepository implements UserRepositoryInterface {
    doesUserExists = async (email: string): Promise<boolean> => {
        const emailExists = await client.queryArray(
            `SELECT EXISTS(SELECT FROM users WHERE email = $1 LIMIT 1);`,
            email
        );
        return Boolean(emailExists.rows[0][0] ?? false).valueOf();
    }

    createUser = async (newUser: NewUser): Promise<boolean> => {
        // TODO: add password hashing.
        await client.queryArray(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
            newUser.name,
            newUser.email,
            newUser.password
        );

        return true;
    }

    findUserByEmail = async (email: string): Promise<User|null> => {
        const results = await client.queryObject<User>(
            `SELECT id, name, email, created_at, last_accessed_at FROM users WHERE email = $1 LIMIT 1;`,
            email
        );

        const user = results.rows[0] ?? null;

        if (!user) {
            return null;
        }

        return new User(
            user.id,
            user.name,
            user.email,
            user.created_at,
            user.last_accessed_at
        );
    }

    findById = async (id: bigint): Promise<User|null> => {
        const results = await client.queryObject<User>(
            `SELECT id, name, email, created_at, last_accessed_at FROM users WHERE id = $1 LIMIT 1;`,
            id
        );

        const user = results.rows[0] ?? null;

        if (!user) {
            return null;
        }

        return new User(
            user.id,
            user.name,
            user.email,
            user.created_at,
            user.last_accessed_at
        );
    }
}