import { assert, delay } from "../../dev_deps.ts";
import { format } from "../../deps.ts";
import {
  CookieStoreInterface,
  SessionRepositoryInterface,
} from "../session.ts";
import { User } from "../user.ts";
import LoginUser from "./login_user.ts";

class MockSessionRepository implements SessionRepositoryInterface {
  public data: { [k: string]: boolean } = {};

  generateSessionId = async (user: User): Promise<string> => {
    await delay(1);
    return String(user.id).valueOf();
  };

  doesSessionExists = async (sessionId: string): Promise<boolean> => {
    await delay(1);
    return this.data[`user_${sessionId}`] ?? false;
  };

  createSession = async (sessionId: string): Promise<boolean> => {
    await delay(1);
    this.data[`user_${sessionId}`] = true;
    return true;
  };
}

class MockCookieRepository implements CookieStoreInterface {
  // deno-lint-ignore no-explicit-any
  public data: { [k: string]: any } = {};

  // deno-lint-ignore no-explicit-any ban-types
  set = (key: string, value: any, _config?: object): void => {
    this.data[key] = value;
  }

  get = async (key: string): Promise<unknown> => {
    await delay(1);
    return this.data[key];
  }
}

Deno.test("Login User", async () => {
  // Arrange
  const mockSessionRepository = new MockSessionRepository();
  const mockCookieRepository = new MockCookieRepository();
  const loginUserCase = new LoginUser(mockSessionRepository, mockCookieRepository);
  const now = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  const user = new User(
    1,
    "John Doe",
    "johndoe@gmail.com",
    now,
    now,
  );

  // Pre-assert
  // user should not exists at this point
  assert(
    !await mockSessionRepository.doesSessionExists(
      String(user.id).valueOf(),
    ),
  );

  // Act
  await loginUserCase.handle(user);

  // Assert
  // verify user has been created and exist
  assert(
    await mockSessionRepository.doesSessionExists(
      String(user.id).valueOf(),
    ),
  );
});
