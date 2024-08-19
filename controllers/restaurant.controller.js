const mysqlPool = require("../mysqlConfig"); // Importa la configuración de MySQL
const upload = require("../multer"); // Importa multer para manejar la carga de archivos
const fs = require("fs"); // Importa el módulo de sistema de archivos de Node.js
const path = require("path"); // Importa el módulo path de Node.js para trabajar con rutas de archivos

//CONTROLADOR TABLA PLATOS

// Controlador para obtener todos los platos activos
exports.obtenerPlatos = (req, res) => {
  // Realiza una consulta a la base de datos para obtener solo los platos activos
  mysqlPool.query(
    'SELECT * FROM platos WHERE estado = "activo"',
    (error, results) => {
      if (error) {
        // Si ocurre un error durante la consulta, se registra en la consola y se envía una respuesta de error
        console.error("Error al obtener los platos activos:", error);
        res.status(500).json({ error: "Error al obtener los platos activos" });
        return;
      }
      // Si la consulta es exitosa, se envían los resultados como respuesta con el código de estado 200
      res.status(200).json(results);
    }
  );
};

// Controlador para agregar un nuevo plato con imagen
exports.agregarPlato = (req, res) => {
  upload(req, res, (err) => {
    // Manejo de errores al cargar la imagen
    if (err) {
      console.error("Error al cargar la imagen:", err);
      return res.status(500).json({ error: "Error al cargar la imagen" });
    }

    // Obtener datos del formulario
    const { nombre, descripcion, precio, categoria } = req.body;
    // Obtener el nombre de la imagen si se cargó correctamente
    const imagen = req.file ? req.file.filename : null;

    // Verificar que todos los campos requeridos estén presentes y no sean nulos
    if (!nombre || !descripcion || !precio || !categoria || !imagen) {
      return res
        .status(400)
        .json({
          error: "Todos los campos son obligatorios, incluida la imagen",
        });
    }

    // Preparar la consulta SQL para insertar el nuevo plato
    const query =
      "INSERT INTO platos (nombre, descripcion, precio, categoria, imagen) VALUES (?, ?, ?, ?, ?)";
    const values = [nombre, descripcion, precio, categoria, imagen];

    // Ejecutar la consulta SQL para insertar el nuevo plato en la base de datos
    mysqlPool.query(query, values, (error, results) => {
      if (error) {
        // Manejo de errores al ejecutar la consulta SQL
        console.error("Error al agregar el plato:", error);
        return res.status(500).json({ error: "Error al agregar el plato" });
      }
      // Enviar respuesta de éxito con el código de estado 201 y el ID del plato insertado
      res
        .status(201)
        .json({
          message: "Plato agregado correctamente",
          id: results.insertId,
        });
    });
  });
};

// Controlador para actualizar un plato con imagen y campo destacado actualizado 19/07/24 21:03
exports.actualizarPlato = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("Error al cargar la imagen:", err);
      return res.status(500).json({ error: "Error al cargar la imagen" });
    }

    const platoId = req.params.id;
    const { nombre, descripcion, precio, categoria, destacado } = req.body;
    const imagen = req.file ? req.file.filename : null; // Obtener el nombre de la imagen si se cargó correctamente

    // Verificar que todos los campos requeridos estén presentes y no sean nulos
    if (!nombre || !descripcion || !precio || !categoria) {
      return res
        .status(400)
        .json({
          error: "Todos los campos son obligatorios, excepto la imagen",
        });
    }

    // Preparar la consulta SQL para actualizar el plato
    let query =
      "UPDATE platos SET nombre = ?, descripcion = ?, precio = ?, categoria = ?, destacado = ?";
    const values = [nombre, descripcion, precio, categoria, destacado];

    // Agregar imagen a la consulta y valores si se proporciona una nueva imagen
    if (imagen) {
      query += ", imagen = ?";
      values.push(imagen);
    }

    query += " WHERE idPlato = ?"; // Asegúrate de que 'idPlato' sea el nombre correcto del campo en tu base de datos
    values.push(platoId);

    // Ejecutar la consulta SQL para actualizar el plato en la base de datos
    mysqlPool.query(query, values, (error, results) => {
      if (error) {
        console.error("Error al actualizar el plato:", error);
        return res
          .status(500)
          .json({
            error: "Error al actualizar el plato",
            details: error.message,
          });
      }
      // Enviar respuesta de éxito con el código de estado 200
      res.status(200).json({ message: "Plato actualizado correctamente" });
    });
  });
};

