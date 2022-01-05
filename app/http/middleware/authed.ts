import { Context } from "../../../deps.ts";
import SessionRepository from "../../repositories/session_repository.ts";

export const authed = async (
  context: Context,
  next: () => Promise<unknown>,
) => {
  const userSessionId = await context.cookies.get("user_session");
  if (userSessionId) {
    const sessionRepository = new SessionRepository();
    const user = await sessionRepository.findSession(userSessionId);
    if (user) {
      context.state.user = user;
    }
  }
  return next();
};
