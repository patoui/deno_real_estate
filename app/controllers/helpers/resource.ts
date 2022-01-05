import { Context } from '../../../deps.ts'

export interface ResponseInterface {
    getResponseBody(): Promise<string>;
    getResponseStatus(): Promise<number>;
    getResponseHeaders(): Promise<Headers>;
}

export default async function resource(ctx: Context, response: ResponseInterface): Promise<void> {
    ctx.response.body = await response.getResponseBody();
    ctx.response.status = await response.getResponseStatus();
    (await response.getResponseHeaders()).forEach(
        (value: string, key: string, _parent: Headers) => {
            ctx.response.headers.set(key, value);
        }
    );
}
