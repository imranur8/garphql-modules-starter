import * as dotenv from "dotenv";
import * as http from "http";
import app from "./app";
import logger from "./utils/logger";

dotenv.config();

const PORT = process.env.PORT || "4000";

// Create HTTP server
http.createServer(app).listen(PORT, () => {
  logger.info("API server listening on port " + PORT);
});
