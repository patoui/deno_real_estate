import { Application, configure, Router } from "./deps.ts";
import { homeHandler } from "./app/http/controllers/home.ts";
import { aboutHandler } from "./app/http/controllers/about.ts";
import {
  authUserHandler,
  createUserHandler,
  signInUserHandler,
  signOutUserHandler,
  signUpUserHandler,
} from "./app/http/controllers/auth.ts";
import { authed } from "./app/http/middleware/authed.ts";
import { staticFiles } from "./app/http/middleware/static.ts";

const port = 8080;
const app = new Application();
const router = new Router();

configure({ views: `${Deno.cwd()}/app/views/` });

router.get("/", homeHandler);
router.get("/about", aboutHandler);

// authentication
router.get("/sign-up", signUpUserHandler);
router.post("/sign-up", createUserHandler);
router.get("/sign-in", signInUserHandler);
router.post("/sign-in", authUserHandler);
router.get("/sign-out", signOutUserHandler);

app.use(authed);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(staticFiles);

app.listen({ port });
console.log(`Server is running on port ${port}`);
