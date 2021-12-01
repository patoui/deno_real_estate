import { RouteHandler } from "../routes.ts"

export default class HomeHandler implements RouteHandler {
    handle(request: Request): Response {
        let body = "Your user-agent is:\n\n";
        body += request.headers.get("user-agent") || "Unknown";

        return new Response(body, { status: 200 });
    }
}
