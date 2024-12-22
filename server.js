const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const productsRouter = require("./routes/productsRouter");
require("dotenv").config();

const server = new express();
const port = process.env.PORT;
const mongooseUrl = process.env.MONGODB_URL;

server.get("/", (req, res) => {
  res.send("Hello mern stack app !");
});

// MongoDB Connection
mongoose.connect(mongooseUrl)
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.error(`Mongo DB comnection error : ${err}`);
  });

// Important to handle incoming JSON
server.use(express.json());

server.use("/user", userRouter);
server.use("/products", productsRouter);

server.listen(port, () => {
  console.log(`Conected to PORT : ${port}`);
});
