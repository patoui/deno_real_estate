import { NewUser, UserRepositoryInterface } from '../../domain/user.ts';
import { Status } from "./status.ts";

export default class CreateUser {
    repository: UserRepositoryInterface;

    constructor(repository: UserRepositoryInterface) {
        this.repository = repository;
    }

    handle = async (newUser: NewUser): Promise<Status> => {
        const doesUserExists = await this.repository.doesUserExists(newUser.email);
        if (doesUserExists) {
            return new Status(false, `User for email ${newUser.email} already exist`);
        }

        const createdSuccessfully = await this.repository.createUser(newUser);

        if (!createdSuccessfully) {
            return new Status(false, 'Unable to create user');
        }

        return new Status(true);
    }
}