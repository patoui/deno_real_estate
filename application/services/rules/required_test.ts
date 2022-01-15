import { assert } from "../../../dev_deps.ts";
import Required from "./required.ts";

Deno.test("Required rule test", () => {
  // Arrange
  const toAssert = ["", null, undefined];
  const requiredRule = new Required();

  // Act && Assert
  toAssert.forEach((value) => {
    assert(!requiredRule.validate(value));
  });
});
