

const mongoose = require("mongoose");

const keys = require("../config/keys");
console.log(keys)
mongoose
  .connect(keys.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("Database connected!"))
  .catch(err => console.log("error connecting database =>", err));

// mongoose.set("useFindAndModify", false);
// mongoose.set("useCreateIndex", true);
