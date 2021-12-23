import { Context, isEmail } from '../../deps.ts'
import { NewUser } from '../../domain/user.ts';
import CreateUser from "../../domain/use_cases/create_user.ts";
import UserRepository from '../repositories/user_repository.ts';
import view from './view.ts'

export async function signUpUserHandler(ctx: Context) {
    ctx.response.body = await view('auth/sign_up.eta');
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
        // ctx.render('auth/sign_up', { errors });
        ctx.response.body = await view('auth/sign_up.eta', { errors });
        return;
    }

    const createUserCase = new CreateUser(new UserRepository());

    if (name && email && password) {
        const status = await createUserCase.handle(
            new NewUser(name, email, password)
        );
        if (!status.wasSuccessful()) {
            errors.general = status.getMessage();
            ctx.response.status = 302;
            ctx.response.body = await view('auth/sign_up.eta', { errors });
            return;
        }
    }

    ctx.response.redirect("/");
}

export async function signInUserHandler(ctx: Context) {
    ctx.response.body = await view('auth/sign_in.eta');
    // ctx.render("auth/sign_in");
}

export function authUserHandler(ctx: Context) {
    // TODO: validate successfully logged in user and redirect
    ctx.response.redirect("/");
}