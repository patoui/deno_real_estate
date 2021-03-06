import { Cookies } from "../../deps.ts";
import { CookieStoreInterface } from "../../domain/session.ts";

export default class CookieRepository implements CookieStoreInterface {
  cookies: Cookies;

  constructor(cookies: Cookies) {
    this.cookies = cookies;
  }

  // deno-lint-ignore no-explicit-any ban-types
  set(key: string, value: any, config?: object): void {
    this.cookies.set(key, String(value).valueOf(), config || {});
  }

  async get(key: string): Promise<string> {
    return String(await this.cookies.get(key)).valueOf();
  }

  async destroy(key: string): Promise<boolean> {
    const expiryDate = new Date();
    // set expiry to time in the passed to force expiry
    expiryDate.setHours(expiryDate.getHours() - 1);
    await this.cookies.set(key, '', { expires: expiryDate });
    return true;
  }
}
