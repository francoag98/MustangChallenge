import { Request, Response, Router } from "express";
import Equipo from "../model/Equipo";
import { scrapping } from "../utils/scrappingFunction";
const cheerio = require("cheerio");
const route = Router();

route.get("/", async (req, res) => {
  try {
    const data = await scrapping();
    const $: any = cheerio.load(data).html();
    const tabla = $("div.collapse show");
    console.log(tabla);

    res.status(200).send("hola");
  } catch (error) {
    res.status(400).send("no");
  }
});

route.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);

  try {
    if (!body) throw new Error("no hay body");
    const equipoCreado = await Equipo.create({
      position: body.position,
      name: body.name,
      partidosJugados: body.partidosJugados,
      Ganados: body.ganados,
      Empatados: body.empatados,
      Perdidos: body.perdidos,
      golesAfavor: body.golesAfavor,
      golEnContra: body.golEnContra,
      difDeGoles: body.difDeGoles,
      puntos: body.puntos,
    });
    if (!equipoCreado) throw new Error("no se pudo crear el equipo");
    return res.status(200).send(equipoCreado);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
});

export default route;
