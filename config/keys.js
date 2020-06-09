const keys = {
  PORT: 3000,
  SALT: 10,
  JWT_SECRET: 'dbName*$@JLTiCkEtBOx2k20^',
  MONGO_URI: 'mongodb+srv://zain:ZAIN@cluster0-vlmgy.mongodb.net/Chatting?retryWrites=true&w=majority',
};

// if (process.env.NODE_ENV === "development") {
//   keys["MONGO_URI"] = 'mongodb+srv://zain:zain@cluster0-4xkaq.mongodb.net/test?retryWrites=true&w=majority';
// }

// if (process.env.NODE_ENV === "production") {
//   keys["MONGO_URI"] = 'mongodb+srv://zain:zain@cluster0-4xkaq.mongodb.net/test?retryWrites=true&w=majority';
// }


module.exports = keys;
