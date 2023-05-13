"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = require("dotenv");
dotenv.config();
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const connectionString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ehrjjit.mongodb.net/${DB_NAME}`;
mongoose_1.default.set("strictQuery", false);
const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose_1.default
    .connect(connectionString, OPTIONS)
    .then(() => console.log(mongoose_1.default.connection.readyState))
    .catch((error) => console.error(error));
