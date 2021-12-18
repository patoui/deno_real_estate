import { Context } from '../../deps.ts'

export function homeHandler(ctx: Context) {
    ctx.render("home", { data: { name: "John" } });
}