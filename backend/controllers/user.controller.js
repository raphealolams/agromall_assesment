const userController = (options) => {
  const {
    bcrypt,
    httpStatus,
    jwtHelper,
    repo,
    responseHandler,
    validators,
  } = options;

  /**
   * @param {*} req request object
   * @param {*} res response object
   * @param {*} next handler
   * @author function that handles user registration
   * @author it also log user's in once registration is successful
   */
  const register = async (req, res, next) => {
    try {
      const { body } = req;

      const errors = validators.checkRequestBody(body, [
        "firstName",
        "lastName",
        "email",
        "password",
        "confirmPassword",
      ]);
      const isEmail = validators.isEmail(body.email);
      if (errors || !isEmail) {
        return responseHandler.failure(
          res,
          {
            message: !isEmail
              ? "email string not valid"
              : "missing or empty request body",
            response: {
              errors,
            },
          },
          httpStatus.BAD_REQUEST
        );
      }

      if (body.password.localeCompare(body.confirmPassword) !== 0) {
        return responseHandler.failure(
          res,
          {
            message: "Password Mis-match",
            response: {},
          },
          httpStatus.NOT_ACCEPTABLE
        );
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(body.password, salt);
      body.password = hash;
      const { error, user, created } = await repo.saveNewUser(body);

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

      if (created) {
        user.password = undefined;
        const { token, expiresIn } = jwtHelper.generateToken({
          userId: user.id,
          email: user.email,
        });

        return responseHandler.success(
          res,
          {
            message: "user successfully created",
            response: {
              user,
              bearerToken: `Bearer ${token}`,
              expiresIn,
            },
          },
          httpStatus.CREATED
        );
      }

      return responseHandler.success(
        res,
        {
          message: "The email already exists.",
          response: {},
        },
        httpStatus.UNPROCESSABLE_ENTITY
      );
    } catch (error) {
      return next(error);
    }
  };

  /**
   * @param {*} req request object
   * @param {*} res response object
   * @param {*} next handler
   * @author function that handles user login
   * @author it log user's in once credential's are valid
   */
  const login = async (req, res, next) => {
    try {
      const { body } = req;
      const errors = validators.checkRequestBody(body, ["email", "password"]);
      const isEmail = validators.isEmail(body.email);
      if (errors || !isEmail) {
        return responseHandler.failure(
          res,
          {
            message: !isEmail
              ? "email string not valid"
              : "missing or empty request body",
            response: {
              errors,
            },
          },
          httpStatus.BAD_REQUEST
        );
      }

      const { error, user } = await repo.findUser({ email: body.email });
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

      if (!user) {
        return responseHandler.failure(
          res,
          {
            message: "invalid email or password",
            response: {},
          },
          httpStatus.UNPROCESSABLE_ENTITY
        );
      }

      const comparePassword = bcrypt.compareSync(body.password, user.password);

      if (comparePassword) {
        user.password = undefined;

        const { token, expiresIn } = jwtHelper.generateToken({
          userId: user.id,
          email: user.email,
        });

        return responseHandler.success(
          res,
          {
            message: "login successful",
            response: {
              user,
              bearerToken: `Bearer ${token}`,
              expiresIn,
            },
          },
          httpStatus.OK
        );
      }

      return responseHandler.failure(
        res,
        {
          message: "invalid email or password",
          response: {},
        },
        httpStatus.UNPROCESSABLE_ENTITY
      );
    } catch (error) {
      return next(error);
    }
  };

  /**
   * @param {*} req request object
   * @param {*} res response object
   * @param {*} next handler
   * @author function that handles user registration
   */
  const me = async (req, res, next) => {
    try {
      const { authUser } = req;
      const { error, user } = await repo.findUser({ email: authUser.email }, [
        "firstName",
        "lastName",
        "email",
      ]);

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

      if (!user) {
        responseHandler.failure(
          res,
          {
            message: "user not found",
            response: {},
          },
          httpStatus.NOT_FOUND
        );
      }

      return responseHandler.success(
        res,
        {
          message: "user fetched",
          response: {
            user,
          },
        },
        httpStatus.OK
      );
    } catch (error) {
      return next(error);
    }
  };

  return Object.create({
    register,
    login,
    me,
  });
};

module.exports = userController;
