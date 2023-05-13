"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scraping = void 0;
const axios_1 = __importDefault(require("axios"));
const Equipo_1 = __importDefault(require("../model/Equipo"));
const cheerio = require("cheerio");
const scraping = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get("https://www.futbolargentino.com/primera-division/tabla-de-posiciones");
    let equipos = [];
    const $ = cheerio.load(response.data);
    const divTabla = $("div#p_score_contenido_TorneoTabs_collapse3 tbody").find("tr");
    divTabla.each((i, el) => {
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
        const equipoInfo = {
            name: equipoNombre,
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
    yield Equipo_1.default.deleteMany({});
    yield Equipo_1.default.create(equipos);
});
exports.scraping = scraping;
