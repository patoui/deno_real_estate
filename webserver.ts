import { serve } from "https://deno.land/std@0.116.0/http/server.ts";
import { router } from "./routes.ts"

console.log(`HTTP webserver running. Access it at: http://localhost:8080/`);
await serve(router.resolve, { addr: ":8080" });
