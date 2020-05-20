const jwtHelper = (options) => {
  const {
    jwt, secret, expiresIn, utf8, base64, httpStatus, responseHandler,
  } = options;

  const generateToken = (params) => {
    const jwtToken = jwt.sign({
      data: params,
    }, secret, { expiresIn });
    const bytes = utf8.encode(jwtToken);
    const token = base64.encode(bytes);

    return {
      token,
      expiresIn,
    };
  };

  const verifyToken = (req, res, next) => {
    function verifyCallBack(error, decoded) {
      if (error) {
        return responseHandler.failure(res, {
          status: 'error',
          response: {
            message: 'Access Unauthorized',
          },
        }, httpStatus.UNAUTHORIZED);
      }
      req.authUser = decoded.data;
      return next();
    }

    try {
      const { authorization } = req.headers;
      const bearer = authorization ? authorization.split(' ')[1] : null;
      if (!authorization || !bearer) {
        return responseHandler.failure(res, {
          status: 'error',
          response: {
            message: 'Authorization code is empty.',
          },
        }, httpStatus.UNAUTHORIZED);
      }

      const bytes = base64.decode(bearer);
      const token = utf8.decode(bytes);

      return jwt.verify(token, secret, verifyCallBack);
    } catch (error) {
      return next(error);
    }
  };

  return Object.create({
    generateToken,
    verifyToken,
  });
};

module.exports = jwtHelper;
