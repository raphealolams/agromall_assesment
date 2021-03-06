const validators = (_) => {
  const isValidQuery = (query) => {
    const queryObject = query;
    if (queryObject.length < 1) return false;

    return queryObject;
  };

  const checkRequestContent = (body) => {
    const errors = {};
    Object.keys(body).forEach((item) => {
      if (typeof body[item] === "object") {
        Object.keys(body[item]).forEach((v) => {
          if (_.isEmpty(body[item][v])) {
            errors[`${item}.${v}`] = "cannot be empty";
          }
        });
      }
      if (_.isEmpty(body[item])) {
        errors[item] = "cannot be empty";
      }
    });

    if (_.isEmpty(errors)) {
      return null;
    }

    return errors;
  };

  const checkRequestBody = (params, requiredFields) => {
    const errors = {};
    for (let i = 0; i < requiredFields.length; i += 1) {
      if (!Object.prototype.hasOwnProperty.call(params, requiredFields[i])) {
        errors[requiredFields[i]] = "is required";
      }
    }

    if (_.isEmpty(errors)) {
      return checkRequestContent(params);
    }
    return errors;
  };

  const isEmail = (email) => {
    if (!email) return false;
    if (email.length === 0) return false;
    const re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const checkFileType = (originalname) => {
    const supportExtensions = ["png", "jpeg"];
    const errors = [];
    if (originalname instanceof Array) {
      originalname.map((name) => {
        if (
          !supportExtensions.indexOf(
            name.originalname.split(".")[
              name.originalname.split(".").length - 1
            ]
          ) === -1
        ) {
          errors.push(name.originalname);
        }
      });

      if (errors.length > 0) return true;
      else return false;
    } else
      return (
        supportExtensions.indexOf(
          originalname.split(".")[originalname.split(".").length - 1]
        ) === -1
      );
  };

  return Object.create({
    isValidQuery,
    checkRequestBody,
    checkRequestContent,
    isEmail,
    checkFileType,
  });
};

module.exports = validators;
