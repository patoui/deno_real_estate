import { User } from '../../domain/user.ts';
import { SessionRepositoryInterface } from '../../domain/session.ts';
import { Status } from "./status.ts";

export default class LoginUser {
    sessionRepository: SessionRepositoryInterface;

    constructor(sessionRepository: SessionRepositoryInterface) {
        this.sessionRepository = sessionRepository;
    }

    handle = async (user: User): Promise<Status> => {
        const createdSuccessfully = await this.sessionRepository.createSession(
            String(user.id).valueOf()
        );

        if (!createdSuccessfully) {
            return new Status(false, 'Unable to create session');
        }

        return new Status(true);
    }
}