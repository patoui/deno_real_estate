import { UserRepositoryInterface } from '../../../domain/user.ts';
import {
  CookieStoreInterface,
  SessionRepositoryInterface,
} from '../../../domain/session.ts';
import { Status } from '../status.ts';
import Hasher from "../../../application/services/hasher.ts";

export default class LoginUser {
  userRepository: UserRepositoryInterface;
  sessionRepository: SessionRepositoryInterface;
  cookieStore: CookieStoreInterface;

  constructor(
    userRepository: UserRepositoryInterface,
    sessionRepository: SessionRepositoryInterface,
    cookieStore: CookieStoreInterface,
  ) {
    this.userRepository = userRepository;
    this.sessionRepository = sessionRepository;
    this.cookieStore = cookieStore;
  }

  handle = async (email: string, password_attempt: string): Promise<Status> => {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      return new Status(false, 'User not found.');
    }

    if (!Hasher.verify(user.password, password_attempt)) {
      return new Status(false, 'Unable to authenticate.');
    }

    const sessionId = await this.sessionRepository.generateSessionId(user);
    const createdSuccessfully = await this.sessionRepository.createSession(
        sessionId,
        user
    );

    if (!createdSuccessfully) {
      return new Status(false, 'Unable to create session');
    }

    // TODO: find better place for max age/expiry for cookie/session
    this.cookieStore.set('user_session', sessionId, { maxAge: 3600 });

    return new Status(true);
  };
}
