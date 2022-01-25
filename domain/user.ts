export interface UserRepositoryInterface {
    doesUserExists(email: string): Promise<boolean>;
    createUser(newUser: NewUser): Promise<boolean>;
    findUserByEmail(email: string): Promise<User|null>;
}

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: string;
  last_accessed_at: string;

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    createdAt: string,
    lastAccessedAt: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.created_at = createdAt;
    this.last_accessed_at = lastAccessedAt;
  }
}


export class NewUser {
  name: string;
  email: string;
  password: string;

  constructor(
    name: string,
    email: string,
    password: string
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}