export const authenticated = (next) => (root, args, context, info) => {
  if (!context.currentUser) {
      throw new Error(`Unauthenticated!`);
  }
  return next(root, args, context, info);
};
