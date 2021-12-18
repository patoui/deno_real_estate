import { client } from "../database/db.ts"
import { NewUser, UserRepositoryInterface } from '../../domain/user.ts';

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
}