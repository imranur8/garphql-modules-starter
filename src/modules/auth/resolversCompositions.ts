import { authenticated } from "./authenticated-guard";

export default {
  "Query.me": [authenticated],
};
