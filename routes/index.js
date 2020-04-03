// Import all routes here
const routes = {
  user: require("./user"),
  auth: require("./authentication"),
};

module.exports = function (app) {
  for (let i in routes) {
    app.use("/api/" + i, routes[i]);
  }
};
