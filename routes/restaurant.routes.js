const express = require("express");
const router = express.Router(); // Crea un nuevo router de Express
const platosController = require("../controllers/restaurant.controller");
const nodemailer = require("nodemailer");
require("dotenv").config();
//const mercadopago = require('mercadopago');

// Configuración del servicio de correo electrónico
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gonzalo.mellao.m@gmail.com",
    pass: "jstszorcbhrkezao",
  },
});

// Ruta para enviar la reserva
router.post("/send-reservation", (req, res) => {
  const { name, email, phone, event, date, message } = req.body;

  // Definir el contenido del cuerpo para el correo electrónico que deseas enviar
  const mailOptions = {
    from: email,
    to: "gonzalo.mellao.m@gmail.com", // Cambia esto al correo electrónico del restaurante
    subject: `Reserva de ${event} para ${name}`,
    text: `Nombre: ${name}\nCorreo Electrónico: ${email}\nTeléfono: ${phone}\nTipo de Evento: ${event}\nFecha de la Reserva: ${date}\nMensaje: ${message}`,
  };

  // Envía el correo electrónico utilizando el método sendMail del objeto transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error al enviar el correo:", error);
      res.status(500).send("Error al enviar la reserva");
    } else {
      console.log("Correo enviado:", info.response);
      res.status(200).send("Reserva enviada con éxito");
    }
  });
});

// Rutas para platos accesibles solo por administradores
// Ruta para obtener todos los platos
router.get("/allPlatos", platosController.obtenerPlatos);
// Ruta para obtener platos activos y destacados
router.get('/destacados-activos', platosController.obtenerPlatosDestacadosActivos);
// Ruta para agregar un nuevo plato
router.post("/addPlatos", platosController.agregarPlato);
// Ruta para actualizar un plato existente por su ID
router.put("/eddPlatos/:id", platosController.actualizarPlato);
// Ruta para eliminar un plato existente por su ID
router.delete("/delPlatos/:id", platosController.eliminarPlato);
// Ruta para obtener la imagen de un plato por su ID
router.get("/imaPlatos/:id", platosController.obtenerImagenPlato);
// Ruta para obtener los platos inactivos
router.get("/inPlatos", platosController.obtenerPlatosInactivos);
// Ruta para activar un plato por su ID
router.put("/activatePlato/:id", platosController.activarPlato);

module.exports = router; // Exporta el router con las rutas definidas


/*/Configuracion Mercado Pago
mercadopago.configure({
  access_token: 'YOUR_ACCESS_TOKEN'
});

app.post('/create_preference', async (req, res) => {
  let preference = {
    items: [
      {
        title: 'Sample Item',
        unit_price: 100,
        quantity: 1
      }
    ],
    back_urls: {
      success: 'http://your-site.com/success',
      failure: 'http://your-site.com/failure',
      pending: 'http://your-site.com/pending'
    },
    auto_return: 'approved'
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating preference');
  }
});


//Configuracion Transbank
const webpay = new WebpayPlus.Transaction();

app.post('/create_webpay', async (req, res) => {
  const buyOrder = 'order_id';
  const sessionId = 'session_id';
  const amount = 1000;
  const returnUrl = 'http://your-site.com/return_url';

  try {
    const response = await webpay.create({
      buyOrder,
      sessionId,
      amount,
      returnUrl
    });

    res.json({ url: response.url });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating Webpay transaction');
  }
});*/