const dbSettings = {
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  dialect: process.env.DATABASE_DIALECT,
  host: process.env.DATABASE_HOST,
  logging: JSON.parse(process.env.DATABASE_LOGGING || "false"),
  pool: {
    min: Number(process.env.DATABASE_MIN),
    max: Number(process.env.DATABASE_MAX),
    idle: Number(process.env.DATABASE_IDLE),
    acquire: Number(process.env.DATABASE_ACQUIRE),
  },
  define: {
    timestamps: JSON.parse(process.env.DATABASE_TIMESTAMPS || "false"),
  },
};

const cloudinary = {
  cloudName: process.env.CLOUDINARY_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
  cloudUrl: process.env.CLOUDINARY_URL,
};

const serverSettings = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
};

const jwt = {
  secret: process.env.JWTSECRET,
  expiresIn: process.env.JWTEXPIRESIN,
};

const googleKeys = {
  googleUrl: process.env.GOOGLE_URL,
  googleKey: process.env.GOOGLE_KEY,
};

const development = {
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  dialect: process.env.DATABASE_DIALECT,
  operatorsAliases: process.env.DATABASE_OPERATORS_ALIASES,
};

const test = {
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  dialect: process.env.DATABASE_DIALECT,
  operatorsAliases: process.env.DATABASE_OPERATORS_ALIASES,
};

const production = {
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  dialect: process.env.DATABASE_DIALECT,
  operatorsAliases: process.env.DATABASE_OPERATORS_ALIASES,
};

module.exports = {
  cloudinary,
  dbSettings,
  development,
  googleKeys,
  jwt,
  production,
  serverSettings,
  test,
};
