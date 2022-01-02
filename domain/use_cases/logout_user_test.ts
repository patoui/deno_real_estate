import { assert, delay } from "../../dev_deps.ts";
import { format } from "../../deps.ts";
import {
  CookieStoreInterface,
  SessionRepositoryInterface,
} from "../session.ts";
import { User } from "../user.ts";
import LoginUser from "./login_user.ts";
import LogoutUser from "./logout_user.ts";

class MockSessionRepository implements SessionRepositoryInterface {
  public data: { [k: string]: boolean } = {};

  generateSessionId = async (user: User): Promise<string> => {
    await delay(1);
    return "user_" + String(user.id).valueOf();
  };

  doesSessionExists = async (sessionId: string): Promise<boolean> => {
    await delay(1);
    return this.data[sessionId] ?? false;
  };

  createSession = async (sessionId: string): Promise<boolean> => {
    await delay(1);
    this.data[sessionId] = true;
    return true;
  };

  destroySession = async (sessionId: string): Promise<boolean> => {
    await delay(1);
    delete this.data[sessionId];
    return true;
  };
}

class MockCookieRepository implements CookieStoreInterface {
  // deno-lint-ignore no-explicit-any
  public data: { [k: string]: any } = {};

  // deno-lint-ignore no-explicit-any ban-types
  set = (key: string, value: any, _config?: object): void => {
    this.data[key] = value;
  };

  get = async (key: string): Promise<string> => {
    await delay(1);
    return this.data[key];
  };

  destroy = async (key: string): Promise<boolean> => {
    await delay(1);
    delete this.data[key];
    return true;
  };
}

Deno.test("Logout User", async () => {
  // Arrange
  const mockSessionRepository = new MockSessionRepository();
  const mockCookieRepository = new MockCookieRepository();
  const loginUserCase = new LoginUser(
    mockSessionRepository,
    mockCookieRepository,
  );
  const logoutUserCase = new LogoutUser(
    mockSessionRepository,
    mockCookieRepository,
  );
  const now = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  const user = new User(
    1,
    "John Doe",
    "johndoe@gmail.com",
    now,
    now,
  );
  await loginUserCase.handle(user);

  // Pre-assert
  // user should exists at this point
  // TODO: fix it, it's pulling from cookie store for the session id, likely doesn't match.
  assert(
    await mockSessionRepository.doesSessionExists(
      "user_" + String(user.id).valueOf(),
    ),
  );

  // Act
  await logoutUserCase.handle();

  // Assert
  // verify user has been created and exist
  assert(
    !await mockSessionRepository.doesSessionExists(
      "user_" + String(user.id).valueOf(),
    ),
  );
});
