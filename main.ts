import { Application, Handlebars, HandlebarsConfig, HandlebarsJS, Router } from "./deps.ts";
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
import { ViewData } from "./application/http/controllers/helpers/view.ts";

const port = parseInt(Deno.env.get("APP_PORT") ?? "8080");
const app = new Application();
const router = new Router();

const getFieldErrors = function (viewData: ViewData, field: string): string[] {
  const errors = viewData?.errors;

  if (! errors) {
    return [];
  }

  const fieldErrors = errors[field] ?? [];

  if (! fieldErrors || fieldErrors.length === 0) {
    return [];
  }

  return fieldErrors;
}

const handle = new Handlebars({
  baseDir: `${Deno.cwd()}/application/views`,
  cachePartials: (Deno.env.get("APP_ENV") ?? 'local') === 'production',
  helpers: {
    // deno-lint-ignore no-explicit-any
    ifCond: function(v1: any, operator: string, v2: any, options: HandlebarsJS.HelperOptions) {
      switch (operator) {
        case '==':
          return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
          return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
          return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
          return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
          return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
          return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
          return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
          return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
          return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
          return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
          return options.inverse(this);
      }
    },
    hasErrors: function(field: string, options: HandlebarsJS.HelperOptions) {
      const viewData: ViewData|null = options?.data?.root;

      if (! viewData) {
        return options.inverse(this);
      }

      const fieldErrors = getFieldErrors(viewData, field);

      if (fieldErrors.length === 0) {
        return options.inverse(this);
      }

      return options.fn(this);
    },
    errors: function(field: string, options: HandlebarsJS.HelperOptions) {
      const viewData: ViewData|null = options?.data?.root;
      return viewData ? getFieldErrors(viewData, field) : [];
    }
  }
} as HandlebarsConfig);

declare global {
    const hb: Handlebars
    interface Window { hb: Handlebars; }
}

window.hb = handle;

router.get("/", homeHandler);

// authentication
router.get("/sign-up", signUpUserHandler);
router.post("/sign-up", createUserHandler);
router.get("/sign-in", signInUserHandler);
router.post("/sign-in", authUserHandler);
router.get("/sign-out", signOutUserHandler);

// listing
router.get("/listing", listListingHandler);
router.get("/listing/create", showCreateListingHandler);
router.post("/listing/create", createListingHandler);
router.get("/listing/:id", showListingHandler);

// listing favourite
router.get("/listing/:id/favourite", favouriteListingHandler);

app.use(authed);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(staticFiles);

app.listen({ port });
console.log(`Server is running on port ${port}`);
