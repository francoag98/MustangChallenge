import axios from "axios";
const cheerio = require("cheerio");
interface Equipo {
  position: number;
  name: string;
  partidosJugados: number;
  Ganados: number;
  Empatados: number;
  Perdidos: number;
  golesAfavor: number;
  golEnContra: number;
  difDeGoles: number;
  puntos: number;
  urlImage: string;
}
export const scrapping = async () => {
  const response = await axios.get(
    "https://www.futbolargentino.com/primera-division/tabla-de-posiciones"
  );
  let equipos: Equipo[] = [];
  const $ = cheerio.load(response.data);
  const divTabla = $("div#p_score_contenido_TorneoTabs_collapse3 tbody").find(
    "tr"
  );

  divTabla.each((i: any, el: any) => {
    const equipoNombre = $(el).find("span.d-none").text().trim();
    const positionEquipo = $(el).find("td:first-child").text();
    const partidosTotales = $(el).find("td.bg-color:nth-child(3)").text();
    const partidosGanados = $(el).find("td.d-none:nth-child(4)").text();
    const partidosEmpatados = $(el).find("td.d-none:nth-child(5)").text();
    const partidosPerdidos = $(el).find("td.d-none:nth-child(6)").text();
    const golesAfavor = $(el).find("td.d-none:nth-child(7)").text();
    const golesEnContra = $(el).find("td.d-none:nth-child(8)").text();
    const puntos = $(el).find("td.bg-color:last-child").text();
    const urlImage = $(el).find("img").attr("data-src");

    const equipoInfo: Equipo = {
      name: equipoNombre as string,
      position: Number(positionEquipo),
      partidosJugados: Number(partidosTotales),
      Ganados: Number(partidosGanados),
      Empatados: Number(partidosEmpatados),
      Perdidos: Number(partidosPerdidos),
      golesAfavor: Number(golesAfavor),
      golEnContra: Number(golesEnContra),
      difDeGoles: Number(golesAfavor - golesEnContra),
      puntos: Number(puntos),
      urlImage: urlImage,
    };
    equipos.push(equipoInfo);
  });
  console.log(equipos);
  return equipos;
};

scrapping();
