import { Context } from '../../../deps.ts'
import view from './helpers/view.ts'

export async function aboutHandler(ctx: Context) {
    await view(ctx, 'about.eta', { name: "John" });
}
