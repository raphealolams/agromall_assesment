/**
 * @author factory function, that holds an open connection to the db,
 * @author and exposes some functions for accessing the data.
 * @author we already know that we are going to query the `some` database table
 */
const repository = (database) => {
  const {
    Users,
    Markets,
    sequelize,
    Sequelize: { Op },
    to,
  } = database;

  /**
   *
   * @param {*} params
   * @author first find user with the email, if user exist don't save
   * @author if user not exist save
   */
  const saveNewUser = async (params) => {
    const [error, spread] = await to(
      Users.findOrCreate({
        where: {
          email: params.email,
        },
        defaults: {
          firstName: params.firstName,
          lastName: params.lastName,
          email: params.email,
          password: params.password,
        },
      })
    );

    if (error) {
      return {
        error,
      };
    }

    const [user, created] = spread;

    return {
      error: null,
      user,
      created,
    };
  };

  const findUser = async (params, attributes) => {
    const [error, user] = await to(
      Users.findOne({
        attributes: attributes instanceof Array ? attributes : undefined,
        where: {
          ...params,
        },
      })
    );
    return {
      error: error || null,
      user,
    };
  };

  const findUsers = async (params, attributes) => {
    const where = params ? params : undefined;
    const [error, users] = await to(
      Users.findAll({
        attributes: attributes instanceof Array ? attributes : undefined,
        where,
      })
    );
    return {
      error: error || null,
      users,
    };
  };

  const saveMarket = async (params) => {
    const [error, spread] = await to(
      Markets.findOrCreate({
        where: {
          name: params.name,
          category: params.category,
        },
        defaults: {
          name: params.name,
          category: params.category,
          description: params.description,
          pictures: params.pictures,
          address: params.address,
          coordinate: params.coordinate,
        },
      })
    );

    if (error) {
      return {
        error,
      };
    }

    const [market, created] = spread;

    return {
      error: null,
      market,
      created,
    };
  };

  const findMarket = async (params, attributes) => {
    const [error, market] = await to(
      Markets.findOne({
        attributes: attributes instanceof Array ? attributes : undefined,
        where: {
          ...params,
        },
      })
    );
    return {
      error: error || null,
      market,
    };
  };

  const findMarkets = async (params, attributes) => {
    const where = params ? params.where : undefined;
    const [error, markets] = await to(
      Markets.findAll({
        attributes: attributes instanceof Array ? attributes : undefined,
        where,
      })
    );
    return {
      error: error || null,
      markets,
    };
  };

  const searchMarkets = async (params, attributes) => {
    const [error, markets] = await to(
      Markets.findAll({
        attributes: attributes instanceof Array ? attributes : undefined,
        where: {
          isDeleted: false,
          [Op.or]: {
            name: {
              [Op.like]: `%${params.name}%`,
            },
            category: {
              [Op.like]: `%${params.category}%`,
            },
          },
        },
      })
    );
    return {
      error: error || null,
      markets,
    };
  };
  const updateMarket = async (whereClause, valueToUpdate) => {
    const [error, market] = await to(
      Markets.update(valueToUpdate, {
        returning: true,
        where: {
          ...whereClause,
        },
      })
    );
    return {
      error: error || null,
      market: market[1],
      rowCount: market[0],
    };
  };

  // this will close the database connection
  const disconnect = () => {
    database.close();
  };

  return Object.create({
    disconnect,
    saveNewUser,
    findUser,
    findUsers,
    saveMarket,
    findMarkets,
    findMarket,
    updateMarket,
    searchMarkets,
  });
};

const connect = (connection) =>
  new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error("connection db not supplied!"));
    }
    resolve(repository(connection));
  });

// this only exports a connected repo
module.exports = { connect };
