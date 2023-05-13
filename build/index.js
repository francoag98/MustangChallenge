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
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const node_cron_1 = __importDefault(require("node-cron"));
const scrappingFunction_1 = require("./utils/scrappingFunction");
const Equipo_1 = __importDefault(require("./model/Equipo"));
const path_1 = __importDefault(require("path"));
const express_handlebars_1 = require("express-handlebars");
const allow_prototype_access_1 = require("@handlebars/allow-prototype-access");
const handlebars = require("handlebars");
const template = require("handlebars-template-loader");
exports.server = (0, express_1.default)();
require("./mongo");
const PORT = process.env.PORT || 3001;
exports.server.use((0, morgan_1.default)("dev"));
exports.server.use(express_1.default.json());
exports.server.set("views", path_1.default.join(__dirname, "views"));
exports.server.engine(".hbs", (0, express_handlebars_1.create)({
    defaultLayout: "main",
    layoutsDir: path_1.default.join(exports.server.get("views"), "layouts"),
    partialsDir: path_1.default.join(exports.server.get("views"), "partials"),
    extname: ".hbs",
    handlebars: (0, allow_prototype_access_1.allowInsecurePrototypeAccess)(handlebars),
}).engine);
exports.server.use(express_1.default.static(path_1.default.join(__dirname + "public")));
exports.server.set("view engine", ".hbs");
//Programamos el web scraping cada 2hs
node_cron_1.default.schedule("0 0 */2 * * *", () => {
    (0, scrappingFunction_1.scraping)();
    console.log("scraping programado cada 2hs");
});
exports.server.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const equipos = yield Equipo_1.default.find().sort({ position: 1 });
        res.render("index", { equipos });
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}));
exports.server.listen(PORT, () => {
    console.log(`Server Listening on port ${PORT}`);
});
