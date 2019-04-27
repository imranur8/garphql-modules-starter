export default {
  Query: {
    me: (root, args, { currentUser }) => currentUser
  },
  User: {
    id: (user) => user.id,
    email: (user) => user.email
  }
};
