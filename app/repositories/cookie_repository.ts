import { CookieStoreInterface } from "../../domain/session.ts";
import { Cookies } from "https://deno.land/x/oak@v10.1.0/cookies.ts";

export default class CookieRepository implements CookieStoreInterface {
  cookies: Cookies;

  constructor(cookies: Cookies) {
    this.cookies = cookies;
  }

  // deno-lint-ignore no-explicit-any ban-types
  set(key: string, value: any, config?: object): void {
    this.cookies.set(key, String(value).valueOf(), config || {});
  }

  get(key: string): Promise<unknown> {
    return this.cookies.get(key);
  }
}
