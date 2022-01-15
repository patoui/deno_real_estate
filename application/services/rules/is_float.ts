import { isFloat } from "../../../deps.ts";
import { RuleInterface } from "../validator.ts";

export default class IsFloat implements RuleInterface {
  errors: string[] = [];

  // deno-lint-ignore no-explicit-any
  validate = (data: any): boolean => {
    return isFloat(data);
  }

  getMessage = (key: string): string => {
    return `${key} field must be a float`;
  }
}
