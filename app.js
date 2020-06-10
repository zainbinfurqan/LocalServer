const path = require("path"),
  logger = require("morgan"),
  cron = require('node-cron'),
  express = require("express"),
  globalHelpers = require("./utils/globalHelpers"),
  dataBase = require('./config/database'),
  app = express(),
  fileUpload = require('express-fileupload'),
  { redisFunctions } = require('./controllers/redis/redisController');
app.use(fileUpload({
  useTempFiles: true,
}));
require("dotenv").config();

// app = require("express")(),
// http = require("http").createServer(express),
socket = require("socket.io");// Include Packages
require("module-alias/register");
// Load environment variables

//-----------------------
const UserSchema = require('./models/user/User');
const room = require('./models/room');
const chatting = require('./models/chatting/chatting');
const bcrypt = require("bcryptjs");

// Load environment variables

// Mongoose Connection
// require("./config/database");

const keys = require("./config/keys");
console.log(keys)

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



// Load routes
require("./routes")(app);


app.get("/", function (_, res) {
  res.json({ message: "server is up and running" });
});

// app.get('/redis', redisFunctions)

// Global error handler
app.use((err, _, res, next) => {
  const error = globalHelpers.handleMongooseError(err.message);

  res.status(err.status || 400).json({ ...error, success: false });
});
const Port = process.env.PORT || 3000;
const server = app.listen(Port, () =>
  console.log("server is running on port", Port)

);

//-----------------
app.post('/api/createUser', async (req, res, next) => {
  try {
    console.log(req.body)
    const salt = await bcrypt.genSalt(10);

    req.body.password = await bcrypt.hash(req.body.password, salt);

    let createUser = new UserSchema(req.body);

    await createUser.save();

    res.status(200).json(createUser)

  } catch (error) {

    res.status(304).json(error)

  }
})


app.post('/api/login', async (req, res, next) => {
  try {

    console.log(req.body)

    let getEmail = await UserSchema.findOne({ email: req.body.email });

    console.log(getEmail, "getEmail")

    if (!getEmail) { throw new Error("invalid email or password"); }

    const hash = bcrypt.hashSync(req.body.password, getEmail[0].password);

    console.log(hash, "hash")
    // if (!hash) { res.status(304).json({ message: "Password incorrect" }) }
    if (!hash) { throw new Error("invalid email or password"); }

    res.status(200).json({ message: 'login successfully' })

  } catch (error) {
    res.status(200).json(error)
  }
})


app.get('/api/getUsers', async (req, res, next) => {
  try {

    let fetchUser = await UserSchema.find({});

    res.status(200).json(fetchUser)

  } catch (error) {

    res.status(304).json(error)

  }
})

app.post('/creatRoom', async (req, res, next) => {
  try {

    let payload = {
      users: [req.body.user, req.body.otherUser]
    }
    let creatRoom = new room(payload);

    await creatRoom.save();

    res.status(200).json(creatRoom)

  } catch (error) {

    res.status(304).json(error)

  }
})

app.post('/creatMessage', async (req, res, next) => {
  try {

    let creatMessage = new chatting(payload);
    await creatMessage.save();

    res.status(200).json(creatMessage)

  } catch (error) {

    res.status(304).json(error)

  }
})

global.connection = socket(server);
let connectedUsers = [];
const nsp = connection.of("/chat");

//chat function  currently working 
nsp.on("connection", function (s) {

  s.on("room-join", socketData => {

    //-----------new
    const user = { id: s.id, userName: socketData.sender, room: socketData.room }
    connectedUsers.push(user);
    s.join(user.room);

    s.on("new-message", async socketData => {
      const user = connectedUsers.find(user => user.id === s.id);
      const payload = { userId: socketData.userId, message: socketData.message, roomId: socketData.roomId };
      const message = new chatting(payload);

      message.save();

      s.to(user.room).emit("new-message", socketData.message)
    })
  });
  s.on("disconnect", function () {
    connectedUsers = connectedUsers.filter(item => item.socketId !== s.id);
  });

});


module.exports = app;
