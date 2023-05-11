import express from "express";
import morgan from "morgan";
import routes from "./routes/index";

export const server = express();
require("./mongo");
const CLIENT_URL = "http://localhost:3001";
const PORT = process.env.PORT || 3001;
server.use(morgan("dev"));
server.use(express.json());
server.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", CLIENT_URL); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

server.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});
