// src/models/CertificateModel.ts
import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del certificado es obligatorio"],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, "La URL de la imagen es obligatoria"],
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: "certificate",
  }
);

export default mongoose.models.Certificate ||
  mongoose.model("Certificate", CertificateSchema);
