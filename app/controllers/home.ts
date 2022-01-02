import { Context } from '../../deps.ts'
import view from './view.ts'

export async function homeHandler(ctx: Context) {
    await view(ctx, 'home.eta');
}