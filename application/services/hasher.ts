import { config, crypto } from "../../deps.ts";

export default class Hasher {
  hash = async (data: string): Promise<string> => {
    return Hasher.toHexString(
      await crypto.subtle.digest(
        // TODO: use better algo.
        "BLAKE3",
        new TextEncoder().encode(config().SALT + data),
      ),
    );
  };

  private static toHexString = (bytes: ArrayBuffer): string => {
    return new Uint8Array(bytes).reduce(
      (str, byte) => str + byte.toString(16).padStart(2, "0"),
      "",
    );
  };
}
