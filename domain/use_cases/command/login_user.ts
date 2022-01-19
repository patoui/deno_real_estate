import { User } from '../../../domain/user.ts';
import {
  CookieStoreInterface,
  SessionRepositoryInterface,
} from '../../../domain/session.ts';
import { Status } from '../status.ts';

export default class LoginUser {
  sessionRepository: SessionRepositoryInterface;
  cookieStore: CookieStoreInterface;

  constructor(
    sessionRepository: SessionRepositoryInterface,
    cookieStore: CookieStoreInterface,
  ) {
    this.sessionRepository = sessionRepository;
    this.cookieStore = cookieStore;
  }

  handle = async (user: User): Promise<Status> => {
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
