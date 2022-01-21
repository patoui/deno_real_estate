import { Context, renderFile } from "../../../../deps.ts";
import resource, { ResponseInterface } from "./resource.ts";
import { User } from "../../../../domain/user.ts";

class ViewResource implements ResponseInterface {
  body: string;
  status: number;
  headers: Headers | null;

  constructor(body: string, status: number, headers: Headers | null = null) {
    this.body = body;
    this.status = status;

    if (headers === null) {
        const htmlHeaders = new Headers();
        htmlHeaders.set('Content-Type', 'text/html');
        this.headers = htmlHeaders;
    } else {
        this.headers = headers;
    }
  }

  getResponseBody = async (): Promise<string> => {
    return await this.body;
  };

  getResponseStatus = async (): Promise<number> => {
    return await this.status;
  };

  getResponseHeaders = async (): Promise<Headers> => {
    return await (this.headers ?? new Headers());
  };
}

export default async function view(
  ctx: Context,
  template: string,
  data?: {
    user?: User,
    data?: { [key: string]: unknown },
    errors?: { [key: string]: string[] }
  },
  status = 200,
): Promise<void> {
  data ??= {};
  data.user ??= (ctx.state.user ?? null);
  data.data ??= {};
  data.errors ??= {};
  const content = await renderFile(template, data);
  if (content) {
    resource(ctx, new ViewResource(content, status));
    return;
  }
  throw new Error(`Unable to render template "${template}"`);
}
