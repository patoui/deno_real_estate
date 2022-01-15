import { assert, assertEquals } from "../../dev_deps.ts";
import Required from "./rules/required.ts";
import Validator from "./validator.ts";

Deno.test("Validator rule test", () => {
  // Arrange
  const validator = new Validator(
      { name: [new Required()] },
      {}
  );

  // Act && Assert
  assert(!validator.validate());
  const errors = validator.getErrors();
  assertEquals(1, Object.keys(errors).length);
  assertEquals(errors.name[0], 'name field is required');
});
