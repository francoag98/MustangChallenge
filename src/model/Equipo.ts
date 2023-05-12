import mongoose, { Schema } from "mongoose";

export const EquipoSchema = new Schema({
  position: { type: Number, required: true },
  name: { type: String, required: true, unique: true },
  partidosJugados: { type: Number, required: true },
  Ganados: { type: Number },
  Empatados: { type: Number },
  Perdidos: { type: Number },
  golesAfavor: { type: Number },
  golEnContra: { type: Number },
  difDeGoles: { type: Number },
  puntos: { type: Number },
  urlImage: { type: String },
});

const Equipo = mongoose.model("Equipo", EquipoSchema);

export default Equipo;
