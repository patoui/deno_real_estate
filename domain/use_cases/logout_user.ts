import { CookieStoreInterface, SessionRepositoryInterface } from '../../domain/session.ts';
import { Status } from './status.ts';

export default class LogoutUser {
  sessionRepository: SessionRepositoryInterface;
  cookieStore: CookieStoreInterface;

  constructor(
    sessionRepository: SessionRepositoryInterface,
    cookieStore: CookieStoreInterface,
  ) {
    this.sessionRepository = sessionRepository;
    this.cookieStore = cookieStore;
  }

  handle = async (): Promise<Status> => {
    const sessionId = await this.cookieStore.get('user_session');

    // no session set, exit early.
    if (!sessionId) {
      return new Status(true);
    }

    const destroyedCookieSuccessfully = this.cookieStore.destroy('user_session');

    if (!destroyedCookieSuccessfully) {
      return new Status(false, 'Unable to destroy cookie');
    }

    const destroyedSuccessfully = await this.sessionRepository.destroySession(sessionId);

    if (!destroyedSuccessfully) {
      return new Status(false, 'Unable to destroy session');
    }

    return new Status(true);
  };
}
