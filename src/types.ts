export type Maybe<T> = T | null;

export interface UserInput {
  email: string;

  name: string;

  password: string;
}

export interface UserLoginInput {
  email: string;

  password: string;
}

// ====================================================
// Types
// ====================================================

export interface Query {
  me?: Maybe<User>;

  users?: Maybe<(Maybe<User>)[]>;

  user?: Maybe<User>;
}

export interface User {
  id: string;

  email: string;

  name: string;

  token?: Maybe<string>;
}

export interface Mutation {
  createUser?: Maybe<User>;

  loginUser?: Maybe<User>;
}

// ====================================================
// Arguments
// ====================================================

export interface UserQueryArgs {
  id?: Maybe<string>;
}
export interface CreateUserMutationArgs {
  input?: Maybe<UserInput>;
}
export interface LoginUserMutationArgs {
  input?: Maybe<UserLoginInput>;
}
