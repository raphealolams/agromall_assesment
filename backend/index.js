/**
 * @author: Raphael Ajilore.
 */

/**
 * @author we load all the dependencies to avoid circular dependencies issues on nodejs
 */
require("dotenv").config();
const { EventEmitter } = require("events");

const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const winston = require("winston");
const jwt = require("jsonwebtoken");
const utf8 = require("utf8");
const base64 = require("base-64");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const to = require("await-to-js").default;
const got = require("got");
const geolib = require("geolib");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

const responseHandler = require("./utils/response_manager");
const httpStatus = require("./constants/http_status");

const server = require("./server/server");
const repository = require("./repository/repository");

const API = require("./api");
const winstonLogger = require("./utils/logger");
const jwtHelper = require("./utils/jwt_helper");
const validators = require("./utils/validators");
const services = require("./services/services");
const locationFinder = require("./utils/locator");
const multerUploads = require("./utils/multer");
const database = require("./models");

const userController = require("./controllers/user.controller");
const marketController = require("./controllers/market.controller");

const {
  dbSettings,
  serverSettings: { port, env },
  jwt: { secret, expiresIn },
  googleKeys,
} = require("./config");

const { logger, requestTimeLogger, loggerMiddleware } = winstonLogger.logger(
  env,
  winston
);

const mediator = new EventEmitter();

const dependencies = {
  port,
  requestTimeLogger,
  loggerMiddleware,
  express,
  helmet,
  bodyParser,
  httpStatus,
  responseHandler,
  cors,
  jwt,
  base64,
  utf8,
  validators: validators(_),
  bcrypt,
  expiresIn,
  secret,
  to,
  multer,
  multerUploads,
  services: services({ got, to, googleKeys, cloudinary }),
  locationFinder: locationFinder({ geolib }),
};

/**
 * @author verbose logging when we are starting the server
 */
logger.info("--- agromall  API ---");
logger.info("Connecting to agromall API repository...");

/**
 * @author log unhandled exceptions
 */
process.on("uncaughtException", (err) => {
  logger.error("Unhandled Exception", err);
});

process.on("uncaughtRejection", (err, promise) => {
  logger.error("Unhandled Rejection", err);
});

/**
 * @author event listener when the repository has been connected
 */
mediator.on("db.ready", (db) => {
  let rep;
  return repository
    .connect({ ...db, database, to })
    .then((repo) => {
      logger.info("Repository Connected. Starting Server");
      rep = repo;
      dependencies.repo = repo;
      dependencies.jwtHelper = jwtHelper(dependencies);
      return server.start(API, dependencies, {
        userController,
        marketController,
      });
    })
    .then((app) => {
      logger.info(`Server started successfully, running on port: ${port}.`);
      app.on("close", () => {
        logger.info(`disconnecting from app repository......`);
        rep.disconnect();
      });
    });
});

/**
 * @author database error occurred
 */
mediator.on("db.error", (err) => {
  logger.error(`Database error. ${err}`);
});

/**
 * @author we load the connection to the repository
 */
database.connect(
  {
    Sequelize,
    fs,
    path,
    dbSettings,
  },
  mediator
);

/**
 * @author init the repository connection, and the event listener will handle the rest
 */
mediator.emit("boot.ready");
