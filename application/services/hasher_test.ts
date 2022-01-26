import { assert } from "../../dev_deps.ts";
import Hasher from "./hasher.ts";

Deno.test("Hasher can verify value", async () => {
  // Arrange
  const firstHash = await Hasher.hash('foobar');

  // Assert
  assert(await Hasher.verify(firstHash, 'foobar'));
});
