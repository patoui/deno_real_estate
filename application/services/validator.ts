export interface RuleInterface {
  // deno-lint-ignore no-explicit-any
  validate(data: any): boolean;
  getMessage(key: string): string;
}

export default class Validator {
  rules: { [key: string]: RuleInterface[] };

  // deno-lint-ignore no-explicit-any
  data: { [key: string]: any };

  errors: { [key: string]: string[] } = {};

  // deno-lint-ignore ban-types
  constructor(rules: { [key: string]: RuleInterface[] }, data: object) {
    this.rules = rules;
    this.data = data;
  }

  validate = (): boolean => {
    let isValid = true;

    for (const key in this.rules) {
      const fieldRules = this.rules[key];
      fieldRules.forEach((rule) => {
        if (!rule.validate(this.data[key] ?? null)) {
          isValid = false;
          this.errors[key] ??= [];
          this.errors[key].push(rule.getMessage(key));
        }
      });
    }

    return isValid;
  };

  getErrors = (): { [key: string]: string[] } => {
    return this.errors;
  };
}
