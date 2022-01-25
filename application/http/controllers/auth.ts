import { Context } from "../../../deps.ts";
import { NewUser } from "../../../domain/user.ts";
import CreateUser from "../../../domain/use_cases/command/create_user.ts";
import LoginUser from "../../../domain/use_cases/command/login_user.ts";
import LogoutUser from "../../../domain/use_cases/command/logout_user.ts";
import CookieRepository from "../../repositories/cookie_repository.ts";
import SessionRepository from "../../repositories/session_repository.ts";
import UserRepository from "../../repositories/user_repository.ts";
import Required from "../../services/rules/required.ts";
import Validator from "../../services/validator.ts";
import view from "./helpers/view.ts";

export async function signUpUserHandler(ctx: Context) {
  await view(ctx, "auth/sign_up.eta");
}

export const createUserHandler = async (ctx: Context) => {
  const body = await ctx.request.body({ type: "form" }).value;

  const data = {
    name: body.get("name"),
    email: body.get("email"),
    password: body.get("password"),
    password_confirmation: body.get("password_confirmation"),
  };
  let errors: { [key: string]: string[] } = {};

  const validator = new Validator(
    {
      name: [new Required()],
      email: [new Required()],
      password: [new Required()],
      password_confirmation: [new Required()],
    },
    data,
  );

  if (!validator.validate()) {
    // Show errors on form
    errors = validator.getErrors();
    ctx.response.status = 302;
    await view(ctx, "auth/sign_up.eta", { errors });
    return;
  }

  if (data.name && data.email && data.password) {
    const userRepository = new UserRepository();
    const createUserCase = new CreateUser(userRepository);

    const createUserStatus = await createUserCase.handle(
      new NewUser(data.name, data.email, data.password),
    );

    if (!createUserStatus.wasSuccessful()) {
      errors.general = [createUserStatus.getMessage()];
      ctx.response.status = 302;
      await view(ctx, "auth/sign_up.eta", { errors });
      return;
    }

    const user = await userRepository.findUserByEmail(data.email);

    if (!user) {
      errors.general = ["Unable to find user"];
      ctx.response.status = 302;
      await view(ctx, "auth/sign_up.eta", { errors });
      return;
    }

    const loginUserCase = new LoginUser(
      new SessionRepository(),
      new CookieRepository(ctx.cookies),
    );
    const loginStatus = await loginUserCase.handle(user);

    if (!loginStatus.wasSuccessful()) {
      errors.general = [loginStatus.getMessage()];
      ctx.response.status = 302;
      await view(ctx, "auth/sign_up.eta", { errors });
      return;
    }
  }

  ctx.response.redirect("/");
};

export async function signInUserHandler(ctx: Context) {
  await view(ctx, "auth/sign_in.eta");
}

export async function authUserHandler(ctx: Context) {
  const body = await ctx.request.body({ type: "form" }).value;

  const data = {
    email: body.get("email"),
    password: body.get("password"),
  };
  let errors: { [key: string]: string[] } = {};

  const validator = new Validator(
    {
      email: [new Required()],
      password: [new Required()],
    },
    data,
  );

  if (!validator.validate()) {
    // Show errors on form
    errors = validator.getErrors();
    ctx.response.status = 302;
    await view(ctx, "auth/sign_in.eta", { errors });
    return;
  }

  if (data.email && data.password) {
    const loginUserCase = new LoginUser(
      new UserRepository(),
      new SessionRepository(),
      new CookieRepository(ctx.cookies),
    );
    const loginStatus = await loginUserCase.handle(
      data.email,
      data.password
    );

    if (!loginStatus.wasSuccessful()) {
      errors.general = [loginStatus.getMessage()];
      ctx.response.status = 302;
      await view(ctx, "auth/sign_in.eta", { errors });
      return;
    }
  }

  ctx.response.redirect("/");
}

export async function signOutUserHandler(ctx: Context) {
  const authedUser = ctx.state.user ?? null;
  if (!authedUser) {
    ctx.response.redirect("/");
    return;
  }

  const logoutUserCase = new LogoutUser(
    new SessionRepository(),
    new CookieRepository(ctx.cookies),
  );
  await logoutUserCase.handle();

  ctx.response.redirect("/");
}
