const marketController = (options) => {
  const { httpStatus, repo, responseHandler, validators, services } = options;

  const createMarket = async (req, res, next) => {
    try {
      const { body, file } = req;
      // const { originalname, path } = file;
      const errors = validators.checkRequestBody(body, [
        "name",
        "description",
        "category",
        "address",
      ]);
      const wrongFileType = validators.checkFileType("png");

      if (errors) {
        return responseHandler.failure(
          res,
          {
            message: wrongFileType
              ? "unsupported audio file"
              : "missing or empty request body",
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

      const { market } = await repo.saveMarket({ ...body, coordinate });

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
    } catch (error) {
      next(error);
    }
  };

  const updateMarket = async (req, res, next) => {
    try {
      const { body } = req;

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

      const { error, market } = await repo.updateMarket({ id: body.id }, body);

      return responseHandler.failure(
        res,
        {
          message: "test",
          response: {
            errors: error,
            market: market[0],
          },
        },
        httpStatus.Ok
      );
    } catch (error) {
      next(error);
    }
  };

  const getMarkets = async (req, res, next) => {
    try {
      const { error, markets } = await repo.findMarkets({
        where: { isDeleted: false },
      });

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
        { id },
        { isDeleted: false }
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

  return Object.create({
    createMarket,
    updateMarket,
    getMarkets,
    getMarket,
    deleteMarket,
  });
};

module.exports = marketController;
