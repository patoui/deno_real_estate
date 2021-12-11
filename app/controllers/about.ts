import { RouteHandler } from "../../routes.ts"

export default class AboutHandler implements RouteHandler {
    handle(request: Request): Response {
        return new Response("About page!", { status: 200 });
    }
}
