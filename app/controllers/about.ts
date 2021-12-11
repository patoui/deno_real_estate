import { RouteHandler } from "../../routes.ts"

export default class AboutHandler implements RouteHandler {
    handle(_request: Request): Response {
        return new Response("About page!", { status: 200 });
    }
}
