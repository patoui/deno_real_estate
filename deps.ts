export {
  Application,
  Context,
  Router
} from "https://deno.land/x/oak@v10.1.0/mod.ts";

declare module "https://deno.land/x/oak@v10.1.0/mod.ts" {
  interface Context {
    // deno-lint-ignore ban-types
    render: (fileName: string, data?: object) => void;
  }
}

export {
  adapterFactory,
  engineFactory,
  viewEngine,
} from "https://deno.land/x/view_engine@v1.5.0/mod.ts";

export { isEmail } from 'https://deno.land/x/validate_patoui@v0.4.1/mod.ts';