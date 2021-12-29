import { delay, format, assert } from "../../dev_deps.ts";
import { SessionRepositoryInterface } from "../session.ts";
import { User } from "../user.ts";
import LoginUser from "./login_user.ts";

class MockSessionRepository implements SessionRepositoryInterface {
    public data: {[k: string]: boolean} = {};

    doesSessionExists = async (sessionId: string): Promise<boolean> => {
        await delay(1);
        return this.data[`user_${sessionId}`] ?? false;
    }

    createSession = async (sessionId: string): Promise<boolean> => {
        await delay(1);
        this.data[`user_${sessionId}`] = true;
        return true;
    }
}

Deno.test("Login User", async () => {
    // Arrange
    const mockSessionRepository = new MockSessionRepository();
    const loginUserCase = new LoginUser(mockSessionRepository);
    const now = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const user = new User(
        1,
        'John Doe',
        'johndoe@gmail.com',
        now,
        now
    );

    // Pre-assert
    // user should not exists at this point
    assert(
        !await mockSessionRepository.doesSessionExists(
            String(user.id).valueOf()
        )
    );

    // Act
    await loginUserCase.handle(user);

    // Assert
    // verify user has been created and exist
    assert(
        await mockSessionRepository.doesSessionExists(
            String(user.id).valueOf()
        )
    );
});