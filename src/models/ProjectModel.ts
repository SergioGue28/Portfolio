import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del proyecto es obligatorio"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "La descripción del proyecto es obligatoria"],
      trim: true,
    },
    url: {
      type: String,
      required: [true, "La URL del proyecto es obligatoria"],
      trim: true,
      match: [
        /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\/\w-]*)*\/?$/,
        "Por favor ingrese una URL válida",
      ],
    },
  },
  {
    timestamps: true,
    collection: "project",
  }
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
