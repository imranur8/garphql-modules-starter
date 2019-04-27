import { UserProvider } from "./providers";

export default {
  Query: {
    users: (root, args, { injector }) => injector.get(UserProvider).allUsers() ,
    user: (root, { id }, { injector }) => injector.get(UserProvider).getUser(id)
  },
  Mutation: {
    createUser: (root, { input }, { injector }) => injector.get(UserProvider).createUser({input}),
    loginUser: (root, { input }, { injector }) => injector.get(UserProvider).loginUser({input})
  },
  User: {
    id: (user) => user.id,
    email: (user) => user.email,
    name: (user) => user.name
  }
};
