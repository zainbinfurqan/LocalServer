module.exports = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers["origin"]);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST,OPTIONS, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept, Cache-Control"
  );

  var ip = req.headers["x-forwarded-for"]
    ? req.headers["x-forwarded-for"]
    : req.socket.remoteAddress;
  req.userIp = ip.substr(ip.lastIndexOf(":") + 1);
  req.userIp = req.userIp === (1 || "127.0.0.1") ? "" : req.userIp;

  next();
};
