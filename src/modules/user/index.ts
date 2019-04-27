import { GraphQLModule } from "@graphql-modules/core";
import AuthModule from "../auth";
import { UserProvider } from "./providers";
import resolvers from "./resolvers";
import resolversComposition from "./resolversComposition";
import * as typeDefs from "./schema.graphql";

const UserModule = new GraphQLModule({
  typeDefs,
  resolvers,
  imports: [AuthModule],
  providers: [ UserProvider],
  resolversComposition
});

export default UserModule;
