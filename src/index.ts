import express from "express";
import morgan from "morgan";
import { Request, Response } from "express";
import cron from "node-cron";
import { scraping } from "./utils/scrappingFunction";
import Equipo from "./model/Equipo";
import path from "path";
import { create } from "express-handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
const handlebars = require("handlebars");

export const server = express();
require("./mongo");
const views = require("../build/views/index.js");
const PORT = process.env.PORT || 3001;
server.use(morgan("dev"));
server.use(express.json());
server.set("views", path.join(__dirname, "views"));
server.engine(
  ".hbs",
  create({
    defaultLayout: "main",
    layoutsDir: path.join(server.get("views"), "layouts"),
    partialsDir: path.join(server.get("views"), "partials"),
    extname: ".hbs",
    handlebars: allowInsecurePrototypeAccess(handlebars),
  }).engine
);
server.engine(".hbs", views["main"]);
server.use(express.static(path.join(__dirname + "public")));
server.set("view engine", ".hbs");

//Programamos el web scraping cada 2hs
cron.schedule("0 0 */2 * * *", () => {
  scraping();
  console.log("scraping programado cada 2hs");
});

server.get("/", async (req: Request, res: Response) => {
  try {
    const equipos = await Equipo.find().sort({ position: 1 });
    res.render("index", { equipos });
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

server.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});
