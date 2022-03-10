import { assert, delay } from "../../../dev_deps.ts";
import { format } from "../../../deps.ts";
import {
  CookieStoreInterface,
  SessionRepositoryInterface,
} from "../../session.ts";
import { NewUser, User, UserRepositoryInterface } from "../../user.ts";
import LoginUser from "./login_user.ts";

class MockUserRepository implements UserRepositoryInterface {
  public data: User[] = [];

  doesUserExists = async (email: string): Promise<boolean> => {
    await delay(1);

    return Boolean(
      this.data.find(
        (user: User) => user.email === email
      )
    ).valueOf();
  };

  createUser = async (newUser: NewUser): Promise<boolean> => {
    await delay(1);

    const now = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    this.data.push(
      new User(
        this.data.length + 1,
        newUser.name,
        newUser.email,
        newUser.password,
        now,
        now
      )
    )
    return true;
  };

  findUserByEmail = async (email: string): Promise<User | null> => {
    await delay(1);

    return this.data.find(
      (user: User) => user.email === email
    ) || null;
  };
}

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

  destroySession = async (sessionId: string): Promise<boolean> => {
    await delay(1);
    delete this.data[`user_${sessionId}`];
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

Deno.test("Login user", async () => {
  // Arrange
  const now = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  const user = new User(
    1,
    "John Doe",
    "johndoe@gmail.com",
    "gibberish",
    now,
    now,
  );
  const mockUserRepository = new MockUserRepository();
  mockUserRepository.data = [user];
  const mockSessionRepository = new MockSessionRepository();
  const mockCookieRepository = new MockCookieRepository();
  const loginUserCase = new LoginUser(
    mockUserRepository,
    mockSessionRepository,
    mockCookieRepository,
  );

  // Pre-assert
  // user should not exists at this point
  assert(
    !await mockSessionRepository.doesSessionExists(
      String(user.id).valueOf(),
    ),
  );

  // Act
  await loginUserCase.handle(user.email, user.password);

  // Assert
  // verify user has been created and exist
  assert(
    await mockSessionRepository.doesSessionExists(
      String(user.id).valueOf(),
    ),
  );
});
