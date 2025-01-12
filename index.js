const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const userRouter = require("./routes/user.route");
const caricaturesRouter = require("./routes/caricatures.route");

app.use("/api/user", userRouter);
app.use("/api/caricatures", caricaturesRouter);

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("DB Connected Sucessfully");
  } catch (err) {
    console.log("DB Failed to Connect");
    console.log(err);
  }
  console.log(`Listening on ${PORT} Port`);
});
