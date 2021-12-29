import { crypto } from '../../deps.ts';

export default class Hasher {
  hash = async (data: string): Promise<string> => {
    return Hasher.toHexString(
        await crypto.subtle.digest(
            "BLAKE3",
            new TextEncoder().encode(data)
        )
    );
  }

  private static toHexString = (bytes: ArrayBuffer): string => {
      return new Uint8Array(bytes).reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");
  }
}
