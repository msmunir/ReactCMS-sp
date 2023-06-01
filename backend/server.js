//Import mongoose, cors and dotenv , app
const app = require("./app");
const mongoose = require("mongoose");
const cors = require("cors");
cors();
require("dotenv").config();

//Set port and listen, connect to mongoDB
const PORT = process.env.PORT || 8081;

app.listen(PORT, () => console.log("Server is running on port http://localhost:" + PORT));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err.message));