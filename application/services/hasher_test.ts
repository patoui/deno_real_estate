import { assertEquals } from "../../dev_deps.ts";
import Hasher from "./hasher.ts";

Deno.test("Hasher returns the same value every time", () => {
  // Arrange
  const firstHash = (new Hasher()).hash('foobar');

  // Act
  const secondHash = (new Hasher()).hash('foobar');

  // Assert
  assertEquals(firstHash, secondHash);
});