// Controlador para "eliminar" un plato cambiando su estado a inactivo
exports.eliminarPlato = (req, res) => {
  const platoId = req.params.id;
  const query = 'UPDATE platos SET estado = "inactivo" WHERE idPlato = ?';

  mysqlPool.query(query, [platoId], (error, results) => {
    if (error) {
      console.error("Error al cambiar el estado del plato:", error);
      res.status(500).json({ error: "Error al cambiar el estado del plato" });
      return;
    }
    res
      .status(200)
      .json({ message: "Plato marcado como inactivo correctamente" });
  });
};

//CRONTOLADORES ADICIONALES PARA LOS PLATOS.

// Controlador para obtener la imagen de un plato por su ID
exports.obtenerImagenPlato = (req, res) => {
  const platoId = req.params.id; // Obtener el ID del plato desde los parámetros de la solicitud

  // Consulta SQL para seleccionar el nombre de la imagen del plato específico
  const query = "SELECT imagen FROM platos WHERE idplato = ?";

  // Ejecutar la consulta SQL con el ID del plato como valor
  mysqlPool.query(query, [platoId], (error, results) => {
    if (error) {
      // Manejo de errores: si hay un error al ejecutar la consulta, se registra en la consola
      console.error("Error al obtener la imagen del plato:", error);
      // Devolver una respuesta de error con estado 500 si ocurre un error en la base de datos
      return res
        .status(500)
        .json({ error: "Error al obtener la imagen del plato" });
    }

    // Verificar si se encontró una imagen para el plato
    if (results.length === 0 || !results[0].imagen) {
      // Si no se encuentra ninguna imagen, devolver un error 404
      return res.status(404).json({ error: "Imagen no encontrada" });
    }

    // Ruta donde se almacenan las imágenes (debes ajustarla según tu configuración)
    const imagePath = path.join(__dirname, "../upload", results[0].imagen);

    // Verificar si el archivo de imagen existe en el sistema de archivos
    if (fs.existsSync(imagePath)) {
      // Si el archivo de imagen existe, devolverlo como un archivo estático
      res.sendFile(imagePath);
    } else {
      // Si no se encuentra el archivo de imagen, devolver un error 404
      res.status(404).json({ error: "Imagen no encontrada" });
    }
  });
};

// Controlador para obtener todos los platos inactivos
exports.obtenerPlatosInactivos = (req, res) => {
  // Realiza una consulta a la base de datos para obtener solo los platos inactivos
  mysqlPool.query(
    'SELECT * FROM platos WHERE estado = "inactivo"',
    (error, results) => {
      if (error) {
        // Si ocurre un error durante la consulta, se registra en la consola y se envía una respuesta de error
        console.error("Error al obtener los platos inactivos:", error);
        res
          .status(500)
          .json({ error: "Error al obtener los platos inactivos" });
        return;
      }
      // Si la consulta es exitosa, se envían los resultados como respuesta con el código de estado 200
      res.status(200).json(results);
    }
  );
};

// Controlador para activar un plato
exports.activarPlato = (req, res) => {
  const platoId = req.params.id;

  // Consulta para actualizar el estado del plato a 'activo'
  const query = 'UPDATE platos SET estado = "activo" WHERE idPlato = ?';

  mysqlPool.query(query, [platoId], (error, results) => {
    if (error) {
      console.error("Error al activar el plato:", error);
      res.status(500).json({ error: "Error al activar el plato" });
      return;
    }
    // Si la actualización fue exitosa, se envía una respuesta con el mensaje correspondiente
    res.status(200).json({ message: "Plato activado correctamente" });
  });
};

// Controlador para obtener platos activos y destacados
exports.obtenerPlatosDestacadosActivos = (req, res) => {
  // Realiza una consulta a la base de datos para obtener solo los platos activos y destacados
  mysqlPool.query(
    'SELECT * FROM platos WHERE estado = "activo" AND destacado = true',
    (error, results) => {
      if (error) {
        // Si ocurre un error durante la consulta, se registra en la consola y se envía una respuesta de error
        console.error("Error al obtener los platos activos y destacados:", error);
        res.status(500).json({ error: "Error al obtener los platos activos y destacados" });
        return;
      }
      // Si la consulta es exitosa, se envían los resultados como respuesta con el código de estado 200
      res.status(200).json(results);
    }
  );
};

