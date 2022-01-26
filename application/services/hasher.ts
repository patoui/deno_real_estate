import { hash, compare, genSalt } from "../../deps.ts";

export default class Hasher {
  static hash = async (data: string): Promise<string> => {
    const salt = await genSalt(8);
    return await hash(data, salt);
  };

  static verify = async (hash: string, password: string): Promise<boolean> => {
    return await compare(password, hash);
  };
}
