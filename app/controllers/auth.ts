import { Context } from '../../deps.ts'
import { NewUser } from '../../domain/user.ts';
import UserRepository from '../repositories/user_repository.ts';

export function signUpUserHandler(ctx: Context) {
    ctx.render("auth/sign_up");
}

export const createUserHandler = async (ctx: Context) => {
    const body = await ctx.request.body({ type: 'form'}).value;

    const name = body.get('name');
    const email = body.get('email');
    const password = body.get('password');
    const passwordConfirmation = body.get('password_confirmation');

    if (!name) {
        // TODO: add validation error message.
        ctx.response.redirect("/sign-up");
        return;
    }

    //|| !isEmail(email)
    if (!email) {
        // TODO: add validation error message.
        ctx.response.redirect("/sign-up");
        return;
    }

    if (password !== passwordConfirmation) {
        // TODO: add validation error message.
        ctx.response.redirect("/sign-up");
        return;
    }

    // TODO: determine better way to pass dependencies into this function.
    const userRepo = new UserRepository();

    if (email && await userRepo.doesUserExists(email)) {
        // TODO: add validation error message.
        ctx.response.redirect("/sign-up");
        return;
    }

    // TODO: determine why TS won't recognize early exits making this if required...
    if (name && email && password) {
        const newUser = new NewUser(name, email, password);
        await userRepo.createUser(newUser);
    }

    // TODO: validate successfully created user and redirect
    ctx.response.redirect("/");
}

export function signInUserHandler(ctx: Context) {
    ctx.render("auth/sign_in");
}

export function authUserHandler(ctx: Context) {
    // TODO: validate successfully logged in user and redirect
    ctx.response.redirect("/");
}