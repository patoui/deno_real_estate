import { RuleInterface } from "../validator.ts";

export default class Required implements RuleInterface {
  errors: string[] = [];

  // deno-lint-ignore no-explicit-any
  validate = (data: any): boolean => {
    return Boolean(data).valueOf();
  }

  getMessage = (key: string): string => {
    return `${key} field is required`;
  }
}
