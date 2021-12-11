import { RouteHandler } from "../../routes.ts"

export default class HomeHandler implements RouteHandler {
    handle(request: Request): Response {
        return new Response("Home page!", { status: 200 });
    }
}
