import { Context } from '../../deps.ts'
import view from './view.ts'

export async function aboutHandler(ctx: Context) {
    ctx.response.body = await view('about.eta', { name: "John" });
}