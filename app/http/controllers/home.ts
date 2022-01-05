import { Context } from '../../../deps.ts'
import view from './helpers/view.ts'

export async function homeHandler(ctx: Context) {
    await view(ctx, 'home.eta');
}