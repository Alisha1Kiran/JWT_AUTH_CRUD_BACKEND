const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const productsRouter = require("./routes/productsRouter");
const cors = require("cors");
require("dotenv").config();

const server = new express();
const port = process.env.PORT;
const mongooseUrl = process.env.MONGODB_URL;

const allowedOrigins = [
  "http://localhost:5173",  // Local development
  "https://jwt-auth-crud-frontend.onrender.com", // frontend production domain
  "https://jwtauth-crud-frontend.netlify.app"  // frontend production domain
];
// Use cors middleware
server.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"] // Allowed headers
  })
);
server.get("/", (req, res) => {
  res.send("Hello mern stack app !");
});

// MongoDB Connection
mongoose
  .connect(mongooseUrl)
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
