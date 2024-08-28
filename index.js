const express = require("express");
const cors = require("cors");
const path = require("path");
const restaurantRoutes = require("./routes/restaurant.routes");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
require("dotenv").config();
const morgan = require("morgan");

const app = express();

// Configuración de morgan para logs de solicitudes HTTP
app.use(morgan("combined")); // 'combined' es un formato predefinido

// Lista de orígenes permitidos
const allowedOrigins = [
  "https://front-rest-volution.vercel.app",
  "http://localhost:3000"
];

// Configuración de CORS
app.use(
  cors({
    origin: function(origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Algo salió mal" });
});

// Rutas
app.use("/api", restaurantRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Archivos estáticos
app.use("/upload", express.static(path.join(__dirname, "upload")));

// Puerto del servidor
const PORT = process.env.PORT || 3001;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
