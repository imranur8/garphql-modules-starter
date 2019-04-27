import { authenticated } from "../auth/authenticated-guard";
import { validateRules } from "../auth/validation-rules" ;

export default {
  "Query.users": [authenticated, validateRules("Student")],
  "Query.user": [authenticated, validateRules("Student")]
};
