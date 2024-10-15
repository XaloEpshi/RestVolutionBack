const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const pool = require("../config/mysqlConfig");

const SECRET_KEY = process.env.SECRET_KEY || "default_secret_key";

// Función para registrar un nuevo administrador
exports.registrarAdministrador = async (req, res) => {
  const { nombre, correo, contraseña } = req.body;

  if (!nombre || !correo || !contraseña) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  try {
    const [existingAdmin] = await pool.query(
      "SELECT * FROM administradores WHERE correo = ?",
      [correo]
    );

    if (existingAdmin.length > 0) {
      return res
        .status(409)
        .json({ error: "El correo electrónico ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 8);

    await pool.query(
      "INSERT INTO administradores (nombre, correo, contraseña) VALUES (?, ?, ?)",
      [nombre, correo, hashedPassword]
    );

    res.status(201).json({ message: "Administrador registrado con éxito" });
  } catch (error) {
    console.error("Error al registrar el administrador:", error);
    res.status(500).json({ error: "Error al registrar el administrador" });
  }
};

// Función para iniciar sesión como administrador
exports.loginAdministrador = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM administradores WHERE correo = ?",
      [correo]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const admin = rows[0];
    const isMatch = await bcrypt.compare(contraseña, admin.contraseña);

    if (isMatch) {
      const token = jwt.sign(
        { id: admin.idAdministrador, correo: admin.correo, role: "admin" },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.json({
        token,
        user: {
          id: admin.idAdministrador,
          name: admin.nombre,
          email: admin.correo
        }
      });
    } else {
      res.status(401).json({ error: "Credenciales inválidas" });
    }
  } catch (error) {
    console.error("Error al buscar el administrador:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};
