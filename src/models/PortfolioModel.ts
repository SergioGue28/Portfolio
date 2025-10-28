import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    photo: { type: String, default: "" },
    position: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
  },
  { 
    timestamps: true,
    collection: "portfolio",
  }
  
);

export default mongoose.models.Portfolio || mongoose.model("Portfolio", PortfolioSchema);
