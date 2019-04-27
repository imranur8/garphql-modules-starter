import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import { Request, Response } from "express";
import * as graphQLHTTP from "express-graphql";
import "graphql-import-node";
import "reflect-metadata";

import * as mongoose from "mongoose";
import * as morgan from "morgan";
import AppModule from "./modules/app.modules";
import logger from "./utils/logger";

// define default mongoDb url
const defaultMongoUrl: string = "mongodb://localhost/api-server";

class App {

  public app: express.Application = express();
  public mongoUrl: string = process.env.MONGO_URL || defaultMongoUrl;
  public environment: string = process.env.NODE_ENV;

  constructor() {
    this.config();
    this.mongoSetup();
    this.helloApi();
    this.healthCheck();
    this.graphqlServer();
  }

  private config(): void {
    const corsOption: object = {
      headers: "Origin, X-Requested-With, Content-Type, Accept",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      origin: "*",
    };

    this.app.use(cors(corsOption));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    if (this.environment === "development") {
      // Morgan for HTTP request logging
      this.app.use(morgan("dev"));
    }

  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true }, (err) => {
      if (err) {
        logger.info(err.message);
      } else {
        logger.info("API server is connected to MongoDb");
      }
    });
  }

  private healthCheck(): void {
    // By the time API is up, we are both healthy and ready
    this.app.get(["/health", "/ready"], (request: Request, response: Response): void => {
      response.status(200).send("👍");
    });
  }

  private helloApi(): void {
    // By the time API is up, we are both healthy and ready
    this.app.get("/", (request: Request, response: Response): void => {
      response.status(200).send("Hello, API server 1.0.0");
    });
  }

  private graphqlServer(): void {
    this.app.use("/graphql", graphQLHTTP( (req, res) => ({
      schema: AppModule.schema,
      graphiql: true,
      context: { session: {req, res}}
    })));
  }

}

export default new App().app;
