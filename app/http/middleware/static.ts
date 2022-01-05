import { Context } from "../../../deps.ts";

export const staticFiles = async (
  context: Context,
  next: () => Promise<unknown>,
) => {
    const root = `${Deno.cwd()}/static`;
    try {
      await context.send({ root });
    } catch {
      next();
    }
};
