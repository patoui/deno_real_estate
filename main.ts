import {
  adapterFactory,
  Application,
  engineFactory,
  Router,
  viewEngine,
} from "./deps.ts";
import { homeHandler } from "./app/controllers/home.ts";

const port = 80;
const app = new Application();
const router = new Router();

const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();

app.use(viewEngine(oakAdapter, ejsEngine, {
  viewRoot: "./app/views",
  viewExt: ".ejs"
}));

router.get("/home", homeHandler);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port });
console.log(`Server is running on port ${port}`);
