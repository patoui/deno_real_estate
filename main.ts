import { serve } from "./deps.ts";
import { router } from "./routes.ts"

console.log(`HTTP webserver running. Access it at: http://localhost/`);
await serve(router.resolve, { addr: ":80" });