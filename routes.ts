import HomeHandler from "./handlers/home.ts"
import AboutHandler from "./handlers/about.ts"

export interface RouteHandler {
    handle(request: Request): Response
}

class Route {
    method: string;
    pattern: string;
    handler: RouteHandler;

    constructor(method: string, pattern: string, handler: RouteHandler) {
        this.method = method;
        this.pattern = pattern;
        this.handler = handler;
    }
}

class Router {
    routes: Route[];

    constructor() {
        this.routes = [];
    }

    add = (route: Route): void => {
        this.routes.push(route);
    }

    resolve = (request: Request): Response => {
        const requestPath = (new URL(request.url)).pathname;
        console.log(requestPath);
        for(let i = 0; i < this.routes.length; i++) {
            const patternRegex = new RegExp(this.routes[i].pattern);
            if (requestPath.match(patternRegex)) {
                console.log(requestPath, this.routes[i]);
                return this.routes[i].handler.handle(request);
            }
        }

        return new Response('Not found', { status: 404 });
    }
}

export const router = new Router();

router.add(new Route('GET', '^/$', new HomeHandler()));
router.add(new Route('GET', '^/about$', new AboutHandler()));
