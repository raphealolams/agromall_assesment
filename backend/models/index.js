const db = {};

const handleImport = (options) => {
  const { Sequelize, fs, path, dbSettings } = options;
  const basename = path.basename(__filename);

  return new Promise((resolve, reject) => {
    if (!dbSettings) {
      reject(new Error("connection db not supplied!"));
    }

    const sequelize = new Sequelize(dbSettings);
    fs.readdirSync(__dirname)
      .filter(
        (file) =>
          file.indexOf(".") !== 0 &&
          file !== basename &&
          file.slice(-3) === ".js"
      )
      .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
      });

    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    return resolve(db);
  });
};

const connect = (options, mediator) => {
  handleImport(options)
    .then((dbObject) =>
      dbObject.sequelize
        .authenticate()
        .then(() => {
          mediator.emit("db.ready", dbObject);
        })
        .catch((err) => mediator.emit("db.error", err))
    )
    .catch((error) => mediator.emit("db.error", error));
};

module.exports = { connect, handleImport };
