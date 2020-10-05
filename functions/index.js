const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const LOGGER = functions.logger;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  LOGGER.info("Starting mailForwarding function!", {structuredData: true});

  var configs = functions.config();

  let body = request.body;

  LOGGER.info("body: " + body);

  if (!validateBody(body, configs, response)) {
    LOGGER.error("Invalid body");
    response.status(404).send("Bad request, unspected body");
  } else {
    sendMail(configs, body, response);
    response.send(`Mail sent! to:  ${configs.mail.email}`);  
  }

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

function validateBody(body, configs, response) {

  if (!configs.mail) {
    LOGGER.error("Could not get mail configs");
    response.status(500).send("Internal Error");
    return false;
  }

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