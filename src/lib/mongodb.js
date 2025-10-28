import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("⚠️ Debes definir MONGODB_URI en tu archivo .env.local o en Vercel");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log("✅ MongoDB: Usando conexión cacheada");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("⏳ Conectando a MongoDB...");
    cached.promise = mongoose
      .connect(MONGODB_URI, { bufferCommands: false })
      .then((mongoose) => {
        console.log("✅ MongoDB conectado correctamente");
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ Error al conectar con MongoDB:", err);
        throw err;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
