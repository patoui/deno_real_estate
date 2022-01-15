import { isInt } from "../../../deps.ts";
import { RuleInterface } from "../validator.ts";

export default class IsInteger implements RuleInterface {
  errors: string[] = [];

  // deno-lint-ignore no-explicit-any
  validate = (data: any): boolean => {
    return isInt(data);
  }

  getMessage = (key: string): string => {
    return `${key} field must be an integer`;
  }
}
