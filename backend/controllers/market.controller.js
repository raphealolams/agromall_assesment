const marketController = (options) => {
  const {
    httpStatus,
    locationFinder,
    repo,
    responseHandler,
    validators,
    services,
  } = options;

  const createMarket = async (req, res, next) => {
    try {
      const { body, files } = req;
      const errors = validators.checkRequestBody(body, [
        "name",
        "description",
        "category",
        "address",
      ]);

      if (errors) {
        return responseHandler.failure(
          res,
          {
            message: "missing or empty request body",
            response: {
              errors,
            },
          },
          httpStatus.BAD_REQUEST
        );
      }

      const { error, response } = await services.handleGeoCoding({
        type: "address",
        address: body.address.trim(),
      });

      let coordinate = {
        latitude: response.results[0].geometry.location.lat,
        longitude: response.results[0].geometry.location.lng,
      };

      return services
        .performUpload(files)
        .then(async (images) => {
          let cloudImageUrl = images.map((image) => image.secure_url);

          console.log(body, cloudImageUrl);
          const { market } = await repo.saveMarket({
            name: body.name,
            category: body.category,
            description: body.description,
            address: body.address,
            pictures: cloudImageUrl,
            coordinate,
          });

          if (!market) {
            return responseHandler.failure(
              res,
              {
                message: "missing or empty request body",
                response: {
                  errors,
                },
              },
              httpStatus.BAD_REQUEST
            );
          }
          return responseHandler.success(
            res,
            {
              message: "market added",
              response: {
                market,
              },
            },
            httpStatus.OK
          );
        })
        .catch((err) => {
          return responseHandler.failure(
            res,
            {
              message: "error occurred",
              response: {
                errors: err,
              },
            },
            httpStatus.UNPROCESSABLE_ENTITY
          );
        });
    } catch (error) {
      next(error);
    }
  };

  const updateMarket = (req, res, next) => {
    try {
      const { body, files } = req;
      console.error(body, files);

      const errors = validators.checkRequestBody(body, ["id"]);

      if (errors) {
        return responseHandler.failure(
          res,
          {
            message: "missing or empty request body",
            response: {
              errors,
            },
          },
          httpStatus.BAD_REQUEST
        );
      }

      return services
        .performUpload(files)
        .then(async (images) => {
          body.pictures = images.map((image) => image.secure_url);
          const { error, market } = await repo.updateMarket(
            { id: body.id },
            body
          );

          return responseHandler.success(
            res,
            {
              message: "market updated",
              response: {
                errors: error,
                market: market[0],
              },
            },
            httpStatus.Ok
          );
        })
        .catch((err) => {
          return responseHandler.failure(
            res,
            {
              message: "error occurred",
              response: {
                errors: err,
              },
            },
            httpStatus.UNPROCESSABLE_ENTITY
          );
        });
    } catch (error) {
      next(error);
    }
  };

  const getMarkets = async (req, res, next) => {
    try {
      const { error, markets } = await repo.findMarkets(
        {
          where: { isDeleted: false },
        },
        [
          "id",
          "address",
          "name",
          "pictures",
          "description",
          "coordinate",
          "category",
        ]
      );

      if (error || !markets) {
        return responseHandler.failure(
          res,
          {
            message: error ? "an error occurred" : "market not found",
            response: {
              errors: error,
            },
          },
          error ? httpStatus.UNPROCESSABLE_ENTITY : httpStatus.NOT_FOUND
        );
      }

      return responseHandler.success(
        res,
        {
          message: "market fetched",
          response: {
            markets,
            count: markets.length,
          },
        },
        httpStatus.OK
      );
    } catch (error) {
      next(error);
    }
  };

  const getMarket = async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;

      if (!id) {
        return responseHandler.failure(
          res,
          {
            message: "missing or empty parameter body",
            response: {},
          },
          httpStatus.BAD_REQUEST
        );
      }

      const { error, market } = await repo.findMarket(
        { id, isDeleted: false },
        [
          "id",
          "address",
          "name",
          "pictures",
          "description",
          "coordinate",
          "category",
        ]
      );
      if (error) {
        return responseHandler.failure(
          res,
          {
            message: "error occurred",
            response: {
              errors: error,
            },
          },
          httpStatus.UNPROCESSABLE_ENTITY
        );
      }

      return responseHandler.success(
        res,
        {
          message: "market fetched",
          response: {
            market,
          },
        },
        httpStatus.OK
      );
    } catch (error) {
      next(error);
    }
  };

  const deleteMarket = async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;

      if (!id) {
        return responseHandler.failure(
          res,
          {
            message: "missing or empty parameter body",
            response: {},
          },
          httpStatus.BAD_REQUEST
        );
      }

      const { error, market } = await repo.updateMarket(
        { id },
        { isDeleted: true }
      );

      if (error || !market) {
        return responseHandler.failure(
          res,
          {
            message: "error deleting market",
            response: {
              errors: error,
            },
          },
          httpStatus.UNPROCESSABLE_ENTITY
        );
      }

      return responseHandler.success(
        res,
        {
          message: "market deleted",
          response: {},
        },
        httpStatus.OK
      );
    } catch (error) {
      next(error);
    }
  };

  const searchMarkets = async (req, res, next) => {
    try {
      const { query } = req;
      const { error, markets } = await repo.findMarkets(query, [
        "id",
        "address",
        "name",
        "pictures",
        "description",
        "coordinate",
        "category",
      ]);

      if (error || !markets) {
        return responseHandler.failure(
          res,
          {
            message: "error occurred",
            response: {
              errors: error,
            },
          },
          httpStatus.UNPROCESSABLE_ENTITY
        );
      }

      const locations = locationFinder.sortLocation(markets, {
        latitude: query.latitude,
        longitude: query.longitude,
      });

      return responseHandler.success(
        res,
        {
          message: "markets found",
          markets: locations,
        },
        httpStatus.OK
      );
    } catch (error) {
      next(error);
    }
  };
  return Object.create({
    createMarket,
    updateMarket,
    getMarkets,
    getMarket,
    deleteMarket,
    searchMarkets,
  });
};

module.exports = marketController;
