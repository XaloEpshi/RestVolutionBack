const mysqlPool = require("../mysqlConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const secret = process.env.SECRET_KEY;

// Función para registrar un nuevo cliente
exports.registrarCliente = async (req, res) => {
  // Extrae los datos del cuerpo de la solicitud
  const { nombre, correo, contraseña } = req.body;

  // Verifica que todos los campos necesarios estén presentes
  if (!nombre || !correo || !contraseña) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  // Encripta la contraseña usando bcrypt
  const hashedPassword = bcrypt.hashSync(contraseña, 8);

  // Consultas SQL para verificar la existencia del cliente y para insertar un nuevo cliente
  const checkQuery = "SELECT * FROM clientes WHERE correo = ?";
  const insertQuery = "INSERT INTO clientes (nombre, correo, contraseña) VALUES (?, ?, ?)";
  const values = [nombre, correo, hashedPassword];

  try {
    // Verifica si el cliente ya existe en la base de datos
    const [existingUser] = await mysqlPool.promise().query(checkQuery, [correo]);

    if (existingUser.length > 0) {
      return res.status(409).json({ error: "El correo electrónico ya está registrado" });
    }

    // Inserta el nuevo cliente en la base de datos
    await mysqlPool.promise().query(insertQuery, values);
    // Responde con un mensaje de éxito
    res.status(201).json({ message: "Cliente registrado correctamente" });
  } catch (error) {
    // Maneja errores y responde con un mensaje de error
    console.error("Error al registrar el cliente:", error);
    res.status(500).json({ error: "Error al registrar el cliente" });
  }
};

// Función para iniciar sesión como cliente
exports.loginCliente = async (req, res) => {
  // Extrae los datos del cuerpo de la solicitud
  const { correo, contraseña } = req.body;

  // Verifica que el correo y la contraseña estén presentes
  if (!correo || !contraseña) {
    return res.status(400).json({ error: "Correo y contraseña son requeridos" });
  }

  // Consulta SQL para buscar al cliente por correo electrónico
  const query = "SELECT * FROM clientes WHERE correo = ?";

  try {
    // Busca al cliente en la base de datos
    const [results] = await mysqlPool.promise().query(query, [correo]);

    if (results.length === 0) {
      // Responde con un error si el cliente no existe
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    const cliente = results[0];
    // Compara la contraseña proporcionada con la almacenada en la base de datos
    const passwordIsValid = bcrypt.compareSync(contraseña, cliente.contraseña);

    if (!passwordIsValid) {
      // Responde con un error si la contraseña es incorrecta
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Genera un token JWT si las credenciales son válidas
    const token = jwt.sign({ id: cliente.idCliente, role: 'client' }, secret, {
      expiresIn: "24h", // El token expirará en 24 horas
    });

    // Responde con el token JWT y un mensaje de éxito
    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    // Maneja errores y responde con un mensaje de error
    console.error("Error al buscar el cliente:", error);
    res.status(500).json({ error: "Error al buscar el cliente" });
  }
};

// Crear una nueva promocion
exports.crearPromocion = (req, res) => {
  const { nombre, descripcion, tipo, valor, activa } = req.body;

  // Validar que los datos necesarios estén presentes
  if (!nombre || !tipo || !valor) {
    return res
      .status(400)
      .json({
        error: "Todos los campos son obligatorios (nombre, tipo, valor)",
      });
  }

  const query =
    "INSERT INTO promociones (nombre, descripcion, tipo, valor, activa) VALUES (?, ?, ?, ?, ?)";
  mysqlPool.query(
    query,
    [nombre, descripcion, tipo, valor, activa],
    (error, results) => {
      if (error) {
        console.error("Error al crear la oferta:", error);
        return res.status(500).json({ error: "Error al crear la oferta" });
      }

      res.status(200).json({ message: "Oferta creada correctamente" });
    }
  );
};

// Crear una nueva oferta
exports.crearOferta = (req, res) => {
  const {
    nombre,
    descripcion,
    tipo,
    valor,
    productos,
    categoria,
    fechaInicio,
    fechaFin,
    activa,
  } = req.body;

  // Validar que los datos necesarios estén presentes
  if (!nombre || !tipo || !valor || !fechaInicio || !fechaFin) {
    return res
      .status(400)
      .json({
        error:
          "Todos los campos obligatorios deben ser proporcionados (nombre, tipo, valor, fechaInicio, fechaFin)",
      });
  }

  const query =
    "INSERT INTO ofertas (nombre, descripcion, tipo, valor, productos, categoria, fechaInicio, fechaFin, activa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  mysqlPool.query(
    query,
    [
      nombre,
      descripcion,
      tipo,
      valor,
      productos,
      categoria,
      fechaInicio,
      fechaFin,
      activa,
    ],
    (error, results) => {
      if (error) {
        console.error("Error al crear la oferta:", error);
        return res.status(500).json({ error: "Error al crear la oferta" });
      }

      res.status(200).json({ message: "Oferta creada correctamente" });
    }
  );
};

// Crear un nuevo cupón
exports.crearCupon = (req, res) => {
  const { codigo, valor, fechaInicio, fechaFin, idPromocion } = req.body;

  // Validar que los datos necesarios estén presentes
  if (!codigo || !valor || !fechaInicio || !fechaFin) {
    return res
      .status(400)
      .json({
        error:
          "Todos los campos obligatorios deben ser proporcionados (código, valor, fechaInicio, fechaFin)",
      });
  }

  const query =
    "INSERT INTO cupones (codigo, valor, fechaInicio, fechaFin, idPromocion) VALUES (?, ?, ?, ?, ?)";
  mysqlPool.query(
    query,
    [codigo, valor, fechaInicio, fechaFin, idPromocion],
    (error, results) => {
      if (error) {
        console.error("Error al crear el cupón:", error);
        return res.status(500).json({ error: "Error al crear el cupón" });
      }

      res.status(200).json({ message: "Cupón creado correctamente" });
    }
  );
};

//ENVIO DE CORREOS
