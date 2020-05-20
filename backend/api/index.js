module.exports = (app, options, controllers) => {
  const {
    cors,
    loggerMiddleware,
    requestTimeLogger,
    jwtHelper: { verifyToken },
    multer,
    multerUploads,
  } = options;

  app.use(
    cors({
      origin: "*",
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    })
  );

  app.use(loggerMiddleware);
  app.use(requestTimeLogger);

  const { userController, marketController } = controllers;
  const user = userController(options);
  const market = marketController(options);

  app.post("/api/v1/users/register", user.register);
  app.post("/api/v1/users/login", user.login);
  app.get("/api/v1/users/me", verifyToken, user.me);

  app.get("/api/v1/markets", verifyToken, market.getMarkets);
  app.get("/api/v1/markets/:id", verifyToken, market.getMarket);
  app.post(
    "/api/v1/markets",
    verifyToken,
    multerUploads(multer),
    market.createMarket
  );
  app.patch("/api/v1/markets", verifyToken, market.updateMarket);
  app.delete("/api/v1/markets/:id", verifyToken, market.deleteMarket);
};
