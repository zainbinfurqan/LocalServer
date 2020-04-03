const path = require("path"),
  logger = require("morgan"),
  express = require("express"),
  globalHelpers = require("./utils/globalHelpers"),
  app = express();
  // app = require("express")(),
  // http = require("http").createServer(express),
  // io = require("socket.io")(http);
// Include Packages
require("module-alias/register");

// Load environment variables
require("dotenv").config();

// Mongoose Connection
require("./config/database");

const keys = require("./config/keys");

//To prevent attackers from reading this header (which is enabled by default) to detect apps running express
app.disable("x-powered-by");

// view engine setup
global.base = path.join(__dirname + "/");

// General Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set few important headers
app.use(require("./middleware/setHeaders"));

app.get("/", function(_, res) {
  res.json({ message: "server is up and running" });
});

// Load routes
require("./routes")(app);

// Global error handler
app.use((err, _, res, next) => {
  const error = globalHelpers.handleMongooseError(err.message);

  res.status(err.status || 400).json({ ...error, success: false });
});

app.listen(keys.PORT, () =>
  console.log("server is running on port", keys.PORT)
  
);



module.exports = app;
