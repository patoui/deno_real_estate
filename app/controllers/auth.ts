import { Context } from '../../deps.ts'
import { NewUser } from '../../domain/user.ts';
import CreateUser from "../../domain/use_cases/create_user.ts";
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

    if (!password) {
        // TODO: add validation error message.
        ctx.response.redirect("/sign-up");
        return;
    }

    if (password !== passwordConfirmation) {
        // TODO: add validation error message.
        ctx.response.redirect("/sign-up");
        return;
    }

    const createUserCase = new CreateUser(new UserRepository());

    const status = await createUserCase.handle(
        new NewUser(name, email, password)
    );
    if (!status.wasSuccessful()) {
        // TODO: use status.getMessage to display the issue to the user.
        console.log(status.getMessage());
        ctx.response.redirect("/sign-up");
        return;
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