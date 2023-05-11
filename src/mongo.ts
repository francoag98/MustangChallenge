import mongoose from "mongoose";
import { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = "MustangChallenge";
const connectionString: string = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ehrjjit.mongodb.net/${DB_NAME}`;

mongoose.set("strictQuery", false);
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(connectionString, OPTIONS as ConnectOptions)
  .then(() => console.log(mongoose.connection.readyState))
  .catch((error) => console.error(error));
