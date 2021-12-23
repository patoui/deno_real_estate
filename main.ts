import {
  Application,
  configure,
  Router
} from "./deps.ts";
import { homeHandler } from "./app/controllers/home.ts";
import { aboutHandler } from "./app/controllers/about.ts";
import {
  authUserHandler,
  createUserHandler,
  signInUserHandler,
  signUpUserHandler,
} from "./app/controllers/auth.ts";

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

app.use(router.routes());
app.use(router.allowedMethods());

// static content
app.use(async (context, next) => {
  const root = `${Deno.cwd()}/static`;
  try {
    await context.send({ root });
  } catch {
    next();
  }
});

app.listen({ port });
console.log(`Server is running on port ${port}`);
