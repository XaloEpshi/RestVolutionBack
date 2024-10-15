const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;


// Middleware para verificar el token JWT
function verifyToken(req, res, next) {
  // Extrae el token del encabezado 'Authorization' (formato esperado: 'Bearer <token>')
  const token = req.headers['authorization']?.split(' ')[1];

  // Si no se proporciona un token, responde con un error 403 (Forbidden)
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  // Verifica la validez del token utilizando la clave secreta
  jwt.verify(token, secret, (err, decoded) => {
    // Si hay un error en la verificación del token, responde con un error 401 (Unauthorized)
    if (err) {
      return res.status(401).json({ error: 'Failed to authenticate token' });
    }

    // Si el token es válido, adjunta la información decodificada al objeto req
    req.user = decoded; // `decoded` contiene la información del token, como el id y el rol del usuario

    // Llama a la siguiente función de middleware o controlador
    next();
  });
}

// Middleware para verificar que el usuario tenga el rol de administrador
function verifyAdmin(req, res, next) {
  // Verifica si el rol del usuario es 'admin'
  if (req.user.role !== 'admin') {
    // Si el usuario no es administrador, responde con un error 403 (Forbidden)
    return res.status(403).json({ error: 'Access denied' });
  }

  // Si el usuario es administrador, llama a la siguiente función de middleware o controlador
  next();
}


// Exporta los middlewares para que puedan ser usados en otras partes de la aplicación
module.exports = { verifyToken, verifyAdmin };

