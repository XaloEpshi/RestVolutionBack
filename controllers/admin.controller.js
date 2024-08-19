const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const pool = require("../config/mysqlConfig");

// Clave secreta para firmar el token
const SECRET_KEY = process.env.SECRET_KEY || "default_secret_key";

// Función para registrar un nuevo administrador
exports.registrarAdministrador = async (req, res) => {
  // Extrae los datos del cuerpo de la solicitud
  const { nombre, correo, contraseña } = req.body;

  // Verifica que todos los campos necesarios estén presentes
  if (!nombre || !correo || !contraseña) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  try {
    // Verifica si el administrador ya existe en la base de datos
    const [existingAdmin] = await pool.query(
      "SELECT * FROM administradores WHERE correo = ?",
      [correo]
    );

    if (existingAdmin.length > 0) {
      return res
        .status(409)
        .json({ error: "El correo electrónico ya está registrado" });
    }

    // Encripta la contraseña usando bcrypt
    const hashedPassword = await bcrypt.hash(contraseña, 8);

    // Inserta el nuevo administrador en la base de datos
    await pool.query(
      "INSERT INTO administradores (nombre, correo, contraseña) VALUES (?, ?, ?)",
      [nombre, correo, hashedPassword]
    );

    // Responde con un mensaje de éxito
    res.status(201).json({ message: "Administrador registrado con éxito" });
  } catch (error) {
    // Maneja errores y responde con un mensaje de error
    console.error("Error al registrar el administrador:", error);
    res.status(500).json({ error: "Error al registrar el administrador" });
  }
};

// Función para iniciar sesión como administrador
exports.loginAdministrador = async (req, res) => {
  // Extrae los datos del cuerpo de la solicitud
  const { correo, contraseña } = req.body;

  try {
    // Busca al administrador en la base de datos por correo electrónico
    const [rows] = await pool.query(
      "SELECT * FROM administradores WHERE correo = ?",
      [correo]
    );

    if (rows.length === 0) {
      // Responde con un error si el administrador no existe
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const admin = rows[0];

    // Compara la contraseña proporcionada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(contraseña, admin.contraseña);

    if (isMatch) {
      // Genera un token JWT si las credenciales son válidas
      const token = jwt.sign(
        { id: admin.idAdministrador, correo: admin.correo, role: "admin" },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      // Responde con el token JWT
      res.json({ token });
    } else {
      // Responde con un error si las credenciales son inválidas
      res.status(401).json({ error: "Credenciales inválidas" });
    }
  } catch (error) {
    // Maneja errores y responde con un mensaje de error
    console.error("Error al buscar el administrador:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};
