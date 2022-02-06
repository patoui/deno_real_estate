import { Application, configure, Context, Router } from "./deps.ts";
import { homeHandler } from "./application/http/controllers/home.ts";
import {
  authUserHandler,
  createUserHandler,
  signInUserHandler,
  signOutUserHandler,
  signUpUserHandler,
} from "./application/http/controllers/auth.ts";
import { authed } from "./application/http/middleware/authed.ts";
import { staticFiles } from "./application/http/middleware/static.ts";
import {
  createListingHandler,
  listListingHandler,
  showListingHandler,
  showCreateListingHandler
} from "./application/http/controllers/listing.ts";
import {
  favouriteListingHandler
} from "./application/http/controllers/favourite.ts";

const port = 8080;
const app = new Application();
const router = new Router();

configure({ views: `${Deno.cwd()}/application/views/` });

router.get("/", homeHandler);

// authentication
router.get("/sign-up", signUpUserHandler);
router.post("/sign-up", createUserHandler);
router.get("/sign-in", signInUserHandler);
router.post("/sign-in", authUserHandler);
router.get("/sign-out", signOutUserHandler);

// listing
router.get("/listing", listListingHandler);
router.get("/listing/:id", showListingHandler);
router.get("/listing/create", showCreateListingHandler);
router.post("/listing/create", createListingHandler);

// listing favourite
router.get("/listing/:id/favourite", favouriteListingHandler);

app.use(authed);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(staticFiles);

app.listen({ port });
console.log(`Server is running on port ${port}`);
