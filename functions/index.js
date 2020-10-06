const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});

const LOGGER = functions.logger;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((req, res) => {

    LOGGER.info(res.getHeaders())
    LOGGER.info("Starting mailForwarding function!", {structuredData: true});

    if (req.method !== 'POST') {
      return res.status(404).send('HTTP method is not allowed');
    }

    var configs = functions.config();

    if (!configs.mail) {
      LOGGER.error("Could not get mail configs");
      return res.status(500).json("Internal Error");
    }

    let body = req.body;

    LOGGER.info("body: " + JSON.stringify(body));

    if (!validateBody(body)) {
      LOGGER.error("Invalid body");
      return res.status(404).send("Bad request, unspected body");
    }
    
    sendMail(configs, body, res);
    return res.status(200).send(`Mail sent! to:  ${configs.mail.email}`);

});

function sendMail(configs, body, response) {
  var transporter = nodemailer.createTransport({
    host: `${configs.mail.host}`,
    port: `${configs.mail.port}`,
    auth: {
      user: `${configs.mail.email}`,
      pass: `${configs.mail.password}`
    }
  });

  let info = transporter.sendMail({
    from: `"Genco Web Page" <${configs.mail.email}>`, // sender address
    to: `${configs.mail.email}`, // list of receivers
    subject: "Correo Landing page", // Subject line
    html: "<b>Nuevo Usuario</b> <br>" +
          `Tipo de Usuario: ${body.userType} <br>
           Correo: ${body.mail} <br>
           Nombre: ${body.name} <br>
           Profesion: ${body.profession}` 
    
  },
  (error, info) => {
    if (error) {
      LOGGER.error(error);
      response.status(500).send(error);
    } else {
      LOGGER.info('Email sent: ' + info.response);
    } 
  });

  LOGGER.info(`sending mail to: ${configs.mail.email}`);
}

function validateBody(body) {

  const {mail, profession, userType, name} = body;

  if (userType) {
    if (userType === 'user' && name && mail) {
      return true;
    }
    if (userType === 'professional' && mail && profession) {
      return true;
    }
  }
  return false;
}