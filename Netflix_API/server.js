const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");

const app = express();
dotenv.config({ path: "./config.env" });

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader(
    "Permissions-Policy",
    "iframe-src 'self' https://www.youtube.com;"
  );
  next();
});

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.error("DB connection failed:", err));

/*mongoose
  .connect("mongodb://localhost:27017/netflix", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });
*/
app.use("/api/user", userRoutes);

app.listen(5000, () => {
  console.log("server started on port 5000");
});
