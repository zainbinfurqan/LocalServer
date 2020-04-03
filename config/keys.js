const keys = {
  PORT: process.env.PORT,
  SALT: Number(process.env.SALT),
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URI: process.env.MONGO_URI,
};

if (process.env.NODE_ENV === "development") {
  keys["MONGO_URI"] = process.env.MONGO_URI;
}

if (process.env.NODE_ENV === "production") {
  keys["MONGO_URI"] = process.env.MONGO_URI;
}

module.exports = keys;
