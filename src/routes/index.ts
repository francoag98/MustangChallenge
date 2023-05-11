import { Request, Response, Router } from "express";
import Equipo from "../model/Equipo";
const route = Router();

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
