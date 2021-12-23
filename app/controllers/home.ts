import { Context } from '../../deps.ts'
import view from './view.ts'

export async function homeHandler(ctx: Context) {
    ctx.response.body = await view('home.eta');
}