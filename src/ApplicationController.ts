require("dotenv").config({
  path: process.env.NODE_ENV == "test" ? ".env.test" : ".env",
});

const { version } = require("../package.json");

import helmet from "helmet";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import RoutesV1EntryPoint from "./routes-v1/RoutesV1EntryPoint";
import apiResponse from "./app/commons/ApiResponse";

class ApplicationController {
  public express = express();

  constructor() {
    this.init();
    this.loadDependencies();
  }

  init() {
    this.express.use(helmet());
    this.express.use(morgan("combined"));
    this.express.use(cors({ origin: "*" }));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));

    this.express.use("/api/v1", new RoutesV1EntryPoint().loadRoutes());

    /** Returns the app version declared in package.json. */
    this.express.get("/version", (_: any, res: any) => {
      res.status(200).send(apiResponse(version));
    });
  }

  loadDependencies() {}
}

export default new ApplicationController().express;
