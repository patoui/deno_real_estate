import { delay, assert } from "../../../dev_deps.ts";
import { format } from "../../../deps.ts";
import { NewUser, User, UserRepositoryInterface } from "../../user.ts";
import CreateUser from "./create_user.ts";

class MockUserRepository implements UserRepositoryInterface {
    public data: User[] = [];

    // deno-lint-ignore no-unused-vars
    findUserByEmail = async (email: string): Promise<User|null> => {
        await delay(1);
        return null;
    }

    doesUserExists = async (email: string): Promise<boolean> => {
        await delay(1);
        return Boolean(this.data.find(user => user.email = email)).valueOf();
    }

    createUser = async (newUser: NewUser): Promise<boolean> => {
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
        );
        await delay(1);
        return true;
    }
}

Deno.test("Create user", async () => {
    // Arrange
    const mockUserRepository = new MockUserRepository();
    const createUserCase = new CreateUser(mockUserRepository);
    const newUser = new NewUser(
        'John Doe',
        'johndoe@gmail.com',
        'foobar'
    );

    // Pre-assert
    // user should not exists at this point
    assert(!await mockUserRepository.doesUserExists(newUser.email));

    // Act
    await createUserCase.handle(newUser);

    // Assert
    // verify user has been created and exist
    assert(await mockUserRepository.doesUserExists(newUser.email));
});