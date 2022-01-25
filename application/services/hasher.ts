import { config, hash, verify, Variant } from "../../deps.ts";

export default class Hasher {
  static hash = async (data: string): Promise<string> => {
    return await hash(data, {
      variant: Variant.Argon2id,
      salt: new Uint8Array(Number(config().SALT).valueOf()).valueOf()
    });
  };

  static verify = async (hash: string, password: string): Promise<boolean> => {
    return await verify(hash, password);
  };
}
