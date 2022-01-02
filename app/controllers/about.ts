import { Context } from '../../deps.ts'
import view from './view.ts'

export async function aboutHandler(ctx: Context) {
    await view(ctx, 'about.eta', { name: "John" });
}
