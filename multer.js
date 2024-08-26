var fs = require('fs'); // Módulo para manejar operaciones de archivos
var multer = require('multer'); // Middleware para manejar la carga de archivos
const { v4: uuidv4 } = require('uuid'); // Módulo para generar identificadores únicos

const uploadDir = 'upload';

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configuración de Multer para la carga de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploadir'); // Directorio donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        cb(null, uuidv4() + '.' + ext); // Genera un nombre único para la imagen
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/gif"
        ) {
            cb(null, true);
        } else {
            cb(new Error('Tipo de archivo no permitido'), false);
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // Limita el tamaño del archivo a 5 MB
    }
}).single('imagen');
 // Nombre del campo en el formulario

// Exporta el middleware multer configurado para manejar la carga de archivos
module.exports = upload;

