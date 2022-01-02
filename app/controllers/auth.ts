import { Context, isEmail } from '../../deps.ts'
import { NewUser } from '../../domain/user.ts';
import CreateUser from '../../domain/use_cases/create_user.ts';
import LoginUser from '../../domain/use_cases/login_user.ts';
import LogoutUser from '../../domain/use_cases/logout_user.ts';
import CookieRepository from "../repositories/cookie_repository.ts";
import SessionRepository from '../repositories/session_repository.ts';
import UserRepository from '../repositories/user_repository.ts';
import view from './view.ts'

export async function signUpUserHandler(ctx: Context) {
    await view(ctx, 'auth/sign_up.eta');
}

export const createUserHandler = async (ctx: Context) => {
    const body = await ctx.request.body({ type: 'form'}).value;

    const name = body.get('name');
    const email = body.get('email');
    const password = body.get('password');
    const passwordConfirmation = body.get('password_confirmation');
    const errors: { [key: string]: string|null } = {};

    if (!name) {
        errors.name = 'Name field is required';
    }

    // TODO: add better validation for email.
    if (!email) {
        errors.email = 'Email field is required';
    }

    if (email && !isEmail(email)) {
        errors.email = 'Must be valid email address';
    }

    if (!password) {
        errors.password = 'Password field is required';
    }

    if (!passwordConfirmation) {
        errors.passwordConfirmation = 'Password confirmation field is required';
    }

    if (password !== passwordConfirmation) {
        errors.passwordConfirmation = 'Password and confirmation do not match';
    }

    // Show errors on form
    if (Object.keys(errors).length > 0) {
        ctx.response.status = 302;
        await view(ctx, 'auth/sign_up.eta', { errors });
        return;
    }

    if (name && email && password) {
        const userRepository = new UserRepository();
        const createUserCase = new CreateUser(userRepository);

        const createUserStatus = await createUserCase.handle(
            new NewUser(name, email, password)
        );

        if (!createUserStatus.wasSuccessful()) {
            errors.general = createUserStatus.getMessage();
            ctx.response.status = 302;
            await view(ctx, 'auth/sign_up.eta', { errors });
            return;
        }

        const user = await userRepository.findUserByEmail(email);

        if (!user) {
            errors.general = 'Unable to find user';
            ctx.response.status = 302;
            await view(ctx, 'auth/sign_up.eta', { errors });
            return;
        }

        const loginUserCase = new LoginUser(
            new SessionRepository(),
            new CookieRepository(ctx.cookies)
        );
        const loginStatus = await loginUserCase.handle(user);

        if (!loginStatus.wasSuccessful()) {
            errors.general = loginStatus.getMessage();
            ctx.response.status = 302;
            await view(ctx, 'auth/sign_up.eta', { errors });
            return;
        }
    }

    ctx.response.redirect('/');
}

export async function signInUserHandler(ctx: Context) {
    await view(ctx, 'auth/sign_in.eta');
}

export async function authUserHandler(ctx: Context) {
    const body = await ctx.request.body({ type: 'form'}).value;

    const email = body.get('email');
    const password = body.get('password');
    const errors: { [key: string]: string|null } = {};

    if (!email) {
        errors.email = 'Email field is required';
    }

    if (email && !isEmail(email)) {
        errors.email = 'Must be valid email address';
    }

    if (!password) {
        errors.password = 'Password field is required';
    }

    // Show errors on form
    if (Object.keys(errors).length > 0) {
        ctx.response.status = 302;
        await view(ctx, 'auth/sign_in.eta', { errors });
        return;
    }

    if (email && password) {
        const userRepository = new UserRepository();
        const user = await userRepository.findUserByEmail(email);

        if (!user) {
            errors.general = 'Unable to find user';
            ctx.response.status = 302;
            await view(ctx, 'auth/sign_in.eta', { errors });
            return;
        }

        const loginUserCase = new LoginUser(
            new SessionRepository(),
            new CookieRepository(ctx.cookies)
        );
        const loginStatus = await loginUserCase.handle(user);

        if (!loginStatus.wasSuccessful()) {
            errors.general = loginStatus.getMessage();
            ctx.response.status = 302;
            await view(ctx, 'auth/sign_in.eta', { errors });
            return;
        }
    }

    ctx.response.redirect('/');
}

export async function signOutUserHandler(ctx: Context) {
    const authedUser = ctx.state.user ?? null;
    if (!authedUser) {
        ctx.response.redirect('/');
        return;
    }

    const logoutUserCase = new LogoutUser(
        new SessionRepository(),
        new CookieRepository(ctx.cookies)
    );
    await logoutUserCase.handle();

    ctx.response.redirect('/');
}
