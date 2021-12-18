import { Context } from '../../deps.ts'

export function homeHandler(ctx: Context) {
    ctx.render("about");
}