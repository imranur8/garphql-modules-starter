import { GraphQLModule } from "@graphql-modules/core";
import UserModule from "./user";

const AppModule = new GraphQLModule({
  imports: [
    UserModule
  ],
});

export default AppModule;
