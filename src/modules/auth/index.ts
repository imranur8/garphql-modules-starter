import { GraphQLModule } from "@graphql-modules/core";
import { Request, Response } from "express";
import logger from "../../utils/logger";
import { verifyUserToken } from "./helpers";
import resolvers from "./resolvers";
import resolversComposition from "./resolversCompositions";
import * as typeDefs from "./schema.graphql";

interface AuthModuleSession {
  req: Request;
  res: Response;
}
const HEADER_NAME = "authorization";

const AuthModule = new GraphQLModule({
  typeDefs,
  resolvers,
  context: async ( session: AuthModuleSession) => {
    let authToken = null;
    let currentUser = null;
    try {
      authToken = session.req.headers[HEADER_NAME];
      logger.info(authToken);
      if (authToken) {
        currentUser = await verifyUserToken(authToken);
      }
    } catch (error) {
      logger.error(error.message);
    }
    return {
      authToken,
      currentUser
    };
  },
  resolversComposition
});

export default AuthModule;
